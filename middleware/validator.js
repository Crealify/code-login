const {check} = require("express-validator")

exports.userValidator = [
    check("name").isLength({min:3}).withMessage("Name should be greater than three letters."),
    check("email").isEmail(),
    check("password").isLength({min:8}).withMessage("Password must be 8 letters or more"),
];