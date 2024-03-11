const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const user = require("./user.model");
const bookSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: user,
    },
    bookName: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    
  author:{
    type:String,
    required:true,
  },
  dateOfPublish:{
    type:Date

  },
  images:{
    type:Array

  },
  description:{
    type:String

  }
  },
  {timestamps:true}
 
);
module.exports = mongoose.model("books", bookSchema);