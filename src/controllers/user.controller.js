import { asyncHandler } from "../util/asyncHandler.util.js";
import { apiResponse } from "../util/apiResponse.utils.js";
import { ApiError } from "../util/apiError.utils.js";
import { EMAIL_REGEX } from "../constants.js";
import { User } from "../modules/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  if (
    [userName, fullName, email, password].some(field => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields",
      "Check userName,fullName,email and password fields"
    ]);
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const isAlreadyUserExist = await User.find({
    $or: [{ userName }, { email }]
  });
  
  if(isAlreadyUserExist){
    throw new ApiError(409,'User already exists')
  }

  res
    .status(200)
    .json(new apiResponse(200, { Ok: "Ok" }, "Data retrieved successfully"));
});

export { registerUser };
