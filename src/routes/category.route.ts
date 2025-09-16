import express from "express";
import categoryControler from "../controllers/category.controller.js";

const router = express.Router();

router.route("/").get(categoryControler.getCategories);

export default router;
