import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "./config";

export function getClientFirestore() {
  return getFirestore(getFirebaseApp());
}

export function getClientAuth() {
  return getAuth(getFirebaseApp());
}

export const COLLECTIONS = {
  projects: "ai_projects",
  roi: "roi_calculations",
  prompts: "prompt_submissions",
  contacts: "contact_submissions",
} as const;
