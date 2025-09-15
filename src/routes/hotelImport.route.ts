import express from "express";
import { importData } from "../controllers/hotelImport.controller.js";

const router = express.Router();

router.route("/").post(importData);

export default router;
