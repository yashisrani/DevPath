const mongoose = require('mongoose');

const tag = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        unique: true
    },
    description:{
        type:String,
        required:true,
        trim: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Course"
    }
})

module.exports = mongoose.model('Tag', tag)