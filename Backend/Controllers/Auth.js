const User = require('../Models/User')
const OTP = require('../Models/OTP')
const bcrypt = require('bcryptjs')
const otpgenerator = require('otp-generator')
const Profile = require('../Models/Profile')
// send OTP
exports.sendOTP = async(req,res)=>{
    try{
        // fetch email from request body
        const {email} = req.body

        // check if user already exist with same email
        const userExist = await User.findOne({email : email})
        
        // if user already exist, return a response
        if(userExist){
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }

        // generate a random otp
        var otp = otpgenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            numbers: true,
            specialCharacters: false
        })

        // check unique otp or not
        const result = await OTP.findOne({otp:otp})

        while (result) {
            var otp = otpgenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                numbers: true,
                specialCharacters: false
            })
            const result = await OTP.findOne({otp:otp})
        }

        const otppayload = {email,otp}

        // create a entry of otp in database
        const optbody = await OTP.create(otppayload)

        // response
        res.status(200).json({
            message: "OTP sent successfully",
            success: true
        })

    }
    catch(err){
        res.status(500).json({
            message:"Error sending OTP",
            success: false
        })
    }
}

// sign up
exports.signup = async(req,res)=>{
    try{
        // data fetch from request body
        const {firstname,lastname,email,password,confirmpassword,accounttype,otp,contactnumber} = req.body

        // validate
        if(!firstname || !lastname || !email || !password || !confirmpassword || !otp || !contactnumber){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        
        // check password and confirm password are matches
        if(password !== confirmpassword){
            return res.status(400).json({
                message: "Password and confirm password does not match",
                success: false
            })
        }

        // check if user already exist with same email
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }

        // find resent otp stored in db 
        const recentopt = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        // validate otp
        if(recentopt.length == 0){
            // otp not found
            res.status(400).json({
                message:'otp not found',
                success: false
            })
        }else if(otp !== recentopt.otp){
            // otp not match
            res.status(400).json({
                message:'Invalid otp',
                success: false
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in db

        const profiledetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contectnumber: null,
        })

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            accouttype,
            contactnumber, 
            additiondetails : profiledetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
        })

    }
    catch(err){
        res.status(500).json({
            message: "Error signup",
            success: false
        })
    }
}