const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Generate the jwt token
exports.GenerateAccessToken = async (id) => {
  return jwt.sign({ id }, config.ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
};

// Generate refresh token
exports.GenerateRefreshToken = async (email) => {
  return jwt.sign({ email }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: '365d',
  });
};

// Define the comparePassword method
exports.ComparePassword = async (candidatePassword, userPassword) => {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, userPassword);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};
