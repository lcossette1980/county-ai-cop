import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Video,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming workshops, training sessions, and community events.",
};

const upcomingEvents = [
  { title: "AI Office Hours", description: "Drop in for one-on-one help with AI tools, prompt writing, or project planning. No appointment needed.", date: "Every Wednesday", time: "2:00 PM - 3:00 PM", location: "Virtual (Teams)", type: "Office Hours", recurring: true },
  { title: "AI 101: Introduction Workshop", description: "A hands-on introduction to AI for complete beginners. Learn the basics and try your first prompts.", date: "1st Tuesday of each month", time: "10:00 AM - 12:00 PM", location: "Virtual (Teams)", type: "Workshop", recurring: true },
  { title: "Prompt Engineering Deep Dive", description: "Advanced techniques for writing effective prompts. Bring your use cases for live demonstrations.", date: "3rd Thursday of each month", time: "1:00 PM - 2:30 PM", location: "Virtual (Teams)", type: "Training", recurring: true },
  { title: "AI CoP Monthly Meetup", description: "Community gathering to share experiences, showcase projects, and discuss AI trends in government.", date: "Last Friday of each month", time: "11:00 AM - 12:00 PM", location: "Virtual (Teams)", type: "Community", recurring: true },
];

const pastEvents = [
  { title: "AI Ethics Workshop", description: "Interactive workshop on identifying and mitigating AI bias in government applications.", attendees: 45 },
  { title: "ROI Calculator Launch", description: "Introduction of the new AI ROI Calculator tool with hands-on demonstrations.", attendees: 60 },
  { title: "Department Showcase: IT Services", description: "IT Services department shared their AI automation success stories and lessons learned.", attendees: 35 },
];

const typeColors: Record<string, string> = {
  "Office Hours": "bg-emerald-100 text-emerald-700",
  Workshop: "bg-brand-100 text-brand-700",
  Training: "bg-purple-100 text-purple-700",
  Community: "bg-amber-100 text-amber-700",
};

const typeIcons: Record<string, typeof Calendar> = {
  "Office Hours": MessageSquare,
  Workshop: BookOpen,
  Training: Video,
  Community: Users,
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events & Office Hours"
        subtitle="Join workshops, training sessions, and community meetups to grow your AI skills"
        gradient="brand"
      />

      {/* Upcoming Events */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="mt-3 text-gray-500">Recurring events and sessions to support your AI journey</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => {
              const TypeIcon = typeIcons[event.type] || Calendar;
              return (
                <div key={event.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[event.type] || "bg-gray-100 text-gray-700"}`}>
                        {event.type}
                      </span>
                      {event.recurring && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Recurring</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-brand-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand-500" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Past Events</h2>
            <p className="mt-3 text-gray-500">Recent events and their highlights</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {pastEvents.map((event) => (
              <div key={event.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gray-100 text-gray-400 shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                  <Users className="h-3.5 w-3.5" />
                  {event.attendees}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Want to Present or Host an Event?</h2>
          <p className="mt-3 text-gray-500 text-lg">We welcome department showcases, guest speakers, and workshop proposals.</p>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
