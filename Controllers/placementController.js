import expressAsyncHandler from "express-async-handler";
import PlacementModel from "../models/PlacementModel.js";

export const createPlacementBoard = expressAsyncHandler(async (req, res) => {
  try{
    const placementBoard = await PlacementModel.create(req.body);
    res.send(placementBoard);
  }catch(err){
    throw new Error(err)
  }
});

export const getPlacementBoard = expressAsyncHandler(async (req, res) => {
  try {
    const placementBoard = await PlacementModel.find();
    res.send(placementBoard);
  } catch (err) {
    throw new Error(err);
  }
});
