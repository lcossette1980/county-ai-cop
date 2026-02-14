import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accent?: "brand" | "accent" | "success" | "warning" | "danger";
}

export function Card({ children, className, hover = false, accent }: CardProps) {
  const accentBorder = accent
    ? {
        brand: "border-t-brand-600",
        accent: "border-t-accent-500",
        success: "border-t-success",
        warning: "border-t-warning",
        danger: "border-t-danger",
      }[accent]
    : "";

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100",
        accent && `border-t-4 ${accentBorder}`,
        hover && "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-5 border-b border-gray-100", className)}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-5", className)}>{children}</div>;
}
