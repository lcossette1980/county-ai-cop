import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Book,
  Video,
  FileText,
  ExternalLink,
  GraduationCap,
  ArrowRight,
  Globe,
  Podcast,
  Newspaper,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description: "Training materials, documentation, and tools to support your AI initiatives.",
};

const trainingCourses = [
  { title: "AI 101: Introduction to Artificial Intelligence", description: "A foundational course covering what AI is, how it works, and its potential for government. No technical background required.", level: "Beginner", duration: "2 hours" },
  { title: "AI 102: Practical AI for Government Work", description: "Hands-on course focused on using AI tools effectively in daily government operations. Includes live demonstrations.", level: "Beginner", duration: "3 hours" },
  { title: "Prompt Engineering 101", description: "Learn to write effective prompts that get consistent, high-quality results from AI tools. Includes practice exercises.", level: "Intermediate", duration: "2 hours" },
  { title: "Generative AI 101: Understanding Large Language Models", description: "Deep dive into how generative AI works, its capabilities, limitations, and responsible use considerations.", level: "Intermediate", duration: "4 hours" },
];

const externalResources = [
  { title: "NIST AI Risk Management Framework", description: "The National Institute of Standards and Technology framework for managing AI risks.", category: "Framework" },
  { title: "White House AI Bill of Rights", description: "Blueprint for protecting civil rights in the age of artificial intelligence.", category: "Policy" },
  { title: "Government AI Coalition", description: "A network of government agencies sharing AI best practices and lessons learned.", category: "Community" },
  { title: "AI.gov", description: "The federal government's central resource for AI policy, research, and initiatives.", category: "Government" },
  { title: "Partnership on AI", description: "Multi-stakeholder organization developing best practices for responsible AI.", category: "Research" },
  { title: "Stanford HAI", description: "Stanford's Institute for Human-Centered Artificial Intelligence research and policy.", category: "Research" },
];

const documentCategories = [
  { icon: FileText, title: "Policy Documents", items: ["AI Acceptable Use Policy", "Data Classification Guide", "Privacy Impact Assessment Template", "AI Procurement Guidelines"] },
  { icon: GraduationCap, title: "Training Materials", items: ["AI Basics Slide Deck", "Prompt Engineering Handbook", "AI Ethics Workshop Materials", "Department-Specific AI Guides"] },
  { icon: Book, title: "Reference Guides", items: ["AI Glossary of Terms", "Tool Comparison Chart", "Vendor Assessment Checklist", "Risk Assessment Template"] },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        title="Learning Resources"
        subtitle="Training materials, documentation, and curated learning resources for AI in county government"
        gradient="brand"
      />

      {/* Training Courses */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Training Courses</h2>
            <p className="mt-3 text-gray-500">Structured learning paths for every skill level</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {trainingCourses.map((course) => (
              <div key={course.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${course.level === "Beginner" ? "bg-emerald-100 text-emerald-700" : "bg-brand-100 text-brand-700"}`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-gray-400">{course.duration}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Documentation Library</h2>
            <p className="mt-3 text-gray-500">Templates, guides, and reference materials</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {documentCategories.map((cat) => (
              <div key={cat.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-100 text-brand-600 mb-4">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">{cat.title}</h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">External Resources</h2>
            <p className="mt-3 text-gray-500">Curated links from trusted sources</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {externalResources.map((resource) => (
              <div key={resource.title} className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-4 w-4 text-brand-500" />
                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{resource.category}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{resource.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Need Help Getting Started?</h2>
          <p className="mt-3 text-gray-500 text-lg">Join our office hours for hands-on guidance from the AI CoP team.</p>
          <div className="mt-8">
            <Link href="/events" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all">
              View Events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
