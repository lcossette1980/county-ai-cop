import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  MessageSquare,
  Brain,
  Shield,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  CircleCheckBig,
  BookOpen,
  Layers,
  BarChart3,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Getting Started with AI",
  description: "Everything you need to know to begin your AI journey in county government.",
};

const mythsVsFacts = [
  { myth: "AI will replace my job", fact: "AI is a tool that augments your capabilities and handles repetitive tasks so you can focus on higher-value work." },
  { myth: "AI is always accurate", fact: "AI can make mistakes and produce biased outputs. Always verify AI-generated content before using it." },
  { myth: "AI understands like humans", fact: "AI processes patterns in data. It doesn't truly understand context, emotions, or nuance the way humans do." },
  { myth: "AI is too complex for me", fact: "Modern AI tools are designed to be user-friendly. If you can write an email, you can use AI effectively." },
];

const steps = [
  { icon: BookOpen, title: "Learn the Basics", description: "Start with understanding what AI is and how it works. Our resources section has curated learning materials for every level." },
  { icon: MessageSquare, title: "Try a Prompt", description: "Visit our Prompt Library to find pre-built templates for common government tasks. Copy, customize, and use them." },
  { icon: Layers, title: "Start Small", description: "Begin with low-risk tasks like drafting emails, summarizing documents, or brainstorming ideas before moving to complex projects." },
  { icon: Shield, title: "Follow Guidelines", description: "Review our governance policies and ethics framework to ensure you're using AI responsibly and compliantly." },
  { icon: BarChart3, title: "Measure Impact", description: "Use our ROI Calculator to quantify the time and cost savings from your AI initiatives." },
];

const quickWins = [
  "Drafting and editing emails or reports",
  "Summarizing long documents or meeting notes",
  "Creating FAQs or knowledge base articles",
  "Generating data analysis summaries",
  "Brainstorming solutions to problems",
  "Translating content for multilingual audiences",
  "Creating training materials and guides",
  "Proofreading and improving written content",
];

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader
        title="Getting Started with AI"
        subtitle="Your beginner-friendly guide to understanding and using AI in county government work"
        gradient="brand"
      />

      {/* What is AI */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-100 text-brand-600">
                  <Brain className="h-5 w-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  What is AI?
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Artificial Intelligence (AI) refers to computer systems designed to perform tasks
                that typically require human intelligence. This includes understanding language,
                recognizing patterns, making decisions, and generating content.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                In county government, AI can help automate routine tasks, analyze large datasets,
                improve constituent services, and support evidence-based decision-making — all while
                freeing up staff time for high-value work.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Generative AI</strong> (like ChatGPT, Claude, and Copilot) can create text,
                images, and other content based on prompts you provide. This is the type of AI most
                government employees will interact with.
              </p>
            </div>
            <ImagePlaceholder src="/images/ai-journey.png" alt="Abstract visualization of an AI-powered workflow" icon={Brain} label="AI Journey Map" gradient="cool" />
          </div>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Myths vs. Facts
            </h2>
            <p className="mt-3 text-gray-500">
              Let&apos;s separate AI reality from fiction
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {mythsVsFacts.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-start gap-3 p-5 bg-red-50 border-b border-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Myth</p>
                    <p className="text-sm font-medium text-red-800">&ldquo;{item.myth}&rdquo;</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Fact</p>
                    <p className="text-sm text-gray-700">{item.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your AI Journey in 5 Steps
            </h2>
            <p className="mt-3 text-gray-500">
              A practical roadmap to getting started with AI in your work
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-brand-600 text-white font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Wins */}
      <section className="py-16 sm:py-20 bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Quick Wins: Easy AI Tasks to Try Today
            </h2>
            <p className="mt-3 text-gray-500">
              Low-risk, high-value tasks perfect for getting comfortable with AI
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickWins.map((win, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <CircleCheckBig className="h-5 w-5 text-brand-600 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700">{win}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Ready to Try Your First Prompt?
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Head to our Prompt Library and find a template that matches your work.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prompt-library"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all"
            >
              Browse Prompt Library
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/best-practices"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-white text-brand-700 border border-gray-200 hover:bg-brand-50 transition-all"
            >
              View Best Practices
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
