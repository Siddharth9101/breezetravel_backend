import { Response } from "express";

export function apiResponse(
  res: Response,
  status: number,
  message: string,
  success: boolean,
  data?: any
) {
  if (data) {
    return res.status(status).json({ success, message, data });
  } else {
    return res.status(status).json({ success, message });
  }
}
