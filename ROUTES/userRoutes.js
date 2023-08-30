const express = require('express');
const User = require('../MODELS/Users');
const router = express.Router(); //creating the instance of this class
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//test api
router.get('/',(req,res) => {
    res.json({message:'welcome to user route page'})
})

//register a user
router.post('/register', async(req,res) => {
    const { name ,email ,password } = req.body;
    try{
        const user = new User({name,email,password});
        await user.save();
        res.status(201).send({user,message:"user created successfully"})
    }
    catch(err)
    {
        res.status(200).send({error:err})
    }
})
//login a user
router.post('/login', async(req,res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email})

        if(!user)
        {
            throw new Error('unable to login , invalid credentials');
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            throw new Error('unable to login , invalid credentials');
        }
        //now if everything is coreect we generate token
        const token = jwt.sign({ _id:user._id.toString() },process.env.JWT_SECRET_KEY);

        res.send({user,token,message:"user logged in successfully"})
    }
    catch(err)
    {
        res.status(200).send({error:err})
    }
})

//export to index.js
module.exports = router;