const {userValidator} = require("../middleware/validator");
const express = require("express");
const router = express.Router();
const {createUser, login} = require("../controller/user");

router.post("/users/signup", userValidator, createUser);
router.post("/users/login", login);


module.exports = router;