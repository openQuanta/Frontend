"use client";

import { AlignRight, ChevronRight } from "lucide-react";
import logo from "@/assets/brand/logoWordBlack.svg";
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

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/publish", label: "Publish" },
  { href: "/discover", label: "Discover" },
  { href: "/about", label: "About" },
];

export function MarketingHeader() {
  return (
    <header className="fixed top-0 z-10 w-full bg-black/30 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-5 w-full max-w-[1200px] mx-auto">
        <Link href="/" id="logo" className="w-full max-w-[200px]">
          <Image src={logo} alt="OpenQuanta" className="w-full dark:invert" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-between w-full">
          <div className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors text-[12px]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex gap-6 items-center">
            <Button variant="link">
              Become a founding contributor <ChevronRight />
            </Button>
            <Button className="bg-white">Get Started</Button>
          </div>
        </nav>

        {/* Mobile Sheet Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-18 h-18"
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
                  <Button className="bg-white">Get Started</Button>
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
  return (
    <header className="fixed top-0 z-10 w-full bg-black/30 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-5 w-full max-w-[1200px] mx-auto">
        <Link href="/" id="logo" className="w-full max-w-[200px]">
          <Image src={logo} alt="OpenQuanta" className="w-full dark:invert" />
        </Link>

        <div>
          <WalletMultiButton>
            {wallet.connected ? wallet.publicKey?.toBase58() : "Connect Wallet"}
          </WalletMultiButton>
        </div>
      </div>
    </header>
  );
}
