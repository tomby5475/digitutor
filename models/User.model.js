const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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

const User = model("User", userSchema);

module.exports = User;



