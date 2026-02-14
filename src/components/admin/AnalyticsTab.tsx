"use client";

import "@/lib/chartjs-setup";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { DollarSign, TrendingUp, Clock, Users } from "lucide-react";
import { StatCard } from "./StatCard";
import { ChartCard } from "./ChartCard";

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

interface AnalyticsTabProps {
  stats: AdminStats | null;
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

const statusColors: Record<string, string> = {
  pending: "#f59e0b",
  approved: "#3b82f6",
  "in-progress": "#8b5cf6",
  completed: "#10b981",
  "on-hold": "#6b7280",
  rejected: "#ef4444",
};

export function AnalyticsTab({ stats }: AnalyticsTabProps) {
  if (!stats) return null;

  // Status distribution doughnut
  const statusLabels = Object.keys(stats.projectsByStatus);
  const statusData = {
    labels: statusLabels.map((s) => s.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())),
    datasets: [
      {
        data: statusLabels.map((s) => stats.projectsByStatus[s]),
        backgroundColor: statusLabels.map((s) => statusColors[s] || "#9ca3af"),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  // ROI by department horizontal bar
  const deptLabels = Object.keys(stats.roiByDepartment);
  const roiBarData = {
    labels: deptLabels.length > 0 ? deptLabels : ["No data"],
    datasets: [
      {
        data: deptLabels.length > 0 ? deptLabels.map((d) => stats.roiByDepartment[d]) : [0],
        backgroundColor: "#6366f1",
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  // Submissions over time line chart
  const lineData = {
    labels: stats.submissionsByMonth.map((m) => m.month),
    datasets: [
      {
        label: "Projects",
        data: stats.submissionsByMonth.map((m) => m.projects),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Prompts",
        data: stats.submissionsByMonth.map((m) => m.prompts),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  // Projects by department bar
  const deptProjectLabels = Object.keys(stats.projectsByDepartment);
  const deptProjectData = {
    labels: deptProjectLabels.length > 0 ? deptProjectLabels : ["No data"],
    datasets: [
      {
        data: deptProjectLabels.length > 0
          ? deptProjectLabels.map((d) => stats.projectsByDepartment[d])
          : [0],
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Annual Savings"
          value={formatCurrency(stats.totalAnnualSavings)}
          icon={DollarSign}
          trend="Across all projects"
        />
        <StatCard
          label="Average ROI"
          value={`${stats.averageROI}%`}
          icon={TrendingUp}
          trend={`${stats.totalROICalculations} calculations`}
        />
        <StatCard
          label="Hours Saved"
          value={stats.totalHoursSaved.toLocaleString()}
          icon={Clock}
          trend="Per year"
        />
        <StatCard
          label="FTE Equivalent"
          value={stats.totalFTESaved.toString()}
          icon={Users}
          trend="Full-time positions"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Project Status Distribution" subtitle="Current status breakdown">
          <div className="h-64 flex items-center justify-center">
            {statusLabels.length > 0 ? (
              <Doughnut
                data={statusData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "65%",
                  plugins: {
                    legend: { display: true, position: "bottom", labels: { boxWidth: 12, padding: 16 } },
                  },
                }}
              />
            ) : (
              <p className="text-sm text-gray-400">No project data yet</p>
            )}
          </div>
        </ChartCard>

        <ChartCard title="ROI by Department" subtitle="Annual savings per department">
          <div className="h-64">
            <Bar
              data={roiBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y" as const,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) =>
                        `$${(ctx.raw as number).toLocaleString()}`,
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      callback: (val) => `$${((val as number) / 1000).toFixed(0)}K`,
                    },
                    grid: { display: false },
                  },
                  y: { grid: { display: false } },
                },
              }}
            />
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Submissions Over Time" subtitle="Last 12 months">
          <div className="h-64">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true, position: "bottom", labels: { boxWidth: 12, padding: 16 } },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: "#f3f4f6" } },
                },
              }}
            />
          </div>
        </ChartCard>

        <ChartCard title="Projects by Department" subtitle="Distribution across departments">
          <div className="h-64">
            <Bar
              data={deptProjectData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: "#f3f4f6" } },
                },
              }}
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
