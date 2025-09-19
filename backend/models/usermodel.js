const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    standard:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"Student"
    },
    gameScore:{
        type:Number,
        required:true,
        default:0
    },
    learningScore:{
        type:Number,
        required:true,
        default:0
    },
    badges:[]

},{timestamps:true});

const userModel=mongoose.model('user',UserSchema);

module.exports=userModel;