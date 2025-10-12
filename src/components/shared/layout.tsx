import { ThemeProvider } from "@/context/theme-context";
import localFont from "next/font/local";
import "@/app/globals.css";
import "remixicon/fonts/remixicon.css";

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
    <html>
      <body className={`${halenoir.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
