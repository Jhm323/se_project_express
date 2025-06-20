const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
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
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// mongoose.connect(
//   "mongodb://127.0.0.1:27017/wtwr_db",
//   (r) => {
//     console.log("Connected to DB");
//   },
//   (e) => console.log("DB error", e)
// );
// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("MongoDB connection error:", err);
// });
