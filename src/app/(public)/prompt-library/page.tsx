"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Copy,
  Check,
  BookOpen,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { prompts as staticPrompts, categories, type PromptTemplate } from "@/data/prompts";
import { cn } from "@/lib/utils";

function PromptModal({
  prompt,
  onClose,
}: {
  prompt: PromptTemplate;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{prompt.title}</h2>
            <p className="text-sm text-gray-500">{prompt.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 ring-1 ring-inset ring-brand-200">
              {categories.find((c) => c.id === prompt.category)?.label || prompt.category}
            </span>
            {prompt.featured && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200">
                Featured
              </span>
            )}
          </div>
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {prompt.template}
            </pre>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {prompt.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-500">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CommunityPrompt extends PromptTemplate {
  community?: boolean;
}

export default function PromptLibraryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPrompt, setSelectedPrompt] = useState<CommunityPrompt | null>(null);
  const [communityPrompts, setCommunityPrompts] = useState<CommunityPrompt[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("prompt-favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  // Fetch approved community prompts from Firestore
  useEffect(() => {
    async function loadCommunity() {
      try {
        const res = await fetch("/api/prompts?status=approved");
        if (res.ok) {
          const data = await res.json();
          const mapped: CommunityPrompt[] = data.map((p: Record<string, unknown>, i: number) => ({
            id: 10000 + i,
            title: p.title as string,
            category: p.category as string,
            description: p.description as string,
            template: p.template as string,
            tags: (p.tags as string[]) || [],
            featured: false,
            community: true,
          }));
          setCommunityPrompts(mapped);
        }
      } catch {
        // Static prompts remain as fallback
      }
    }
    loadCommunity();
  }, []);

  const allPrompts: CommunityPrompt[] = useMemo(
    () => [...staticPrompts, ...communityPrompts],
    [communityPrompts]
  );

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("prompt-favorites", JSON.stringify(updated));
  };

  const filtered = useMemo(() => {
    let result = allPrompts;

    if (showFavorites) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [search, activeCategory, showFavorites, favorites, allPrompts]);

  return (
    <>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            AI Prompt Library
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {allPrompts.length}+ AI prompts tailored for government work. Search, copy, and customize.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search prompts by title, description, or tags..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors cursor-pointer",
                showFavorites
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              )}
            >
              <Star className={cn("h-4 w-4", showFavorites && "fill-amber-400")} />
              Favorites ({favorites.length})
            </button>
            <a
              href="/submit-prompt"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors"
            >
              Submit a Prompt
            </a>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Categories */}
            <div className="lg:w-56 shrink-0">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setShowFavorites(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                      activeCategory === cat.id && !showFavorites
                        ? "bg-brand-100 text-brand-700"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Prompt Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  {filtered.length} prompt{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No prompts found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filtered.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 cursor-pointer"
                      onClick={() => setSelectedPrompt(prompt)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-700">
                              {categories.find((c) => c.id === prompt.category)?.label || prompt.category}
                            </span>
                            {prompt.featured && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">
                                Featured
                              </span>
                            )}
                            {(prompt as CommunityPrompt).community && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-50 text-violet-700">
                                <Users className="h-2.5 w-2.5" /> Community
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                            {prompt.title}
                          </h3>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(prompt.id); }}
                          className="p-1.5 rounded-lg text-gray-300 hover:text-amber-500 transition-colors cursor-pointer"
                        >
                          <Star className={cn("h-4 w-4", favorites.includes(prompt.id) && "fill-amber-400 text-amber-400")} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">
                        {prompt.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] text-gray-400 bg-gray-50">
                            {tag}
                          </span>
                        ))}
                        {prompt.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] text-gray-400 bg-gray-50">
                            +{prompt.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </>
  );
}
