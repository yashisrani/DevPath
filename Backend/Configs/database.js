const mongoose = require('mongoose');
require('dotenv').config();

exports.dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{})
    .then(()=>console.log('Database connected...'))
    .catch((err)=>console.log("db connection issue: " + err))
    process.exit(1);
}