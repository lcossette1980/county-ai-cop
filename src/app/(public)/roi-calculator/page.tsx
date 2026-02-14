"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calculator,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  RotateCcw,
  Save,
  CheckCircle2,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ROIInputs {
  projectName: string;
  department: string;
  hoursPerWeek: number;
  affectedStaff: number;
  avgHourlyRate: number;
  implementationCost: number;
  annualLicenseCost: number;
  efficiencyGain: number;
  errorReduction: number;
}

const defaultInputs: ROIInputs = {
  projectName: "",
  department: "",
  hoursPerWeek: 10,
  affectedStaff: 5,
  avgHourlyRate: 35,
  implementationCost: 5000,
  annualLicenseCost: 1200,
  efficiencyGain: 30,
  errorReduction: 20,
};

function calculateROI(inputs: ROIInputs) {
  const weeklyHoursSaved = inputs.hoursPerWeek * inputs.affectedStaff * (inputs.efficiencyGain / 100);
  const annualHoursSaved = weeklyHoursSaved * 52;
  const annualLaborSavings = annualHoursSaved * inputs.avgHourlyRate;
  const errorCostSavings = annualLaborSavings * (inputs.errorReduction / 100) * 0.15;
  const totalAnnualSavings = annualLaborSavings + errorCostSavings;
  const totalCostYear1 = inputs.implementationCost + inputs.annualLicenseCost;
  const netSavingsYear1 = totalAnnualSavings - totalCostYear1;
  const roi = totalCostYear1 > 0 ? ((totalAnnualSavings - totalCostYear1) / totalCostYear1) * 100 : 0;
  const paybackMonths = totalAnnualSavings > 0 ? (totalCostYear1 / totalAnnualSavings) * 12 : 0;
  const fteEquivalent = annualHoursSaved / 2080;

  return {
    weeklyHoursSaved: Math.round(weeklyHoursSaved * 10) / 10,
    annualHoursSaved: Math.round(annualHoursSaved),
    annualLaborSavings: Math.round(annualLaborSavings),
    errorCostSavings: Math.round(errorCostSavings),
    totalAnnualSavings: Math.round(totalAnnualSavings),
    totalCostYear1: Math.round(totalCostYear1),
    netSavingsYear1: Math.round(netSavingsYear1),
    roi: Math.round(roi),
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    fteEquivalent: Math.round(fteEquivalent * 100) / 100,
    threeYearSavings: Math.round(totalAnnualSavings * 3 - totalCostYear1 - inputs.annualLicenseCost * 2),
  };
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function ROICalculatorInner() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const prefillName = searchParams.get("projectName");
  const prefillDept = searchParams.get("department");

  const [inputs, setInputs] = useState<ROIInputs>({
    ...defaultInputs,
    ...(prefillName ? { projectName: prefillName } : {}),
    ...(prefillDept ? { department: prefillDept } : {}),
  });
  const [showResults, setShowResults] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const update = (field: keyof ROIInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setInputs({
      ...defaultInputs,
      ...(prefillName ? { projectName: prefillName } : {}),
      ...(prefillDept ? { department: prefillDept } : {}),
    });
    setShowResults(false);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: inputs.projectName,
          department: inputs.department,
          projectId: projectId || undefined,
          inputs: {
            hoursPerWeek: inputs.hoursPerWeek,
            affectedStaff: inputs.affectedStaff,
            avgHourlyRate: inputs.avgHourlyRate,
            implementationCost: inputs.implementationCost,
            annualLicenseCost: inputs.annualLicenseCost,
            efficiencyGain: inputs.efficiencyGain,
            errorReduction: inputs.errorReduction,
          },
          results,
        }),
      });

      if (res.ok && projectId) {
        const data = await res.json();
        // Link ROI calculation back to the project
        await fetch(`/api/projects/${projectId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roiCalculationId: data.id }),
        });
      }

      setSaved(true);
    } catch {
      // Silently fail — saving is optional
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">AI ROI Calculator</h1>
          <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Estimate the return on investment for AI initiatives in your department
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Linked Project Banner */}
          {projectId && (
            <div className="mb-6 bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <Link2 className="h-4 w-4 text-brand-600" />
              <p className="text-sm text-brand-700">
                Calculating ROI for <strong>{prefillName || "linked project"}</strong>. Results will be linked automatically.
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Project Details</h2>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Project Name</label>
                      <input type="text" value={inputs.projectName} onChange={(e) => update("projectName", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="e.g., Document Automation" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <input type="text" value={inputs.department} onChange={(e) => update("department", e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" placeholder="e.g., Health Services" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Staffing & Time</h3>
                    <div className="grid sm:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Hours/Week on Task</label>
                        <input type="number" min="0" value={inputs.hoursPerWeek} onChange={(e) => update("hoursPerWeek", +e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Staff Affected</label>
                        <input type="number" min="1" value={inputs.affectedStaff} onChange={(e) => update("affectedStaff", +e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Avg Hourly Rate ($)</label>
                        <input type="number" min="0" value={inputs.avgHourlyRate} onChange={(e) => update("avgHourlyRate", +e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Costs</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Implementation Cost ($)</label>
                        <input type="number" min="0" value={inputs.implementationCost} onChange={(e) => update("implementationCost", +e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Annual License Cost ($)</label>
                        <input type="number" min="0" value={inputs.annualLicenseCost} onChange={(e) => update("annualLicenseCost", +e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Expected Impact</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Efficiency Gain (%)</label>
                        <input type="range" min="5" max="80" value={inputs.efficiencyGain} onChange={(e) => update("efficiencyGain", +e.target.value)} className="w-full" />
                        <p className="text-right text-sm font-semibold text-brand-600">{inputs.efficiencyGain}%</p>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Error Reduction (%)</label>
                        <input type="range" min="0" max="80" value={inputs.errorReduction} onChange={(e) => update("errorReduction", +e.target.value)} className="w-full" />
                        <p className="text-right text-sm font-semibold text-brand-600">{inputs.errorReduction}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={handleCalculate} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors cursor-pointer">
                    <Calculator className="h-4 w-4" /> Calculate ROI
                  </button>
                  {showResults && (
                    <button onClick={handleSave} disabled={saving || saved} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-brand-600 border border-brand-200 hover:bg-brand-50 transition-colors disabled:opacity-50 cursor-pointer">
                      {saved ? <CheckCircle2 className="h-4 w-4" /> : saving ? <div className="h-4 w-4 border-2 border-brand-300 border-t-brand-600 rounded-full animate-spin" /> : <Save className="h-4 w-4" />}
                      {saved ? "Saved" : saving ? "Saving..." : "Save Calculation"}
                    </button>
                  )}
                  <button onClick={handleReset} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <div className={cn("bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 transition-opacity", !showResults && "opacity-50")}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">ROI Results</h2>

                <div className="space-y-4">
                  <div className="bg-brand-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">Return on Investment</p>
                    <p className="text-4xl font-extrabold text-brand-700">{results.roi}%</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <Clock className="h-5 w-5 text-brand-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">{results.annualHoursSaved.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase">Hours/Year Saved</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <DollarSign className="h-5 w-5 text-success mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(results.totalAnnualSavings)}</p>
                      <p className="text-[10px] text-gray-500 uppercase">Annual Savings</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <Users className="h-5 w-5 text-accent-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">{results.fteEquivalent}</p>
                      <p className="text-[10px] text-gray-500 uppercase">FTE Equivalent</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <TrendingUp className="h-5 w-5 text-warning mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">{results.paybackMonths} mo</p>
                      <p className="text-[10px] text-gray-500 uppercase">Payback Period</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Cost (Year 1)</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.totalCostYear1)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Labor Savings</span>
                      <span className="font-semibold text-success">{formatCurrency(results.annualLaborSavings)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Error Reduction Savings</span>
                      <span className="font-semibold text-success">{formatCurrency(results.errorCostSavings)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                      <span className="font-medium text-gray-700">Net Savings (Year 1)</span>
                      <span className={cn("font-bold", results.netSavingsYear1 >= 0 ? "text-success" : "text-danger")}>
                        {formatCurrency(results.netSavingsYear1)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">3-Year Net Savings</span>
                      <span className="font-bold text-brand-600">{formatCurrency(results.threeYearSavings)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ROICalculatorPage() {
  return (
    <Suspense>
      <ROICalculatorInner />
    </Suspense>
  );
}
