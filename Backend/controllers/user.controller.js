import {User} from "../models/user.model.js"; // Make sure you have a User model
import { asyncHandler } from "../utils/asyncHandler.js";import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const {role="user"}=req.query
  const users = await User.find({role:role}, "-password -refreshToken"); 
  res.status(200).json({ success: true, data: users });
});


const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, "-password -refreshToken");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ success: true, data: user });
});


const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, oldPassword,newPassword } = req.body;
  const userId = req.params.id;

  // Ensure user is updating own profile
  if (req.user._id.toString() !== userId) {
    throw new ApiError(403,"You can only update your own profile");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;

  // Update password if provided
  if (oldPassword && newPassword) {
    const isCorrect = await user.isPasswordCorrect(oldPassword);
    if(!isCorrect) throw new ApiError(403,"password not matches")
    user.password=newPassword
  }

  await user.save();

  res.status(200).json({ success: true, data: user });
});


const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

export { getAllUsers, getUserDetails, updateProfile, deleteUser };
