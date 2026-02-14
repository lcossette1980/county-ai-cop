import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";

type AlertVariant = "success" | "warning" | "error" | "info";

const variantStyles: Record<AlertVariant, string> = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-brand-50 border-brand-200 text-brand-800",
};

const icons: Record<AlertVariant, typeof Info> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  className?: string;
}

export function Alert({ children, variant = "info", className }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border",
        variantStyles[variant],
        className
      )}
    >
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div className="text-sm">{children}</div>
    </div>
  );
}
