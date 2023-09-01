const express = require('express');
const router = express.Router(); //creating the instance of this class
const Task = require('../MODELS/Tasks')
const auth = require('../MIDDLEWARES/auth');
router.get('/', auth , (req,res) => {
    res.json({message:'welcome to task route page', user:req.user})
})

//create task
router.post('/createtask',auth, async(req,res) => {
    try{
        //description
        const task = new Task({
            ...req.body,
            owner:req.user._id
        });
        await task.save();
        res.status(201).json({task,message:"task created succesfully"})
    }
    catch(err)
    {
        res.status(400).send({error:err});
    }
})
//read task


//update task

//delete


module.exports = router;