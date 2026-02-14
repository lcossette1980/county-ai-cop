import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

let app: App;
let db: Firestore;
let auth: Auth;

function getAdminApp() {
  if (!app && !getApps().length) {
    // If a service account key is provided via env vars, use it (Vercel / prod).
    // Otherwise fall back to Application Default Credentials (local dev via gcloud).
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || "";
    const hasServiceAccountKey =
      privateKey.length > 0 &&
      !privateKey.includes("your-private-key") &&
      privateKey.includes("BEGIN PRIVATE KEY");

    const credential = hasServiceAccountKey
      ? cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        })
      : applicationDefault();

    app = initializeApp({
      credential,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
  return app || getApps()[0];
}

export function getAdminFirestore() {
  if (!db) {
    db = getFirestore(getAdminApp());
  }
  return db;
}

export function getAdminAuth() {
  if (!auth) {
    auth = getAuth(getAdminApp());
  }
  return auth;
}

export const COLLECTIONS = {
  projects: "ai_projects",
  roi: "roi_calculations",
  prompts: "prompt_submissions",
  contacts: "contact_submissions",
} as const;
