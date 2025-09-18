const mongoose = require("mongoose");

const FeedModel = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  },
  filePath: { type: String },     
  fileType: { type: String, enum: ["image", "video", "text"] },
  fileDescription: {type:String},
  
}, { timestamps: true });

module.exports = mongoose.model("FeedModel", FeedModel);
