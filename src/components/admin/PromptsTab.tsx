"use client";

import { useState } from "react";
import { BookOpen, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface PromptsTabProps {
  prompts: Record<string, unknown>[];
  onRefresh: () => void;
}

const filterTabs = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PromptsTab({ prompts, onRefresh }: PromptsTabProps) {
  const [filter, setFilter] = useState("pending");
  const [processing, setProcessing] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? prompts
    : prompts.filter((p) => (p.status as string) === filter);

  const sorted = [...filtered].sort((a, b) => {
    const da = (a.submittedDate as string) || "";
    const db = (b.submittedDate as string) || "";
    return db.localeCompare(da);
  });

  async function handleAction(id: string, action: "approved" | "rejected") {
    setProcessing(id);
    try {
      const res = await fetch(`/api/prompts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      if (!res.ok) throw new Error("Failed");
      onRefresh();
    } catch {
      alert(`Failed to ${action === "approved" ? "approve" : "reject"} prompt.`);
    } finally {
      setProcessing(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2">
        {filterTabs.map((tab) => {
          const count = tab.value === "all"
            ? prompts.length
            : prompts.filter((p) => (p.status as string) === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer",
                filter === tab.value
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {tab.label}
              <span className="ml-1 opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Prompt Cards */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <BookOpen className="h-10 w-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No prompts in this category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((prompt) => {
            const id = prompt.id as string;
            const isExpanded = expandedId === id;
            return (
              <div key={id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : id)}
                  className="w-full px-5 py-4 text-left cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {prompt.title as string}
                        </h3>
                        <StatusBadge status={(prompt.status as string) || "pending"} />
                      </div>
                      <p className="text-xs text-gray-500">
                        {prompt.category as string} &middot; {formatDate(prompt.submittedDate as string)}
                        {(prompt.submitterName as string) && ` &middot; by ${prompt.submitterName as string}`}
                      </p>
                    </div>
                    {/* Action Buttons (pending only) */}
                    {(prompt.status as string) === "pending" && (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleAction(id, "approved")}
                          disabled={processing === id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          {processing === id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(id, "rejected")}
                          disabled={processing === id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-gray-50 pt-3 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</p>
                      <p className="text-sm text-gray-600">{prompt.description as string}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Template</p>
                      <pre className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap font-mono text-xs">
                        {prompt.template as string}
                      </pre>
                    </div>
                    {(prompt.tags as string[])?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {(prompt.tags as string[]).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full text-[11px] text-gray-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
