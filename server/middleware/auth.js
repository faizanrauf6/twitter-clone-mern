// Import the important packages
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Import the modules
const User = require("../models/user");

// Define the auth function
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        statusCode: 0,
        message: "JWT token missing",
        data: null,
      });
    }

    token = token.split(" ")[1];
    let decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    const foundUser = await User.findById(decodedToken.id);
    if (!foundUser) {
      return res.status(404).json({
        statusCode: 0,
        message: "User not found",
        data: null,
      });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 0,
      message: "JWT authentication issue",
      data: null,
    });
  }
};

module.exports = auth;
