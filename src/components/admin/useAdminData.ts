"use client";

import { useState, useEffect, useCallback } from "react";

interface AdminStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingReview: number;
  totalAnnualSavings: number;
  averageROI: number;
  totalHoursSaved: number;
  totalFTESaved: number;
  projectsByStatus: Record<string, number>;
  projectsByDepartment: Record<string, number>;
  roiByDepartment: Record<string, number>;
  submissionsByMonth: Array<{ month: string; projects: number; prompts: number }>;
  pendingPrompts: number;
  approvedPrompts: number;
  totalPrompts: number;
  newContacts: number;
  totalContacts: number;
  totalROICalculations: number;
}

export function useAdminData() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [projects, setProjects] = useState<Record<string, unknown>[]>([]);
  const [prompts, setPrompts] = useState<Record<string, unknown>[]>([]);
  const [roiCalcs, setRoiCalcs] = useState<Record<string, unknown>[]>([]);
  const [contacts, setContacts] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [statsRes, projectsRes, promptsRes, roiRes, contactsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/projects"),
        fetch("/api/prompts"),
        fetch("/api/roi"),
        fetch("/api/contact"),
      ]);

      if (!statsRes.ok) throw new Error("Failed to fetch stats");

      const [statsData, projectsData, promptsData, roiData, contactsData] = await Promise.all([
        statsRes.json(),
        projectsRes.ok ? projectsRes.json() : [],
        promptsRes.ok ? promptsRes.json() : [],
        roiRes.ok ? roiRes.json() : [],
        contactsRes.ok ? contactsRes.json() : [],
      ]);

      setStats(statsData);
      setProjects(projectsData);
      setPrompts(promptsData);
      setRoiCalcs(roiData);
      setContacts(contactsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stats,
    projects,
    prompts,
    roiCalcs,
    contacts,
    loading,
    error,
    refresh: fetchData,
  };
}
