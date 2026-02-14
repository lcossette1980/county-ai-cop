"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  Mail,
  BarChart3,
  Settings,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminData } from "@/components/admin/useAdminData";
import { DashboardTab } from "@/components/admin/DashboardTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import { PromptsTab } from "@/components/admin/PromptsTab";
import { ContactsTab } from "@/components/admin/ContactsTab";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";
import { SettingsTab } from "@/components/admin/SettingsTab";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "prompts", label: "Prompts", icon: BookOpen },
  { id: "contacts", label: "Contacts", icon: Mail },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { stats, projects, prompts, roiCalcs, contacts, loading, error, refresh } = useAdminData();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {tabs.map((tab) => {
              let badge: number | null = null;
              if (tab.id === "projects" && stats) badge = stats.pendingReview;
              if (tab.id === "prompts" && stats) badge = stats.pendingPrompts;
              if (tab.id === "contacts" && stats) badge = stats.newContacts;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-brand-600 text-brand-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {badge != null && badge > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-[11px] font-bold bg-red-500 text-white">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && !stats && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-800">Failed to load data</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <button
                onClick={refresh}
                className="mt-3 text-sm font-semibold text-red-700 hover:text-red-800 cursor-pointer"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {!loading || stats ? (
          <>
            {activeTab === "dashboard" && (
              <DashboardTab stats={stats} projects={projects} onNavigate={setActiveTab} />
            )}
            {activeTab === "projects" && (
              <ProjectsTab projects={projects} roiCalcs={roiCalcs} onRefresh={refresh} />
            )}
            {activeTab === "prompts" && (
              <PromptsTab prompts={prompts} onRefresh={refresh} />
            )}
            {activeTab === "contacts" && (
              <ContactsTab contacts={contacts} onRefresh={refresh} />
            )}
            {activeTab === "analytics" && <AnalyticsTab stats={stats} />}
            {activeTab === "settings" && <SettingsTab />}
          </>
        ) : null}
      </div>
    </div>
  );
}
