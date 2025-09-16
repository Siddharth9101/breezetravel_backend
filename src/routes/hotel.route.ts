import express from "express";
import { getHotels, getSingleHotel } from "../controllers/hotel.controller.js";

const router = express.Router();

router.route("/").get(getHotels);
router.route("/:id").get(getSingleHotel);

export default router;
