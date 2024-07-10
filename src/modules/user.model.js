import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      required: true
    },
    coverImage: {
      type: String
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    refreshToken: String
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

//User custom - Methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function(){
  const token = jwt.sign(
    {
      id:this._id,
      email:this.email,
      userName:this.userName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  );
  return token;
}
userSchema.methods.generateRefreshToken = function(){
  const token = jwt.sign(
    {
      id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  );
  return token;
}


export const User = mongoose.model("User", userSchema);
