import express, { Request, Response } from "express";
import { apiResponse } from "../utils/ApiResponse.js";

const router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  apiResponse(res, 200, "OK", true);
});

export default router;
