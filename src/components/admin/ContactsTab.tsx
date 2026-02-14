"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface ContactsTabProps {
  contacts: Record<string, unknown>[];
  onRefresh: () => void;
}

const filterTabs = [
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "archived", label: "Archived" },
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

export function ContactsTab({ contacts, onRefresh }: ContactsTabProps) {
  const [filter, setFilter] = useState("new");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = filter === "all"
    ? contacts
    : contacts.filter((c) => ((c.status as string) || "new") === filter);

  const sorted = [...filtered].sort((a, b) => {
    const da = (a.submittedDate as string) || "";
    const db = (b.submittedDate as string) || "";
    return db.localeCompare(da);
  });

  async function markAs(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      onRefresh();
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdating(null);
    }
  }

  async function handleExpand(id: string, currentStatus: string) {
    setExpandedId(expandedId === id ? null : id);
    // Auto-mark as read when expanding a new message
    if (expandedId !== id && (!currentStatus || currentStatus === "new")) {
      await markAs(id, "read");
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2">
        {filterTabs.map((tab) => {
          const count = tab.value === "all"
            ? contacts.length
            : contacts.filter((c) => ((c.status as string) || "new") === tab.value).length;
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

      {/* Contact Messages */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Mail className="h-10 w-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No messages in this category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((contact) => {
            const id = contact.id as string;
            const isExpanded = expandedId === id;
            const contactStatus = (contact.status as string) || "new";
            const isNew = contactStatus === "new";

            return (
              <div
                key={id}
                className={cn(
                  "bg-white rounded-2xl border overflow-hidden",
                  isNew ? "border-blue-200" : "border-gray-100"
                )}
              >
                <button
                  onClick={() => handleExpand(id, contactStatus)}
                  className="w-full px-5 py-4 text-left cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={cn(
                          "text-sm truncate",
                          isNew ? "font-bold text-gray-900" : "font-semibold text-gray-700"
                        )}>
                          {contact.subject as string}
                        </h3>
                        <StatusBadge status={contactStatus} />
                      </div>
                      <p className="text-xs text-gray-500">
                        {contact.name as string} &middot; {contact.department as string} &middot; {formatDate(contact.submittedDate as string)}
                      </p>
                    </div>
                    {isNew && (
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-gray-50 pt-3 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">From</p>
                      <p className="text-sm text-gray-600">
                        {contact.name as string} ({contact.email as string})
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Message</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{contact.message as string}</p>
                    </div>
                    {/* Status Actions */}
                    <div className="flex gap-2 pt-2">
                      {contactStatus !== "replied" && (
                        <button
                          onClick={() => markAs(id, "replied")}
                          disabled={updating === id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          {updating === id && <Loader2 className="h-3 w-3 animate-spin" />}
                          Mark as Replied
                        </button>
                      )}
                      {contactStatus !== "archived" && (
                        <button
                          onClick={() => markAs(id, "archived")}
                          disabled={updating === id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          Archive
                        </button>
                      )}
                    </div>
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
