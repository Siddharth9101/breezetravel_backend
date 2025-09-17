import express from "express";
import hotelController from "../controllers/hotel.controller.js";

const router = express.Router();

router.route("/").get(hotelController.getHotels);
router.route("/:id").get(hotelController.getSingleHotel);
router.route("/import-data").post(hotelController.importData);

export default router;
