import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAdminFirestore, COLLECTIONS } from "@/lib/firebase/admin";
import { authOptions } from "@/lib/auth/options";

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
    const docRef = db.collection(COLLECTIONS.contacts).doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};
    if (body.status) updates.status = body.status;
    if (body.adminNotes !== undefined) updates.adminNotes = body.adminNotes;

    await docRef.update(updates);

    const updated = await docRef.get();
    return NextResponse.json({ id: updated.id, ...updated.data() });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
