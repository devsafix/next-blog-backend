import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

export const auth = (...requiredRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.blogAppToken;

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: No token provided" });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload & { id: number; role: Role };

      req.user = decoded;

      // 4. Check role
      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have permission",
        });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: Token expired" });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: Invalid token" });
      }
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
};
