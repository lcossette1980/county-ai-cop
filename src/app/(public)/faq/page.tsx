"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, ChevronDown } from "lucide-react";
import { faqData } from "@/data/faq";
import { cn } from "@/lib/utils";

const categories = Array.from(new Set(faqData.map((f) => f.category)));

function FAQAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-medium text-gray-900 hover:text-brand-600 transition-colors cursor-pointer"
      >
        <span className="pr-4">{question}</span>
        <ChevronDown className={cn("h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-200", open ? "max-h-[2000px] pb-5" : "max-h-0")}>
        <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? faqData : faqData.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">Find answers to common questions about AI in county government</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
                activeCategory === "All" ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
                  activeCategory === cat ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6">
              {filtered.map((faq, i) => (
                <FAQAccordionItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Still have questions?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
