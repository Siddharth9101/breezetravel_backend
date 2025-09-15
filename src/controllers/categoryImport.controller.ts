import { Request, Response } from "express";
import { Category } from "../models/category.model.js";
import categories from "../data/categories.js";
import { apiResponse } from "../utils/ApiResponse.js";

export const importData = async (_: Request, res: Response) => {
  try {
    await Category.insertMany(categories.data);
    apiResponse(
      res,
      200,
      "Successfully inserted categories data into db!",
      true
    );
  } catch (err) {
    console.error(err);
    apiResponse(res, 500, "Failed to add categories data into db!", false);
  }
};
