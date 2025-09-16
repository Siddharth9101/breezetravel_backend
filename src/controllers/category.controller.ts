import { Request, Response } from "express";
import { apiResponse } from "../utils/ApiResponse.js";
import categoryService from "../services/category.service.js";

class CategoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const categoriesInDb = await categoryService.getAllCategories();
      if (categoriesInDb.length) {
        return apiResponse(
          res,
          200,
          "Successfully fetched categories!",
          true,
          categoriesInDb
        );
      } else {
        return apiResponse(res, 404, "No categories found!", false);
      }
    } catch (err) {
      console.error(err);
      return apiResponse(res, 500, "Failed to fetch categories!", false);
    }
  }
}

export default new CategoryController();
