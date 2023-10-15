import expressAsyncHandler from "express-async-handler";
import Sessions from "../models/sessionModel.js";
import Activity from "../models/activityModel.js";
import answerModel from "../models/answerModel.js";

export const addSessions = expressAsyncHandler(async (req, res) => {
  const session = await Sessions.create(req.body);
  if (req.body.batch) {
    try {
      await req.body.batch?.map(async (item) => {
        await batchModel.findByIdAndUpdate(
          item,
          { session: session._id },
          { new: true }
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  try {
    res.json(session);
  } catch (err) {
    throw new Error(err);
  }
});

export const updateSession = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.batch) {
      try {
        req.body.batch?.map(async (item) => {
          await batchModel.findByIdAndUpdate(
            item,
            { session: id },
            { new: true }
          );
        });
      } catch (err) {
        throw new Error(err);
      }
    }
    const session = await Sessions.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(session);
  } catch (err) {
    throw new Error(err);
  }
});

export const postAnswer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const isAnswered = await answerModel.findOne({
    question: id,
    student: userId,
  });
  try {
    if (isAnswered) {
      const answer = await answerModel.findByIdAndUpdate(
        isAnswered._id,
        {
          answer: req.body,
        },
        { new: true }
      );
      res.json(answer);
    } else {
      const answer = await answerModel.create({
        question: id,
        student: userId,
        answer: req.body,
      });
      const activity = await Activity.findByIdAndUpdate(
        id,
        { $push: { answers: answer._id } },
        { new: true }
      );
      res.json(activity);
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllSessions = expressAsyncHandler(async (req, res) => {
  const batch = req.user.batch._id;
  let sessions;
  try {
    sessions = await Sessions.findOne({ batch: { $elemMatch: batch } })
      .populate("activities")
      .populate({ path: "activities", populate: "answers" });
    res.json(sessions);
  } catch (err) {
    throw new Error("No batch assigned yet");
  }
});

export const getSession = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const session = await Sessions.findById(id);
    res.json(session);
  } catch (error) {
    throw new Error(error);
  }
});
