import expressAsyncHandler from "express-async-handler";
import Requirements from "../models/Requirements.js";

export const createRequirements = expressAsyncHandler(async (req, res) => {
  try {
    const newRequirements = new Requirements(req.body);
    newRequirements.save();
    res.json(newRequirements);
  } catch (err) {
    throw new Error(err);
  }
});

export const deleteRequirements = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRequirements = await Requirements.findByIdAndDelete(id);
    res.json("Requirements deleted");
  } catch (error) {
    throw new Error(error);
  }
});

export const updateRequirements = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRequirements = await Requirements.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedRequirements);
  } catch (error) {
    throw new Error(error);
  }
});

export const getRequirements = expressAsyncHandler(async (req, res) => {
  try {
    const requirements = await Requirements.find();
    res.json(requirements);
  } catch (error) {
    throw new Error(error);
  }
});

export const getARequirement = expressAsyncHandler(async (req, res) => {
	const {id} = req.params;
  try {
    const requirements = await Requirements.findById(id);
    res.json(requirements);
  } catch (error) {
    throw new Error(error);
  }
});
