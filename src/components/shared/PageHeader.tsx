import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  gradient?: "brand" | "accent" | "dark";
  size?: "sm" | "md" | "lg";
}

const gradients = {
  brand: "from-brand-900 via-brand-800 to-brand-700",
  accent: "from-brand-900 via-brand-800 to-accent-600",
  dark: "from-brand-950 via-brand-900 to-brand-800",
};

const sizes = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

export function PageHeader({
  title,
  subtitle,
  children,
  gradient = "brand",
  size = "md",
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative bg-gradient-to-br text-white overflow-hidden",
        gradients[gradient],
        sizes[size]
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
