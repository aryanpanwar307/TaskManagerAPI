const express = require('express');
const router = express.Router(); //creating the instance of this class

router.get('/',(req,res) => {
    res.json({message:'welcome to task route page'})
})

//create task

//read task


//update task

//delete


module.exports = router;