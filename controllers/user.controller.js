import User from "../models/user.model.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (e) {
    next(e);
  }
};

export { getUser, getUsers };
