import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { authStorage } from "@/shared/utils";
import { ROUTES } from "@/shared/constants";
import { handleAuthError, validateOtp, parseExpiry } from "../utils";

export const useOtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setError(null);

    const validationError = validateOtp(otp);
    if (validationError) {
      setError(validationError);
      return;
    }

    const identifier = authStorage.getIdentifier();
    if (!identifier) {
      router.push(ROUTES.LOGIN);
      return;
    }

    setLoading(true);
    try {
      const res = await authService.verifyOtp(identifier, otp);
      authStorage.setToken(res.token);

      const expiryMs = parseExpiry(res.expiresIn);
      authStorage.setTokenExpiry((Date.now() + expiryMs).toString());

      router.push(ROUTES.HOME);
    } catch (err) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    isLoading: loading,
    error,
    handleSubmit,
  };
};
