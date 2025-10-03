import nodemailer from "nodemailer"

import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});


export const sendEmail = async (to, subject, text, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              background: #4CAF50;
              color: white;
              padding: 15px;
              border-radius: 10px 10px 0 0;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              background: #f1f1f1;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              font-size: 12px;
              color: #666;
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Email Verification</h2>
            </div>
            <p>Hello,</p>
            <p>We received a request to verify your email address. Use the OTP below to complete the process:</p>
            
            <div class="otp">${otp}</div>
            
            <p>This OTP will expire in <b>10 minutes</b>. Do not share it with anyone.</p>
            
            <p>If you did not request this, please ignore this email.</p>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Error while sending mail", err);
    throw err;
  }
};
