import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";
import { ZodError } from "zod";

export function errorHandler(
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Bad request" });
  } else if (err instanceof HttpError)
    return res.status(err.statusCode).json({ message: err.message });

  return res.status(500).json({ message: "Something went wrong" });
}
