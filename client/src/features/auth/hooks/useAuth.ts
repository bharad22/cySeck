import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { authStorage } from "@/shared/utils";
import { ROUTES } from "@/shared/constants";
import { useAuthRedirect } from "./useAuthRedirect";
import { handleAuthError } from "../utils";
import { AuthUser } from "../types";

export const useAuth = () => {
  useAuthRedirect("auth");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = authStorage.getToken();
      if (!token) {
        router.push(ROUTES.LOGIN);
        setIsLoading(false);
        return;
      }

      if (authStorage.isTokenExpired()) {
        authStorage.clearAuth();
        router.push(ROUTES.LOGIN);
        setIsLoading(false);
        return;
      }

      try {
        const response = await authService.getUserProfile(token);
        setUser(response);
      } catch (err) {
        setError(handleAuthError(err));
        authStorage.clearAuth();
        router.push(ROUTES.LOGIN);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const interval = setInterval(() => {
      if (authStorage.isTokenExpired()) {
        authStorage.clearAuth();
        router.push(ROUTES.LOGIN);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [router]);

  const logout = async () => {
    const token = authStorage.getToken();
    if (token) {
      try {
        await authService.logout(token);
      } catch (err) {
        console.error("Logout error:", err);
      }
    }
    authStorage.clearAuth();
    router.push(ROUTES.LOGIN);
  };

  return {
    user,
    isLoading,
    error,
    logout,
  };
};
