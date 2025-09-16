import express from "express";
import categoryImportController from "../controllers/categoryImport.controller.js";

const router = express.Router();

router.route("/").post(categoryImportController.importData);

export default router;
