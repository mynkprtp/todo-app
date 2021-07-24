const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");

router.post("/googleLogin", usersController.googleLogin);

module.exports = router;
