import localFont from "next/font/local";
import "@/app/globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "@/components/ui/sonner";
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

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${halenoir.variable} antialiased`}>
        <SolanaProvider>
          {children}
          <Toaster />
        </SolanaProvider>
      </body>
    </html>
  );
}
