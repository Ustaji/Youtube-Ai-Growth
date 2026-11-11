import React, { useState } from 'react';
import { ChannelAuditReport, TabType } from '../types';
import { PRESET_CHANNELS } from '../data/mockData';
import {
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Zap,
  ArrowRight,
  RefreshCw,
  Search,
  Bookmark,
  Share2,
} from 'lucide-react';

interface ChannelAuditModuleProps {
  auditData: ChannelAuditReport;
  onAuditUpdate: (data: ChannelAuditReport) => void;
  onNavigate: (tab: TabType) => void;
  onSaveToLibrary: (title: string, type: 'audit', payload: any) => void;
}

export const ChannelAuditModule: React.FC<ChannelAuditModuleProps> = ({
  auditData,
  onAuditUpdate,
  onNavigate,
  onSaveToLibrary,
}) => {
  const [handleInput, setHandleInput] = useState(auditData.handle || '@mycreatorchannel');
  const [nicheInput, setNicheInput] = useState('Tech & AI');
  const [subTier, setSubTier] = useState('10K - 100K');
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleRunAudit = async (customHandle?: string) => {
    const targetHandle = customHandle || handleInput;
    setIsLoading(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelHandleOrUrl: targetHandle,
          niche: nicheInput,
          subscriberCount: subTier,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        onAuditUpdate(data.data);
      }
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    onSaveToLibrary(`${auditData.channelName} (${auditData.handle}) Health Audit`, 'audit', auditData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2200);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getScoreBar = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Channel Input */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>MODULE 1 · CHANNEL AUDIT & HEALTH DIAGNOSTIC</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              YouTube Channel Audit & Growth Engine
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Deep algorithmic diagnosis across packaging, CTR, audience retention, and search indexing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{saveSuccess ? 'Saved to Library!' : 'Save Audit'}</span>
            </button>
            <button
              onClick={() => onNavigate('trends')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors shadow-sm"
            >
              <span>Explore Trending Topics</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Channel Handle or YouTube URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                placeholder="e.g. @mkbhd, @veritasium, or channel URL"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Channel Niche
            </label>
            <select
              value={nicheInput}
              onChange={(e) => setNicheInput(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Tech & AI">Tech & AI</option>
              <option value="Gaming & Esports">Gaming & Esports</option>
              <option value="Finance & Wealth">Finance & Wealth</option>
              <option value="Science & Education">Science & Education</option>
              <option value="Lifestyle & Fitness">Lifestyle & Fitness</option>
              <option value="Creator Economy">Creator Economy</option>
              <option value="Islamic & Faith">Islamic & Faith</option>
              <option value="Entertainment & True Crime">Entertainment & True Crime</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Audience Tier
            </label>
            <select
              value={subTier}
              onChange={(e) => setSubTier(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              <option value="0 - 1K (Beginner)">0 - 1K (Beginner)</option>
              <option value="1K - 10K (Growing)">1K - 10K (Growing)</option>
              <option value="10K - 100K (Scaling)">10K - 100K (Scaling)</option>
              <option value="100K - 1M+ (Authority)">100K - 1M+ (Authority)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={() => handleRunAudit()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Run Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Quick Test Channels:</span>
          {PRESET_CHANNELS.map((ch) => (
            <button
              key={ch.handle}
              onClick={() => {
                setHandleInput(ch.handle);
                setNicheInput(ch.niche);
                handleRunAudit(ch.handle);
              }}
              className="rounded-md border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
            >
              {ch.handle} · {ch.name} ({ch.subs})
            </button>
          ))}
        </div>
      </div>

      {/* Main Score & Metrics Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overall Health Score Card */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Channel Health Score
              </span>
              <span className="text-xs font-semibold text-emerald-400">Algorithmic Grade</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className={`text-6xl font-extrabold tracking-tight tabular-nums ${getScoreColor(auditData.overallScore).split(' ')[0]}`}>
                {auditData.overallScore}
              </span>
              <span className="text-xl text-slate-400 font-semibold">/ 100</span>
            </div>

            <div className="mt-4">
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${getScoreBar(auditData.overallScore)}`}
                  style={{ width: `${auditData.overallScore}%` }}
                />
              </div>
            </div>

            <div className="mt-5 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Audited Handle</span>
                <span className="font-mono font-semibold text-white">{auditData.handle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Subscriber Baseline</span>
                <span className="font-semibold text-slate-200">{auditData.subscriberEstimate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Estimated Monthly Growth</span>
                <span className="font-semibold text-emerald-400">+14.2% velocity</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on official YouTube discovery signals: Viewer Satisfaction, First-Hour Click-Through Rate, 50% Milestone Retention, and Session Continuity.
            </p>
          </div>
        </div>

        {/* 6 Category Breakdown Bars */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Algorithmic Component Breakdown
            </h3>
            <span className="text-xs text-slate-400">Target Benchmark: &gt;80 for Browse Home Feed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              { label: 'SEO & Search Optimization', score: auditData.breakdown.seoScore, desc: 'Keyword front-loading, description depth, tags' },
              { label: 'Thumbnail Packaging Quality', score: auditData.breakdown.thumbnailScore, desc: 'Visual contrast, 3-word rule, face sizing' },
              { label: 'Content Quality & Retention', score: auditData.breakdown.contentQualityScore, desc: 'Intro hook, audio fidelity, pacing interrupts' },
              { label: 'Engagement & Community Score', score: auditData.breakdown.engagementScore, desc: 'Comment-to-view ratio, poll interaction' },
              { label: 'Upload Consistency & Cadence', score: auditData.breakdown.uploadConsistencyScore, desc: 'Regular publishing rhythm and timing' },
              { label: 'Channel Branding & Identity', score: auditData.breakdown.channelBrandingScore, desc: 'Banner value prop, niche topical cohesion' },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5 py-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{item.label}</span>
                  <span className="font-mono font-bold text-white tabular-nums">{item.score} / 100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getScoreBar(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Channel Metrics Row */}
          <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
            <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
              <span className="block text-[11px] font-medium text-slate-400">Avg Views / Video</span>
              <span className="font-mono font-bold text-sm text-white mt-1 block tabular-nums">
                {auditData.metrics.avgViewsPerVideo}
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
              <span className="block text-[11px] font-medium text-slate-400">Estimated CTR</span>
              <span className="font-mono font-bold text-sm text-emerald-400 mt-1 block tabular-nums">
                {auditData.metrics.estimatedCtr}
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
              <span className="block text-[11px] font-medium text-slate-400">Avg View Duration</span>
              <span className="font-mono font-bold text-sm text-white mt-1 block tabular-nums">
                {auditData.metrics.avgViewDuration}
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
              <span className="block text-[11px] font-medium text-slate-400">Upload Cadence</span>
              <span className="font-mono font-bold text-sm text-white mt-1 block tabular-nums">
                {auditData.metrics.uploadFrequency}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
              <span className="block text-[11px] font-medium text-slate-400">Shorts vs Long-form</span>
              <span className="font-mono font-bold text-sm text-cyan-400 mt-1 block tabular-nums">
                {auditData.metrics.shortsVsLongRatio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Channel Strengths & Moats</h3>
          </div>
          <ul className="space-y-3">
            {auditData.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-rose-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Algorithmic Weaknesses & Leaks</h3>
          </div>
          <ul className="space-y-3">
            {auditData.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              High-Impact Growth Recommendations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked in order of highest expected lift in YouTube Browse & Search impressions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auditData.actionableRecommendations.map((rec, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {rec.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rec.priority === 'HIGH'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : rec.priority === 'MEDIUM'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {rec.priority} PRIORITY
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">{rec.title}</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{rec.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">Expected ROI:</span>
                <span className="font-semibold text-emerald-400">{rec.expectedImpact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Action Plan */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-red-500" />
          <h3 className="text-base font-bold text-white tracking-tight">30-Day Channel Growth Action Plan</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Systematic weekly roadmap designed to take this channel to the next subscriber and view tier.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {auditData.thirtyDayGrowthPlan.map((plan) => (
            <div
              key={plan.week}
              className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-red-400">WEEK {plan.week}</span>
                  <span className="text-[11px] text-slate-400">Phase {plan.week}</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-3">{plan.focus}</h4>
                <ul className="space-y-2">
                  {plan.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300 leading-snug">
                      <span className="text-slate-500 font-mono">·</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400 block mb-0.5">Target KPI Milestone:</span>
                <span className="font-semibold text-emerald-400">{plan.targetKpi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
