import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { HttpError } from "../errors/httpError";

export default function sanitizeRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError)
        return next(new HttpError(400, "Request incomplete"));

      return next(err);
    }
  };
}
