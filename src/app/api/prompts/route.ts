import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, COLLECTIONS } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query: FirebaseFirestore.Query = db
      .collection(COLLECTIONS.prompts)
      .orderBy("submittedDate", "desc");

    if (status) {
      query = db
        .collection(COLLECTIONS.prompts)
        .where("status", "==", status)
        .orderBy("submittedDate", "desc");
    }

    const snapshot = await query.get();
    const prompts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(prompts);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ["title", "category", "description", "template"];
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

    const prompt = {
      title: body.title,
      category: body.category,
      description: body.description,
      template: body.template,
      tags: body.tags || [],
      submitterName: body.submitterName || "",
      submitterEmail: body.submitterEmail || "",
      submittedDate: now,
      status: "pending",
    };

    const docRef = await db.collection(COLLECTIONS.prompts).add(prompt);

    return NextResponse.json(
      { id: docRef.id, ...prompt },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating prompt:", error);
    return NextResponse.json(
      { error: "Failed to create prompt" },
      { status: 500 }
    );
  }
}
