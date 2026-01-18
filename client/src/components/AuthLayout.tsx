"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};
