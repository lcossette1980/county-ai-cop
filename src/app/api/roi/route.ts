import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, COLLECTIONS } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    let query = db.collection(COLLECTIONS.roi).orderBy("submittedDate", "desc");

    if (projectId) {
      query = db
        .collection(COLLECTIONS.roi)
        .where("projectId", "==", projectId)
        .orderBy("submittedDate", "desc");
    }

    const snapshot = await query.get();
    const calculations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(calculations);
  } catch (error) {
    console.error("Error fetching ROI calculations:", error);
    return NextResponse.json(
      { error: "Failed to fetch ROI calculations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const db = getAdminFirestore();
    const now = new Date().toISOString();

    const calculation = {
      projectName: body.projectName || "",
      department: body.department || "",
      inputs: body.inputs || {},
      results: body.results || {},
      submittedDate: now,
      projectId: body.projectId || null,
      linkedAt: body.projectId ? now : null,
    };

    const docRef = await db.collection(COLLECTIONS.roi).add(calculation);

    return NextResponse.json(
      { id: docRef.id, ...calculation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving ROI calculation:", error);
    return NextResponse.json(
      { error: "Failed to save ROI calculation" },
      { status: 500 }
    );
  }
}
