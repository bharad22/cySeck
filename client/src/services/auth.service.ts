import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/shared/constants";

export interface RequestOtpResponse {
  message: string;
}

export interface VerifyOtpResponse {
  token: string;
  expiresIn: string;
}
export interface UserProfile {
  identifier: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  accountStatus: string;
  lastLogin: string;
  memberSince: string;
  verified: boolean;
}

export class AuthService {
  async requestOtp(identifier: string) {
    return apiService.post<RequestOtpResponse>(API_ENDPOINTS.AUTH.REQUEST_OTP, {
      identifier,
    });
  }

  async verifyOtp(identifier: string, otp: string) {
    return apiService.post<VerifyOtpResponse>(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      identifier,
      otp,
    });
  }

  async getUserProfile(token: string) {
    return apiService.get<UserProfile>(API_ENDPOINTS.AUTH.GET_PROFILE, token);
  }

  async logout(token: string) {
    return apiService.post<{ message: string }>(
      API_ENDPOINTS.AUTH.LOGOUT,
      {},
      token,
    );
  }
}

export const authService = new AuthService();
