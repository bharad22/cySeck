import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { authStorage } from "@/shared/utils";
import { ROUTES } from "@/shared/constants";
import { handleAuthError, validateIdentifier } from "../utils";

export const useLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    const validationError = validateIdentifier(identifier);
    if (validationError) {
      setError(validationError);
      return false;
    }

    setLoading(true);
    try {
      await authService.requestOtp(identifier);
      authStorage.setIdentifier(identifier);
      return true;
    } catch (err) {
      setError(handleAuthError(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    identifier,
    setIdentifier,
    isLoading: loading,
    error,
    handleSubmit,
  };
};
