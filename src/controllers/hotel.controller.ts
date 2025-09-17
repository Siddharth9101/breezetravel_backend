import { Request, Response } from "express";
import { apiResponse } from "../utils/ApiResponse.js";
import hotelService from "../services/hotel.service.js";
import hotels from "../data/hotels.js";

class HotelController {
  async getHotels(req: Request, res: Response) {
    try {
      const hotelsCategory = req.query?.category;
      let hotelsInDb;
      if (hotelsCategory) {
        hotelsInDb = await hotelService.getAllHotels(String(hotelsCategory));
      } else {
        hotelsInDb = await hotelService.getAllHotels();
      }
      if (hotelsInDb.length) {
        return apiResponse(
          res,
          200,
          "Successfully fetched hotels!",
          true,
          hotelsInDb
        );
      } else {
        return apiResponse(res, 404, "No hotels found!", false);
      }
    } catch (err) {
      console.error(err);
      return apiResponse(res, 500, "Failed to fetch hotels!", false);
    }
  }

  async getSingleHotel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hotel = await hotelService.findHotelById(id);

      if (hotel) {
        return apiResponse(
          res,
          200,
          "Successfully fetched hotel!",
          true,
          hotel
        );
      } else {
        apiResponse(res, 404, "No hotel found!", false);
      }
    } catch (error) {
      console.error(error);
      return apiResponse(res, 500, "Failed to fetch hotel!", false);
    }
  }

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

export default new HotelController();
