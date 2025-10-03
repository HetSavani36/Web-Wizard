import * as validator from "email-validator";
import { Subscribe } from "../models/subscribe.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const subscribe=asyncHandler(async(req,res)=>{
    const email = req.user.email;
    const {categories=[]}=req.body

    if(categories && !Array.isArray(categories)) throw new ApiError(403,"categories format invalid")

    const subscribe=await Subscribe.create({
        email:email,
        categories:categories
    })
    if(!subscribe) throw new ApiError(500,"subscription failed")

    res.json(
        new ApiResponse(201,{},"user subscribed successfully")
    )
})


const getAllsubscriber = asyncHandler(async (req, res) => {
    const subscribers=await Subscribe.find()
    res.json(
        new ApiResponse(200,subscribers,"all subscribers")
    )
});

export { subscribe, getAllsubscriber };