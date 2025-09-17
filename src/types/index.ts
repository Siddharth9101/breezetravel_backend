import { HydratedDocument, Types } from "mongoose";

export interface IHotel {
  name: string;
  category: string;
  image: string;
  imageArr: string[];
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
  ameneties: string[];
  healthAndSafety: string[];
  houseRules: string[];
  propertyType: string;
  isCancelable: boolean;
}

export interface ICategory {
  category: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  number: string;
  refreshToken: string | null;
}

export interface IUserMethods {
  checkPassword(oldPassword: string): Promise<boolean>;
}

export type UserDoc = HydratedDocument<IUser, IUserMethods>;

export type CheckExistanceReturn<T extends boolean> = T extends true
  ? { exists: boolean; user: UserDoc | null }
  : { exists: boolean };

export interface IWishlist {
  userId: Types.ObjectId;
  hotels: Types.ObjectId[];
}
