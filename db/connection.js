const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = async () => {
   await mongoose.connect(process.env.MONGODB_URI);
   mongoose.connection.on("connection", () => {
   })
}

module.exports = db;

