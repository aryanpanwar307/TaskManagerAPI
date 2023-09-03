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
//read/get task
router.get('/',auth, async(req,res)=>{
    try{
        const task = await Task.find({
            owner : req.user._id
        })
        res.send(200).json({task,message:"got the task successfully"})
    }
    catch(err)
    {
        res.status(500).send({error:err});
    }
})

//update task

//delete


module.exports = router;