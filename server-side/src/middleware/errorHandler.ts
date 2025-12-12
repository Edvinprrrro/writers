import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";

export function errorHandler(
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const status = err instanceof HttpError ? err.statusCode : 500;

  return res
    .status(status)
    .json({ message: err.message || "Something went wrong" });
}
