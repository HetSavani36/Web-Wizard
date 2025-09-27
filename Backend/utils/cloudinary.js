import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import streamifier from 'streamifier'
import dotenv  from "dotenv";

dotenv.config({path:'./.env'})

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const ext = originalName.split(".").pop();
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "documents",
        public_id: `doc_${Date.now()}`,
        access_mode: "public", // ✅ make public
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};



function getPublicIdFromUrl(url) {
  // Example: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/folder/filename.jpg
  const parts = url.split("/");
  const fileWithExt = parts.pop(); // filename.jpg
  const publicId = parts.slice(parts.indexOf("upload") + 1).join("/") + "/" + fileWithExt;
  return publicId.replace(/\.[^/.]+$/, ""); // remove extension
}


const deleteImageByUrl = async (url) => {
  const publicId = getPublicIdFromUrl(url);
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result); // { result: 'ok' } if deleted
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};

export {uploadOnCloudinary,deleteImageByUrl}