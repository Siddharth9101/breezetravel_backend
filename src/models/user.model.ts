import mongoose, { Model } from "mongoose";
import { IUser, IUserMethods } from "../types/index.js";
import bcrypt from "bcryptjs";
import Wishlist from "./wishlist.model.js";

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    number: { type: String, required: true, unique: true },
    refreshToken: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.checkPassword = async function (
  oldPassword: string
): Promise<boolean> {
  return await bcrypt.compare(oldPassword, this.password);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
