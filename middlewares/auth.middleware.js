import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    // Check if token exists in header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Authentication required. Please log in.");
      error.statusCode = 401;
      throw error;
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    if (!token) {
      const error = new Error("Invalid token format");
      error.statusCode = 401;
      throw error;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user with the ID from token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    // Add user to request object
    req.user = user;

    // If the requested user ID doesn't match the authenticated user ID
    // Only allow access to own profile unless implementing admin role
    if (req.params.id && req.params.id !== user._id.toString()) {
      const error = new Error(
        "Access denied. You can only view your own profile."
      );
      error.statusCode = 403;
      throw error;
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
      error.statusCode = 401;
    }

    if (error.name === "TokenExpiredError") {
      error.message = "Token expired";
      error.statusCode = 401;
    }

    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

export default authorize;
