const router = require("express").Router();
const { userController } = require("../controllers");
router.post("/login", userController.Login);
router.post("/signup", userController.signup);
module.exports = router;
