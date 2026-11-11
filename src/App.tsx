import React, { useState, useEffect } from 'react';
import {
  TabType,
  ChannelAuditReport,
  TrendingTopic,
  GeneratedTitle,
  SeoPackage,
  CompetitorReport,
  CalendarItem,
  SavedProject,
} from './types';
import {
  INITIAL_AUDIT_DATA,
  INITIAL_TRENDS,
  INITIAL_TITLES,
  INITIAL_SEO_DATA,
  INITIAL_COMPETITOR_DATA,
  INITIAL_CALENDAR_SCHEDULE,
  PRESET_CHANNELS,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { ChannelAuditModule } from './components/ChannelAuditModule';
import { TrendingTopicsModule } from './components/TrendingTopicsModule';
import { TitleGeneratorModule } from './components/TitleGeneratorModule';
import { ThumbnailStudioModule } from './components/ThumbnailStudioModule';
import { SeoOptimizerModule } from './components/SeoOptimizerModule';
import { CompetitorAnalyzerModule } from './components/CompetitorAnalyzerModule';
import { ContentCalendarModule } from './components/ContentCalendarModule';
import { PerformanceDashboardModule } from './components/PerformanceDashboardModule';
import { SavedProjectsModule } from './components/SavedProjectsModule';
import { PricingModal } from './components/PricingModal';
import {
  PlaySquare,
  ShieldCheck,
  TrendingUp,
  Type,
  Image as ImageIcon,
  Search,
  Users,
  Calendar,
  BarChart3,
  Sparkles,
  ArrowRight,
  Zap,
  Bookmark,
  CheckCircle2,
  Clock,
  Flame,
  Award,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Core application states
  const [auditData, setAuditData] = useState<ChannelAuditReport>(INITIAL_AUDIT_DATA);
  const [trends, setTrends] = useState<TrendingTopic[]>(INITIAL_TRENDS);
  const [titles, setTitles] = useState<GeneratedTitle[]>(INITIAL_TITLES);
  const [currentTopic, setCurrentTopic] = useState('Autonomous AI Agents & Workflows in 2026');
  const [currentTitleForThumbnail, setCurrentTitleForThumbnail] = useState(
    'Autonomous AI Agents in 2026: Complete Step-by-Step Guide'
  );
  const [seoData, setSeoData] = useState<SeoPackage>(INITIAL_SEO_DATA);
  const [competitorData, setCompetitorData] = useState<CompetitorReport>(INITIAL_COMPETITOR_DATA);
  const [calendarSchedule, setCalendarSchedule] = useState<CalendarItem[]>(INITIAL_CALENDAR_SCHEDULE);

  // Saved Projects Vault (persisted to localStorage)
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>(() => {
    try {
      const stored = localStorage.getItem('yt_growth_saved_projects');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return [
      {
        id: 'init-1',
        type: 'title',
        title: 'I Built 4 AI Agents. What Happened at 3 AM Shocked Me.',
        timestamp: new Date().toISOString(),
        payload: {
          title: 'I Built 4 AI Agents. What Happened at 3 AM Shocked Me.',
          category: 'Curiosity-Gap',
          qualityScore: 97,
        },
      },
      {
        id: 'init-2',
        type: 'seo',
        title: 'SEO Package: Autonomous AI Agents in 2026',
        timestamp: new Date().toISOString(),
        payload: INITIAL_SEO_DATA,
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('yt_growth_saved_projects', JSON.stringify(savedProjects));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [savedProjects]);

  const handleSaveToLibrary = (
    title: string,
    type: 'title' | 'thumbnail' | 'seo' | 'calendar' | 'audit',
    payload: any
  ) => {
    const newProject: SavedProject = {
      id: `proj-${Date.now()}`,
      type,
      title,
      timestamp: new Date().toISOString(),
      payload,
    };
    setSavedProjects((prev) => [newProject, ...prev]);
  };

  const handleDeleteSavedProject = (id: string) => {
    setSavedProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAllSaved = () => {
    setSavedProjects([]);
  };

  // Cross-module pipelines
  const handleSelectTopicForTitle = (topic: string) => {
    setCurrentTopic(topic);
    setActiveTab('titles');
  };

  const handleAddTopicToCalendar = (topic: string) => {
    const newItem: CalendarItem = {
      id: `cal-${Date.now()}`,
      dayOffset: calendarSchedule.length + 1,
      dayName: `Next Tuesday`,
      format: 'Long-form',
      topic,
      title: `${topic}: The Full Guide`,
      targetKeyword: topic.toLowerCase().slice(0, 25),
      thumbnailConcept: 'Split screen high energy comparison',
      seoAngle: 'High intent breakout search',
      status: 'Planned',
    };
    setCalendarSchedule([newItem, ...calendarSchedule]);
    setActiveTab('calendar');
  };

  const handleSendToThumbnail = (titleText: string) => {
    setCurrentTitleForThumbnail(titleText);
    setActiveTab('thumbnail');
  };

  const handleSendToSeo = (titleText: string, topicText: string) => {
    setCurrentTitleForThumbnail(titleText);
    setCurrentTopic(topicText);
    setActiveTab('seo');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPricing={() => setIsPricingOpen(true)}
        connectedHandle={auditData.handle}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 0: MAIN DASHBOARD OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-red-950/30 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 border border-red-500/20 px-3 py-1 text-xs font-bold text-red-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>ALL-IN-ONE YOUTUBE AI GROWTH SUITE</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Welcome back, <span className="text-red-500">{auditData.channelName}</span>
                  </h1>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Your algorithmic channel health is currently at{' '}
                    <strong className="text-emerald-400">{auditData.overallScore}/100</strong>. We found{' '}
                    <strong className="text-white">6 breakout trending topics</strong> and identified{' '}
                    <strong className="text-amber-400">4 competitor content gaps</strong> ready for you to capture.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-red-900/30 hover:bg-red-500 transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>View Channel Audit</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('trends')}
                    className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Daily Trends</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('audit')}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Channel Score</span>
                  <Award className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
                    {auditData.overallScore}
                  </span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Top 12% in niche</span>
              </div>

              <div
                onClick={() => setActiveTab('trends')}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Surging Topics</span>
                  <Flame className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white font-mono tabular-nums">
                    {trends.length}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">+180% interest</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Updated 4h ago</span>
              </div>

              <div
                onClick={() => setActiveTab('calendar')}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Content Pipeline</span>
                  <Calendar className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white font-mono tabular-nums">
                    {calendarSchedule.length}
                  </span>
                  <span className="text-xs text-slate-400">Videos Scheduled</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Next: Tuesday</span>
              </div>

              <div
                onClick={() => setActiveTab('saved')}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Saved Artifacts</span>
                  <Bookmark className="h-4 w-4 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white font-mono tabular-nums">
                    {savedProjects.length}
                  </span>
                  <span className="text-xs text-slate-400">Projects in vault</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Ready to publish</span>
              </div>
            </div>

            {/* Quick Access Tool Grid */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    YouTube AI Studio Suite
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct access to all 8 specialized algorithm engineering modules.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    id: 'audit' as TabType,
                    name: 'Channel Audit',
                    desc: 'Diagnose packaging, retention, upload cadence & 30-day plan',
                    icon: ShieldCheck,
                    badge: 'Health 78/100',
                    color: 'text-emerald-400',
                  },
                  {
                    id: 'trends' as TabType,
                    name: 'Daily Trends Finder',
                    desc: 'Real-time surging queries and AI opportunity scores',
                    icon: TrendingUp,
                    badge: '6 Surging',
                    color: 'text-red-400',
                  },
                  {
                    id: 'titles' as TabType,
                    name: 'Title Generator',
                    desc: '10 categorized viral variations with mobile truncation checks',
                    icon: Type,
                    badge: 'CTR Predictor',
                    color: 'text-cyan-400',
                  },
                  {
                    id: 'thumbnail' as TabType,
                    name: 'Thumbnail Studio',
                    desc: '1280×720 canvas editor with AI backgrounds & simulator',
                    icon: ImageIcon,
                    badge: '16:9 HD Canvas',
                    color: 'text-amber-400',
                  },
                  {
                    id: 'seo' as TabType,
                    name: 'Video SEO Optimizer',
                    desc: 'Structured descriptions, studio tags, chapters & pinned comments',
                    icon: Search,
                    badge: 'Score: 96/100',
                    color: 'text-purple-400',
                  },
                  {
                    id: 'competitor' as TabType,
                    name: 'Competitor Analyzer',
                    desc: 'Reverse-engineer competitor vulnerabilities & uncovered gaps',
                    icon: Users,
                    badge: 'Gap Finder',
                    color: 'text-yellow-400',
                  },
                  {
                    id: 'calendar' as TabType,
                    name: 'Content Calendar',
                    desc: '7, 15, or 30-day publishing roadmap with status tracking',
                    icon: Calendar,
                    badge: '15-Day Plan',
                    color: 'text-emerald-400',
                  },
                  {
                    id: 'analytics' as TabType,
                    name: 'Analytics Dashboard',
                    desc: 'Authorized YouTube views, watch time, CTR & revenue models',
                    icon: BarChart3,
                    badge: 'OAuth Ready',
                    color: 'text-red-400',
                  },
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTab(tool.id)}
                      className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-left hover:border-slate-700 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                            <Icon className={`h-5 w-5 ${tool.color}`} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 font-mono">
                            {tool.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-snug">
                          {tool.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 flex items-center justify-end text-xs font-semibold text-slate-400 group-hover:text-white">
                        <span>Open Module</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Row: Daily Trends Spotlight & Competitor Gaps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Trends Spotlight */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-red-500" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        Today's #1 Trending Breakout
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('trends')}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      View All 6 &rarr;
                    </button>
                  </div>

                  {trends[0] && (
                    <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">{trends[0].category}</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          Opp. Score: {trends[0].opportunityScore}/100
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">{trends[0].topic}</h4>
                      <p className="text-xs text-slate-300">{trends[0].whyTrending}</p>
                      <div className="pt-2 text-xs text-slate-400 italic">
                        Suggested Angle: "{trends[0].suggestedVideoAngle}"
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end">
                  <button
                    onClick={() => {
                      if (trends[0]) handleSelectTopicForTitle(trends[0].topic);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-500"
                  >
                    <span>Generate Titles for This</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Competitor Gap Spotlight */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-yellow-400" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        Top Competitor Vulnerability Gap
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('competitor')}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      View Competitor Report &rarr;
                    </button>
                  </div>

                  {competitorData.uncoveredContentGaps[0] && (
                    <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Competitor: {competitorData.handle}</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          Very High Opportunity
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {competitorData.uncoveredContentGaps[0].gapTopic}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {competitorData.uncoveredContentGaps[0].whyCompetitorMissedIt}
                      </p>
                      <div className="pt-2 text-xs font-semibold text-emerald-400">
                        Recommended Title: "{competitorData.uncoveredContentGaps[0].recommendedTitle}"
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end">
                  <button
                    onClick={() => {
                      if (competitorData.uncoveredContentGaps[0]) {
                        handleSelectTopicForTitle(
                          competitorData.uncoveredContentGaps[0].recommendedTitle
                        );
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-500"
                  >
                    <span>Claim This Video Idea</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 1: CHANNEL AUDIT */}
        {activeTab === 'audit' && (
          <ChannelAuditModule
            auditData={auditData}
            onAuditUpdate={setAuditData}
            onNavigate={setActiveTab}
            onSaveToLibrary={handleSaveToLibrary}
          />
        )}

        {/* VIEW 2: DAILY TRENDS FINDER */}
        {activeTab === 'trends' && (
          <TrendingTopicsModule
            trends={trends}
            onTrendsUpdate={setTrends}
            onSelectTopicForTitle={handleSelectTopicForTitle}
            onAddTopicToCalendar={handleAddTopicToCalendar}
            onSaveToLibrary={handleSaveToLibrary}
            onNavigate={setActiveTab}
          />
        )}

        {/* VIEW 3: TITLE GENERATOR */}
        {activeTab === 'titles' && (
          <TitleGeneratorModule
            titles={titles}
            currentTopic={currentTopic}
            onTitlesUpdate={(newTitles, newTopic) => {
              setTitles(newTitles);
              setCurrentTopic(newTopic);
            }}
            onSendToThumbnail={handleSendToThumbnail}
            onSendToSeo={handleSendToSeo}
            onSaveToLibrary={handleSaveToLibrary}
            onNavigate={setActiveTab}
          />
        )}

        {/* VIEW 4: THUMBNAIL STUDIO */}
        {activeTab === 'thumbnail' && (
          <ThumbnailStudioModule
            currentTitle={currentTitleForThumbnail}
            onSaveToLibrary={handleSaveToLibrary}
            onNavigate={setActiveTab}
          />
        )}

        {/* VIEW 5: VIDEO SEO OPTIMIZER */}
        {activeTab === 'seo' && (
          <SeoOptimizerModule
            seoData={seoData}
            currentTitle={currentTitleForThumbnail}
            currentTopic={currentTopic}
            onSeoUpdate={setSeoData}
            onSaveToLibrary={handleSaveToLibrary}
            onNavigate={setActiveTab}
          />
        )}

        {/* VIEW 6: COMPETITOR ANALYZER */}
        {activeTab === 'competitor' && (
          <CompetitorAnalyzerModule
            competitorData={competitorData}
            onCompetitorUpdate={setCompetitorData}
            onSendTitleToGenerator={handleSelectTopicForTitle}
            onSaveToLibrary={handleSaveToLibrary}
            onNavigate={setActiveTab}
          />
        )}

        {/* VIEW 7: CONTENT CALENDAR */}
        {activeTab === 'calendar' && (
          <ContentCalendarModule
            schedule={calendarSchedule}
            onScheduleUpdate={setCalendarSchedule}
            onSendTitleToStudio={handleSendToThumbnail}
            onSaveToLibrary={handleSaveToLibrary}
            onNavigate={setActiveTab}
          />
        )}

        {/* VIEW 8: PERFORMANCE ANALYTICS */}
        {activeTab === 'analytics' && (
          <PerformanceDashboardModule
            channelHandle={auditData.handle}
            onNavigate={setActiveTab}
          />
        )}

        {/* VIEW 9: SAVED LIBRARY */}
        {activeTab === 'saved' && (
          <SavedProjectsModule
            savedProjects={savedProjects}
            onDeleteProject={handleDeleteSavedProject}
            onClearAll={handleClearAllSaved}
            onNavigate={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <PlaySquare className="h-4 w-4 text-red-500 fill-red-500" />
            <span className="font-bold text-slate-300">YouTube AI Growth Studio</span>
            <span>· All-in-one algorithmic assistant for YouTube creators</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('audit')} className="hover:text-white">Channel Audit</button>
            <button onClick={() => setActiveTab('trends')} className="hover:text-white">Trending Topics</button>
            <button onClick={() => setActiveTab('titles')} className="hover:text-white">Title Generator</button>
            <button onClick={() => setActiveTab('thumbnail')} className="hover:text-white">Thumbnail Studio</button>
            <button onClick={() => setActiveTab('seo')} className="hover:text-white">SEO Optimizer</button>
            <button onClick={() => setIsPricingOpen(true)} className="text-red-400 hover:text-red-300 font-semibold">Pricing</button>
          </div>
        </div>
      </footer>

      {/* Pricing & Subscription Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
}
