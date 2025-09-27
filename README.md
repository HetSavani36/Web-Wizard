📚 Blog Platform Backend (Node.js + Express + MongoDB)

This is the backend for a full-featured blog and knowledge-sharing platform.
It provides authentication, post management, comments, categories, bookmarks, analytics, and AI-powered features.

🚀 Tech Stack

Node.js + Express.js — Backend framework

MongoDB + Mongoose — Database & ODM

JWT — Authentication & Authorization

Passport.js — Google OAuth integration

Multer + Cloudinary — File uploads & media storage

Swagger — API documentation

Bcrypt.js — Password hashing

📂 Project Structure
Backend/
├── config/
│   ├── config.js
│   ├── db.js
│   └── swagger.js
├── controllers/
│   ├── aintegration.controller.js
│   ├── analytics.controller.js
│   ├── auth.controller.js
│   ├── bookmark.controller.js
│   ├── category.controller.js
│   ├── comment.controller.js
│   ├── post.controller.js
│   └── user.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── isAdmin.middleware.js
│   └── multer.middleware.js
├── models/
│   ├── analytic.model.js
│   ├── bookmark.model.js
│   ├── category.model.js
│   ├── comment.model.js
│   ├── post.model.js
│   └── user.model.js
├── public/
│   └── temp/
├── routes/
│   ├── aintegration.route.js
│   ├── analytics.route.js
│   ├── auth.route.js
│   ├── bookmark.route.js
│   ├── category.route.js
│   ├── comment.route.js
│   ├── post.route.js
│   └── user.route.js
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   ├── cloudinary.js
│   └── passport.js
├── .env
├── .gitignore
├── .gitkeep
├── app.js
├── index.js
├── package-lock.json
└── package.json


🔑 Features
✅ Authentication & User Management

JWT Authentication

Google OAuth (/auth/google)

Register/Login for both users and admins

Refresh tokens, Logout, and Get current user (/auth/me)

Admin-only user management (GET /users, DELETE /users/:id)

User profile update (PATCH /users/:id)

📝 Posts

Create, update, delete posts (admin only)

Fetch all posts, single post, or trending posts

Drafts support (/posts/draft)

Increment post view count

Tags, categories, scheduling, AI summaries

💬 Comments

Add, edit, delete comments on posts

Upvote / downvote comments

Flag/unflag comments (user + admin moderation)

Admin can view and delete flagged comments

📂 Categories

Admin can create, update, and delete categories

Public can fetch categories and details

🔖 Bookmarks & Engagement

Users can bookmark/unbookmark posts

Users can like/unlike posts

Fetch all bookmarks for a user

📊 Analytics & Gamification

Per-post analytics: views, likes, comments

System-wide trending analytics

Leaderboard (user points)

Admin can update user points

🤖 AI Integration

AI summarization of posts (/aiintegration/summarize/:postId)

AI comment moderation (/aiintegration/moderate-comment)

Personalized recommendations (/aiintegration/recommendations)

AI translation (/aiintegration/translate/:postId?lang=fr)

📡 API Endpoints

Here’s a quick reference of major endpoints:

🔐 Auth (/api/auth)

POST /register — Register user

POST /admin/register — Register admin

POST /login — Login

POST /logout — Logout

POST /refresh-token — Refresh JWT

GET /me — Current user

GET /google — Google OAuth

👤 Users (/api/users)

GET / — Get all users (Admin)

GET /:id — Get user details (Admin)

PATCH /:id — Update profile (Self)

DELETE /:id — Delete user (Admin)

📝 Posts (/api/posts)

POST / — Create post (Admin)

GET / — Get all posts

GET /:id — Get post details

PATCH /:id — Update post (Admin)

DELETE /:id — Delete post (Admin)

GET /trending — Trending posts

PATCH /:id/views — Increment view count

💬 Comments (/api/comments)

GET /:postId — Get all comments for a post

POST /:postId — Add comment

PATCH /:commentId — Edit comment

DELETE /:commentId — Delete comment

PATCH /:commentId/upVote — Upvote

PATCH /:commentId/downVote — Downvote

GET /flagged-comments — Get flagged comments (Admin)

PATCH /flag-comment/:commentId — Flag comment

PATCH /unflag-comment/:commentId — Unflag comment (Admin)

DELETE /flagged-comment/:commentId — Delete flagged comment (Admin)

📂 Categories (/api/categories)

POST / — Create category (Admin)

GET / — Get all categories

GET /:id — Get category details

PATCH /:id — Update category (Admin)

DELETE /:id — Delete category (Admin)

🔖 Bookmarks (/api/bookmarks)

POST /:postId — Bookmark post

DELETE /:postId — Remove bookmark

GET /user/:userId — User’s bookmarks

PATCH /:postId/like — Like post

PATCH /:postId/unlike — Unlike post

📊 Analytics (/api/analytics)

GET /posts/:postId — Post analytics

GET /trending — Trending analytics

GET /leaderboard — Leaderboard

PATCH /users/:userId/points — Update points (Admin)

🤖 AI Integration (/api/aiintegration)

GET /summarize/:postId — AI summarization

POST /moderate-comment — Moderate comment

GET /recommendations — Recommendations

GET /translate/:postId — Translate post
