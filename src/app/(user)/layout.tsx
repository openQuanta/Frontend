import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "remixicon/fonts/remixicon.css";
import { ThemeProvider } from "@/context/theme-context";
import logo from "@/assets/brand/logoWordBlack.svg";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
          {/* <Header /> */}
          <header className="fixed top-0 z-10 w-full bg-black/30 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-5 w-full max-w-[1200px] mx-auto">
              <Link href="/" id="logo" className="w-full max-w-[200px]">
                <Image
                  src={logo}
                  alt="OpenQuanta"
                  className="w-full dark:invert"
                />
              </Link>

              <div>
                <Button variant="outline" size="lg">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </header>
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
