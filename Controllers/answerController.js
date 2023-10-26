import expressAsyncHandler from "express-async-handler";
import answerModel from "../models/answerModel.js";
import activityModel from "../models/activityModel.js";

// Create new answer
export const postAnswer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const userId = req.user._id;
  try {
    const answer = await answerModel.create({
      activities: id,
      answer: req.body,
      student: userId,
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

// update answers
export const updateAnswer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const updatedAnswers = await answerModel.findByIdAndUpdate(
      id,
      { answer: req.body },
      { new: true }
    );
    res.json(updatedAnswers);
    console.log(updatedAnswers);
  } catch (error) {
    throw new Error(error);
  }
});

// get answer from activity id params
export const getAnswerByActivity = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await answerModel.findOne({
      activities: id,
      student: req.user._id,
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

