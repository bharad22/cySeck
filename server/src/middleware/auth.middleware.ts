import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Authorization token required" });
      return;
    }

    const identifier = authService.validateSession(token);
    if (!identifier) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    (req as any).user = identifier;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
