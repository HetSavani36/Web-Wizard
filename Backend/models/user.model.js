import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    password:{
      type:String,
      select:false
    },
    role:{
      type:String,
      enum:["admin","customer"],
      default: "customer"
    },
    avatar: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "", 
    },
  },
  { timestamps: true }
);

userSchema.pre('save',async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const saltRounds = Number(process.env.HASH_SALT_ROUNDS) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);

    next();
  } catch (err) {
    next(err);
  }
})

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      name: this.name
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


userSchema.methods.isPasswordCorrect=async function (password) {
  return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User", userSchema);
