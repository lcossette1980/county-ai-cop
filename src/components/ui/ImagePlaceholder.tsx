import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageOff, type LucideIcon } from "lucide-react";

type GradientVariant = "brand" | "accent" | "warm" | "cool" | "neutral";

const gradients: Record<GradientVariant, string> = {
  brand: "from-brand-800 to-brand-600",
  accent: "from-brand-700 to-accent-500",
  warm: "from-amber-500 to-orange-600",
  cool: "from-cyan-500 to-brand-600",
  neutral: "from-gray-200 to-gray-300",
};

interface ImagePlaceholderProps {
  src?: string;
  alt?: string;
  icon?: LucideIcon;
  label?: string;
  gradient?: GradientVariant;
  className?: string;
  aspectRatio?: string;
}

export function ImagePlaceholder({
  src,
  alt,
  icon: Icon = ImageOff,
  label,
  gradient = "brand",
  className,
  aspectRatio = "aspect-video",
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden",
          aspectRatio,
          className
        )}
      >
        <Image
          src={src}
          alt={alt || label || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-gradient-to-br rounded-2xl overflow-hidden",
        gradients[gradient],
        aspectRatio,
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      <Icon
        className={cn(
          "h-12 w-12 relative z-10",
          gradient === "neutral" ? "text-gray-400" : "text-white/60"
        )}
      />
      {label && (
        <p
          className={cn(
            "mt-2 text-sm font-medium relative z-10",
            gradient === "neutral" ? "text-gray-500" : "text-white/70"
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
}
