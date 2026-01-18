export interface LoginFormData {
  identifier: string;
}

export interface OtpFormData {
  otp: string;
}

export interface AuthUser {
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
