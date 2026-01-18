"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { authStorage } from "@/shared/utils";
import { ROUTES } from "@/shared/constants";

export const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    authStorage.clearAuth();
    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="w-full py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/logo.png"
              alt="CySecK Logo"
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
