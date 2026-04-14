const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/users/login", authController.getLogin);
router.get("/users/signup", authController.getSignup);
router.post("/users/login", authController.postLogin);
router.post("/users/signup", authController.postSignup);
router.post("/users/logout", authController.postLogout);

module.exports = router;
