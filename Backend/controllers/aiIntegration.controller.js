import { asyncHandler } from "../utils/asyncHandler.js";
import {Post} from "../models/post.model.js";
import {Comment} from "../models/comment.model.js";
import {User} from "../models/user.model.js";


const fakeSummarize = async (text) => `Summary: ${text.slice(0, 100)}...`;
const fakeModerate = async (text) =>
  text.includes("badword") ? "Rejected" : "Approved";
const fakeTranslate = async (text, lang) => `${text} [translated to ${lang}]`;


const summarizePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const summary = await fakeSummarize(post.content);
  res.status(200).json({ success: true, data: { summary } });
});


const moderateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    res.status(400);
    throw new Error("Comment content required");
  }

  const result = await fakeModerate(content);
  res.status(200).json({ success: true, moderation: result });
});


const getRecommendations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Placeholder: fetch latest posts, could filter by user's interests, history, bookmarks
  const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json({ success: true, data: posts });
});


const translatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const lang = req.query.lang || "en";
  const translation = await fakeTranslate(post.content, lang);
  res.status(200).json({ success: true, data: { translation } });
});

export { summarizePost, moderateComment, getRecommendations, translatePost };
