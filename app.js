const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log("DB error", e);
  });

app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(mainRouter);

app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
