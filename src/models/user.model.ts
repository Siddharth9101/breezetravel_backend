import mongoose from "mongoose";
import { IUser } from "../types/index.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    number: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.checkPassword = async function (
  oldPassword: string
): Promise<boolean> {
  return await bcrypt.compare(oldPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
