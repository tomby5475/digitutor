const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    imageUrl: String,
    role: String,
    username: String,
    email: String,
    password: String,
    discipline: String,
    phone: Number,
    addinfo: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
