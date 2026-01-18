export const PORT = 8080;
export const OTP_EXPIRY_TIME = 5 * 60 * 1000;
export const BLOCK_DURATION = 10 * 60 * 1000;
export const MAX_OTP_ATTEMPTS = 3;
export const OTP_LENGTH = 6;
export const JWT_SECRET = process.env.JWT_SECRET || "test secret";
export const JWT_EXPIRY = "5m";
