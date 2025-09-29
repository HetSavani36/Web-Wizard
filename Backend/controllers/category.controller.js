import {Category} from "../models/category.model.js"; // Make sure you have a Category model
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const createCategory = asyncHandler(async (req, res) => {
  const { name, description="" } = req.body;

  if (!name || name.trim() === "") {
    res.status(400);
    throw new Error("Category name is required");
  }

  // Prevent duplicate category
  const existing = await Category.findOne({ name });
  if (existing) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name, description });
  res.status(201).json({ success: true, data: category });
});



const getAllCategories = asyncHandler(async (req, res) => {

  const categories = await Post.aggregate([
    {
      $group: { _id: "$category", count: { $sum: 1 } },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $project: {
        categoryId: "$_id",
        categoryName: "$category.name",
        postCount: "$count",
      },
    },
  ]);

  res.status(200).json({ success: true, data: categories });
});



const getCategoryDetails = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const postCounts=await Post.countDocuments({category:category._id})
  category.postCounts=postCounts

  await category.save()

  res.status(200).json({ success: true, data: category });
});



const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (name) category.name = name;
  if (description) category.description = description;

  await category.save();
  res.status(200).json({ success: true, data: category });
});



const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await category.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "Category deleted successfully" });
});

export {
  createCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
};
