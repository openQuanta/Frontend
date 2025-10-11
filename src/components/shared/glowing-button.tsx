"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function GlowingButton({
  children,
  onClick,
}: GlowingButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    let angle = 0;
    let frame: number;

    const rotate = () => {
      angle = (angle + 1.2) % 360; // controls rotation speed
      btn.style.setProperty("--angle", `${angle}deg`);
      frame = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Button
      ref={btnRef}
      onClick={onClick}
      variant="ghost"
      className={`glowing-border bg-black/90 backdrop-blur-sm`}
    >
      {children}
    </Button>
  );
}
