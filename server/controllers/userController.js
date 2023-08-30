const User = require("../models/user");
const UserService = require("../services/userService");
const bcrypt = require("bcrypt");
const Joi = require("joi");

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns User will be able to sign up
 */
exports.signUp = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Validate request data using Joi schema
    const schema = Joi.object({
      fullName: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ fullName, username, email, password });
    if (error) {
      return res.status(400).json({
        statusCode: 0,
        message: "Validation error",
        data: null,
      });
    }

    // Check if the username or email is already taken
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({
        statusCode: 0,
        message: "Username or email already taken",
        data: null,
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      statusCode: 1,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 0,
      message: "Internal server error",
      data: null,
    });
  }
};

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns User will be able to sign in
 */
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request data using Joi schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        statusCode: 0,
        message: "Validation error",
        data: null,
      });
    }

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        statusCode: 0,
        message: "Invalid credentials",
        data: null,
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await UserService.ComparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        statusCode: 0,
        message: "Invalid password",
        data: null,
      });
    }

    // Generate and save a JWT token to the user's profile
    const accessToken = await UserService.GenerateAccessToken(user._id);
    user.accessToken = accessToken;
    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      statusCode: 1,
      message: "Signin successful",
      data: user,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 0,
      message: "Internal server error",
      data: null,
    });
  }
};

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns User will be able to sign out
 */
exports.signOut = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter

    // Retrieve the user from the database based on the provided userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Check if the authenticated user matches the user requesting sign-out
    if (req.user.id !== userId) {
      return res.status(401).json({
        statusCode: 0,
        message: "Access denied",
        data: null,
      });
    }

    // Clear the Access token and update user status on sign out
    user.isLoggedIn = false;
    user.accessToken = null;
    await user.save();

    return res.status(200).json({
      statusCode: 1,
      message: "Sign out successful",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 0,
      message: "Internal server error",
      data: null,
    });
  }
};

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns Get user details based on provided userId
 */
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter

    // Check if the authenticated user's ID matches the requested user's ID
    if (req.user.id !== userId) {
      return res.status(401).json({
        statusCode: 0,
        message: "Access denied",
        data: null,
      });
    }

    // Retrieve the user's complete details from the database and populate followers and following
    const userDetails = await User.findById(userId)
      .populate("followers", "fullName username")
      .populate("following", "fullName username");

    if (!userDetails) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Calculate the total count of followers and followed users
    const followersCount = userDetails.followers.length;
    const followedCount = userDetails.following.length;

    // Add the counts to the user details object
    const userDetailsWithCounts = {
      ...userDetails.toObject(),
      followersCount,
      followedCount,
    };

    return res.status(200).json({
      statusCode: 1,
      message: "User details retrieved successfully",
      data: userDetailsWithCounts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 0,
      message: "Internal server error",
      data: null,
    });
  }
};

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns Get details of the authenticated user
 */
exports.me = async (req, res) => {
  try {
    // Retrieve the user's complete details from the database and populate followers and following
    const userDetails = await User.findById(req.user.id)
      .select("-password")
      .populate("followers", "fullName username")
      .populate("following", "fullName username");

    if (!userDetails) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Calculate the total count of followers and followed users
    const followersCount = userDetails.followers.length;
    const followedCount = userDetails.following.length;

    // Add the counts to the user details object
    const userDetailsWithCounts = {
      ...userDetails.toObject(),
      followersCount,
      followedCount,
    };

    return res.status(200).json({
      statusCode: 1,
      message: "User details retrieved successfully",
      data: userDetailsWithCounts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 0,
      message: "Internal server error",
      data: null,
    });
  }
};

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns User will be able to follow another user
 */
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.body; // ID of the authenticated user
    const followUserId = req.params.followUserId; // ID of the user to be followed

    // Check if the authenticated user's ID matches the requested user's ID
    if (req.user.id !== userId) {
      return res.status(401).json({
        statusCode: 0,
        message: "Access denied",
        data: null,
      });
    }

    // Check if the authenticated user is trying to follow themselves
    if (userId === followUserId) {
      return res.status(400).json({
        statusCode: 0,
        message: "You cannot follow yourself",
        data: null,
      });
    }

    // Find the authenticated user and the user to be followed
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);

    if (!user || !followUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Check if the user is already following the target user
    if (user.following.includes(followUserId)) {
      return res.status(400).json({
        statusCode: 0,
        message: "You are already following this user",
        data: null,
      });
    }

    // Update the follower and following lists for both users
    user.following.push(followUserId);
    followUser.followers.push(userId);

    // Update follow counts
    user.followCount += 1;
    followUser.followedCount += 1;

    // Save changes to both users
    await user.save();
    await followUser.save();

    return res.status(200).json({
      statusCode: 1,
      message: "User followed successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 0,
      message: "Internal server error",
      data: null,
    });
  }
};

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns User will be able to unfollow another user
 */
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.body; // ID of the authenticated user
    const unfollowUserId = req.params.unfollowUserId; // ID of the user to be unfollowed

    // Check if the authenticated user's ID matches the requested user's ID
    if (req.user.id !== userId) {
      return res.status(401).json({
        statusCode: 0,
        message: "Access denied",
        data: null,
      });
    }

    // Find the authenticated user and the user to be unfollowed
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowUserId);

    if (!user || !unfollowUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Check if the user is currently following the target user
    if (!user.following.includes(unfollowUserId)) {
      return res.status(400).json({
        statusCode: 0,
        message: "You are not following this user",
        data: null,
      });
    }

    // Remove the target user from the follower and following lists
    user.following = user.following.filter(
      (id) => id.toString() !== unfollowUserId
    );
    unfollowUser.followers = unfollowUser.followers.filter(
      (id) => id.toString() !== userId
    );

    // Update follow counts
    user.followCount -= 1;
    unfollowUser.followedCount -= 1;

    // Save changes to both users
    await user.save();
    await unfollowUser.save();

    return res.status(200).json({
      statusCode: 1,
      message: "User unfollowed successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 0,
      message: "Internal server error",
      data: null,
    });
  }
};
