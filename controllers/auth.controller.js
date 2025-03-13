import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required", {
        statusCode: 400,
      });
    }

    if (!validateEmail(email)) {
      throw new Error("Invalid email format", { statusCode: 400 });
    }

    if (!validatePassword(password)) {
      throw new Error(
        "Password must be at least 8 characters with uppercase, lowercase, and number",
        { statusCode: 400 }
      );
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User already exists", { statusCode: 409 });
    }

    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      { name, email, password: hashedPassword },
      { session }
    );

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required", { statusCode: 400 });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid email or password", { statusCode: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password", { statusCode: 401 });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const signout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sign out successful",
  });
};

export { signin, signup, signout };
