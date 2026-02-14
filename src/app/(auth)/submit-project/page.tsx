"use client";

import { useState } from "react";
import { Send, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = ["Project Info", "Details", "Impact", "Review"];

export default function SubmitProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    projectName: "", department: "", projectLead: "", contactEmail: "",
    description: "", problem: "", solution: "", expectedOutcomes: "",
    aiTypes: [] as string[], timeline: "", budget: "",
    affectedStaff: "", hoursPerWeek: "", efficiencyGain: "",
  });

  const update = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit project");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Submitted!</h1>
          <p className="text-gray-500 mb-8">
            Your project proposal has been received. Our team will review it and get back to you within 3-5 business days.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Submit AI Project</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">Submit your AI project proposal for review and approval</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-colors",
                  i <= currentStep ? "bg-brand-600 text-white" : "bg-gray-200 text-gray-500"
                )}>
                  {i + 1}
                </div>
                <span className={cn("text-sm font-medium hidden sm:block", i <= currentStep ? "text-brand-600" : "text-gray-400")}>
                  {step}
                </span>
                {i < steps.length - 1 && <div className={cn("w-8 h-0.5 mx-1", i < currentStep ? "bg-brand-600" : "bg-gray-200")} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            {/* Step 0: Project Info */}
            {currentStep === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Project Information</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Project Name *</label><input type="text" required value={form.projectName} onChange={(e) => update("projectName", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="e.g., Document Automation" /></div>
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Department *</label><input type="text" required value={form.department} onChange={(e) => update("department", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="e.g., Health Services" /></div>
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Project Lead *</label><input type="text" required value={form.projectLead} onChange={(e) => update("projectLead", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="Full name" /></div>
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Contact Email *</label><input type="email" required value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="email@county.gov" /></div>
                </div>
              </div>
            )}

            {/* Step 1: Details */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Project Details</h2>
                <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Problem Statement *</label><textarea rows={3} value={form.problem} onChange={(e) => update("problem", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-y" placeholder="What problem does this project solve?" /></div>
                <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Proposed Solution *</label><textarea rows={3} value={form.solution} onChange={(e) => update("solution", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-y" placeholder="How will AI be used to address this?" /></div>
                <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Expected Outcomes *</label><textarea rows={3} value={form.expectedOutcomes} onChange={(e) => update("expectedOutcomes", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-y" placeholder="What are the expected results and benefits?" /></div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Timeline</label><input type="text" value={form.timeline} onChange={(e) => update("timeline", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="e.g., 3 months" /></div>
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Estimated Budget</label><input type="text" value={form.budget} onChange={(e) => update("budget", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="e.g., $10,000" /></div>
                </div>
              </div>
            )}

            {/* Step 2: Impact */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Expected Impact</h2>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Staff Affected</label><input type="number" min="1" value={form.affectedStaff} onChange={(e) => update("affectedStaff", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" /></div>
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Hours/Week Saved</label><input type="number" min="0" value={form.hoursPerWeek} onChange={(e) => update("hoursPerWeek", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" /></div>
                  <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Efficiency Gain (%)</label><input type="number" min="0" max="100" value={form.efficiencyGain} onChange={(e) => update("efficiencyGain", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" /></div>
                </div>
                <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Description</label><textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-y" placeholder="Additional details about impact and implementation..." /></div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Review Your Submission</h2>
                <div className="space-y-4">
                  {[
                    ["Project Name", form.projectName], ["Department", form.department],
                    ["Project Lead", form.projectLead], ["Contact Email", form.contactEmail],
                    ["Problem", form.problem], ["Solution", form.solution],
                    ["Expected Outcomes", form.expectedOutcomes], ["Timeline", form.timeline],
                    ["Budget", form.budget],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-500 sm:w-36 shrink-0">{label}</span>
                      <span className="text-sm text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 p-3 mt-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors cursor-pointer"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {submitting ? "Submitting..." : "Submit Project"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
