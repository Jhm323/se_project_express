const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const bcrypt = require("bcryptjs");

const app = express();
const { PORT = 3001 } = process.env;

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
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
