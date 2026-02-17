const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists."],
    match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password must be at least 6 characters long."],
  },
});
