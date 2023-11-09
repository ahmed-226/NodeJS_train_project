const mongoose = require('mongoose');
const validator=require('validator');
const userRole = require('../utils/userRoles');

const userSchema =new  mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        // validate:[validator.isEmail,'field must be an email adress']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[userRole.USER,userRole.ADMIN,userRole.MANGER],
        default:userRole.USER
    },
    avatar:{
        type:String,
        default:'uploads/avatar2.png'
    }


})

module.exports =mongoose.model('User',userSchema);