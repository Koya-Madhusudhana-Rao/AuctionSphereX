const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim : true,
    },
    password: {
      type: String,
      required: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
      type: String,
      default: "user",
    },
    panSsnNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
