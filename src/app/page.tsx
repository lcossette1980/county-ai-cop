import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  BarChart3,
  FileEdit,
  Compass,
  Scale,
  Award,
  TrendingUp,
  Shield,
  Book,
  HelpCircle,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "County Gov AI CoP",
  description:
    "Empowering county government employees to responsibly harness AI technology for better public service delivery.",
};

const tools = [
  {
    icon: BookOpen,
    title: "Prompt Library",
    description:
      "75+ pre-built AI prompts tailored for government work. Search, filter, and save your favorites.",
    href: "/prompt-library",
    cta: "Browse Library",
  },
  {
    icon: BarChart3,
    title: "ROI Calculator",
    description:
      "Calculate the potential return on investment for AI initiatives in your department.",
    href: "/roi-calculator",
    cta: "Calculate ROI",
  },
  {
    icon: FileEdit,
    title: "Submit Proposal",
    description:
      "Ready to implement AI? Submit your project proposal to the AI Center of Excellence.",
    href: "/submit-project",
    cta: "Submit Project",
  },
];

const resources = [
  { icon: Compass, title: "Getting Started", description: "New to AI? Start here with our beginner-friendly guide.", href: "/getting-started", cta: "Learn basics" },
  { icon: Scale, title: "Governance", description: "Policies, approval processes, and compliance requirements.", href: "/governance", cta: "View policies" },
  { icon: Award, title: "Best Practices", description: "Tips, techniques, and proven approaches for AI success.", href: "/best-practices", cta: "See practices" },
  { icon: TrendingUp, title: "Success Stories", description: "Real examples of AI making a difference in county services.", href: "#", cta: "Coming Soon", disabled: true },
  { icon: Shield, title: "Ethics", description: "Responsible AI principles and ethical guidelines.", href: "/ethics", cta: "Ethics guide" },
  { icon: Book, title: "Resources", description: "Training materials, videos, and external learning resources.", href: "/resources", cta: "Browse all" },
  { icon: HelpCircle, title: "FAQ", description: "Answers to common questions about AI in county government.", href: "/faq", cta: "Get answers" },
  { icon: Calendar, title: "Events", description: "Office hours, workshops, and community meetups.", href: "/events", cta: "View schedule" },
];

const stats = [
  { value: "75+", label: "AI Prompts" },
  { value: "12+", label: "Departments" },
  { value: "50+", label: "Use Cases" },
  { value: "100%", label: "Free & Open" },
];

const features1 = [
  "Compliance-focused AI guidance",
  "Privacy and security best practices",
  "Equity and accessibility considerations",
  "Real county use cases and success stories",
  "Peer support and knowledge sharing",
];

const features2 = [
  "Clear governance and approval processes",
  "Bias detection and mitigation strategies",
  "Transparent AI decision-making",
  "Data privacy and security protocols",
  "Regular ethics training and updates",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
            AI for County
            <span className="block bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              Government
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Empowering public servants to responsibly harness AI technology for
            better service delivery. Learn, share, and innovate together.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/getting-started"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
            >
              Get Started with AI
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/prompt-library"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              Explore Prompt Library
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-600">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500 uppercase tracking-wide font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="bg-brand-50/50 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Quick Access Tools
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to start using AI effectively in your work
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-100 text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <tool.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  {tool.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature: Built for Public Servants */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                Built for Public Servants
              </h3>
              <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                Our AI Community of Practice is specifically designed for county
                government employees. We understand the unique challenges and
                opportunities in public service.
              </p>
              <ul className="mt-8 space-y-4">
                {features1.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Learn more about us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <ImagePlaceholder src="/images/public-service-team.png" alt="County government employees collaborating on AI initiatives" icon={Users} label="Public Service Team" gradient="brand" />
          </div>
        </div>
      </section>

      {/* Feature: Safe & Ethical */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ImagePlaceholder src="/images/responsible-ai.png" alt="Secure and ethical AI governance framework" icon={Shield} label="Responsible AI" gradient="accent" className="order-2 lg:order-1" />
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                Safe, Ethical, and Responsible
              </h3>
              <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                We prioritize responsible AI use that serves our community
                equitably and protects privacy and civil rights.
              </p>
              <ul className="mt-8 space-y-4">
                {features2.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/ethics"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  View ethics framework
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Explore Resources
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Comprehensive guides, policies, and learning materials
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resources.map((r) => {
              const card = (
                <div
                  className={`group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all duration-200 h-full ${
                    r.disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-brand-100 text-brand-600 mb-4 group-hover:scale-110 transition-transform">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">{r.title}</h4>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{r.description}</p>
                  <span className={`text-sm font-semibold ${r.disabled ? "text-gray-400" : "text-brand-600 group-hover:text-brand-700"} inline-flex items-center gap-1`}>
                    {r.cta}
                    {!r.disabled && <ArrowRight className="h-3.5 w-3.5" />}
                  </span>
                </div>
              );
              return r.disabled ? (
                <div key={r.title}>{card}</div>
              ) : (
                <Link key={r.title} href={r.href}>{card}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            Join our growing community of county employees using AI to deliver better public services.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/getting-started" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-white text-brand-900 hover:bg-gray-100 shadow-lg transition-all hover:-translate-y-0.5">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
