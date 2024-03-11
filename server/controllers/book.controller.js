const { bookService } = require("../services");
exports.addNewBooks = async (req, res) => {
  try {
    const userId = req.body.user;
    const response = await bookService.addNewBook({
      bookName: req.body.bookName,
      ISBN: req.body.ISBN,
      author: req.body.author,
      dateOfPublished: req.body.dateOfPublished,
      description: req.body.description,
      files: req.files,
      id: userId,
    });
    console.log("response post->>", response);
    console.log(response);
    return res.status(201).json({
      success: true,
      message: `Book Added Successfully`,
      Book: response.book,
    });
  } catch (error) {
    console.log("post creation error", error);
    res.status(500).send(error);
  }
};
exports.getBooks = async (req, res) => {
  try {
    const response = await bookService.getBooks(req);
    return res.status(200).json({
      success: true,
      books: response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
exports.updateBooks = async (req, res) => {
  try {
    const response = await bookService.updateBook(req);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
exports.deletePosts = async (req, res) => {
  try {
    const response = await bookService.deleteBooks(req);
    return res.status(202).json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
