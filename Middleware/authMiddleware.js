import jwt from "jsonwebtoken";
import Students from "../models/studentModel.js";
import expressAsyncHandler from "express-async-handler";

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Students.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Authorized token expired");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});


export const isAdmin = expressAsyncHandler(async(req, res, next)=>{
    const {email} = req.user;
    const adminUser = await Students.findOne({email});
    if(adminUser.role !== 'admin'){
        throw new Error("You are not admin");
    }
    else{
        next();
    }
})