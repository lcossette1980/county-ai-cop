import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Shield,
  UserCheck,
  Eye,
  Users,
  Scale,
  Lock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Ethics",
  description: "Principles and guidelines for responsible and ethical AI use in public service.",
};

const principles = [
  { icon: Users, title: "Equity & Fairness", description: "AI systems must serve all community members equitably. We actively identify and mitigate bias in AI tools to prevent discrimination based on race, gender, age, disability, or other protected characteristics." },
  { icon: Eye, title: "Transparency", description: "We are open about when and how AI is used in government operations. Constituents have the right to know when AI influences decisions that affect them." },
  { icon: Lock, title: "Privacy & Security", description: "Personal data is protected at every step. AI tools must meet rigorous security standards, and data handling follows strict privacy regulations and best practices." },
  { icon: UserCheck, title: "Human-Centered Design", description: "AI augments human capabilities but does not replace human judgment for critical decisions. People remain accountable for AI-assisted outcomes." },
  { icon: Scale, title: "Accountability", description: "Clear ownership and responsibility for AI systems. Every AI initiative has designated accountable individuals who ensure compliance with ethical standards." },
  { icon: Shield, title: "Safety & Reliability", description: "AI systems are tested thoroughly before deployment. We monitor for errors, unexpected behaviors, and potential harms, with mechanisms to quickly correct issues." },
];

const biasTypes = [
  { type: "Selection Bias", description: "Training data doesn't represent the full population, leading to skewed or unfair outcomes for underrepresented groups." },
  { type: "Confirmation Bias", description: "AI reinforces existing patterns and assumptions, potentially perpetuating historical discrimination or stereotypes." },
  { type: "Measurement Bias", description: "The way data is collected or measured systematically favors certain groups over others." },
  { type: "Automation Bias", description: "Over-reliance on AI recommendations without sufficient human review and critical thinking." },
];

const mitigationSteps = [
  "Review training data for representativeness and balance",
  "Test AI outputs across diverse demographic groups",
  "Establish regular bias audits for deployed AI systems",
  "Include diverse perspectives in AI design and review",
  "Create feedback mechanisms for reporting concerns",
  "Document known limitations and bias risks",
  "Maintain human oversight for high-impact decisions",
  "Provide training on recognizing AI bias",
];

export default function EthicsPage() {
  return (
    <>
      <PageHeader
        title="Responsible AI Ethics"
        subtitle="Guiding principles for ethical, equitable, and transparent AI use in county government"
        gradient="dark"
      />

      {/* Principles */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Core Principles</h2>
            <p className="mt-3 text-gray-500">The ethical foundation for all AI initiatives in county government</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-100 text-brand-600 mb-4">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bias Detection */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Understanding AI Bias</h2>
            <p className="mt-3 text-gray-500">Common types of bias in AI systems and how to recognize them</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {biasTypes.map((bias) => (
              <div key={bias.type} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{bias.type}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{bias.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitigation */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Bias Mitigation Strategies</h2>
              <p className="mt-3 text-gray-500">Steps every team should take to reduce AI bias</p>
            </div>
            <div className="space-y-3">
              {mitigationSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 bg-brand-50 rounded-xl p-4">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Questions About AI Ethics?</h2>
          <p className="mt-3 text-gray-500 text-lg">Our team is here to help you navigate ethical AI use.</p>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all">
              Get Help <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
