import express from "express";
import categoryControler from "../controllers/category.controller.js";

const router = express.Router();

router.route("/").get(categoryControler.getCategories);
router.route("/import-data").post(categoryControler.importData);

export default router;
