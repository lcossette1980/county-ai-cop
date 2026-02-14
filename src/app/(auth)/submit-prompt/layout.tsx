import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Prompt",
  description:
    "Share your AI prompts with the community.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
