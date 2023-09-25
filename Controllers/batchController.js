import expressAsyncHandler from "express-async-handler";
import Batch from "../models/batchModel.js";

// Create a new batch - admin requires
export const createBatch = expressAsyncHandler(async (req, res) => {
  try {
    const newBatch = await Batch.create(req.body);
    res.json(newBatch);
  } catch (err) {
    throw new Error(err);
  }
});

// Get batch
export const getBatch = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const batch = await Batch.findById(id);
    res.json(batch);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all batch - admin requires
export const getAllBatch = expressAsyncHandler(async (req, res) => {
  try {
    const batch = await Batch.find();
    res.json(batch);
  } catch (err) {
    throw new Error(err);
  }
});

// Update Batch - admin requires
export const updateBatch = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        course: req.body.course,
        $push: { students: { $each: student } },
        $push: { sessions: { $each: session } },
      },
      {
        new: true,
      }
    );
  } catch (error) {}
});

// Delete Batch - admin only
export const deleteBatch = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBatch = await Batch.findByIdAndDelete(id);
    res.json("Batch deleted successfully");
  } catch (error) {
    throw new Error(error);
  }
});
