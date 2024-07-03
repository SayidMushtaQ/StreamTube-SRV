import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true,
      index:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true
    },
    fullName: {
      type: String,
      required: true,
      trim:true
    },
    avatar: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: [true,'Password is required'],
      minlength: 6
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    refreshToken:String
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
