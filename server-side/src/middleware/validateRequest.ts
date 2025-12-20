import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      });

      next();
    } catch (error: any) {
      return error;
    }
  };
}
