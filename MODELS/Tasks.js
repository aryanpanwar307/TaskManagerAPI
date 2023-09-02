const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const taskSchema = new mongoose.Schema({
    description : { type:String,required:true },
    completed : { type:Boolean,default:false },
    owner : {
        type : mongoose.Schema.Types.ObjectId,  //this type is provoded by the mongoose to extract the data from the
        required : true,
        ref : 'User'    
    }
},{
    timestamps : true
})


const Task = mongoose.model('Task',taskSchema);
module.exports = Task;