"use client";

import { useState } from "react";
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

export default function EmailVerificationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Your verification code must be 6 digits.");
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // TODO: Implement your OTP verification API call here
      // const response = await verifyEmailOtp(otp);
      toast.success("Email verified successfully!");
      // Redirect to dashboard or next step
      // router.push('/dashboard');
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid or expired verification code");
      toast.error("Invalid or expired verification code");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="py-32 px-6 flex flex-col gap-24 items-center">
      <section className="w-full max-w-[500px] mx-auto">
        <form
          onSubmit={onSubmit}
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
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
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
            <Link
              href="/"
              className="font-medium text-foreground hover:underline"
            >
              Resend
            </Link>
          </footer>
        </form>
      </section>
    </main>
  );
}
