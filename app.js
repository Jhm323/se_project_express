const express = require("express");
const mongoose = retuired("mongoose");
const userRouter = require("/router/user.js");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
