import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAdminFirestore, COLLECTIONS } from "@/lib/firebase/admin";
import { authOptions } from "@/lib/auth/options";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getAdminFirestore();

    // Fetch all collections in parallel
    const [projectsSnap, roiSnap, promptsSnap, contactsSnap] = await Promise.all([
      db.collection(COLLECTIONS.projects).get(),
      db.collection(COLLECTIONS.roi).get(),
      db.collection(COLLECTIONS.prompts).get(),
      db.collection(COLLECTIONS.contacts).get(),
    ]);

    // Project stats
    const projects = projectsSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Array<Record<string, unknown>>;
    const projectsByStatus: Record<string, number> = {};
    const projectsByDepartment: Record<string, number> = {};
    let totalAnnualSavings = 0;

    for (const p of projects) {
      const status = (p.status as string) || "pending";
      projectsByStatus[status] = (projectsByStatus[status] || 0) + 1;

      const dept = (p.department as string) || "Unknown";
      projectsByDepartment[dept] = (projectsByDepartment[dept] || 0) + 1;

      totalAnnualSavings += (p.annualSavings as number) || 0;
    }

    // ROI stats
    const roiCalcs = roiSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Array<Record<string, unknown>>;
    const roiByDepartment: Record<string, number> = {};
    let totalROIPercent = 0;
    let totalHoursSaved = 0;
    let roiCount = 0;

    for (const r of roiCalcs) {
      const results = (r.results || {}) as Record<string, number>;
      const dept = (r.department as string) || "Unknown";

      const annualSavings = results.totalAnnualSavings || 0;
      roiByDepartment[dept] = (roiByDepartment[dept] || 0) + annualSavings;

      if (annualSavings > 0) {
        totalAnnualSavings += annualSavings;
      }

      totalROIPercent += results.roi || 0;
      totalHoursSaved += results.annualHoursSaved || 0;
      roiCount++;
    }

    // Prompt stats
    const prompts = promptsSnap.docs.map((d) => d.data());
    const pendingPrompts = prompts.filter((p) => p.status === "pending").length;
    const approvedPrompts = prompts.filter((p) => p.status === "approved").length;

    // Contact stats
    const contacts = contactsSnap.docs.map((d) => d.data());
    const newContacts = contacts.filter((c) => !c.status || c.status === "new").length;

    // Submissions by month (last 12 months)
    const now = new Date();
    const submissionsByMonth: Array<{ month: string; projects: number; prompts: number }> = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = d.toISOString().slice(0, 7); // "YYYY-MM"
      const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });

      const projectCount = projects.filter((p) => {
        const sd = (p.submittedDate as string) || "";
        return sd.startsWith(monthKey);
      }).length;

      const promptCount = prompts.filter((p) => {
        const sd = (p.submittedDate as string) || "";
        return sd.startsWith(monthKey);
      }).length;

      submissionsByMonth.push({ month: label, projects: projectCount, prompts: promptCount });
    }

    return NextResponse.json({
      totalProjects: projects.length,
      activeProjects: projectsByStatus["in-progress"] || 0,
      completedProjects: projectsByStatus["completed"] || 0,
      pendingReview: projectsByStatus["pending"] || 0,
      totalAnnualSavings,
      averageROI: roiCount > 0 ? Math.round(totalROIPercent / roiCount) : 0,
      totalHoursSaved: Math.round(totalHoursSaved),
      totalFTESaved: Math.round((totalHoursSaved / 2080) * 100) / 100,
      projectsByStatus,
      projectsByDepartment,
      roiByDepartment,
      submissionsByMonth,
      pendingPrompts,
      approvedPrompts,
      totalPrompts: prompts.length,
      newContacts,
      totalContacts: contacts.length,
      totalROICalculations: roiCalcs.length,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}
