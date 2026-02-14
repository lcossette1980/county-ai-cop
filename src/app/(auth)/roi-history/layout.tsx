import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI History | County Gov AI CoP",
  description: "View your saved AI ROI calculations and link them to projects.",
};

export default function ROIHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
