import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/ApiResponse.js";
import tokenService from "../services/token.service.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error("No access token!");
    }

    try {
      const userData = tokenService.verifyAndDecodeToken(accessToken);
      if (!userData) {
        throw new Error("No userdata found!");
      }
      req.user = userData;
      next();
    } catch (error) {
      throw new Error("Invalid Token!");
    }
  } catch (error) {
    return apiResponse(res, 401, "Invalid Token!", false);
  }
};

export default authMiddleware;
