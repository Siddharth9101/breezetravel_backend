import express from "express";
import importHotelsDataController from "../controllers/hotelImport.controller.js";

const router = express.Router();

router.route("/").post(importHotelsDataController.importData);

export default router;
