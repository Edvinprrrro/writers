import { Request, Response, NextFunction } from "express";

export default function sendScucesfullResponse(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const { location, status, body } = req.responseData!;
  if (location) return res.status(status).location(location).json(body);

  return res.status(status).json(body);
}
