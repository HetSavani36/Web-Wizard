import { asyncHandler } from "../utils/asyncHandler.js";
import {Post} from "../models/post.model.js";
import {Comment} from "../models/comment.model.js";
import {User} from "../models/user.model.js";


const fakeModerate = async (text) =>
  text.includes("badword") ? "Rejected" : "Approved";

const fakeTranslate = async (text, lang) => `${text} [translated to ${lang}]`;

const moderateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    res.status(400);
    throw new Error("Comment content required");
  }

  const result = await fakeModerate(content);
  res.status(200).json({ success: true, moderation: result });
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

export { moderateComment, translatePost };
