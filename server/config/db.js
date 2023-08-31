const mongoose = require("mongoose");
const config = require("../config/config");
mongoose.set("strictQuery", true);

// Creating connection with MongoDB
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });
