import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Admin login for the AI Community of Practice.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
