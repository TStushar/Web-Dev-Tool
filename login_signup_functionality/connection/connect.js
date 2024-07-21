const mongoose = require("mongoose");

function connectToTheDatabase(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("conected with database");
    })
    .catch((err) => {
      console.log("error while connecting with database ", err);
    });
}

module.exports = { connectToTheDatabase };
