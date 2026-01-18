export interface OtpRecord {
  otp: string;
  expiresAt: number;
  attempts: number;
}

export interface RequestOtpBody {
  identifier: string;
}

export interface VerifyOtpBody {
  identifier: string;
  otp: string;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  identifier?: string;
}

export interface AuthRequest extends Express.Request {
  user?: string;
}
