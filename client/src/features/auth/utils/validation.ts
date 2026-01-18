import { ApiError } from "@/shared/types";

export const handleAuthError = (error: unknown): string => {
  if ((error as ApiError).message) {
    return (error as ApiError).message;
  }
  return "An unexpected error occurred";
};

export const validateIdentifier = (identifier: string) => {
  if (!identifier.trim()) {
    return "Identifier is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-()]+$/;

  if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
    return "Please enter a valid email or phone number";
  }

  return null;
};

export const validateOtp = (otp: string) => {
  if (!otp.trim()) return "OTP is required";
  if (!/^\d{6}$/.test(otp)) return "OTP must be 6 digits";
  return null;
};
export const parseExpiry = (expiry: string): number => {
  const match = expiry.match(/^(\d+)([smhd])$/);
  if (!match) return 24 * 60 * 60 * 1000;

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000;
  }
};
