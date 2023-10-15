import Students from "../models/studentModel.js";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { generateRefreshToken } from "../config/refreshToken.js";
import { generateToken } from "../config/jwt.js";
import { sendMail } from "../Utils/sendMail.js";

dotenv.config();

// Regiter a student
export const registerAStudent = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const findStudent = await Students.findOne({ email });
  if (!findStudent) {
    const newStudent = await Students.create(req.body);
    res.json(newStudent);
  } else {
    throw new Error("Email Already Registered");
  }
});

// Login using refreshToken
export const LoginByRefreshToken = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Students.findById(decoded.id);
  try {
    if (user) {
      res.json(user);
    }
  } catch (error) {
    throw new Error("Token is invalid");
  }
});

// Delete a Student
export const deleteStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findStudent = await Students.findOneAndDelete({ _id: id });
    res.json(findStudent);
  } catch (error) {
    throw new Error(error);
  }
});

// To get all the students, need auth and should be admin
export const getAllStudents = expressAsyncHandler(async (req, res, next) => {
  let students;
  try {
    students = await Students.find();
    if (!students) {
      return res.json({ message: "No student found" });
    }
    return res.json(students);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a student
export const getAStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getStudent = await Students.findById(id);
    res.send(getStudent);
  } catch (err) {
    throw new Error(err);
  }
});

// Login
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await Students.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser._id);
    const updateUser = await Students.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 48 * 60 * 60 * 1000,
    });
    res.json({
      id: findUser._id,
      name: findUser.name,
      mobile: findUser.mobile,
      email: findUser.email,
      batch: findUser.batch,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Admin Login
export const adminLogin = expressAsyncHandler(async (req, res) => {
  const { email, contact, password } = req.body;
  const findUser = await Students.findOne({
    $or: [{ email }, { contact }],
  });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser._id);
    const updateUser = await Students.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 48 * 60 * 60 * 1000,
    });
    res.json({
      id: findUser._id,
      name: findUser.name,
      mobile: findUser.mobile,
      email: findUser.email,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Logout User

export const logout = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    throw new Error("No refresh token in cookies");
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    maxAge: -1,
  });
  res.json({ message: "User Logged Out" });
});

// udpate student
export const udpateDetails = expressAsyncHandler(async (req, res, next) => {
  try {
    const id = req.user._id;
    await Students.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Successfully updated" });
  } catch (err) {
    throw new Error(err);
  }
});

export const getSelf = expressAsyncHandler(async (req, res, next) => {
  try {
    const id = req.user._id;
    const student = await Students.findById(id);
    res.json(student);
  } catch (err) {
    throw new Error(err);
  }
});

// Attendance
export const attendance = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const student = await Students.findByIdAndUpdate(
      id,
      { attend: true },
      { new: true }
    );
    res.send({ student });
  } catch (error) {
    throw new Error(error);
  }
});

// Generate Password Reset Token
export const forgotPasswordToken = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Students.findOne({ email });
  if (!user) throw new Error("Email not found");
  try {
    const token = await user.createPasswordResetToken();
    const resetURL = `Hi ${user.name}, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href="https://zen-portal-backend.onrender.com/api/reset-password/${token}">Click Here</a>`;
    const data = {
      to: email,
      subject: "Password Reset",
      html: resetURL,
    };
    sendMail(data);
    res.json("link send successfully");
  } catch (error) {
    throw new Error(error);
  }
});

// Reset password
export const resetPassword = expressAsyncHandler(async (req, res) => {
  const password = req.body.password;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Reset Token expired, Please try again");
  }
  user.password = password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  res.json(user);
});
