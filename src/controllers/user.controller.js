import { asyncHandler } from "../util/asyncHandler.util.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ ok: "Ok" });
});


export {registerUser};
