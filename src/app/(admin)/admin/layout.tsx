import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Manage AI projects, prompts, and community submissions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
