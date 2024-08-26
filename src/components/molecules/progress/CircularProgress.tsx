import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  shape?: "circle" | "halfCircle";
  direction?: "ltr" | "rtl";
}

export default function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  label,
  shape = "circle",
  direction = "ltr",
  ...props
}: CircularProgressProps) {
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = (shape === "circle" ? 2 : 1) * radius * Math.PI;
  const offset =
    ((shape === "circle" ? 1 : 2) - percentage / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center justify-center",
        className
      )}
      style={{
        width: size,
        height: size / (shape === "circle" ? 1 : 1.8),
        transform:
          shape === "halfCircle" && direction === "ltr"
            ? "rotateY(180deg)"
            : "",
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <svg
        width={size}
        height={size}
        className={`${
          shape === "circle" ? "rotate-[-90deg]" : "rotate-[0deg]"
        }`}
      >
        <circle
          style={{ color: "hsl(var(--bg-quaternary))" }}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          strokeDasharray={
            shape === "halfCircle" ? `${circumference} ${circumference}` : ""
          }
          strokeDashoffset={shape === "halfCircle" ? circumference : ""}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        />
        <circle
          style={{ color: "hsl(var(--bg-brand-solid))" }}
          strokeWidth={strokeWidth}
          strokeDasharray={
            shape === "halfCircle" ? `${offset} ${offset}` : circumference
          }
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
        className={`absolute flex flex-col text-center ${
          shape === "halfCircle" ? "bottom-0" : ""
        }`}
        style={{
          transform:
            shape === "halfCircle" && direction === "ltr"
              ? "rotateY(-180deg)"
              : "",
        }}
      >
        <span className="text-lg">{label}</span>
        <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
