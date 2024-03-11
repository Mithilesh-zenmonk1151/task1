const { bookModel } = require("../models");
const path = require("path");
exports.addNewBook = async ({bookName, ISBN,author, dateOfPublished, files, id,description }) => {
 
  try {
    
    const images = files?.map((i) => {
      return i.path;
    });

    const Book = await bookModel.create({
      bookName: bookName,
      ISBN:ISBN,
      
      user: id,
      author:author,
      dateOfPublished: dateOfPublished,
      description:description,
      images: images,
    });
    return { Book };
  } catch (error) {
    console.log(error);
    return error;
  }
};
exports.getBooks = async (payload) => {
  const { userId } = payload.params;
  console.log(userId);
  try {
    const books = await bookModel.find().sort({ createdAt: -1 });
    console.log('books: ', books);
    // console.log(posts);
    return books;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.updateBook = async (payload) => {
  const { id } = payload.params;
  const { bookName, ISBN,author,dateOfPublished,description } = payload.body;

  try {
    const updated = await bookModel.findByIdAndUpdate(
      id,
      { bookName, ISBN,author,dateOfPublished,description},
      { new: true }
    );
    console.log(updated);
    return updated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.deleteBooks = async (payload) => {
  const { id } = payload.params;
  try {
    const deleted = await bookModel.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
