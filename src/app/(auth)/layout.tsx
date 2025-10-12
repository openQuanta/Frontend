import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/shared/layout";
import loginBg from "@/assets/images/LOGIN.png";
import { AuthHeader } from "@/components/shared/header";

export const metadata: Metadata = {
  title: "Auth - OpenQuanta",
  description:
    "openQuanta powered by DeSciE=mc² A decentralized science platform that powers researchers to publish, review and monetize their work transparently using blockchain technology.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper>
      <div className="relative w-full">
        <div
          style={{ backgroundImage: `url(${loginBg.src})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
        />
        <div className="relative z-10">
          <AuthHeader />
          {children}
        </div>
      </div>
    </LayoutWrapper>
  );
}
