import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  approved: "bg-blue-50 text-blue-700 ring-blue-600/20",
  "in-progress": "bg-violet-50 text-violet-700 ring-violet-600/20",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "on-hold": "bg-gray-50 text-gray-600 ring-gray-500/20",
  rejected: "bg-red-50 text-red-700 ring-red-600/20",
  new: "bg-blue-50 text-blue-700 ring-blue-600/20",
  read: "bg-gray-50 text-gray-600 ring-gray-500/20",
  replied: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  archived: "bg-gray-50 text-gray-400 ring-gray-400/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset capitalize",
        statusStyles[status] || "bg-gray-50 text-gray-600 ring-gray-500/20"
      )}
    >
      {status.replace("-", " ")}
    </span>
  );
}
