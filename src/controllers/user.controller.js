import { asyncHandler } from "../util/asyncHandler.util.js";
import {apiResponse} from '../util/apiResponse.utils.js';

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new apiResponse(200,{Ok:'Ok'},'Data retrieved successfully')
  )
});


export {registerUser};
