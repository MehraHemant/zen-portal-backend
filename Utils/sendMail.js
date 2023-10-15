import nodemailer from "nodemailer";
import expressasynchandler from "express-async-handler";

export const sendMail = expressasynchandler(async (data, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  await transporter
    .sendMail({
      from: "Zen Classes",
      to: data.to,
      subject: data.subject,
      html: data.html,
    })
    .catch((err) => {
      console.log(err);
    });
});
