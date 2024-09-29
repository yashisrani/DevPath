const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')

const otp = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    otp:{
        type:String,
        required:true
    },
    createAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
})

// creating a function -> to send a otp email

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"verification email from DevPath",otp)
        console.log("email send successfully", mailResponse);
        
    }
    catch(error){
        console.error(`Error sending OTP email: ${error.message}`)
    }
}

otp.pre('save',async (next) => {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model('OTP', otp)