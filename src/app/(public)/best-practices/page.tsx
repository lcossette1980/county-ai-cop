import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
  Layers,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best Practices",
  description: "Proven strategies and guidelines for effective AI implementation in government.",
};

const dos = [
  "Be specific and detailed in your prompts",
  "Always verify AI-generated content for accuracy",
  "Include context about your audience and purpose",
  "Start with simple tasks and build complexity",
  "Keep sensitive data out of AI prompts",
  "Document your AI workflows for team sharing",
  "Use our approved AI tools and platforms",
  "Iterate on prompts to improve results",
];

const donts = [
  "Don't share confidential or PII data with AI",
  "Don't blindly trust AI outputs without review",
  "Don't use AI for final decisions affecting people",
  "Don't skip the governance approval process",
  "Don't assume AI understands context like humans",
  "Don't use AI-generated content without attribution",
  "Don't ignore bias in AI outputs",
  "Don't use unapproved AI tools for county work",
];

const promptTips = [
  { icon: MessageSquare, title: "Be Specific", description: "Instead of 'write a report', say 'Write a 500-word executive summary about Q3 budget performance for department heads, using a professional but accessible tone.'" },
  { icon: Layers, title: "Provide Context", description: "Tell the AI who you are, who the audience is, and what the output will be used for. More context leads to better, more relevant results." },
  { icon: FileText, title: "Use Examples", description: "Show the AI what you want by including examples. 'Format the output like this example: [your example here]' dramatically improves consistency." },
  { icon: RefreshCw, title: "Iterate and Refine", description: "Your first prompt rarely produces the perfect result. Treat it as a conversation — refine, add constraints, and ask for adjustments." },
  { icon: Eye, title: "Request Specific Formats", description: "Ask for bullet points, tables, numbered lists, or specific structures. AI performs better with clear formatting instructions." },
  { icon: ShieldCheck, title: "Verify Everything", description: "AI can hallucinate facts and statistics. Always fact-check important claims, especially for public-facing content." },
];

const frameworks = [
  { name: "CLEAR Framework", steps: ["Context — Set the scene and background", "Limits — Define constraints and boundaries", "Examples — Provide samples of desired output", "Audience — Specify who will read/use the output", "Role — Tell the AI what role to assume"] },
  { name: "RACE Framework", steps: ["Role — Assign the AI a specific role or persona", "Action — Describe the specific task to perform", "Context — Provide relevant background information", "Expectations — Define format, length, and quality standards"] },
];

export default function BestPracticesPage() {
  return (
    <>
      <PageHeader
        title="AI Best Practices"
        subtitle="Tips, techniques, and proven approaches for effective AI use in county government"
        gradient="accent"
      />

      {/* Do's & Don'ts */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">The Do&apos;s and Don&apos;ts of AI</h2>
            <p className="mt-3 text-gray-500">Essential guidelines for responsible AI use</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> Do
              </h3>
              <ul className="space-y-3">
                {dos.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl border border-red-100 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5" /> Don&apos;t
              </h3>
              <ul className="space-y-3">
                {donts.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-red-800">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Engineering Tips */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Prompt Engineering Tips</h2>
            <p className="mt-3 text-gray-500">How to write prompts that get great results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promptTips.map((tip) => (
              <div key={tip.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-100 text-brand-600 mb-4">
                  <tip.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Prompt Frameworks</h2>
            <p className="mt-3 text-gray-500">Structured approaches for crafting effective prompts</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {frameworks.map((fw) => (
              <div key={fw.name} className="bg-brand-50 rounded-2xl border border-brand-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-brand-900 mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-brand-600" />
                  {fw.name}
                </h3>
                <ol className="space-y-3">
                  {fw.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-800">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-200 text-brand-700 text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Put These Practices to Work</h2>
          <p className="mt-3 text-gray-500 text-lg">Try our pre-built prompt templates that follow these best practices.</p>
          <div className="mt-8">
            <Link href="/prompt-library" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all">
              Explore Prompt Library <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
