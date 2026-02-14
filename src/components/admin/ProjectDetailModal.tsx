"use client";

import { useState } from "react";
import {
  X,
  Save,
  Clock,
  Calculator,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface ProjectDetailModalProps {
  project: Record<string, unknown>;
  roiCalcs: Record<string, unknown>[];
  onClose: () => void;
  onRefresh: () => void;
}

const statuses = ["pending", "approved", "in-progress", "completed", "on-hold", "rejected"];
const priorities = ["low", "medium", "high", "critical"];

const priorityColors: Record<string, string> = {
  low: "text-gray-500",
  medium: "text-blue-600",
  high: "text-amber-600",
  critical: "text-red-600",
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function ProjectDetailModal({ project, roiCalcs, onClose, onRefresh }: ProjectDetailModalProps) {
  const [status, setStatus] = useState((project.status as string) || "pending");
  const [priority, setPriority] = useState((project.priority as string) || "medium");
  const [progress, setProgress] = useState((project.progress as number) || 0);
  const [adminNotes, setAdminNotes] = useState((project.adminNotes as string) || "");
  const [saving, setSaving] = useState(false);

  const linkedRoi = roiCalcs.find(
    (r) =>
      (r.id as string) === (project.roiCalculationId as string) ||
      (r.projectId as string) === (project.id as string)
  );

  const statusHistory = (project.statusHistory as Array<{ status: string; changedAt: string; changedBy: string }>) || [];

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, priority, progress, adminNotes }),
      });
      if (!res.ok) throw new Error("Failed to save");
      onRefresh();
      onClose();
    } catch {
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{project.projectName as string}</h2>
            <p className="text-xs text-gray-500">
              {project.department as string} &middot; Submitted {formatDate(project.submittedDate as string)}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Status / Priority / Progress Controls */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
                  priorityColors[priority]
                )}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Progress ({progress}%)
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full mt-1"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Project Details</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Lead:</span>{" "}
                <span className="text-gray-700">{project.projectLead as string}</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>{" "}
                <span className="text-gray-700">{project.contactEmail as string}</span>
              </div>
              <div>
                <span className="text-gray-400">Timeline:</span>{" "}
                <span className="text-gray-700">{(project.timeline as string) || "—"}</span>
              </div>
              <div>
                <span className="text-gray-400">Budget:</span>{" "}
                <span className="text-gray-700">{(project.budget as string) || "—"}</span>
              </div>
              <div>
                <span className="text-gray-400">Affected Staff:</span>{" "}
                <span className="text-gray-700">{(project.affectedStaff as number) || 0}</span>
              </div>
              <div>
                <span className="text-gray-400">Hours/Week Saved:</span>{" "}
                <span className="text-gray-700">{(project.hoursPerWeek as number) || 0}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {(project.description as string) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Description</h3>
              <p className="text-sm text-gray-600">{project.description as string}</p>
            </div>
          )}

          {/* Problem / Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            {(project.problem as string) && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Problem</h3>
                <p className="text-sm text-gray-600">{project.problem as string}</p>
              </div>
            )}
            {(project.solution as string) && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Solution</h3>
                <p className="text-sm text-gray-600">{project.solution as string}</p>
              </div>
            )}
          </div>

          {/* ROI Section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-4 w-4 text-brand-600" />
              <h3 className="text-sm font-semibold text-gray-900">ROI</h3>
            </div>
            {linkedRoi ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(((linkedRoi.results as Record<string, number>)?.totalAnnualSavings) || 0)}
                  </p>
                  <p className="text-[11px] text-gray-500">Annual Savings</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {((linkedRoi.results as Record<string, number>)?.roi) || 0}%
                  </p>
                  <p className="text-[11px] text-gray-500">ROI</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {((linkedRoi.results as Record<string, number>)?.annualHoursSaved) || 0}
                  </p>
                  <p className="text-[11px] text-gray-500">Hours Saved/Year</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {((linkedRoi.results as Record<string, number>)?.paybackMonths) || 0}
                  </p>
                  <p className="text-[11px] text-gray-500">Payback (months)</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">No ROI calculation linked</p>
                <a
                  href={`/roi-calculator?projectId=${project.id}&projectName=${encodeURIComponent((project.projectName as string) || "")}&department=${encodeURIComponent((project.department as string) || "")}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-500"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Calculate ROI
                </a>
              </div>
            )}
          </div>

          {/* Admin Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Admin Notes</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              placeholder="Internal notes about this project..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
            />
          </div>

          {/* Status History */}
          {statusHistory.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-900">Status History</h3>
              </div>
              <div className="space-y-2">
                {[...statusHistory].reverse().map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <StatusBadge status={entry.status} />
                    <span className="text-gray-400">{formatDate(entry.changedAt)}</span>
                    <span className="text-gray-400">by {entry.changedBy}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
