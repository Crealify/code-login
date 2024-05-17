const express = require("express")
const User = require("../models/user");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "kitwosd@123";

exports.createUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
        
        if (password.length < 8){
            return res.status(400).json({message:"Password must be of 8 character"})
        }
        if(name.length < 3 ){
            return res.status(400).json({
                message:"Name must be greater than 3 character"
            })
        }

        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                error: "Sorry a user with this email already exist"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        user = await User.create({
            name: name,
            email : email,
            password : secPass,
        });

        const data ={
            user:{
                id : user.id,
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        res.json({
            success: true,
            authToken
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")
    }
};

exports.login = async (req,res )=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {email , password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                error:"Please try to login with correct credentials"
            });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({
                success: false,
                error:"Please try to login with correct credentials ",
            });
        }

        const data = {
            user :{
                id : user.id,
            },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success: true, 
            authToken
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error occured");
    }
}

