"use client";

import {
  FolderKanban,
  Loader2,
  CheckCircle2,
  Clock,
  DollarSign,
  MessageSquare,
  BookOpen,
  Mail,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { StatusBadge } from "./StatusBadge";

interface AdminStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingReview: number;
  totalAnnualSavings: number;
  averageROI: number;
  totalHoursSaved: number;
  totalFTESaved: number;
  pendingPrompts: number;
  approvedPrompts: number;
  totalPrompts: number;
  newContacts: number;
  totalContacts: number;
  totalROICalculations: number;
  projectsByStatus: Record<string, number>;
  projectsByDepartment: Record<string, number>;
  roiByDepartment: Record<string, number>;
  submissionsByMonth: Array<{ month: string; projects: number; prompts: number }>;
}

interface DashboardTabProps {
  stats: AdminStats | null;
  projects: Record<string, unknown>[];
  onNavigate: (tab: string) => void;
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export function DashboardTab({ stats, projects, onNavigate }: DashboardTabProps) {
  if (!stats) return null;

  const recentProjects = [...projects]
    .sort((a, b) => {
      const da = (a.submittedDate as string) || "";
      const db = (b.submittedDate as string) || "";
      return db.localeCompare(da);
    })
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Projects" value={stats.totalProjects} icon={FolderKanban} />
        <StatCard label="Active" value={stats.activeProjects} icon={Loader2} trend={`${stats.completedProjects} completed`} />
        <StatCard label="Pending Review" value={stats.pendingReview} icon={Clock} />
        <StatCard
          label="Annual Savings"
          value={formatCurrency(stats.totalAnnualSavings)}
          icon={DollarSign}
          trend={`${stats.averageROI}% avg ROI`}
        />
      </div>

      {/* Pending Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate("projects")}
          className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900">{stats.pendingReview}</p>
              <p className="text-xs text-gray-500">Projects pending review</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => onNavigate("prompts")}
          className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-violet-50 text-violet-600">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900">{stats.pendingPrompts}</p>
              <p className="text-xs text-gray-500">Prompts awaiting approval</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => onNavigate("contacts")}
          className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-blue-50 text-blue-600">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900">{stats.newContacts}</p>
              <p className="text-xs text-gray-500">New contact messages</p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Recent Projects</h2>
          <button
            onClick={() => onNavigate("projects")}
            className="text-xs font-semibold text-brand-600 hover:text-brand-500 cursor-pointer"
          >
            View all
          </button>
        </div>
        {recentProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <FolderKanban className="h-10 w-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No projects submitted yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Project</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Lead</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentProjects.map((project) => (
                  <tr key={project.id as string} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {project.projectName as string}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {project.department as string}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {project.projectLead as string}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={(project.status as string) || "pending"} />
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency((project.annualSavings as number) || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
