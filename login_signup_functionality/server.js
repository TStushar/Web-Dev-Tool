const express = require("express");
const path = require("path");

const staticRouter = require("./router/staticRouter");
const userRouter = require("./router/user");

const { connectToTheDatabase } = require("./connection/connect");

// connecting frontend
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// to handle data from form
app.use(express.urlencoded({ extended: false }));

//connect with mongoDB database
connectToTheDatabase("mongodb://127.0.0.1:27017/WriteWave");

//router after hitting http://localhost:8000
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
