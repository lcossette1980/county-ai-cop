import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  Users,
  TrendingUp,
  Gavel,
  Workflow,
  ArrowRight,
  User,
  Mail,
  Landmark,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the County Government AI Community of Practice.",
};

const values = [
  { icon: Users, title: "Community First", description: "We believe in the power of shared learning. Every county employee has valuable perspectives to contribute to responsible AI adoption." },
  { icon: TrendingUp, title: "Practical Impact", description: "We focus on real-world applications that save time, reduce costs, and improve services — not theoretical or bleeding-edge technology." },
  { icon: Gavel, title: "Equity & Ethics", description: "Every AI initiative must serve all community members fairly. We lead with equity and embed ethical considerations at every step." },
  { icon: Workflow, title: "Accessible Innovation", description: "AI should be approachable for everyone. We break down complexity and provide clear, jargon-free resources at every skill level." },
];

const teamMembers = [
  { name: "AI CoP Lead", role: "Program Director", description: "Oversees strategy, governance, and partnerships. Ensures AI initiatives align with county priorities." },
  { name: "Technical Lead", role: "AI Solutions Architect", description: "Provides technical guidance on AI tools, architecture, and integration. Reviews project proposals." },
  { name: "Training Coordinator", role: "Learning & Development", description: "Develops and delivers training programs, workshops, and educational content for all skill levels." },
  { name: "Ethics Advisor", role: "Responsible AI", description: "Ensures AI initiatives meet ethical standards, conducts bias assessments, and develops equity frameworks." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About the AI CoP"
        subtitle="Our mission, values, and the team behind the County Government AI Community of Practice"
        gradient="accent"
      />

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                The AI Community of Practice exists to empower county government employees with the
                knowledge, tools, and governance they need to use AI responsibly and effectively.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                We bridge the gap between cutting-edge AI technology and practical government work,
                ensuring that innovation serves the public interest and advances equity.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through training, resources, community building, and hands-on support, we help
                departments across county government discover how AI can improve efficiency, reduce
                costs, and enhance service delivery.
              </p>
            </div>
            <ImagePlaceholder src="/images/our-mission.png" alt="County government building representing institutional AI leadership" icon={Landmark} label="Our Mission" gradient="cool" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-3 text-gray-500">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-100 text-brand-600 shrink-0">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-3 text-gray-500">The people driving AI innovation in county government</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto mb-4 flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-brand-200 to-brand-300">
                  <User className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-brand-600 font-medium mb-2">{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Want to Get Involved?</h2>
          <p className="mt-3 text-gray-500 text-lg">
            Whether you want to share your experience, suggest improvements, or volunteer — we&apos;d love to hear from you.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
