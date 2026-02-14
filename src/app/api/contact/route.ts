import { NextRequest, NextResponse } from "next/server";
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
    const snapshot = await db
      .collection(COLLECTIONS.contacts)
      .orderBy("submittedDate", "desc")
      .get();

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ["name", "email", "subject", "message"];
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

    const contact = {
      name: body.name,
      email: body.email,
      department: body.department || "",
      subject: body.subject,
      message: body.message,
      submittedDate: now,
      status: "new",
    };

    const docRef = await db.collection(COLLECTIONS.contacts).add(contact);

    return NextResponse.json(
      { id: docRef.id, ...contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return NextResponse.json(
      { error: "Failed to save contact submission" },
      { status: 500 }
    );
  }
}
