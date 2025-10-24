"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/images/google_icon.svg";
import walletIcon from "@/assets/images/wallet_icon.svg";
import Link from "next/link";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { setCookie } from "cookies-next";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const wallet = useWallet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // you would validate the email and handle the login logic here
    console.log("Email submitted:", email);

    // Store the email (this is just in-memory, use context, state management, or a cookie)
    setCookie("userEmail", email, { path: "/" });

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <main className="py-32 flex flex-col gap-24 items-center">
      <section className="w-full max-w-[500px] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full backdrop-blur-sm p-6 rounded-2xl relative"
        >
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white top-0 left-0" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white top-0 right-0" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white bottom-0 left-0" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white bottom-0 right-0" />
          <header className="flex flex-col items-center gap-4 mb-6">
            <Image
              src="/images/logo_white.svg"
              alt="OpenQuanta logo"
              width={40}
              height={40}
              className="w-10 h-auto"
            />
            <h2 className="text-2xl text-white/80">Sign in to OpenQuanta</h2>
          </header>

          <Field>
            <FieldLabel htmlFor="email" className="font-normal">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Button variant="outline" type="submit" className="w-full">
            Continue
          </Button>

          <Button variant="outline" className="w-full gap-2">
            <Image src={googleIcon} alt="Google icon" width={20} height={20} />
            Continue With Google
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <Image src={walletIcon} alt="Wallet icon" width={20} height={20} />
            Continue With Wallet
          </Button>

          <footer className="mt-6 text-center text-xs text-muted-foreground">
            By logging in you agree to our{" "}
            <Link
              href="/"
              className="font-medium text-foreground hover:underline"
            >
              Terms and Conditions
            </Link>
          </footer>
        </form>
      </section>
    </main>
  );
}
