"use client";

import { useState } from "react";
import { Search, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { ProjectDetailModal } from "./ProjectDetailModal";

interface ProjectsTabProps {
  projects: Record<string, unknown>[];
  roiCalcs: Record<string, unknown>[];
  onRefresh: () => void;
}

const statusFilters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
  { value: "rejected", label: "Rejected" },
];

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export function ProjectsTab({ projects, roiCalcs, onRefresh }: ProjectsTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Record<string, unknown> | null>(null);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      !search ||
      (p.projectName as string)?.toLowerCase().includes(search.toLowerCase()) ||
      (p.department as string)?.toLowerCase().includes(search.toLowerCase()) ||
      (p.projectLead as string)?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || (p.status as string) === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    const da = (a.submittedDate as string) || "";
    const db = (b.submittedDate as string) || "";
    return db.localeCompare(da);
  });

  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Status Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer",
              statusFilter === f.value
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1 opacity-70">
                ({projects.filter((p) => (p.status as string) === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <FolderKanban className="h-10 w-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">
            {search || statusFilter !== "all" ? "No projects match your filters" : "No projects submitted yet"}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((project) => {
            const progress = (project.progress as number) || 0;
            return (
              <button
                key={project.id as string}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <StatusBadge status={(project.status as string) || "pending"} />
                  <span className="text-sm font-bold text-brand-600">
                    {formatCurrency((project.annualSavings as number) || 0)}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {project.projectName as string}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {project.department as string} &middot; {project.projectLead as string}
                </p>
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-brand-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{progress}% complete</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          roiCalcs={roiCalcs}
          onClose={() => setSelectedProject(null)}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}
