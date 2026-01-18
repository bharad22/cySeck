"use client";

import { useState } from "react";
import { useLogin, useOtpVerification, useAuthRedirect } from "../hooks";
import { InputField, ErrorMessage } from "@/components";

export const LoginContainer: React.FC = () => {
  useAuthRedirect("guest");

  const [showOtp, setShowOtp] = useState(false);

  const {
    identifier,
    setIdentifier,
    isLoading: isRequestingOtp,
    error: loginError,
    handleSubmit: handleRequestOtp,
  } = useLogin();

  const {
    otp,
    setOtp,
    isLoading: isVerifyingOtp,
    error: otpError,
    handleSubmit: handleVerifyOtp,
  } = useOtpVerification();

  const onRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleRequestOtp();
    if (success) {
      setShowOtp(true);
    }
  };

  const onVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerifyOtp();
  };

  const handleBackToLogin = () => {
    setShowOtp(false);
    setOtp("");
  };

  if (showOtp) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-gray-600 text-sm">
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold">{identifier}</span>
          </p>
        </div>

        <ErrorMessage message={otpError} />

        <form onSubmit={onVerifyOtp} className="space-y-4">
          <InputField
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={setOtp}
            disabled={isVerifyingOtp}
          />

          <button
            type="submit"
            disabled={isVerifyingOtp}
            className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleBackToLogin}
            disabled={isVerifyingOtp}
            className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      <ErrorMessage message={loginError} />

      <form onSubmit={onRequestOtp} className="space-y-4">
        <InputField
          placeholder="Email or Phone Number"
          value={identifier}
          onChange={setIdentifier}
          disabled={isRequestingOtp}
        />

        <button
          type="submit"
          disabled={isRequestingOtp}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRequestingOtp ? "Sending OTP..." : "Continue with OTP"}
        </button>
      </form>
    </div>
  );
};
