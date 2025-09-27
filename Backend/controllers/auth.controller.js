import passport from "../utils/passport.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Token generation failed: " + error.message);
  }
};


// Step 1: Redirect to Google
const authenticateController = passport.authenticate("google", {
  scope: ["profile", "email"],
});


// Step 2: Handle Google callback
const callbackController = (req, res, next) => {
    passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) {
      console.log("Google login error:", err);
      return res.redirect("/?error=login_failed");
    }

    try {
      const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user);

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      };

      res.cookie("refreshToken", refreshToken, options);
      res.cookie("accessToken", accessToken, options);

      res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
      
    } catch (e) {
      console.error("Token creation error:", e);
      res.redirect("/?error=token_failed");
    }
  })(req, res, next);
};

// Step 3: Refresh Token
const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    const options={
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    }
    res.cookie("refreshToken", newRefreshToken,options);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Refresh token expired/invalid" });
  }
};

const logout=(req,res)=>{
    const options={
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    }
    res.clearCookie("accessToken",options);
    res.clearCookie("refreshToken", options);
    res.status(200).json({ message: "Cookies cleared" });
}

const meController = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ user: req.user });
};


const userRegisterUsingEmail=asyncHandler(async(req,res)=>{
  const {username,email,password}=req.body
  
  if(!username || !email || !password) throw new ApiError(403,"provide all fields")
  let user=await User.create({
    name:username,
    email:email,
    password:password
  })
  if(!user) throw new ApiError(500,"user creation failed")

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user)

  const options={
    httpOnly:true,
    secure:true
  }

  user=await User.findById(user._id).select("-password -googleId -role -avatar")

  return res
    .status(201)
    .cookie(accessToken,"accessToken",options)
    .cookie(refreshToken,"refreshToken",options)
    .json(
      new ApiResponse(201,user,"user registered successfully")
    )
})


const loginUsingEmail=asyncHandler(async(req,res)=>{
  const {username,email,password}=req.body
  
  if(!username && !email) throw new ApiError(403,"provide username or email")
  if(!password) throw new ApiError(403,"provide password")
  
  let user=await User.findOne({
    $or:[
      {name:username},
      {email:email}
    ]
  }).select("+password")
  if(!user) throw new ApiError(500,"user not found,please register")
  
  const isCorrect=await user.isPasswordCorrect(password)
  if(!isCorrect) throw new ApiError(403,"incorrect password")

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user)

  const options={
    httpOnly:true,
    secure:true
  }

  user=await User.findById(user._id).select("-googleId -role -avatar")

  return res
    .status(200)
    .cookie(accessToken,"accessToken",options)
    .cookie(refreshToken,"refreshToken",options)
    .json(
      new ApiResponse(200,user,"user logged in successfully")
    )
})


const adminRegisterUsingEmail=asyncHandler(async(req,res)=>{
  const {username,email,password}=req.body
  
  if(!username || !email || !password) throw new ApiError(403,"provide all fields")
  let user=await User.create({
    name:username,
    email:email,
    password:password,
    role:"admin"
  })
  if(!user) throw new ApiError(500,"user creation failed")

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user)

  const options={
    httpOnly:true,
    secure:true
  }

  user=await User.findById(user._id).select("-password -googleId -role -avatar")

  return res
    .status(201)
    .cookie(accessToken,"accessToken",options)
    .cookie(refreshToken,"refreshToken",options)
    .json(
      new ApiResponse(201,user,"user registered successfully")
    )
})


export { 
  authenticateController,
  callbackController, 
  refreshController,
  logout, 
  meController,
  userRegisterUsingEmail,
  loginUsingEmail,
  adminRegisterUsingEmail
};