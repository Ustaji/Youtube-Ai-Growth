import React, { useState } from 'react';
import { SeoPackage, TabType } from '../types';
import {
  Search,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  RefreshCw,
  Tag,
  Hash,
  Clock,
  MessageSquare,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface SeoOptimizerModuleProps {
  seoData: SeoPackage;
  currentTitle: string;
  currentTopic: string;
  onSeoUpdate: (data: SeoPackage) => void;
  onSaveToLibrary: (title: string, type: 'seo', payload: any) => void;
  onNavigate: (tab: TabType) => void;
}

export const SeoOptimizerModule: React.FC<SeoOptimizerModuleProps> = ({
  seoData,
  currentTitle,
  currentTopic,
  onSeoUpdate,
  onSaveToLibrary,
  onNavigate,
}) => {
  const [title, setTitle] = useState(currentTitle || 'Autonomous AI Agents in 2026: The Complete Step-by-Step Guide');
  const [topic, setTopic] = useState(currentTopic || 'Autonomous AI Agents and Automation');
  const [keyword, setKeyword] = useState('autonomous AI agents');
  const [audience, setAudience] = useState('Tech creators & software builders');
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleOptimize = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          topic,
          keyword,
          audience,
          transcript,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        onSeoUpdate(data.data);
      }
    } catch (err) {
      console.error('Failed to optimize SEO:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    onSaveToLibrary(`SEO Package: ${seoData.optimizedTitle}`, 'seo', seoData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2200);
  };

  const formattedChapters = seoData.chapters
    .map((c) => `${c.timestamp} - ${c.title}`)
    .join('\n');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header and Input Form */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <Search className="h-4 w-4" />
              <span>MODULE 5 · YOUTUBE VIDEO SEO & METADATA OPTIMIZER</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              YouTube Video SEO & Metadata Optimizer
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Complete YouTube Studio packaging: search-optimized description, tag clusters, chapters, and pinned comments.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{saveSuccess ? 'Saved to Library!' : 'Save SEO Bundle'}</span>
            </button>
            <button
              onClick={() => onNavigate('calendar')}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-500 transition-colors"
            >
              <span>Add to Content Calendar</span>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Draft Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to Build AI Agents from Scratch"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Target Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. autonomous AI agents"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Creators & software developers"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-9">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Video Transcript or Script Snippet (Optional for deep indexing)
            </label>
            <textarea
              rows={2}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste a paragraph of your script or outline to help AI generate hyper-accurate timestamps..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 flex items-end">
            <button
              onClick={handleOptimize}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 transition-colors"
            >
              <Sparkles className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Optimizing SEO...' : 'Generate Full SEO'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEO Score Hero Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-emerald-400 tabular-nums">
                {seoData.seoScore.total}
              </span>
              <span className="text-lg font-semibold text-slate-400">/ 100</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                YouTube SEO Health Index
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Frontloaded keyword placement & metadata structure calibrated for YouTube & Google Video search.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="rounded-lg bg-slate-950/70 p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Keyword Placement</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {seoData.seoScore.keywordPlacement}%
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Title Relevance</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {seoData.seoScore.titleRelevance}%
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Description Depth</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {seoData.seoScore.descriptionQuality}%
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Search Intent</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {seoData.seoScore.searchIntentMatch}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column SEO Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Title & Description (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Optimized Titles */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Recommended SEO Title
              </h3>
              <button
                onClick={() => copyToClipboard(seoData.optimizedTitle, 'title')}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                {copiedKey === 'title' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Title</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800">
              <p className="text-base font-bold text-white leading-snug">
                {seoData.optimizedTitle}
              </p>
              <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                {seoData.optimizedTitle.length} characters (Mobile Safe & Search Ranked)
              </span>
            </div>

            {seoData.alternativeTitles?.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                  High-Converting Alternatives:
                </span>
                <div className="space-y-1.5">
                  {seoData.alternativeTitles.map((alt, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs text-slate-300 rounded bg-slate-950/60 px-3 py-1.5 border border-slate-800/60"
                    >
                      <span className="truncate mr-2 font-medium">{alt}</span>
                      <button
                        onClick={() => copyToClipboard(alt, `alt-${i}`)}
                        className="text-slate-400 hover:text-white shrink-0"
                      >
                        {copiedKey === `alt-${i}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full Structured Video Description */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  High-Retention Video Description
                </h3>
                <span className="text-xs text-slate-400">
                  First 120 characters frontload search intent before the fold.
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(seoData.description, 'desc')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-colors"
              >
                {copiedKey === 'desc' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Full Description</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {seoData.description}
            </div>
          </div>
        </div>

        {/* Right Column: Tags, Chapters, Comments & CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* YouTube Studio Tags */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  YouTube Studio Tags
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(seoData.studioTags, 'tags')}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                {copiedKey === 'tags' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Tags for Studio</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
              {seoData.studioTags}
            </div>
            <div className="text-[11px] text-slate-400">
              Format: comma-separated list ready to paste directly into YouTube Studio Tag Box.
            </div>
          </div>

          {/* Hashtags */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Hash className="h-4 w-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Trending Hashtags
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(seoData.hashtags.join(' '), 'hashtags')}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                {copiedKey === 'hashtags' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {seoData.hashtags.map((h, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-950 px-2.5 py-1 text-xs font-mono text-emerald-400 border border-slate-800"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Timestamps & Chapters */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Video Chapters & Timestamps
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(formattedChapters, 'chapters')}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                {copiedKey === 'chapters' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Chapters</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5 rounded-lg bg-slate-950 p-3 border border-slate-800">
              {seoData.chapters.map((ch, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 font-bold">{ch.timestamp}</span>
                  <span className="text-slate-300 text-left flex-1 ml-3 truncate">
                    {ch.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pinned Comment & CTA Suggestions */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    High-Engagement Pinned Comment
                  </h4>
                </div>
                <button
                  onClick={() => copyToClipboard(seoData.pinnedComment, 'pinned')}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold"
                >
                  {copiedKey === 'pinned' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-300 italic">
                "{seoData.pinnedComment}"
              </div>
            </div>

            {seoData.ctaSuggestions?.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 mb-2">
                  <Volume2 className="h-4 w-4 text-yellow-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Verbal Call-To-Action (CTA) Hooks
                  </h4>
                </div>
                <div className="space-y-2">
                  {seoData.ctaSuggestions.map((cta, i) => (
                    <div key={i} className="rounded bg-slate-950/70 p-2.5 border border-slate-800 text-xs">
                      <div className="flex justify-between font-semibold text-slate-400 text-[11px] mb-1">
                        <span>{cta.type}</span>
                        <span className="font-mono text-amber-400">{cta.timing}</span>
                      </div>
                      <p className="text-slate-200">"{cta.hook}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
