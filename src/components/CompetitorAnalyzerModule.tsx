import React, { useState } from 'react';
import { CompetitorReport, TabType } from '../types';
import { PRESET_CHANNELS } from '../data/mockData';
import {
  Users,
  Search,
  RefreshCw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Bookmark,
  Target,
} from 'lucide-react';

interface CompetitorAnalyzerModuleProps {
  competitorData: CompetitorReport;
  onCompetitorUpdate: (data: CompetitorReport) => void;
  onSendTitleToGenerator: (topic: string) => void;
  onSaveToLibrary: (title: string, type: 'title', payload: any) => void;
  onNavigate: (tab: TabType) => void;
}

export const CompetitorAnalyzerModule: React.FC<CompetitorAnalyzerModuleProps> = ({
  competitorData,
  onCompetitorUpdate,
  onSendTitleToGenerator,
  onSaveToLibrary,
  onNavigate,
}) => {
  const [competitorInput, setCompetitorInput] = useState(competitorData.handle || '@mkbhd');
  const [niche, setNiche] = useState('Tech Reviews & AI');
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAnalyze = async (customHandle?: string) => {
    const target = customHandle || competitorInput;
    setIsLoading(true);
    try {
      const res = await fetch('/api/competitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorUrl: target,
          yourNiche: niche,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        onCompetitorUpdate(data.data);
      }
    } catch (err) {
      console.error('Failed to analyze competitor:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    onSaveToLibrary(`Competitor Gap Report: ${competitorData.competitorName}`, 'title', competitorData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Search */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <Users className="h-4 w-4" />
              <span>MODULE 6 · COMPETITOR RESEARCH & CONTENT GAP DETECTION</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Competitor Intelligence & Content Gap Analyzer
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Reverse-engineer competitor algorithmic vulnerabilities and uncover topics they missed that you can win.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>{saveSuccess ? 'Saved to Library!' : 'Save Gap Report'}</span>
          </button>
        </div>

        {/* Input */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Competitor Channel Handle or YouTube URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={competitorInput}
                onChange={(e) => setCompetitorInput(e.target.value)}
                placeholder="e.g. @mkbhd, @aliabdaal, @veritasium"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Niche Category
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Tech Reviews, Productivity, Gaming"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              onClick={() => handleAnalyze()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Target className="h-4 w-4" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Quick Test Competitors:</span>
          {PRESET_CHANNELS.map((ch) => (
            <button
              key={ch.handle}
              onClick={() => {
                setCompetitorInput(ch.handle);
                setNiche(ch.niche);
                handleAnalyze(ch.handle);
              }}
              className="rounded-md border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
            >
              {ch.handle} · {ch.name}
            </button>
          ))}
        </div>
      </div>

      {/* Competitor Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Competitor Profile
            </span>
            <span className="font-mono text-xs text-red-400">{competitorData.handle}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{competitorData.competitorName}</h2>
          <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Upload Cadence:</span>
              <span className="font-semibold text-white">{competitorData.estimatedCadence}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Avg Public Views:</span>
              <span className="font-mono font-bold text-emerald-400">{competitorData.avgPublicViews}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Core Strengths</h3>
          </div>
          <ul className="space-y-2">
            {competitorData.coreStrengths.map((s, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Algorithmic Vulnerabilities</h3>
          </div>
          <ul className="space-y-2">
            {competitorData.vulnerabilities.map((v, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Uncovered Content Gaps - The Key AI Output */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-1">
              <Lightbulb className="h-4 w-4" />
              <span>CRITICAL CONTENT OPPORTUNITY GAPS</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Uncovered Video Opportunities {competitorData.competitorName} Missed
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              High audience demand queries that the competitor under-delivers on, primed for your channel.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitorData.uncoveredContentGaps.map((gap, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    Content Gap #{idx + 1}
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      gap.opportunityRating === 'Very High'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {gap.opportunityRating} Opportunity
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2">{gap.gapTopic}</h4>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  <strong className="text-slate-300">Why competitor missed it:</strong> {gap.whyCompetitorMissedIt}
                </p>

                <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">
                    Winning Challenger Title
                  </span>
                  <p className="text-xs font-semibold text-white leading-snug">
                    "{gap.recommendedTitle}"
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">Ready to produce?</span>
                <button
                  onClick={() => {
                    onSendTitleToGenerator(gap.recommendedTitle);
                    onNavigate('titles');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors"
                >
                  <span>Generate Packaging</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Counter Strategy */}
      <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-6">
        <h3 className="text-sm font-bold text-white tracking-tight mb-2 flex items-center gap-2">
          <Target className="h-4 w-4 text-red-400" />
          <span>Strategic Counter-Programming Gameplan</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          {competitorData.counterStrategy}
        </p>
      </div>
    </div>
  );
};
