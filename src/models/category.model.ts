import mongoose from "mongoose";
import { ICategory } from "../types/index.js";

const categorySchema = new mongoose.Schema<ICategory>({
  category: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

export { Category };
