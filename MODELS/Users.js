const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name : { type:String,required:true },
    email : { type:String,required:true, unique:true },
    password : {type:String,required:true}
})

// .pre is the method to change the values before saving to the database
userSchema.pre('save',async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;