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
    const doc = await db.collection(COLLECTIONS.roi).doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "ROI calculation not found" }, { status: 404 });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching ROI calculation:", error);
    return NextResponse.json(
      { error: "Failed to fetch ROI calculation" },
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
    const docRef = db.collection(COLLECTIONS.roi).doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "ROI calculation not found" }, { status: 404 });
    }

    const updates = { ...body };
    delete updates.id;
    delete updates.submittedDate;

    await docRef.update(updates);

    const updated = await docRef.get();
    return NextResponse.json({ id: updated.id, ...updated.data() });
  } catch (error) {
    console.error("Error updating ROI calculation:", error);
    return NextResponse.json(
      { error: "Failed to update ROI calculation" },
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
    const docRef = db.collection(COLLECTIONS.roi).doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "ROI calculation not found" }, { status: 404 });
    }

    await docRef.delete();
    return NextResponse.json({ message: "ROI calculation deleted" });
  } catch (error) {
    console.error("Error deleting ROI calculation:", error);
    return NextResponse.json(
      { error: "Failed to delete ROI calculation" },
      { status: 500 }
    );
  }
}
