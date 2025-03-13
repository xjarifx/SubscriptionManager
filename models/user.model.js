import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "user name required"],
      minLength: 2,
      maxLength: 16,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Email required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "non valid email address"],
    },
    password: {
      type: String,
      require: [true, "password required"],
      minLength: 8,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
