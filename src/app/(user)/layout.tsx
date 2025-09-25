import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "remixicon/fonts/remixicon.css";
import { ThemeProvider } from "@/context/theme-context";

import { UserHeader } from "@/components/shared/header";
import { SolanaProvider } from "@/context/solana";

const halenoir = localFont({
  variable: "--font-halenoir",
  src: [
    {
      path: "../../assets/fonts/HalenoirCompact-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "OpenQuanta",
  description:
    "openQuanta powered by DeSciE=mc² A decentralized science platform that powers researchers to publish, review and monetize their work transparently using blockchain technology.",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${halenoir.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SolanaProvider>
            <UserHeader />
            {children}
          </SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
