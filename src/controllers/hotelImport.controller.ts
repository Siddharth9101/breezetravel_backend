import { Request, Response } from "express";
import { Hotel } from "../models/hotel.model.js";
import hotels from "../data/hotels.js";
import { apiResponse } from "../utils/ApiResponse.js";

export const importData = async (_: Request, res: Response) => {
  try {
    await Hotel.insertMany(hotels.data);
    apiResponse(res, 200, "Successfully inserted hotels data into db!", true);
  } catch (err) {
    console.error(err);
    apiResponse(res, 500, "Failed to add hotels data into db!", false);
  }
};
