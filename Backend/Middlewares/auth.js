const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../Models/User')


// auth
exports.auth = async(req,res,next)=>{
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(403).json({
                message: "Token not found",
                success: false
            })
        }

        // verify token
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err){
            return res.status(403).json({
                success: false,
                message: "Invalid token"
            })
        }
        next();
    }
    catch(err){
        res.status(500).json({
            message: "Error in auth middleware",
            success: false
        })
    }
}

// isStudent
exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accounttype === "student"){
            next();
        }
        else{
            return res.status(403).json({
                message: "You are not authorized to access this resource",
                success: false
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: "Error in isStudent middleware",
            success: false
        })
    }
}
// isAdmin
exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accounttype === "admin"){
            next();
        }
        else{
            return res.status(403).json({
                message: "You are not authorized to access this resource",
                success: false
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: "Error in isAdmin middleware",
            success: false
        })
    }
}

// isInstructor
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accounttype === "instructor"){
            next();
        }
        else{
            return res.status(403).json({
                message: "You are not authorized to access this resource",
                success: false
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: "Error in isInstructor middleware",
            success: false
        })
    }
}