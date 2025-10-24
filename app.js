require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./error");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // max 100 requests per IP per window
  standardHeaders: "draft-8", // RateLimit headers per draft spec
  legacyHeaders: false, // disable old X-RateLimit-* headers
  ipv6Subnet: 56,
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("DB error", e));

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(helmet());

// Request Logger
app.use(requestLogger);

// Handle uncaught exceptions so PM2 can restart
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit so PM2 restarts the process
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit so PM2 restarts the process
});

// Server crash testing route
app.get("/crash-test", (req, res) => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// App Routes

app.use("/", mainRouter);

// Error Logger
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Disable X-Powered-By header for security (best practice)
app.disable("x-powered-by");

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
