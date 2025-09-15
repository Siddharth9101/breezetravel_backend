import { Request, Response } from "express";
import { IHotel } from "../types/index.js";
import { Hotel } from "../models/hotel.model.js";
import { apiResponse } from "../utils/ApiResponse.js";

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotelsCategory = req.query?.category;
    let hotelsInDb: IHotel[] = [];
    if (hotelsCategory) {
      hotelsInDb = await Hotel.find({ category: hotelsCategory });
    } else {
      hotelsInDb = await Hotel.find();
    }
    hotelsInDb.length
      ? apiResponse(res, 200, "Successfully fetched hotels!", true, hotelsInDb)
      : apiResponse(res, 404, "No hotels found!", false);
  } catch (err) {
    console.error(err);
    apiResponse(res, 500, "Failed to fetch hotels!", false);
  }
};
