import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Report } from "../models/report.model.js";
import { Post } from "../models/post.model.js";

const postReport=asyncHandler(async(req,res)=>{
    const postId = new mongoose.Types.ObjectId(req.params.id);
    const post=await Post.findById(postId)
    if (!post) throw new ApiError(404, "post not found");

    const userId=new mongoose.Types.ObjectId(req.user._id)
    const existingReport = await Report.findOne({ userId: userId, postId: postId });
    if(existingReport) throw new ApiError(403,"report already exists")

    const {reason,severity="Medium"}=req.body

    if(!reason) throw new ApiError(403,"please provide reason")
    const report=await Report.create({
        postId:postId,
        userId:userId,
        reason:reason,
        severity:severity
    })
    if(!report) throw new ApiError(500,"report creation failed")

    res.json(
        new ApiResponse(201,report,"report created")
    )
})

const getReport = asyncHandler(async (req, res) => {
    let report = await Report.findById(req.params.id)
        .populate("postId","-author -isDraft -scheduledAt -publishedAt -bookmarks")
        .populate("userId","name")
    if (!report) throw new ApiError(404, "report not found");

    res.json(
        new ApiResponse(200,report,"report details")
    )
});


const getAllReports = asyncHandler(async (req, res) => {
    let {severity,status,page=1,limit=10}=req.query
    let query={}

    page=Number(page)
    limit=Number(limit)
    const skip=(page-1)*limit

    const allowedStatuses = ["Resolved", "Dismissed"];
    const allowedSeverity = ["Low", "Medium","High"];

    if (severity) {
        if (!allowedSeverity.includes(severity)) throw new ApiError(400, "Invalid severity value");
        query.severity = severity;
    }

    if (status) {
        if (!allowedStatuses.includes(status)) throw new ApiError(400, "Invalid status value");
        query.status = status;
    }

    const reports = await Report.find(query)
      .populate(
        "postId",
        "-author -isDraft -scheduledAt -publishedAt -bookmarks"
      )
      .populate("userId", "name")
      .sort({createdAt:-1})
      .skip(skip)
      .limit(limit)
      .lean()

    res.json(new ApiResponse(200, reports, "all reports"));
});

const updateReportStatus = asyncHandler(async (req, res) => {
    let report=await Report.findById(req.params.id)
    if(!report) throw new ApiError(404,"report not found")
    if(report.status!="Pending") throw new ApiError(403,"status cant be changed")
    
    const {status}=req.body
    const allowedStatuses = ["Resolved", "Dismissed"];
    if (!allowedStatuses.includes(status)) throw new ApiError(400, "Invalid status value");
    
    report.status=status
    await report.save()

    res.json(
        new ApiResponse(200,report,"report status changed")
    )
});

export { postReport, getReport, getAllReports, updateReportStatus};