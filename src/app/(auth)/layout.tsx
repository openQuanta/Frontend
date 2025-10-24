import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/shared/layout";
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
      <AuthHeader />
      {children}
    </LayoutWrapper>
  );
}
