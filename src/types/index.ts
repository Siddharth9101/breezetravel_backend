import { Schema } from "mongoose";

export interface IHotel extends Schema {
  name: string;
  category: string;
  image: string;
  imageArr: [string];
  address: string;
  city: string;
  state: string;
  country: string;
  price: number;
  rating: number;
  numberOfBathrooms: number;
  numberOfBeds: number;
  numberOfguest: number;
  numberOfBedrooms: number;
  numberOfStudies: number;
  hostName: string;
  hostJoinedOn: string;
  ameneties: [string];
  healthAndSafety: [string];
  houseRules: [string];
  propertyType: string;
  isCancelable: boolean;
}
