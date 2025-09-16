import { Request, Response } from "express";
import { apiResponse } from "../utils/ApiResponse.js";
import { registerSchema } from "../schemas/register.schema.js";
import userService from "../services/user.service.js";
import { ZodError } from "zod";

class AuthController {
  async signup(req: Request, res: Response) {
    let validatedData;
    try {
      validatedData = registerSchema.parse(req.body);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        return apiResponse(res, 400, messages, false);
      }
      console.error(error);
      return apiResponse(res, 400, "Invalid fields!", false);
    }

    if (await userService.checkExistance(validatedData.username)) {
      return apiResponse(res, 400, "Username already exists!", false);
    }

    try {
      const userId = await userService.createUser(validatedData);
      return apiResponse(res, 201, "Registered successfully!", true, {
        userId,
      });
    } catch (error) {
      return apiResponse(res, 500, "Failed to register user!", false);
    }
  }

  async login(req: Request, res: Response) {}
}

export default new AuthController();
