import React, { useState } from 'react';
import { TrendingTopic, TabType } from '../types';
import {
  TrendingUp,
  Filter,
  RefreshCw,
  Search,
  Sparkles,
  ArrowUpRight,
  Clock,
  Globe2,
  Calendar,
  Type,
  Bookmark,
  CheckCircle,
} from 'lucide-react';

interface TrendingTopicsModuleProps {
  trends: TrendingTopic[];
  onTrendsUpdate: (trends: TrendingTopic[]) => void;
  onSelectTopicForTitle: (topic: string) => void;
  onAddTopicToCalendar: (topic: string) => void;
  onSaveToLibrary: (title: string, type: 'title' | 'calendar', payload: any) => void;
  onNavigate: (tab: TabType) => void;
}

export const TrendingTopicsModule: React.FC<TrendingTopicsModuleProps> = ({
  trends,
  onTrendsUpdate,
  onSelectTopicForTitle,
  onAddTopicToCalendar,
  onSaveToLibrary,
  onNavigate,
}) => {
  const [country, setCountry] = useState('United States');
  const [language, setLanguage] = useState('English');
  const [niche, setNiche] = useState('Technology & AI');
  const [format, setFormat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  const handleFetchTrends = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country,
          language,
          niche,
          format,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.trends) {
        onTrendsUpdate(data.data.trends);
      }
    } catch (err) {
      console.error('Failed to fetch trends:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTopic = (topic: TrendingTopic) => {
    onSaveToLibrary(`Trending Topic: ${topic.topic}`, 'title', topic);
    setSavedIds((prev) => ({ ...prev, [topic.id]: true }));
    setTimeout(() => {
      setSavedIds((prev) => ({ ...prev, [topic.id]: false }));
    }, 2000);
  };

  const filteredTrends = trends.filter((t) => {
    const matchesSearch =
      t.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.whyTrending.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat =
      format === 'All' ||
      t.recommendedFormat === 'Both' ||
      t.recommendedFormat.toLowerCase() === format.toLowerCase();
    return matchesSearch && matchesFormat;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header and Control Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span>MODULE 2 · DAILY TRENDING TOPICS & BREAKOUT OPPORTUNITIES</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Daily YouTube Trending Topics Finder
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time public algorithmic velocity signals combined with AI content opportunity scoring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block text-xs text-slate-400">
              <span className="block font-medium text-slate-300">Data Source</span>
              <span>YouTube Search Signals + Google Trends Grounding</span>
            </div>
            <button
              onClick={handleFetchTrends}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Scanning Trends...' : 'Refresh Trends'}</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="India">India</option>
              <option value="Germany">Germany</option>
              <option value="Worldwide">Worldwide / Global</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Niche Category</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Technology & AI">Technology & AI</option>
              <option value="Creator Economy">Creator Economy</option>
              <option value="Gaming & Esports">Gaming & Esports</option>
              <option value="Finance & Wealth">Finance & Wealth</option>
              <option value="Science & Education">Science & Education</option>
              <option value="Lifestyle & Fitness">Lifestyle & Fitness</option>
              <option value="Filmmaking & Gear">Filmmaking & Gear</option>
              <option value="Islamic & Faith">Islamic & Faith</option>
              <option value="Entertainment & Culture">Entertainment & Culture</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Video Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="All">All Formats</option>
              <option value="Long-form">Long-form Video</option>
              <option value="Shorts">YouTube Shorts</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
              <option value="German">German</option>
              <option value="French">French</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Quick Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-3 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
              />
              <Search className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Attribution Notice */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/40">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span>
              Real-time Trend Signals active · Search interest verified via public search indexing · Opportunity Scores calculated by AI model
            </span>
          </div>
          <span className="font-mono text-slate-400">
            Last Updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrends.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-slate-950/40"
          >
            <div>
              {/* Category & Opportunity Score */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-400">
                  {t.category}
                </span>
                <div className="flex items-center gap-1.5 rounded-md bg-slate-800/80 px-2 py-0.5 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400">Opp. Score:</span>
                  <span className="font-mono font-bold text-xs text-emerald-400 tabular-nums">
                    {t.opportunityScore}/100
                  </span>
                </div>
              </div>

              {/* Topic Name */}
              <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                {t.topic}
              </h3>

              {/* Why it's trending */}
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {t.whyTrending}
              </p>

              {/* Metadata Cluster */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Search Interest:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{t.searchInterest} ({t.trendDirection})</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Competition Level:</span>
                  <span
                    className={`font-semibold ${
                      t.competitionLevel === 'Low'
                        ? 'text-emerald-400'
                        : t.competitionLevel === 'Medium'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {t.competitionLevel} Competition
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Recommended Format:</span>
                  <span className="font-semibold text-cyan-400">{t.recommendedFormat}</span>
                </div>
              </div>

              {/* Suggested Video Angle */}
              <div className="mt-4 rounded-lg bg-slate-950/80 p-3 border border-slate-800/80">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">
                  Suggested High-CTR Angle
                </span>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "{t.suggestedVideoAngle}"
                </p>
                <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span>Publish Window: {t.suggestedPublishingWindow}</span>
                </div>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onSelectTopicForTitle(t.topic);
                  onNavigate('titles');
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors shadow-sm"
              >
                <Type className="h-3.5 w-3.5" />
                <span>Generate Titles</span>
              </button>

              <button
                onClick={() => {
                  onAddTopicToCalendar(t.topic);
                  onNavigate('calendar');
                }}
                className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Add to Content Calendar"
              >
                <Calendar className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => handleSaveTopic(t)}
                className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Save Topic"
              >
                {savedIds[t.id] ? (
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Bookmark className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
