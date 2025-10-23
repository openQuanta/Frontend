"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/brand/logo_white.svg";
import "./globals.css";

export default function NotFound() {
  return (
    <main className="text-white min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0A0A0A] to-[#1A0A0A]">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <Image
            src={logo}
            alt="OpenQuanta logo"
            width={64}
            height={64}
            className="mx-auto"
          />
          <div className="flex items-center justify-center gap-2 p-2 px-4 border border-white/30 rounded-full w-max mx-auto mb-6">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <h4 className="text-sm">Page Not Found</h4>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold">Oops!</h2>
          <p className="text-white/64 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto text-black"
          >
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
