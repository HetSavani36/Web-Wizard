import mongoose from "mongoose";
import {Post} from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import {User} from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Bookmark} from "../models/bookmark.model.js"
import ApiResponse from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";


const getTrendingAnalytics = asyncHandler(async (req, res) => {
  // Simple scoring formula: views + likes*2 + comments*3
  const posts = await Post.find().populate("comments");

  const trending = posts
    .map((post) => ({
      postId: post._id,
      title: post.title,
      score: post.views + post.likes.length * 2 + post.comments.length * 3,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // top 10 trending

  res.status(200).json({ success: true, data: trending });
});



const getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find()
    .sort({ points: -1 })
    .limit(3)
    .select("name points badges");
  res.status(200).json({ success: true, data: users });
});



const updateUserPoints = asyncHandler(async (req, res) => {
  const { points } = req.body;

  if (points === undefined) {
    res.status(400);
    throw new Error("Points value is required");
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.points = points;
  await user.save();

  res
    .status(200)
    .json({ success: true, data: { userId: user._id, points: user.points } });
});

const getUserDashboardAnalytics=asyncHandler(async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.user._id)

    const [commentCount, bookmarkCount, userPoints,userBadges] = await Promise.all([
      Comment.countDocuments({ userId: userId }).catch(() => 0),
      Bookmark.countDocuments({ userId: userId }).catch(() => 0),
      User.findById(userId).select("points").lean().catch(()=>null),
      User.findById(userId).select("badges").lean().catch(()=>null)
    ]);

    const points = userPoints?.points || 0;
    const badges = userBadges?.badges || [];

    res.json(
      new ApiResponse(200,{commentCount,bookmarkCount,points,badges},"user dashboard")
    )
})


const getAdminDashboardAnalytics=asyncHandler(async(req,res)=>{
  
    const [totalPosts,activeUsers,categoriesCount,recentActivities]=await Promise.all([

      Post.countDocuments({isDraft:false}).catch(()=>0),

      User.countDocuments({role:"user"}).catch(()=>0),

      Category.countDocuments().catch(()=>0),

      Post.find().sort({createdAt:-1}).lean().limit(5).catch(()=>[])
    ])

    let result=await User.aggregate([
      {
        $project:{month:{$month:'$createdAt'}}
      },
      {
        $group:{_id:'$month',count:{$sum:1}}
      }
    ])

    const months=["Jan","feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    const engagementAnalytics = result.reduce((acc,month)=>{
      acc[months[month._id-1]]=month.count
      return acc
    },{})

    result=await Post.aggregate([
      {
        $lookup:{
          from:'categories',
          localField:'category',
          foreignField:'_id',
          as:'category',
          pipeline:[
            {
              $project:{_id:0,name:1}
            }
          ]
        }
      },
      {$unwind:'$category'},
      {
        $group:{_id:'$category.name',count:{$sum:1}}
      }
    ])

    const categoriesRatio=result.reduce((acc,category)=>{
        acc[category._id]=category.count
        return acc
    },{})

    res.json(
      new ApiResponse(200, {
        totalPosts,
        activeUsers,
        categoriesCount,
        recentActivities,
        engagementAnalytics,
        categoriesRatio
      })
    );
})

const getUserManagementAnalytics=asyncHandler(async(req,res)=>{
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    
    const startOfMonth = new Date();
    startOfMonth.setDate(1)
    startOfMonth.setHours(0,0,0,0)

    const [totalUsers, totalAdmins, activeToday, newThisMonth, users,admins] =
      await Promise.all([
        User.countDocuments({ role: "user" }).catch(() => 0),
        User.countDocuments({ role: "admin" }).catch(() => 0),
        User.countDocuments({
          updatedAt: { $gte: startOfToday, $lte: endOfToday },
        }).catch(() => 0),
        User.countDocuments({ createdAt: { $gte: startOfMonth } }).catch(
          () => 0
        ),
        User.find({ role: "user" }).catch(() => []),
        User.find({ role: "admin" }).catch(() => []),
      ]);

      res.json(
        new ApiResponse(
          200,
          {
            totalUsers,
            totalAdmins,
            activeToday,
            newThisMonth,
            users,
            admins
          },
          "user management analyitcs"
        )
      )
})

export {
  getTrendingAnalytics,
  getLeaderboard,
  updateUserPoints,
  getUserDashboardAnalytics,
  getAdminDashboardAnalytics,
  getUserManagementAnalytics,
};
