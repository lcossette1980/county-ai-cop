import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Scale,
  FileCheck,
  AlertTriangle,
  Shield,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  Lock,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Governance",
  description: "Policies, frameworks, and approval processes for responsible AI use in government.",
};

const policies = [
  { icon: FileCheck, title: "Acceptable Use Policy", description: "Guidelines for appropriate use of AI tools in county government operations. Covers approved tools, data handling, and usage boundaries." },
  { icon: Lock, title: "Data Classification", description: "Framework for categorizing data sensitivity levels (public, internal, confidential, restricted) and corresponding AI usage rules for each level." },
  { icon: Shield, title: "Security Requirements", description: "Technical and procedural security standards that must be met before AI tools can be deployed in county systems." },
  { icon: Eye, title: "Transparency Standards", description: "Requirements for disclosing AI usage in public-facing communications, decision-making processes, and constituent interactions." },
];

const approvalSteps = [
  { step: "1", title: "Submit Proposal", description: "Use our project submission tool to describe your AI initiative, including scope, data requirements, and expected outcomes.", time: "15 min" },
  { step: "2", title: "Initial Review", description: "The AI CoP team reviews your proposal for completeness, feasibility, and alignment with county priorities.", time: "3-5 days" },
  { step: "3", title: "Risk Assessment", description: "A standardized risk evaluation covering data privacy, security, equity impact, and operational considerations.", time: "1-2 weeks" },
  { step: "4", title: "Technical Review", description: "IT security and architecture teams evaluate technical requirements, integration points, and infrastructure needs.", time: "1-2 weeks" },
  { step: "5", title: "Approval Decision", description: "Based on risk level, projects receive approval, conditional approval with requirements, or guidance for revision.", time: "1-3 days" },
  { step: "6", title: "Implementation", description: "Approved projects proceed with implementation support from the AI CoP team, including best practices and monitoring.", time: "Ongoing" },
];

const riskLevels = [
  { level: "Low", color: "bg-emerald-100 text-emerald-700 border-emerald-200", description: "Internal productivity tools, document drafting assistance, brainstorming support. No sensitive data, no public-facing decisions.", examples: ["Email drafting", "Meeting summaries", "Research assistance"] },
  { level: "Medium", color: "bg-amber-100 text-amber-700 border-amber-200", description: "Tools that process internal data, support decision-making, or automate workflows. May involve non-public information.", examples: ["Data analysis reports", "Process automation", "Internal chatbots"] },
  { level: "High", color: "bg-red-100 text-red-700 border-red-200", description: "Systems involving sensitive data, public-facing applications, or decisions affecting constituents. Requires comprehensive review.", examples: ["Constituent-facing tools", "Benefit eligibility", "Predictive analytics"] },
];

export default function GovernancePage() {
  return (
    <>
      <PageHeader
        title="AI Governance"
        subtitle="Policies, approval processes, and compliance requirements for responsible AI use in county government"
        gradient="dark"
      />

      {/* Policies */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Key Policies</h2>
            <p className="mt-3 text-gray-500">The governance framework for AI adoption in county government</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {policies.map((policy) => (
              <div key={policy.title} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-100 text-brand-600 shrink-0">
                    <policy.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{policy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approval Process */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Approval Process</h2>
            <p className="mt-3 text-gray-500">How AI projects get reviewed and approved</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {approvalSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-600 text-white font-bold text-sm shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Matrix */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Risk Assessment Matrix</h2>
            <p className="mt-3 text-gray-500">Understanding AI project risk levels and requirements</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {riskLevels.map((risk) => (
              <div key={risk.level} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className={`px-6 py-3 ${risk.color} border-b font-bold text-center`}>
                  {risk.level} Risk
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{risk.description}</p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</p>
                  <ul className="space-y-2">
                    {risk.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ready to Submit a Project?</h2>
          <p className="mt-3 text-gray-500 text-lg">
            Use our project submission tool to start the approval process.
          </p>
          <div className="mt-8">
            <Link
              href="/submit-project"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all"
            >
              Submit Project Proposal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
