"use client";
import { type ReactNode } from "react";

/** Magnetic component (disabled to prevent buttons from floating/moving with mouse). */
export default function Magnetic({
  children,
  strength,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  return (
    <div className={className ?? "inline-block"}>
      {children}
    </div>
  );
}
