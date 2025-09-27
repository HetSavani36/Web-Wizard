import User from "../models/user.model.js"; // Make sure you have a User model
import asyncHandler from "express-async-handler"; // For handling async errors
import bcrypt from "bcryptjs";


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "-password"); // Exclude password
  res.status(200).json({ success: true, data: users });
});


const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, "-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ success: true, data: user });
});


const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;

  // Ensure user is updating own profile
  if (req.user.id !== userId) {
    res.status(403);
    throw new Error("You can only update your own profile");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;

  // Update password if provided
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
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

  await user.remove();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

export { getAllUsers, getUserDetails, updateProfile, deleteUser };
