import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore, COLLECTIONS } from "@/lib/firebase/admin";
import { authOptions } from "@/lib/auth/options";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();
    const doc = await db.collection(COLLECTIONS.projects).doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const db = getAdminFirestore();
    const docRef = db.collection(COLLECTIONS.projects).doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const existingData = doc.data() || {};
    const updates: Record<string, unknown> = {
      ...body,
      lastUpdated: now,
    };

    // Don't allow overwriting these fields from client
    delete updates.id;
    delete updates.submittedDate;
    delete updates.statusHistory;

    // Track status changes in history
    if (body.status && body.status !== existingData.status) {
      updates.statusHistory = FieldValue.arrayUnion({
        status: body.status,
        changedAt: now,
        changedBy: session.user?.email || "admin",
      });
    }

    await docRef.update(updates);

    const updated = await docRef.get();
    return NextResponse.json({ id: updated.id, ...updated.data() });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const db = getAdminFirestore();
    const docRef = db.collection(COLLECTIONS.projects).doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await docRef.delete();

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
