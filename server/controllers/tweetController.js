const Joi = require("joi");
const Tweet = require("../models/tweet");
const User = require("../models/user"); // Assuming you have a User model

/**
 * @param {*} req request data
 * @param {*} res for sending response
 * @returns User will be able to create a tweet
 */
exports.createTweet = async (req, res) => {
  try {
    const { id } = req.user;
    const { content, image } = req.body;

    // Check if the authenticated user exists in the database
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Validate request data using Joi schema
    const schema = Joi.object({
      content: Joi.string().required(),
      image: Joi.string().allow(null),
    });

    const { error } = schema.validate({ content, image });
    if (error) {
      return res.status(400).json({
        statusCode: 0,
        message: "Validation error",
        data: null,
      });
    }

    const newTweet = new Tweet({
      user: existingUser._id,
      content,
      image,
    });

    await newTweet.save();

    return res.status(201).json({
      statusCode: 1,
      message: "Tweet created successfully",
      data: newTweet,
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
 * @returns User will be able to update a tweet
 */
exports.updateTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const { id } = req.user;
    const { content, image } = req.body;

    // Check if the authenticated user exists in the database
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Validate request data using Joi schema
    const schema = Joi.object({
      content: Joi.string().required(),
      image: Joi.string().allow(""),
    });

    const { error } = schema.validate({ content, image });
    if (error) {
      return res.status(400).json({
        statusCode: 0,
        message: "Validation error",
        data: null,
      });
    }

    // Find the tweet and check if the authenticated user is the owner
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        statusCode: 0,
        message: "Tweet not found",
        data: null,
      });
    }

    if (tweet.user.toString() !== existingUser._id.toString()) {
      return res.status(403).json({
        statusCode: 0,
        message: "Access denied",
        data: null,
      });
    }

    // Update the tweet
    tweet.content = content;
    tweet.image = image;
    await tweet.save();

    return res.status(200).json({
      statusCode: 1,
      message: "Tweet updated successfully",
      data: tweet,
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
 * @returns User will be able to get all tweets
 */
exports.getAllTweets = async (req, res) => {
  try {
    const { id } = req.user;

    // Check if the authenticated user exists in the database
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Retrieve all tweets from the database
    const tweets = await Tweet.find()
      .populate("user", "fullName username verified slug followers following")
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    const tweetsWithCounts = tweets.map((tweet) => {
      const likeCount = tweet.likes.length;
      const dislikeCount = tweet.dislikes.length;
      return {
        _id: tweet._id,
        user: tweet.user,
        content: tweet.content,
        image: tweet.image,
        likes: tweet.likes,
        dislikes: tweet.dislikes,
        likeCount,
        dislikeCount,
        createdAt: tweet.createdAt,
        updatedAt: tweet.updatedAt,
      };
    });

    return res.status(200).json({
      statusCode: 1,
      message: "Tweets retrieved successfully",
      data: tweetsWithCounts,
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
 * @returns User will be able to get all tweets of a single user
 */
exports.getAllTweetsByUser = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check if the user to retrieve tweets for exists in the database
    const requestedUser = await User.findOne({ slug });
    if (!requestedUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "Requested user not found",
        data: null,
      });
    }

    // Retrieve all tweets of the specified user from the database
    const tweets = await Tweet.find({ user: requestedUser._id })
      .populate("user", "fullName username verified slug")
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    const tweetsWithCounts = tweets.map((tweet) => {
      const likeCount = tweet.likes.length;
      const dislikeCount = tweet.dislikes.length;
      return {
        _id: tweet._id,
        user: tweet.user,
        content: tweet.content,
        image: tweet.image,
        likes: tweet.likes,
        dislikes: tweet.dislikes,
        likeCount,
        dislikeCount,
        createdAt: tweet.createdAt,
        updatedAt: tweet.updatedAt,
      };
    });

    return res.status(200).json({
      statusCode: 1,
      message: "User tweets retrieved successfully",
      data: tweetsWithCounts,
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
 * @returns User will be able to get all their liked tweets
 */
exports.getLikedTweetsByUser = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check if the user to retrieve tweets for exists in the database
    const requestedUser = await User.findOne({ slug });
    if (!requestedUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "Requested user not found",
        data: null,
      });
    }

    // Retrieve all tweets that the user has liked from the database
    const likedTweets = await Tweet.find({ likes: requestedUser._id })
      .populate("user", "fullName username verified slug")
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    const tweetsWithCounts = likedTweets.map((tweet) => {
      const likeCount = tweet.likes.length;
      const dislikeCount = tweet.dislikes.length;
      return {
        _id: tweet._id,
        user: tweet.user,
        content: tweet.content,
        image: tweet.image,
        likes: tweet.likes,
        dislikes: tweet.dislikes,
        likeCount,
        dislikeCount,
        createdAt: tweet.createdAt,
        updatedAt: tweet.updatedAt,
      };
    });

    return res.status(200).json({
      statusCode: 1,
      message: "User's liked tweets retrieved successfully",
      data: tweetsWithCounts,
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
 * @returns User will be able to delete a tweet
 */
exports.deleteTweetByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { tweetId } = req.params;

    // Check if the user exists in the database
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Find the tweet to be deleted and ensure it belongs to the specified user
    const tweetToDelete = await Tweet.findByIdAndDelete(tweetId);
    if (!tweetToDelete) {
      return res.status(404).json({
        statusCode: 0,
        message: "Tweet not found",
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 1,
      message: "Tweet deleted successfully",
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
 * @returns User will be able to like a tweet
 */
exports.likeTweetByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { tweetId } = req.params;

    // Check if the user exists in the database
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Find the tweet to be liked
    const tweetToLike = await Tweet.findById(tweetId);
    if (!tweetToLike) {
      return res.status(404).json({
        statusCode: 0,
        message: "Tweet not found",
        data: null,
      });
    }

    // Check if the user has already liked the tweet
    if (tweetToLike.likes.includes(existingUser._id)) {
      return res.status(400).json({
        statusCode: 0,
        message: "You have already liked this tweet",
        data: null,
      });
    }

    // Add the user's ID to the list of likes
    tweetToLike.likes.push(existingUser._id);
    await tweetToLike.save();

    return res.status(200).json({
      statusCode: 1,
      message: "Tweet liked successfully",
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
 * @returns User will be able to dislike a tweet
 */
exports.dislikeTweetByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { tweetId } = req.params;

    // Check if the user exists in the database
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    // Find the tweet to be disliked
    const tweetToDislike = await Tweet.findById(tweetId);
    if (!tweetToDislike) {
      return res.status(404).json({
        statusCode: 0,
        message: "Tweet not found",
        data: null,
      });
    }

    // Check if the user has already disliked the tweet
    // if (tweetToDislike.dislikes.includes(existingUser._id)) {
    //   return res.status(400).json({
    //     statusCode: 0,
    //     message: "You have already disliked this tweet",
    //     data: null,
    //   });
    // }

    // Add the user's ID to the list of dislikes
    tweetToDislike.dislikes.push(existingUser._id);
    // Remove the user's ID from the list of likes (if present)
    tweetToDislike.likes = tweetToDislike.likes.filter(
      (id) => id.toString() !== existingUser._id.toString()
    );

    await tweetToDislike.save();

    return res.status(200).json({
      statusCode: 1,
      message: "Tweet disliked successfully",
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
