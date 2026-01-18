import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { RequestOtpBody, VerifyOtpBody } from "../types";

export class AuthController {
  async requestOtp(
    req: Request<{}, {}, RequestOtpBody>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log("Request body:", req.body);
      console.log("Request headers:", req.headers);

      const { identifier } = req.body;
      if (!identifier) {
        res.status(400).json({ message: "Identifier is required" });
        return;
      }

      authService.requestOtp(identifier);
      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      if (error instanceof Error && error.message.includes("blocked")) {
        res.status(403).json({ message: error.message });
        return;
      }
      next(error);
    }
  }

  async verifyOtp(
    req: Request<{}, {}, VerifyOtpBody>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { identifier, otp } = req.body;
      if (!identifier || !otp) {
        res.status(400).json({ message: "Identifier and OTP are required" });
        return;
      }

      const result = authService.verifyOtp(identifier, otp);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("blocked")) {
          res.status(403).json({ message: error.message });
          return;
        }
        if (error.message.includes("Invalid OTP")) {
          res.status(401).json({ message: error.message });
          return;
        }
        if (
          error.message.includes("not found") ||
          error.message.includes("expired")
        ) {
          res.status(400).json({ message: error.message });
          return;
        }
      }
      next(error);
    }
  }

  async getUserProfile(req: Request, res: Response, next: NextFunction) {
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

      const profile = {
        identifier,
        name: "Bharadwaj P",
        email: identifier.includes("@")
          ? identifier
          : "bharadwaj-test@gmail.com",
        phone: identifier.includes("@") ? "+91 9876543210" : identifier,
        avatar: "",
        role: "User",
        accountStatus: "Active",
        lastLogin: new Date().toISOString(),
        memberSince: "2024-01-15",
        verified: true,
      };

      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({ message: "Authorization token required" });
        return;
      }

      const success = authService.logout(token);
      if (success) {
        res.json({ message: "Logged out successfully" });
      } else {
        res.status(400).json({ message: "Invalid token" });
      }
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
