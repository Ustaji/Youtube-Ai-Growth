import React, { useState } from 'react';
import { GeneratedTitle, TabType } from '../types';
import {
  Type,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  ArrowRight,
  RefreshCw,
  Scale,
  Smartphone,
  Eye,
  SlidersHorizontal,
  Image as ImageIcon,
  Search,
} from 'lucide-react';

interface TitleGeneratorModuleProps {
  titles: GeneratedTitle[];
  currentTopic: string;
  onTitlesUpdate: (titles: GeneratedTitle[], topic: string) => void;
  onSendToThumbnail: (title: string) => void;
  onSendToSeo: (title: string, topic: string) => void;
  onSaveToLibrary: (title: string, type: 'title', payload: any) => void;
  onNavigate: (tab: TabType) => void;
}

export const TitleGeneratorModule: React.FC<TitleGeneratorModuleProps> = ({
  titles,
  currentTopic,
  onTitlesUpdate,
  onSendToThumbnail,
  onSendToSeo,
  onSaveToLibrary,
  onNavigate,
}) => {
  const [topic, setTopic] = useState(currentTopic || 'Autonomous AI Agents and Automation');
  const [keyword, setKeyword] = useState('AI agents');
  const [audience, setAudience] = useState('Tech creators & software builders');
  const [language, setLanguage] = useState('English');
  const [videoType, setVideoType] = useState('Educational Tutorial');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Comparison State (allow user to compare 2 titles side by side)
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          keyword,
          audience,
          language,
          videoType,
          competitorUrl,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.titles) {
        onTitlesUpdate(data.data.titles, topic);
      }
    } catch (err) {
      console.error('Failed to generate titles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (t: GeneratedTitle) => {
    navigator.clipboard.writeText(t.title);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (t: GeneratedTitle) => {
    onSaveToLibrary(`Title: ${t.title}`, 'title', t);
    setSavedId(t.id);
    setTimeout(() => setSavedId(null), 2000);
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length >= 2) {
        setCompareIds([compareIds[1], id]);
      } else {
        setCompareIds([...compareIds, id]);
      }
    }
  };

  const comparedTitles = titles.filter((t) => compareIds.includes(t.id));

  const categories = ['All', 'SEO-Focused', 'Curiosity-Gap', 'Emotional', 'Viral-Style', 'Short & Punchy'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTitles = activeCategory === 'All'
    ? titles
    : titles.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Generator Form */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <Type className="h-4 w-4" />
              <span>MODULE 3 · AI VIRAL TITLE GENERATOR & CTR OPTIMIZER</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              AI Video Title Generator & Comparison Engine
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Generate 10 categorized title variations with keyword indexing, emotional hook analysis, and mobile truncation safety.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Video Topic / Core Idea
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How I built an automated YouTube workflow"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Main Target Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. AI automation"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Video Type / Angle
            </label>
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Educational Tutorial">Educational Tutorial</option>
              <option value="High-Stakes Challenge">High-Stakes Challenge (MrBeast style)</option>
              <option value="Curiosity Investigation">Curiosity Investigation (Documentary)</option>
              <option value="Story & Case Study">Story & Case Study</option>
              <option value="Product / Tool Review">Product / Tool Review</option>
              <option value="YouTube Shorts">Viral YouTube Shorts</option>
            </select>
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Beginner creators, ambitious developers, founders"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Competitor Video Reference (Optional)
            </label>
            <input
              type="text"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or title"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 transition-colors"
            >
              <Sparkles className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Crafting Titles...' : 'Generate 10 Titles'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 mr-2">Filter Style:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
            <span>Mobile Truncation Safe: &lt;60 characters</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Box if 2 are selected */}
      {comparedTitles.length === 2 && (
        <div className="rounded-xl border border-red-500/40 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-red-500" />
              <h3 className="text-sm font-bold text-white">Side-by-Side Title Comparison</h3>
            </div>
            <button
              onClick={() => setCompareIds([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparedTitles.map((t, idx) => (
              <div
                key={t.id}
                className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">OPTION {idx + 1} ({t.category})</span>
                  <span className="font-mono font-bold text-emerald-400">CTR Score: {t.qualityScore}/100</span>
                </div>
                <h4 className="text-base font-bold text-white">{t.title}</h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Length:</span>
                    <span className={`font-mono ${t.mobileSafe ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {t.charCount} chars ({t.mobileSafe ? 'Mobile Safe' : 'May Truncate'})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Keyword Detected:</span>
                    <span className={t.keywordDetected ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                      {t.keywordDetected ? 'Yes (SEO boost)' : 'No (Browse focus)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    {t.hookExplanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Titles List */}
      <div className="space-y-3">
        {filteredTitles.map((t, index) => {
          const isComparing = compareIds.includes(t.id);
          return (
            <div
              key={t.id}
              className={`rounded-xl border p-4 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                isComparing
                  ? 'border-red-500/60 bg-slate-900/90 shadow-md'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              {/* Left Zone: Index, Category, Title, Hook */}
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">#{index + 1}</span>
                  <span className="text-xs font-semibold text-slate-300">
                    {t.category}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span
                    className={`font-mono text-[11px] ${
                      t.mobileSafe ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {t.charCount} chars {t.mobileSafe ? '(Mobile Safe)' : '(May Truncate)'}
                  </span>
                  {t.keywordDetected && (
                    <>
                      <span className="text-slate-600">·</span>
                      <span className="text-[11px] font-medium text-cyan-400">
                        Keyword Matched
                      </span>
                    </>
                  )}
                  <span className="text-slate-600">·</span>
                  <span className="font-mono text-[11px] font-bold text-white">
                    Score: {t.qualityScore}/100
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  {t.title}
                </h3>

                <p className="text-xs text-slate-400">
                  <strong className="text-slate-300">Hook:</strong> {t.hookExplanation}
                </p>
              </div>

              {/* Right Zone: Interactive Actions */}
              <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <button
                  onClick={() => toggleCompare(t.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    isComparing
                      ? 'border-red-500 bg-red-600/20 text-red-300'
                      : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                  title="Compare 2 titles"
                >
                  <Scale className="h-3.5 w-3.5 inline mr-1" />
                  <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                </button>

                <button
                  onClick={() => handleCopy(t)}
                  className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedId === t.id ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => handleSave(t)}
                  className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Save Title"
                >
                  {savedId === t.id ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => {
                    onSendToThumbnail(t.title);
                    onNavigate('thumbnail');
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Send to Thumbnail Studio"
                >
                  <ImageIcon className="h-3.5 w-3.5 text-amber-400" />
                  <span>Thumbnail</span>
                </button>

                <button
                  onClick={() => {
                    onSendToSeo(t.title, topic);
                    onNavigate('seo');
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-500 transition-colors shadow-sm"
                  title="Optimize SEO for this title"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Optimize SEO</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
