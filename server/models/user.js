const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
      default: null,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      default: "",
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    photoURL: String,
    verified: {
      type: Boolean,
      default: false,
    },
    followCount: {
      type: Number,
      default: 0,
    },
    followedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
