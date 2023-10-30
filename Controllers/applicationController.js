import Application from "../models/Application.js";
import expressAsyncHandler from "express-async-handler";

export const getApplication = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  try {
    const application = await Application.findOne({ student: id });
    res.send(application);
  } catch (error) {
    throw new Error("No Application found");
  }
});
