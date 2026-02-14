"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, BookOpen } from "lucide-react";
import { categories } from "@/data/prompts";

export default function SubmitPromptPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", category: "", description: "", template: "", tags: "", submitterName: "", submitterEmail: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit prompt");
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Prompt Submitted!</h1>
          <p className="text-gray-500 mb-8">Thank you for contributing. Your prompt will be reviewed and added to the library.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/prompt-library" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors">
              <BookOpen className="h-4 w-4" /> View Library
            </Link>
          </div>
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
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Submit a Prompt</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">Share your AI prompts with the community</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5"
          >
            <h2 className="text-lg font-bold text-gray-900">Prompt Details</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Prompt Title *</label><input type="text" required value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="e.g., Budget Report Analyzer" /></div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Category *</label>
                <select required value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500">
                  <option value="">Select category</option>
                  {categories.filter((c) => c.id !== "all").map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Short Description *</label><input type="text" required value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="Brief description of what this prompt does" /></div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Prompt Template *</label>
              <textarea required rows={8} value={form.template} onChange={(e) => update("template", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-y" placeholder="Paste your full prompt template here. Use [brackets] for placeholder fields." />
            </div>

            <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Tags</label><input type="text" value={form.tags} onChange={(e) => update("tags", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="Comma-separated tags (e.g., budget, analysis, reporting)" /></div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Your Information</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" value={form.submitterName} onChange={(e) => update("submitterName", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="Optional" /></div>
                <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" value={form.submitterEmail} onChange={(e) => update("submitterEmail", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="Optional" /></div>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="pt-4">
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors disabled:opacity-50 cursor-pointer">
                {submitting ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitting ? "Submitting..." : "Submit Prompt"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
