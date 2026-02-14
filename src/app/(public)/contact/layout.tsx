import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Help",
  description:
    "Contact the AI Community of Practice team for assistance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
