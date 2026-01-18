import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/shared/utils";
import { ROUTES } from "@/shared/constants";

export const useAuthRedirect = (redirectType: string) => {
  const router = useRouter();

  useEffect(() => {
    const token = authStorage.getToken();
    const expiryTime = authStorage.getTokenExpiry();
    const isAuthenticated =
      token && expiryTime && Date.now() < parseInt(expiryTime, 10);

    if (redirectType === "guest" && isAuthenticated) {
      router.push(ROUTES.HOME);
    } else if (redirectType === "auth" && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [router, redirectType]);
};
