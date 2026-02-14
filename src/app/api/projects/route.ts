import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAdminFirestore, COLLECTIONS } from "@/lib/firebase/admin";
import { authOptions } from "@/lib/auth/options";

export async function GET() {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection(COLLECTIONS.projects)
      .orderBy("submittedDate", "desc")
      .get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ["projectName", "department", "projectLead", "contactEmail"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const db = getAdminFirestore();
    const now = new Date().toISOString();

    const project = {
      projectName: body.projectName,
      department: body.department,
      projectLead: body.projectLead,
      contactEmail: body.contactEmail,
      description: body.description || "",
      problem: body.problem || "",
      solution: body.solution || "",
      expectedOutcomes: body.expectedOutcomes || "",
      status: "pending",
      priority: "medium",
      progress: 0,
      timeline: body.timeline || "",
      budget: body.budget || "",
      aiTypes: body.aiTypes || [],
      affectedStaff: Number(body.affectedStaff) || 0,
      hoursPerWeek: Number(body.hoursPerWeek) || 0,
      efficiencyGain: Number(body.efficiencyGain) || 0,
      estimatedROI: 0,
      annualSavings: 0,
      implementationCost: 0,
      submittedDate: now,
      lastUpdated: now,
      source: "web_form",
    };

    const docRef = await db.collection(COLLECTIONS.projects).add(project);

    return NextResponse.json(
      { id: docRef.id, ...project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
