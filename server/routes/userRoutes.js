const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe, changePassword, changeName } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);
router.put("/change-name", protect, changeName);         

module.exports = router;
