const User = require('../Models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')

// reset password token
exports.resetPasswordToken = async(req,res)=>{
    try{
        // get email from req body
    const {email} = req.body
    // check user for this email
    const user = await User.findOne({email : email})
    // if user not found return error response
    if(!user){
        return res.status(404).json({
            message: "User not found",
            success: false
        })
    }

    // generate a token
    const token = crypto.randomUUID();

    // update user by adding token and expiration time
    const updateDetails = await User.findOneAndUpdate({email:email}, {token:token, resetPasswordExpires: Date.now()+ 5*60*1000},{new:true})
    
    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    //send mail containing the url
    await mailSender(email,"Password Reset Link",`Password Reset Link: ${url}`)

    return res.status(200).json({
        message: "Reset password link has been sent to your email",
        success: true
    })
    }
    catch(err){
        res.status(500).json({
            message: "Error generating reset password token",
            success: false
        })
    }
}

// reset password 

exports.resetPassword = async(req,res)=>{

   try{
         // data fetch 
    const {password,confirmpassword,token} = req.body; 

    // validation
    if(password !== confirmpassword){
        return res.status(400).json({
            message: "Password and confirm password does not match",
            success: false
        })
    }

    // get users details from db using token
    const userDetails = await User.findOne({token: token});

    // if no entry -- invalid token
    if(!userDetails){
        return res.status(404).json({
            message: "Invalid token",
            success: false
        })
    }

    // token time check
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.status(403).json({
            message: "Token expired",
            success: false
        })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // update password in db
    await User.updateOne({token: token}, {password: hashedPassword},{new:true})

    return res.status(200).json({
        message: "Password has been updated successfully",
        success: true
    })
   }

   catch(err){
     res.status(500).json({
       message: "Error resetting password",
       success: false
     })
   }

}