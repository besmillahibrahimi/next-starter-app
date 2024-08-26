import * as React from "react";
import { cn } from "@/lib/utils";

interface HalfCircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
}

export default function HalfCircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  ...props
}: HalfCircularProgressProps) {
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const offset = (2 - percentage / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex  flex-col items-center ", className)}
      style={{ width: size, height: size / 1.9, transform: "rotateY(180deg)" }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      {/* size  1.8 */}
      <svg width={size} height={size} className="rotate-[0deg]">
        <circle
          style={{ color: "hsl(var(--bg-quaternary))" }}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
        <circle
          className="rotate-[0deg]"
          style={{ color: "hsl(var(--bg-brand-solid))" }}
          strokeWidth={strokeWidth}
          strokeDasharray={`${offset} ${offset}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div
        className="absolute bottom-0 text-center"
        style={{ transform: "rotateY(-180deg)" }}
      >
        <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
