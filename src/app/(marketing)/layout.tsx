import type { Metadata } from "next";
import Footer from "@/components/shared/footer";
import { MarketingHeader } from "@/components/shared/header";
import { LayoutWrapper } from "@/components/shared/layout";

export const metadata: Metadata = {
  title: "OpenQuanta",
  description:
    "openQuanta powered by DeSciE=mc² A decentralized science platform that powers researchers to publish, review and monetize their work transparently using blockchain technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutWrapper>
      <MarketingHeader />
      {children}
      <Footer />
    </LayoutWrapper>
  );
}
