import mongoose from "mongoose";
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

const Category = mongoose.model<ICategory>("Category", categorySchema);

export { Category };
