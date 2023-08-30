require('dotenv').config();

// exporting the environment variables
module.exports = {
  PORT: process.env.PORT || 4949,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'default_secret_key',
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret_key',
};
