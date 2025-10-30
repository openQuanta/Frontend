"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getCookie } from "cookies-next";

export default function EmailVerificationPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedEmail = getCookie("userEmail");
    if (!savedEmail) {
      toast.error("No email found. Please sign in again.");
      router.push("/login");
    } else {
      setEmail(savedEmail as string);
    }
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Your verification code must be 6 digits.");
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    if (!email) {
      setError("No email found. Please log in again.");
      toast.error("Missing email session");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (verifyError || !data?.user) {
        throw verifyError || new Error("Invalid verification code");
      }

      toast.success("Email verified successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      setError("Invalid or expired verification code");
      toast.error("Invalid or expired verification code");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!email) {
      toast.error("No email found. Please log in again.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error("Failed to resend verification email.");
      console.error(error);
    } else {
      toast.success("Verification code resent!");
    }
  }

  return (
    <main className="py-32 px-6 flex flex-col gap-24 items-center">
      <section className="w-full max-w-[500px] mx-auto">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 w-full backdrop-blur-sm p-6 rounded-2xl relative"
        >
          {/* corner dots */}
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
            <h2 className="text-lg md:text-2xl text-center text-white/80">
              A 6-digit code has been sent to your email
              <br />
              Enter it below to verify your access
            </h2>
          </header>

          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification Code
              </FieldLabel>
              <div className="flex justify-center">
                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError("");
                  }}
                  disabled={isSubmitting}
                >
                  <InputOTPGroup className="gap-2">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <FieldDescription className="text-center mt-4 text-muted-foreground">
                Please enter the 6-digit code sent to your email
              </FieldDescription>
              {error && (
                <FieldError className="text-center">{error}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <Button
            variant="outline"
            type="submit"
            className="w-full"
            disabled={isSubmitting || otp.length !== 6}
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </Button>

          <footer className="mt-6 text-center text-xs text-muted-foreground">
            Didn&apos;t get the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-foreground hover:underline"
              disabled={isSubmitting}
            >
              Resend
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
