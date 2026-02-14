import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  icon: Icon,
  title,
  children,
  className,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-100 text-brand-600 shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
