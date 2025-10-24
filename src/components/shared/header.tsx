"use client";

import { AlignRight, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
} from "@/components/ui/sheet";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/explore", label: "Explore" },
  { href: "/document", label: "Document" },
  { href: "/about", label: "About" },
];

export function MarketingHeader() {
  return (
    <header className="fixed top-0 z-10 w-full bg-black/30 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between gap-12 w-full max-w-[1200px] mx-auto">
        <Link href="/" id="logo" className="flex items-center gap-2">
          <Image
            src="/images/logo_white.svg"
            alt="OpenQuanta"
            width={32}
            height={32}
          />

          <h1 className="text-lg font-bold">openQuanta</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-between w-full">
          <div className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <Button variant="ghost" key={link.href} className="px-2 py-1">
                <Link
                  href={link.href}
                  className="text-xs drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-300"
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>

          <div className="flex gap-6 items-center">
            <Link href="/founding-contributor">
              <Button variant="ghost" className="group">
                Become a founding contributor{" "}
                <div className="relative w-4 h-4 mt-0.5">
                  <ChevronRight className="absolute transition-all duration-1000 group-hover:opacity-0 right-0" />
                  <ArrowRight className="absolute opacity-0 transition-all duration-1000 group-hover:opacity-100 right-0.5" />
                </div>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-white hover:bg-white/90 text-black">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Sheet Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-16 h-16"
              >
                <AlignRight className="w-full h-full" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader></SheetHeader>
              <div className="flex flex-col gap-8 p-6 py-12">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="/founding-contributor">
                    Become a founding contributor
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard">
                    <Button className="bg-white hover:bg-white/90 text-black">
                      Get Started
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  }
);

export function UserHeader() {
  const wallet = useWallet();

  // Memoize the truncated address to avoid recalculating on every render
  const displayAddress = useMemo(() => {
    if (!wallet.publicKey) return null;
    const address = wallet.publicKey.toBase58();
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, [wallet.publicKey]);

  return (
    <header className="fixed top-0 z-10 w-full bg-black/30 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between gap-5 w-full max-w-[1200px] mx-auto">
        <Link href="/" id="logo" className="flex items-center gap-2">
          <Image
            src="/images/logo_colored.svg"
            alt="OpenQuanta"
            width={32}
            height={32}
          />

          <h1 className="text-lg font-bold">openQuanta</h1>
        </Link>

        {/* Wallet Section */}
        <div className="flex items-center gap-3">
          {/* Optional: Add balance display */}
          {wallet.connected && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-white/70">Connected</span>
            </div>
          )}

          {/* Custom Wallet Button or use default */}
          <WalletMultiButton>
            <span className="flex items-center gap-2">
              {wallet.connecting && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {wallet.connecting
                ? "Connecting..."
                : wallet.connected
                ? displayAddress
                : "Connect Wallet"}
            </span>
          </WalletMultiButton>
        </div>
      </div>
    </header>
  );
}

export function AuthHeader() {
  return (
    <header className="fixed top-0 z-10 w-full bg-black/30 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between gap-5 w-full max-w-[1200px] mx-auto">
        <Link href="/" id="logo" className="flex items-center gap-2">
          <Image
            src="/images/logo_colored.svg"
            alt="OpenQuanta"
            width={32}
            height={32}
          />

          <h1 className="text-lg font-bold">openQuanta</h1>
        </Link>
      </div>
    </header>
  );
}
