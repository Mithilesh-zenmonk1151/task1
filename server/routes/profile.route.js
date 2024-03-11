const router = require("express").Router();
const { updateUserProfileController } = require("../controllers");
router.get("/:id", updateUserProfileController.getUser);
router.get("/", updateUserProfileController.allUser);

router.put("/:id", updateUserProfileController.updateUserProfile);
router.post("/",updateUserProfileController.addNewUser)
module.exports = router;
