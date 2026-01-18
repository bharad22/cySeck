import jwt from "jsonwebtoken";
import { OtpRecord } from "../types";
import {
  OTP_EXPIRY_TIME,
  BLOCK_DURATION,
  MAX_OTP_ATTEMPTS,
  OTP_LENGTH,
  JWT_SECRET,
  JWT_EXPIRY,
} from "../utils/constants";

interface JwtPayload {
  identifier: string;
  iat?: number;
  exp?: number;
}

export class AuthService {
  private otpStore = new Map<string, OtpRecord>();
  private blockedUsers = new Map<string, number>();

  private generateOTP(): string {
    const min = Math.pow(10, OTP_LENGTH - 1);
    const max = Math.pow(10, OTP_LENGTH) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  }

  private generateToken(identifier: string) {
    return jwt.sign({ identifier }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  }

  isBlocked(identifier: string) {
    const until = this.blockedUsers.get(identifier);
    if (!until) return false;

    if (Date.now() > until) {
      this.blockedUsers.delete(identifier);
      return false;
    }
    return true;
  }

  private blockUser(identifier: string) {
    this.blockedUsers.set(identifier, Date.now() + BLOCK_DURATION);
  }

  requestOtp(identifier: string) {
    if (this.isBlocked(identifier)) {
      throw new Error("User is blocked for 10 minutes");
    }

    const otp = this.generateOTP();
    this.otpStore.set(identifier, {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_TIME,
      attempts: 0,
    });

    console.log(`OTP for ${identifier}: ${otp}`);
    return otp;
  }

  verifyOtp(identifier: string, otp: string) {
    const record = this.otpStore.get(identifier);

    if (!record) {
      throw new Error("OTP not found or expired");
    }

    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(identifier);
      throw new Error("OTP has expired");
    }

    if (record.otp !== otp) {
      record.attempts++;
      if (record.attempts >= MAX_OTP_ATTEMPTS) {
        this.blockUser(identifier);
        this.otpStore.delete(identifier);
        throw new Error(
          "Maximum attempts exceeded. User blocked for 10 minutes",
        );
      }
      throw new Error(
        `Invalid OTP. ${MAX_OTP_ATTEMPTS - record.attempts} attempts remaining`,
      );
    }

    this.otpStore.delete(identifier);
    const token = this.generateToken(identifier);

    return { token, expiresIn: JWT_EXPIRY };
  }

  validateSession(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      return decoded.identifier;
    } catch (error) {
      return null;
    }
  }

  logout(token: string) {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService();
