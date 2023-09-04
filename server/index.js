const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require("./config/config");
const PORT = config.PORT;
require("./config/db");
require("dotenv").config();

app.use(cookieParser());
// Allow requests from the specific URL
const allowedOrigins = [
  "http://localhost:5173",
  "https://twitter-clone-frontend-xi.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify HTTP methods allowed
  credentials: true, // Allow credentials (e.g., cookies)
  optionsSuccessStatus: 204, // Set the response status code for preflight requests
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization", // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routers
const userRouter = require("./routers/userRoute");
const tweetRouter = require("./routers/tweetRoute");

app.use("/api/users", userRouter);
app.use("/api/tweets", tweetRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Twitter clone backend!");
});

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    statusCode: 0,
    message: `API endpoint doesn't exist`,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
