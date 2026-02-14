import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type BadgeVariant = "brand" | "accent" | "success" | "warning" | "danger" | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-brand-100 text-brand-700 ring-brand-200",
  accent: "bg-purple-50 text-accent-600 ring-purple-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-red-50 text-red-700 ring-red-200",
  neutral: "bg-gray-100 text-gray-600 ring-gray-200",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "brand", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
