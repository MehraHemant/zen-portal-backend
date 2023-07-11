import Students from "../Modules/Students.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// To get all the students, no need auth
export const getAllStudents = async (req, res, next) => {
  let students;
  try {
    students = await Students.find();
  } catch {
    (err) => console.log(err);
  }
  if (!students) {
    return res.status(404).json({ message: "No student found" });
  }
  return res.status(200).json({ students });
};

// signup -> no login required
export const signup = async (req, res, next) => {
  let { name, email, password, contact } = req.body;
  let studentEmail;
  try {
    studentEmail = await Students.findOne({ email });
  } catch (e) {
    console.log(e);
  }
  if (studentEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.saltRound)
  );
  const student = new Students({
    name,
    email,
    password: hashedPassword,
    contact,
  });
  try {
    student.save();
  } catch (err) {
    res.status(500).json({ err });
  }
  return res.status(200).json({ message: "Successfully signed up", student });
};

export const login = async (req, res, next) => {
  let { email, password } = req.body;
  let student;
  try {
    student = await Students.findOne({ email });
  } catch (e) {
    console.log(e);
  }
  if (!student) {
    return res.json({
      message: "Email or password is incorrect",
      status: "error",
    });
  }
  const isMatch = bcrypt.compareSync(password, student.password);
  if (!isMatch) {
    return res.json({
      message: "Email or password is incorrect",
      status: "error",
    });
  }
  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
    expiresIn: "2 Days",
  });
  student.token = token;
  student.save();
  return res
    .status(200)
    .json({
      message: "Successfully logged in",
      status: "success",
      token,
      student,
    });
};

export const authenticate = async (req, res, next) => {
  const jwt_token = req.headers.jwt_token;
  try {
    if (!jwt_token) {
      res.json({ error: "Invalid jwt token" });
    }

    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (!decode) {
      res.json({ error: "Wrong jwt token" });
    }
    req.user_id = decode.id;
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const authGetStudent = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const student = await Students.findOne({ _id: user_id }).select(
      "-password"
    );
    return res.json({ student, message: "user fetch by jwt_token" });
  } catch (err) {
    res.json({ message: err });
  }
};

export const udpateDetails = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const {
      name,
      email,
      contact,
      batch,
      qualification,
      yearOfPassign,
      yearOfExperiece,
      noticePeriod,
      github,
      portfolio,
      resume,
    } = req.body;
    Students.findOneAndUpdate(
      { _id: user_id },
      {
        name,
        email,
        contact,
        batch,
        qualification,
        yearOfPassign,
        yearOfExperiece,
        noticePeriod,
        github,
        portfolio,
        resume,
      }
    )
      .then(() => res.json({ message: "Successfully updated" }))
      .catch((err) => res.json({ message: err }));
  } catch (err) {
    res.json({ message: err });
  }
};

export const attendance = async (req, res) => {
  try {
    const user_id = req.user_id;
    const {attend} = req.body;
    const student =  await Students.findOneAndUpdate( { _id: user_id }, {attend: attend})
    res.status(200).send({student});
    student.save();
  } catch (error) {
    console.log(error);
  }
};
