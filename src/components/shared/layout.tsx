import localFont from "next/font/local";
import "@/app/globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "@/components/ui/sonner";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
