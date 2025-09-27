import mongoose from "mongoose";
import {Post} from "../models/post.model.js"; // Make sure you have a Post model
import {Category} from "../models/category.model.js"; // Make sure you have a Post model
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Title, content, and category are required");
  }
  const user=new mongoose.Types.ObjectId(req.user._id)
  const existingCategory=await Category.findOne({name:category})
  if(!existingCategory) throw new ApiError(404,"category not found")
   
  const post = await Post.create({
    title: title,
    content: content,
    author:user._id,
    category:existingCategory._id,
    tags: tags || [],
    publishedAt:new Date(),
    aiSummary:"" //ai generated summary
  });
  if(!post) throw new ApiError(500,"post not created")

  res.status(201).json({ success: true, data: post });
});


const getAllPosts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let query = {};

  // Filter by category
  if(category){
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) throw new ApiError(404, "category not found");
    query.category=existingCategory._id
  }
  

  // Search in title, content, or tags
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $in: [search] } } // assuming tags is an array
    ];
  }

  query.draft=false

  const posts = await Post.find(query)
    .populate("author", "name") // optional
    .populate("category", "name") // optional, if you want category name
    .sort({ createdAt: -1 });

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
  post.likesCount = post.likes.length;
  post.bookmarksCount = post.bookmarks.length;

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


const getTrendingPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ views: -1 }) // can also use likes.length for popularity
    .limit(10)
    .populate("author", "name")
    .populate("category","name")

  res.status(200).json({ success: true, data: posts });
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

  const userId = req.user.id;
  if (!post.upVotes.includes(userId)) {
    post.upVotes.push(userId);

    // If the user had previously downvoted, remove that
    post.downvotes = post.downvotes.filter((id) => id.toString() !== userId);

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

  const userId = req.user.id;
  if (!post.downVotes.includes(userId)) {
    post.downVotes.push(userId);

    // If the user had previously downvoted, remove that
    post.upVotes = post.upVotes.filter((id) => id.toString() !== userId);

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
  getTrendingPosts,
  incrementViewCount,
  upVote,
  downVote,
  createDraft,
  postDraft
};
