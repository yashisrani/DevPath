const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim: true
    },
    lastname:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    },
    accouttype:{
        type:String,
        enum: ["Student","Admin","Instructor"],
        required :true
    },
    additionaldetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Profile"
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Course"
    }],
    image:{
        type:String,    // type:string , because we want to add image URL
        required:true,
    },
    courseprogress:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "CourseProgress"
    }


})

module.exports = mongoose.model('User', userschema);