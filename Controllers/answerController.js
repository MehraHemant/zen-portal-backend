import expressAsyncHandler from "express-async-handler";
import answerModel from "../models/answerModel.js";
import activityModel from "../models/activityModel.js";

export const postAnswer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const answer = await answerModel.create({
      activities: id,
      answer: req.body.answer,
      student: userId,
      marks: req.body.marks,
    });
    const activity = await activityModel.findByIdAndUpdate(
      id,
      {
        $push: { answers: answer._id },
      },
      { new: true }
    );
    res.json(answer);
  } catch (error) {
    throw new Error(error);
  }
});

// get all the task by user
export const getAnswer = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const answer = await answerModel
      .find({ student: userId })
      .populate("student")
      .populate({
        path: "activities",
        populate: {
          path: "session",
          model: "session",
        },
      });
    if (answer) {
      res.json(answer);
    } else {
      throw new Error("No result found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const updateMarks = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { marks } = req.body;
  try {
    const newMarks = await answerModel.findByIdAndUpdate(
      id,
      { marks: marks },
      {
        new: true,
      }
    );
    res.send(`given marks are ${marks}`);
  } catch (error) {
    throw new Error(error);
  }
});

export const getCapstone = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const capstone = await answerModel
      .find({ student: id, "activities.type": "capstone" })
      .populate("activities");
    res.send(capstone);
  } catch (error) {
    throw new Error(error);
  }
});

export const getWebcode = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const capstone = await answerModel
      .find({ student: id, "activities.type": "webcode" })
      .populate("activities");
    res.send(capstone);
  } catch (error) {
    throw new Error(error);
  }
});
