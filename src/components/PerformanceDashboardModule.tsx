import React, { useState } from 'react';
import { TabType } from '../types';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Eye,
  DollarSign,
  Users,
  MousePointer,
  Repeat,
  Sparkles,
  Info,
  ShieldCheck,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

interface PerformanceDashboardModuleProps {
  channelHandle: string;
  onNavigate: (tab: TabType) => void;
}

export const PerformanceDashboardModule: React.FC<PerformanceDashboardModuleProps> = ({
  channelHandle,
  onNavigate,
}) => {
  const [timeframe, setTimeframe] = useState<'7d' | '28d' | '90d' | '365d'>('28d');
  const [isAuthorizedAccount, setIsAuthorizedAccount] = useState(false);

  // Stats data corresponding to timeframe
  const timeframeMultiplier =
    timeframe === '7d' ? 0.25 : timeframe === '28d' ? 1 : timeframe === '90d' ? 3.1 : 12;

  const views = Math.round(184200 * timeframeMultiplier).toLocaleString();
  const watchHours = Math.round(14800 * timeframeMultiplier).toLocaleString();
  const netSubs = Math.round(2840 * timeframeMultiplier).toLocaleString();
  const estRevenue = Math.round(3420 * timeframeMultiplier).toLocaleString();
  const impressions = Math.round(2450000 * timeframeMultiplier).toLocaleString();
  const ctr = '7.4%';
  const avd = '4m 48s (47.2%)';
  const returningViewers = '38.6%';

  const topVideos = [
    {
      title: 'Autonomous AI Agents: The Complete 2026 Developer Blueprint',
      views: '92.4K views',
      ctr: '8.9%',
      retention: '54%',
      revenue: '$1,420',
      duration: '16:42',
    },
    {
      title: 'I Tested 50 Viral AI Tools: Only 3 Are Worth Your Time',
      views: '64.1K views',
      ctr: '7.8%',
      retention: '49%',
      revenue: '$890',
      duration: '12:15',
    },
    {
      title: 'Why Most Creators Fail at YouTube Automation',
      views: '41.8K views',
      ctr: '6.9%',
      retention: '46%',
      revenue: '$610',
      duration: '09:50',
    },
    {
      title: '1-Minute Hack That Doubled My Click-Through Rate',
      views: '38.2K views',
      ctr: '10.4%',
      retention: '61%',
      revenue: '$450',
      duration: '00:58 (Short)',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Account Auth Notice */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <BarChart3 className="h-4 w-4" />
              <span>MODULE 8 · YOUTUBE PERFORMANCE ANALYTICS & REVENUE ENGINE</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Authorized Channel Analytics & AI Insights
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Deep algorithmic analysis of views, impressions, retention velocity, and CTR across verified traffic sources.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe switch */}
            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-700">
              {(
                [
                  { id: '7d', label: '7 Days' },
                  { id: '28d', label: '28 Days' },
                  { id: '90d', label: '90 Days' },
                  { id: '365d', label: '365 Days' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeframe(t.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    timeframe === t.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAuthorizedAccount(!isAuthorizedAccount)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                isAuthorizedAccount
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isAuthorizedAccount ? 'OAuth Verified' : 'Simulate Connected Channel'}</span>
            </button>
          </div>
        </div>

        {/* Product Rule Transparency Notice */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-400">
          <Info className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span>
            <strong>Data Integrity Standard:</strong> {isAuthorizedAccount
              ? 'Authorized YouTube Data API connection active for private revenue & viewer retention analytics.'
              : 'Public telemetry and AI benchmarking active. Estimated metrics clearly labeled per YouTube Growth guidelines.'}
          </span>
        </div>
      </div>

      {/* 8 Metric Core KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Views</span>
            <Eye className="h-4 w-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums block">
            {views}
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" />
            <span>+18.4% vs previous period</span>
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Watch Time (Hours)</span>
            <Clock className="h-4 w-4 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums block">
            {watchHours}h
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" />
            <span>+22.1% velocity</span>
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Net Subscribers</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums block">
            +{netSubs}
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" />
            <span>+15.3% conversion</span>
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Est. Ad Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums block">
            ${estRevenue}
          </span>
          <span className="text-[11px] text-slate-400">
            Est. RPM: $8.40 (Tech Niche)
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Impressions</span>
            <TrendingUp className="h-4 w-4 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums block">
            {impressions}
          </span>
          <span className="text-[11px] text-slate-400">Browse & Suggested feed</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Click-Through Rate</span>
            <MousePointer className="h-4 w-4 text-red-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 font-mono tabular-nums block">
            {ctr}
          </span>
          <span className="text-[11px] text-slate-400">Top 15% in Tech category</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg View Duration</span>
            <Clock className="h-4 w-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums block">
            {avd}
          </span>
          <span className="text-[11px] text-slate-400">Above 50% target</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Returning Viewers</span>
            <Repeat className="h-4 w-4 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums block">
            {returningViewers}
          </span>
          <span className="text-[11px] text-emerald-400">High loyal core audience</span>
        </div>
      </div>

      {/* AI Performance Insights */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-red-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            AI Algorithmic Performance Discoveries
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-slate-950/80 p-4 border border-slate-800">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
              Timing & Velocity Optimization
            </span>
            <h4 className="text-xs font-bold text-white mb-1.5">
              Thursday 4 PM GMT is your peak publishing window
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Videos uploaded during this window generate 2.4x higher first-48-hour velocity because your European and US East Coast audiences are active simultaneously.
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/80 p-4 border border-slate-800">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              Shorts-to-Long Bridge Velocity
            </span>
            <h4 className="text-xs font-bold text-white mb-1.5">
              1-Minute Short drove 4,200 long-form viewers
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your latest Short featuring the "1-Minute Hack" converted 6.2% of viewers to click the related video link, generating 180+ new long-form subscribers.
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/80 p-4 border border-slate-800">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Retention Milestone Discovery
            </span>
            <h4 className="text-xs font-bold text-white mb-1.5">
              Removing logo intros saved 18% retention
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Videos starting with immediate question hooks held 74% retention at the 30-second mark versus only 56% for videos with a 10-second graphic intro.
            </p>
          </div>
        </div>
      </div>

      {/* Top Performing Content Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Top Performing Video Assets ({timeframe.toUpperCase()})
          </h3>
          <span className="text-xs text-slate-400">Ranked by Browse Velocity & Watch Time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Video Title</th>
                <th className="pb-3 font-semibold text-right">Views</th>
                <th className="pb-3 font-semibold text-right">CTR</th>
                <th className="pb-3 font-semibold text-right">Retention</th>
                <th className="pb-3 font-semibold text-right">Est. Revenue</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {topVideos.map((vid, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 font-medium text-white max-w-md truncate pr-4">
                    <span className="text-slate-500 font-mono mr-2">#{idx + 1}</span>
                    <span>{vid.title}</span>
                    <span className="text-[10px] text-slate-400 ml-2 font-mono">({vid.duration})</span>
                  </td>
                  <td className="py-3 font-mono font-bold text-white text-right tabular-nums">
                    {vid.views}
                  </td>
                  <td className="py-3 font-mono font-semibold text-emerald-400 text-right tabular-nums">
                    {vid.ctr}
                  </td>
                  <td className="py-3 font-mono text-slate-300 text-right tabular-nums">
                    {vid.retention}
                  </td>
                  <td className="py-3 font-mono text-emerald-400 font-bold text-right tabular-nums">
                    {vid.revenue}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onNavigate('seo')}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      Audit SEO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
