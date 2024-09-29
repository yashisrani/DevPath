const nodemailer = require('nodemailer');

const mailsender = async(email,title,body) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });

          const info = await transporter.sendMail({
            from: 'DevPath || Yash Israni', // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            text: "Hello !!", // plain text body
            html: `${body}`, // html body
          });

          console.log(info);
          
    }
    catch(error){
        console.error(`Error sending email: ${error.message}`);
    }
}