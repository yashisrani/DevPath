const mongoose = require('mongoose');

const profileschema = mongoose.Schema({
    gender:{
        required : true,
        type: String,
        enum: ["Male","Female","Others"]
    },
    dateOfBirth:{
        required : true,
        type: Date,
    },
    about:{
        required : true,
        type: String,
        trim: true
    },
    contectnumber:{
        required : true,
        type: Number,
        trim: true
    }
})

module.exports = mongoose.model('Profile', profileschema);