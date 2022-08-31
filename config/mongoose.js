const mongoose = require("mongoose");


mongoose.connect(
  "mongodb+srv://Ajay:ajay973@cluster0.oc8ndd4.mongodb.net/firstserver?retryWrites=true&w=majority"
);
//   connect mongo DataBase
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to DB");
});
//export
module.exports = db;
