"use client";

import { useState, useEffect } from "react";
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  Link2,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface ROICalc {
  id: string;
  projectName: string;
  department: string;
  inputs: Record<string, number>;
  results: Record<string, number>;
  submittedDate: string;
  projectId?: string;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ROIHistoryPage() {
  const [calculations, setCalculations] = useState<ROICalc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/roi");
        if (res.ok) {
          setCalculations(await res.json());
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            ROI History
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            View all saved ROI calculations and their linked projects
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
            </div>
          ) : calculations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Calculator className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-4">No ROI calculations saved yet</p>
              <a
                href="/roi-calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors"
              >
                <Calculator className="h-4 w-4" /> Calculate ROI
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {calculations.map((calc) => (
                <div
                  key={calc.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {calc.projectName || "Untitled Calculation"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {calc.department || "No department"} &middot; {formatDate(calc.submittedDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {calc.projectId ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">
                          <Link2 className="h-3 w-3" /> Linked to project
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Not linked</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <TrendingUp className="h-4 w-4 text-brand-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">
                        {calc.results?.roi || 0}%
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase">ROI</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <DollarSign className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(calc.results?.totalAnnualSavings || 0)}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase">Annual Savings</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <Clock className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">
                        {(calc.results?.annualHoursSaved || 0).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase">Hours/Year</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <Clock className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">
                        {calc.results?.paybackMonths || 0} mo
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase">Payback</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center pt-4">
                <a
                  href="/roi-calculator"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500"
                >
                  <ExternalLink className="h-4 w-4" /> New Calculation
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
