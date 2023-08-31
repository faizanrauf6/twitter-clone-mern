const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const auth = require("../middleware/auth");

// Create a new tweet
router.post("/add", auth, tweetController.createTweet);
router.put("/edit/:tweetId", auth, tweetController.updateTweet);
router.get("/all", auth, tweetController.getAllTweets);
router.get("/:slug", auth, tweetController.getAllTweetsByUser);
router.get("/liked/:slug", auth, tweetController.getLikedTweetsByUser);
router.delete("/delete/me/:tweetId", auth, tweetController.deleteTweetByUser);
router.post("/like/me/:tweetId", auth, tweetController.likeTweetByUser);
router.post("/dislike/me/:tweetId", auth, tweetController.dislikeTweetByUser);

module.exports = router;
