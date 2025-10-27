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
<<<<<<< HEAD
      <body className={`${halenoir.variable} antialiased`        }>
=======
      <body className={`${halenoir.variable} antialiased`}>
>>>>>>> eb8c23c05699f58276c11dd45bdab2eff7f4cce1
        {children}
        <Toaster />
      </body>
    </html>
  );
}
