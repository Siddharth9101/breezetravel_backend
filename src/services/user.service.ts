import z from "zod";
import User from "../models/user.model.js";
import { registerSchema } from "../schemas/register.schema.js";

class UserService {
  async checkExistance(username: string | undefined): Promise<boolean> {
    const foundUser = await User.findOne({ username });
    return foundUser !== null;
  }

  async createUser(data: z.infer<typeof registerSchema>) {
    const newUser = await User.create(data);
    return newUser._id;
  }
}

export default new UserService();
