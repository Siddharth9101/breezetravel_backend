import { Request, Response } from "express";
import hotels from "../data/hotels.js";
import { apiResponse } from "../utils/ApiResponse.js";
import hotelService from "../services/hotel.service.js";

class ImportHotelsDataController {
  async importData(_: Request, res: Response) {
    try {
      await hotelService.importHotelData(hotels);
      return apiResponse(
        res,
        200,
        "Successfully inserted hotels data into db!",
        true
      );
    } catch (err) {
      console.error(err);
      return apiResponse(res, 500, "Failed to add hotels data into db!", false);
    }
  }
}

export default new ImportHotelsDataController();
