const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
// Post
router.post("/register", authController.userRegisterController);

// Post
router.post("/login", authController.userLoginController);

module.exports = router;
