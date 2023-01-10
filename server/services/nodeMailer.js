import nodeMailer from "nodemailer"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_PASSWORD,
  },
});

export const otpSend = (email) => {
  try {
   
    // console.log(transporter,"TRANSPORTER")
    return new Promise(async (resolve, reject) => {
      const otp = `${Math.floor(10000 + Math.random() * 99999)}`;
      
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Verify your email ",
        html: `Your email verification code is : ${otp}`,

      };
     
      await transporter
        .sendMail(mailOptions)
        .then((response) => {
          
          response.otp = otp;
          resolve(response);
        })
        .catch((err) => {
          console.log("ERROR OTP")
          console.log(err, 'eroorrrrr');
          resolve(err);
        });
    }).catch((err) => {
      reject(err);
    });
  } catch (err) {
    console.log("ERROR OCCURRED", err);
  }
};