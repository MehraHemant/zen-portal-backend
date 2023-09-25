import nodemailer from "nodemailer";
import expressasynchandler from "express-async-handler"

export const sendMail = expressasynchandler(async (data, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.User,
        pass: process.env.PASSWORD,
      },
    });
    await transporter.sendMail({
      from: "Zen Classes",
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  } catch (err) {
    throw new Error(err);
  }
});
