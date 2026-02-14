import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "Estimate the return on investment for AI initiatives in your department.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
