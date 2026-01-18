"use client";

import { AuthLayout } from "@/components";
import { WelcomeContainer } from "@/features/auth";

export default function HomePage() {
  return (
    <AuthLayout>
      <WelcomeContainer />
    </AuthLayout>
  );
}
