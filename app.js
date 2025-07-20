const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
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

// Application routes
app.use(mainRouter);

// Disable X-Powered-By header for security (best practice)
app.disable("x-powered-by");

// 404 handler — catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler — catches errors from routes & middleware
app.use((err, req, res) => {
  // Default to 500 if no statusCode set on error
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  // Log the full error stack in dev environments
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(statusCode).json({ message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
