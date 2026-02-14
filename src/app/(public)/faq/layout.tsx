import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about AI in county government.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
