const mongoose = require('mongoose')

const sectionschema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    subsections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
})

module.exports = mongoose.model('Section', sectionschema)