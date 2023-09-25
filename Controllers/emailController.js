import nodemailer from "nodemailer";
import expressAsyncHandler from "express-async-handler";

export const sendMail = expressAsyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: 'noReply',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  });
});
