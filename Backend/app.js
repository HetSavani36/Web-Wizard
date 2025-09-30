import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv"

const app = express()
dotenv.config({
    path: './.env'
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import authRouter from "./routes/auth.route.js";
import analyticsRouter from "./routes/analytics.route.js";
import bookmarkRouter from "./routes/bookmark.route.js";
import categoryRouter from "./routes/category.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";
import aiIntegrationRouter from "./routes/aiIntegration.route.js";
import reportRouter from "./routes/report.route.js"

app.use("/auth",authRouter)
app.use("/analytics", analyticsRouter);
app.use("/bookmarks", bookmarkRouter);
app.use("/categories", categoryRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/reports", reportRouter);
app.use("/aiIntegrations", aiIntegrationRouter);


app.use("/",(req,res)=>{
    res.send("404: Page Not Found")
})

export { app }