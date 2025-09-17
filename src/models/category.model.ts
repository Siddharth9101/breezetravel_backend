import mongoose, { Model } from "mongoose";
import { ICategory } from "../types/index.js";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model<ICategory, Model<ICategory>>(
  "Category",
  categorySchema
);

export { Category };
