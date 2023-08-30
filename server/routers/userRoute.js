const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/signout/:userId", auth, userController.signOut);
router.get("/getUserDetails/:userId", auth, userController.getUserDetails);
router.get("/me", auth, userController.me);
router.post("/follow/:followUserId", auth, userController.followUser);
router.post("/unfollow/:unfollowUserId", auth, userController.followUser);

module.exports = router;
