import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAdminFirestore, COLLECTIONS } from "@/lib/firebase/admin";
import { authOptions } from "@/lib/auth/options";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();
    const doc = await db.collection(COLLECTIONS.prompts).doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
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
    const docRef = db.collection(COLLECTIONS.prompts).doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const updates: Record<string, unknown> = {};

    if (body.status) {
      updates.status = body.status;
      updates.reviewedBy = session.user?.email || "admin";
      updates.reviewedAt = now;
    }
    if (body.adminNotes !== undefined) updates.adminNotes = body.adminNotes;
    if (body.title) updates.title = body.title;
    if (body.category) updates.category = body.category;
    if (body.description) updates.description = body.description;
    if (body.template) updates.template = body.template;
    if (body.tags) updates.tags = body.tags;

    await docRef.update(updates);

    const updated = await docRef.get();
    return NextResponse.json({ id: updated.id, ...updated.data() });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return NextResponse.json(
      { error: "Failed to update prompt" },
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
    const docRef = db.collection(COLLECTIONS.prompts).doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    await docRef.delete();
    return NextResponse.json({ message: "Prompt deleted" });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return NextResponse.json(
      { error: "Failed to delete prompt" },
      { status: 500 }
    );
  }
}
