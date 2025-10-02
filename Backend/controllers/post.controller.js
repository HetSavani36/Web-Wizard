import mongoose from "mongoose";
import {Post} from "../models/post.model.js"; // Make sure you have a Post model
import {Category} from "../models/category.model.js"; // Make sure you have a Post model
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import axios from "axios"
import { Comment } from "../models/comment.model.js";


const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Title, content, and category are required");
  }
  const user=new mongoose.Types.ObjectId(req.user._id)
  const existingCategory=await Category.findOne({name:category})
  if(!existingCategory) throw new ApiError(404,"category not found")
  
  let aiSummary = await axios.post(
    "https://13z548p9-3000.inc1.devtunnels.ms/summarize",
    {
      content: content, 
    }
  );
  if (!aiSummary.data.summary) aiSummary = ""; 
  else aiSummary = aiSummary.data.summary;

  const post = await Post.create({
    title: title,
    content: content,
    author: user._id,
    category: existingCategory._id,
    tags: tags || [],
    publishedAt: new Date(),
    aiSummary: aiSummary, //ai generated summary
  });
  if(!post) throw new ApiError(500,"post not created")

  res.status(201).json({ success: true, data: post });
});


const getAllPosts = asyncHandler(async (req, res) => {
  let { category, search,sortBy="createdAt",order="des" } = req.query;
  let query = {};

  // Filter by category
  if(category){
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) throw new ApiError(404, "category not found");
    query.category=existingCategory._id
  }
  
  order = order=== "des"?-1:1
  let sortQuery={}
  if(sortBy){
    switch (sortBy) {
      case "createdAt":
        sortQuery.createdAt = order;
        break;
      case "upVote":
        sortQuery.upVoteCount = order;
        break;
      case "downVote":
        sortQuery.downVoteCount = order;
        break;
      case "views":
        sortQuery.views = order;
        break;
      default:
        sortQuery.createdAt = -1;
        break;
    }
  }

  // Search in title, content, or tags
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $in: [search] } } // assuming tags is an array
    ];
  }

  query.isDraft=false

  const posts = await Post.aggregate([
    {
      $match: query,
    },
    {
      $addFields: {
        upVoteCount: { $size: { $ifNull: ["$upVotes", []] } },
        downVoteCount: { $size: { $ifNull: ["$downVotes", []] } },
      },
    },
    {
      $sort: sortQuery,
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              _id: 0,
              name: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$author" },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
        pipeline: [
          {
            $project: {
              _id: 0,
              name: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$category" },
  ]);

  res.status(200).json({ success: true, data: posts });
});


const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name email") // populate author details
    .populate("category", "name description") // populate category
    .lean(); // convert to plain JS object for easier manipulation

  if (!post || post.isDraft) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Add counts for likes and bookmarks
  post.upVoteCount= (post.upVotes || []).length
  post.downVoteCount = (post.downVotes || []).length;
  post.bookmarksCount = (post.bookmarks || []).length;

  const comments=await Comment.find({postId:post._id})
      .populate("userId","name")
      .populate({
        path:'parentCommentId',
        populate:{
          path:'userId',
          select:'name'
        }
      })
      .sort({createdAt:-1})
  
  
  post.comments=comments
  post.commentsCount=(comments || []).length

  await post.save()
  res.status(200).json({ success: true, data: post });
});



const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const { title, content, category } = req.body;
  if (category) {
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) throw new ApiError(404, "category not found");
    query.category = existingCategory._id;
  }

  if (title) post.title = title;
  if (content) post.content = content;

  await post.save();
  res.status(200).json({ success: true, data: post });
});


const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  await post.deleteOne();
  res.status(200).json({ success: true, message: "Post deleted successfully" });
});




const incrementViewCount = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || !post.isDraft) {
    res.status(404);
    throw new Error("Post not found");
  }

  post.views += 1;
  await post.save();

  res.status(200).json({ success: true, data: { views: post.views } });
});

const upVote=asyncHandler(async(req,res)=>{
  const post = await Post.findById(req.params.id);
  if (!post || !post.isDraft) {
    res.status(404);
    throw new Error("Post not found");
  }

  const userId = req.user._id;
  if (!post.upVotes.includes(userId)) {
    post.upVotes.push(userId);

    // If the user had previously downvoted, remove that
    const prevLength=post.downVotes.length
    post.downVotes = post.downVotes.filter((id) => id.toString() !== userId);
    const length = post.downVotes.length
    
    const user=await User.findById(userId)
    if(prevLength==length) user.points+=100
    else user.points+=90
    
    await user.save()
    await post.save();
  }
  res.status(200).json({ success: true, likesCount: post.likes.length });
})

const downVote = asyncHandler(async(req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || !post.isDraft) {
    res.status(404);
    throw new Error("Post not found");
  }

  const userId = req.user._id;
  if (!post.downVotes.includes(userId)) {
    post.downVotes.push(userId);

    // If the user had previously downvoted, remove that
    const prevLength = post.upVotes.length;
    post.upVotes = post.upVotes.filter((id) => id.toString() !== userId);
    const length = post.upVotes.length;

    const user = await User.findById(userId);
    if (prevLength == length) user.points += 10;
    else user.points -= 90;

    await user.save()
    await post.save();
  }
  res.status(200).json({ success: true, likesCount: post.likes.length });
})


const createDraft = asyncHandler(async (req, res) => {
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category) {
      res.status(400);
      throw new Error("Title, content, and category are required");
    }
    const user = new mongoose.Types.ObjectId(req.user._id);
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) throw new ApiError(404, "category not found");

    const post = await Post.create({
      title: title,
      content: content,
      author: user._id,
      category: existingCategory._id,
      isDraft:true,
      tags: tags || [],
      aiSummary: "", //ai generated summary
    });
    if (!post) throw new ApiError(500, "post not drafted");

    res.status(201).json({ success: true, data: post });
});


const postDraft=asyncHandler(async(req,res)=>{
    const draft=await Post.findById(req.params.id)
    if(!draft) throw new ApiError(404,"no draft found")

    if(!draft.isDraft) throw new ApiError(403,"post already created")
    draft.isDraft=false
    draft.publishedAt=new Date()
    await draft.save()

    res.status(200).json({ success: true, data: draft });
})


export {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  incrementViewCount,
  upVote,
  downVote,
  createDraft,
  postDraft
};
