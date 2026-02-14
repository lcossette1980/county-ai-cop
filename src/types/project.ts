export interface StatusHistoryEntry {
  status: string;
  changedAt: string;
  changedBy: string;
}

export interface AIProject {
  id?: string;
  projectName: string;
  department: string;
  projectLead: string;
  contactEmail: string;
  description: string;
  problem: string;
  solution: string;
  expectedOutcomes: string;
  status: "pending" | "approved" | "in-progress" | "completed" | "on-hold" | "rejected";
  priority: "low" | "medium" | "high" | "critical";
  progress: number;
  timeline: string;
  budget: string;
  aiTypes: string[];
  affectedStaff: number;
  hoursPerWeek: number;
  efficiencyGain: number;
  estimatedROI: number;
  annualSavings: number;
  implementationCost: number;
  submittedDate: string;
  lastUpdated: string;
  source: string;
  roiCalculationId?: string;
  adminNotes?: string;
  statusHistory?: StatusHistoryEntry[];
}

export interface ROICalculation {
  id?: string;
  projectName: string;
  department: string;
  inputs: Record<string, number>;
  results: Record<string, number>;
  submittedDate: string;
  projectId?: string;
  linkedAt?: string;
}

export interface PromptSubmission {
  id?: string;
  title: string;
  category: string;
  description: string;
  template: string;
  tags: string[];
  submitterName?: string;
  submitterEmail?: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  department: string;
  subject: string;
  message: string;
  submittedDate: string;
  status?: "new" | "read" | "replied" | "archived";
  adminNotes?: string;
}
