import { Request, Response } from "express";
import categories from "../data/categories.js";
import { apiResponse } from "../utils/ApiResponse.js";
import categoryService from "../services/category.service.js";

class ImportCategoryDataController {
  async importData(_: Request, res: Response) {
    try {
      await categoryService.importCategoryData(categories);
      return apiResponse(
        res,
        200,
        "Successfully inserted categories data into db!",
        true
      );
    } catch (err) {
      console.error(err);
      return apiResponse(
        res,
        500,
        "Failed to add categories data into db!",
        false
      );
    }
  }
}

export default new ImportCategoryDataController();
