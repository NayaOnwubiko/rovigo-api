import User from "../models/users.model.js";
import createError from "../utils/createError.js";

// Delete User
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return createError(403, "You can only delete your account");
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(200).send("Successfully deleted");
};

// Get User
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
