const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
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
      select: false, // Exclude password from query results by default
      minlength: [6, "Password must be at least 6 characters long."],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (ext) {
  if (!this.isModified("password")) {
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password);
    this.password = hashedPassword;
    return;
  } catch (err) {
    console.log(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
