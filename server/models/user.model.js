const mongoose = require("mongoose")
// const books= require("./books.model")
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
     
      trim: true,
    },
    lastName: {
      type: String,
     
      trim: true,
    },
    email: {
      type: String,
     
      trim: true,
    },
    instituteName:{
        type:String
    },
    address:{
        type:String

    },

    password: {
      type: String,
    
    },
    accountType: {
      type: String,
      enum: ["Librarian", "Student"],
      
    },
    active: {
      type: Boolean,
      default: true,
    },
   
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
     
      ref: "user",
    },
    phone:{
        type:Number

    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },
    bookBorrow: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],

  },
  { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)
