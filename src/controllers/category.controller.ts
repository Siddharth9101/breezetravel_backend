import { Request, Response } from "express";
import { ICategory } from "../types/index.js";
import { Category } from "../models/category.model.js";
import { apiResponse } from "../utils/ApiResponse.js";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoriesInDb: ICategory[] = await Category.find({});
    categoriesInDb.length
      ? apiResponse(
          res,
          200,
          "Successfully fetched categories!",
          true,
          categoriesInDb
        )
      : apiResponse(res, 404, "No categories found!", false);
  } catch (err) {
    console.error(err);
    apiResponse(res, 500, "Failed to fetch categories!", false);
  }
};
