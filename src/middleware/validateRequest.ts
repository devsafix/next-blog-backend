import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export const validateRequest =
  (schema: z.ZodObject<any, any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }
  };
