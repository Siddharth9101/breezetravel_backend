import { Hotel } from "../models/hotel.model.js";

class HotelService {
  async importHotelData(hotels: any) {
    await Hotel.insertMany(hotels.data);
  }

  async getAllHotels(hotelsCategory?: string) {
    let hotels;
    if (hotelsCategory) {
      hotels = await Hotel.find({ category: hotelsCategory });
    } else {
      hotels = await Hotel.find({});
    }
    return hotels;
  }

  async findHotelById(id: string) {
    return await Hotel.findById(id);
  }
}

export default new HotelService();
