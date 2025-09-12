const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  img:{
    type:String,
    default:""
  },
  email: {
    type: String,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phoneNumber: { type: String },
  password: { type: String},
  role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
},{ timestamps: true});

module.exports = mongoose.model("User", userSchema);
