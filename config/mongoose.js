const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/auth_db");
//   connect mongo DataBase
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to DB");
});
//export
module.exports = db;
