const mongoose = require('mongoose')

const course = mongoose.Schema({
    coursename:{
        type:String,
        required:true,
        trim: true
    },
    coursedescription:{
        type:String,
        required:true,
        trim: true
    },
    instractor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim: true,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReview:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
        trim: true,
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    studentsenrolled:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})

module.exports = mongoose.model('Course', course)