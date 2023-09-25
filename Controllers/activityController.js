import expressAsyncHandler from "express-async-handler";
import Activity from "../models/activityModel.js";
import sessionModel from "../models/sessionModel.js";

export const createActivity = expressAsyncHandler(async (req, res) => {
  const activity = (await Activity.create(req.body));
  if (req.body.session) {
    const addToSession = await sessionModel.findByIdAndUpdate(
      req.body.session._id,
      {
        activity: activity._id,
      },
      { new: true }
    );
  }
  try {
    res.send(activity);
  } catch (error) {
    throw new Error(error);
  }
});