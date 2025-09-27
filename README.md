Blogesh - AI-Powered Blogging Platform

Blogesh is a modern, AI-driven blogging platform that combines seamless reading, powerful analytics, and cutting-edge AI features.
Built with Next.js for the frontend and Node.js + Express + MongoDB for the backend, Blogesh provides creators and readers with a rich, engaging experience.

🌟 Features Overview
Frontend (Next.js)

⚡ Fast, SEO-friendly blogs using Next.js App Router

🌓 Dark & Light Mode with next-themes

🎨 Modern UI/UX with smooth animations using Framer Motion

🔍 Advanced Search & Filters including voice search

🖼️ Dynamic post rendering with HTML and Markdown support

📚 Personalized recommendations powered by AI

💾 Bookmark blogs and save for later

💬 Real-time comments with voting and spam detection

🏆 Gamification system with badges and leaderboards

🌍 Multi-language support for global reach

🧾 Clean reading mode for distraction-free blog reading

Backend (Node.js + Express + MongoDB)

🔑 Authentication System

Google OAuth 2.0

JWT-based authentication

Role-based access (Admin, Author, Reader)

✍️ Post Management

Drafts, scheduled publishing

Cloudinary for image uploads

Category and tag management

📊 Analytics Dashboard

Post performance tracking

Trending posts

User points and engagement tracking

🤖 AI Features

AI-powered post summarization

Comment toxicity moderation

Personalized recommendations

Auto translation of posts

🗂️ Scalable REST APIs with Swagger documentation

🖼 Screenshots

Here are some UI previews of Blogesh:

Feature	Screenshot
Landing Page	

Blog Listing Page	

Single Blog Post	

AI Summarization	

Admin Dashboard	

Analytics Section	

Mobile View	

Note: Replace these placeholders with actual screenshots in a /screenshots folder for final submission.

🗂 Folder Structure
Frontend/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   └── blog/
│       ├── page.jsx         # Blog listing page
│       └── [id].jsx         # Single blog page
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── blog/
│   │   ├── BlogCard.jsx
│   │   └── BlogList.jsx
│   └── ui/
│       ├── Button.jsx
│       └── Loader.jsx
├── public/
└── styles/
    ├── globals.css
    └── tailwind.css


Backend
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
├── public/
│   └── temp/
├── .env
├── app.js
├── index.js
└── package.json

📡 API Endpoints
🔐 Authentication
| Method | Endpoint             | Description        | Auth |
| ------ | -------------------- | ------------------ | ---- |
| GET    | `/api/auth/google`   | Google OAuth login | ❌   |
| POST   | `/api/auth/register` | Register new user  | ❌   |
| POST   | `/api/auth/login`    | Login user         | ❌   |
| GET    | `/api/auth/me`       | Get current user   | ✅   |
| POST   | `/api/auth/logout`   | Logout user        | ✅   |

📝 Posts
Posts| Method | Endpoint              | Description     | Auth   |
| ------ | --------------------- | --------------- | ------- |
| GET    | `/api/posts`          | Get all posts   | ❌       |
| POST   | `/api/posts`          | Create new post | ✅ Admin |
| GET    | `/api/posts/:id`      | Get single post | ❌       |
| PATCH  | `/api/posts/:id`      | Update post     | ✅ Admin |
| DELETE | `/api/posts/:id`      | Delete post     | ✅ Admin |
| GET    | `/api/posts/trending` | Trending posts  | ❌       |

AI Integration
Method	Endpoint	Description	Auth
GET	/api/aiintegration/summarize/:postId	AI summarize blog	❌
POST	/api/aiintegration/moderate-comment	AI comment moderation	✅
GET	/api/aiintegration/recommendations	Personalized feed	✅
GET	/api/aiintegration/translate/:postId	Translate post	❌
⚙️ Tech Stack
Frontend

Next.js 14

Tailwind CSS

Framer Motion

Next Themes

Backend

Node.js

Express.js

MongoDB
 + Mongoose

Cloudinary

Passport.js

Swagger

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/yourusername/blogesh.git
cd blogesh

2. Backend Setup
cd Backend
npm install


Create a .env file:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogesh
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_URL=your_cloudinary_url


Run the backend:

npm run dev

3. Frontend Setup
cd ../Frontend
npm install
npm run dev


Frontend URL: http://localhost:3000
Backend URL: http://localhost:5000

📝 Future Roadmap

 Mobile app with React Native

 Real-time notifications using WebSockets

 Subscription-based premium blogs

 AI-powered blog writing tool

 Built-in content editor with AI assistance

🤝 Contribution Guidelines

Fork the repository

Create a new branch:

git checkout -b feature/amazing-feature


Commit your changes:

git commit -m "Add amazing feature"


Push your branch:

git push origin feature/amazing-feature


Open a Pull Request 🚀

📜 License

Blogesh is licensed under the MIT License.
Feel free to use and modify for personal or commercial use.
