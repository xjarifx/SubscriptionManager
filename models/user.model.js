import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      minLength: 2,
      maxLength: 16,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "non valid email address"],
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;