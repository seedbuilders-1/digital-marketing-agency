const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const userController = require("../controllers/userControllers");
const { authorizeRoles } = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");

router.get("/", auth, authorizeRoles('admin'), userController.getAllusers);
router.post(
  "/profile/:id",
  auth,
  upload.fields([
    { name: "profile-pic", maxCount: 1 },
    { name: "IDs", maxCount: 5 },
  ]),
  userController.profile
);
router.get("/:id", auth, userController.getuserById);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
