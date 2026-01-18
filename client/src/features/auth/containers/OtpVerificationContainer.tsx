"use client";

import { useOtpVerification } from "../hooks";
import { InputField, Button, ErrorMessage } from "@/components";

export const OtpVerificationContainer: React.FC = () => {
  const { otp, setOtp, isLoading, error, handleSubmit } = useOtpVerification();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-xl mb-4 font-semibold">Verify OTP</h2>

      <ErrorMessage message={error} />

      <form onSubmit={onSubmit}>
        <InputField
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={setOtp}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};
