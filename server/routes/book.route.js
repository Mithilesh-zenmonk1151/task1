const router = require("express").Router();
const { booksController } = require("../controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/upload.middleware");

// const { auth } = authMiddleware;
router.post("/", upload.array('images',4), booksController.addNewBooks);
router.get("/", booksController.getBooks);
router.put("/:bookId", booksController.updateBooks);
router.delete("/:bookId", booksController.deletePosts);
module.exports = router;
