import { asyncHandler } from "../util/asyncHandler.util.js";
import { apiResponse } from "../util/apiResponse.utils.js";
import { ApiError } from "../util/apiError.utils.js";
import { EMAIL_REGEX } from "../constants.js";
import { User } from "../modules/user.model.js";
import { uploadOnCloudinary } from "../util/cloudinary.util.js";
import fs from "fs";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImgLocalPath = req.files?.coverImage ? req.files.coverImage[0]?.path : null;
  if ([userName, fullName, email, password].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields",
      "Check userName,fullName,email and password fields"
    ]);
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const isAlreadyUserExist = await User.findOne({
    $or: [{ userName }, { email }]
  });
  if (isAlreadyUserExist) {
    fs.unlinkSync(avatarLocalPath);
    fs.unlinkSync(coverImgLocalPath);
    throw new ApiError(409, "User already exists");
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImgLocalPath);

  if (!avatar) {
    throw new ApiError(
      500,
      "Image upload failed due to an internal server error"
    );
  }

  const userRes = await User.create({
    fullName,
    email,
    password,
    avatar: avatar.url,
    userName: userName.toLowerCase(),
    coverImage: coverImage?.url || ""
  });
  if (!userRes) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  
  res.status(201).json(
    new apiResponse(
      200,
      {
        userName: userRes.userName,
        email: userRes.email,
        fullName: userRes.fullName,
        avatar: userRes.avatar,
        coverImage: userRes.coverImage
      },
      "User registered successfully"
    )
  );
});

export { registerUser };
