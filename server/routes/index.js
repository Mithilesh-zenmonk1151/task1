const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("you are in the root route.");
});
router.use("/auth", require("./auth.route"));
router.use("/users" ,require("./profile.route"));
router.use("/book",require("./book.route"))
module.exports = router;
