import expressAsyncHandler from "express-async-handler";
import Activity from "../models/activityModel.js";
import answerModel from "../models/answerModel.js";
import sessionModel from "../models/sessionModel.js";

export const createActivity = expressAsyncHandler(async (req, res) => {
  const activity = await Activity.create(req.body);
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

export const getActivity = expressAsyncHandler(async (req, res) => {
  const session = req.params.session;
  const activity = await Activity.findOne({
    session: session,
  });
  res.send(activity);
});
