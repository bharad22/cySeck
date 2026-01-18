export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    REQUEST_OTP: "/auth/request-otp",
    VERIFY_OTP: "/auth/verify-otp",
    GET_PROFILE: "/auth/profile",
    LOGOUT: "/auth/logout",
  },
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  IDENTIFIER: "identifier",
} as const;

export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
} as const;
