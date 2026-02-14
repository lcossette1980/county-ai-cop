import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit AI Project",
  description:
    "Submit your AI project proposal for review and approval.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
