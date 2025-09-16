import { Category } from "../models/category.model.js";
import { ICategory } from "../types/index.js";

class CategoryService {
  async getAllCategories() {
    const categoriesInDb: ICategory[] = await Category.find({});
    return categoriesInDb;
  }

  async importCategoryData(categories: any) {
    await Category.insertMany(categories.data);
  }
}

export default new CategoryService();
