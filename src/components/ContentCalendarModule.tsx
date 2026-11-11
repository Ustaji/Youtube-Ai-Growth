import React, { useState } from 'react';
import { CalendarItem, TabType } from '../types';
import {
  Calendar as CalendarIcon,
  Sparkles,
  Plus,
  RefreshCw,
  Download,
  CheckCircle2,
  Clock,
  Video,
  Smartphone,
  Tag,
  Bookmark,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface ContentCalendarModuleProps {
  schedule: CalendarItem[];
  onScheduleUpdate: (items: CalendarItem[]) => void;
  onSendTitleToStudio: (title: string) => void;
  onSaveToLibrary: (title: string, type: 'calendar', payload: any) => void;
  onNavigate: (tab: TabType) => void;
}

export const ContentCalendarModule: React.FC<ContentCalendarModuleProps> = ({
  schedule,
  onScheduleUpdate,
  onSendTitleToStudio,
  onSaveToLibrary,
  onNavigate,
}) => {
  const [duration, setDuration] = useState<number>(15);
  const [niche, setNiche] = useState('Tech & AI Automation');
  const [formatPref, setFormatPref] = useState('Mix (Shorts + Long-form)');
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [filterFormat, setFilterFormat] = useState<'All' | 'Long-form' | 'Shorts'>('All');

  // New task modal / quick add state
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newFormat, setNewFormat] = useState<'Long-form' | 'Shorts'>('Long-form');
  const [newDay, setNewDay] = useState('Day 1');

  const handleGenerateCalendar = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/content-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          days: duration,
          format: formatPref,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.schedule) {
        onScheduleUpdate(data.data.schedule);
      }
    } catch (err) {
      console.error('Failed to generate calendar:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    const updated = schedule.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    onScheduleUpdate(updated);
  };

  const handleAddCustomItem = () => {
    if (!newTitle.trim()) return;
    const newItem: CalendarItem = {
      id: `custom-${Date.now()}`,
      dayOffset: schedule.length + 1,
      dayName: newDay,
      format: newFormat,
      topic: newTopic || 'Custom Content',
      title: newTitle,
      targetKeyword: 'custom query',
      thumbnailConcept: 'High-contrast focal subject',
      seoAngle: 'Direct audience value',
      status: 'Planned',
    };
    onScheduleUpdate([...schedule, newItem]);
    setNewTitle('');
    setNewTopic('');
    setIsAddingNew(false);
  };

  const handleExport = () => {
    const jsonStr = JSON.stringify(schedule, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-content-calendar-${Date.now()}.json`;
    link.click();
  };

  const handleSave = () => {
    onSaveToLibrary(`Content Calendar (${duration} Days)`, 'calendar', schedule);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2200);
  };

  const filteredSchedule = schedule.filter((item) => {
    if (filterFormat === 'All') return true;
    return item.format === filterFormat;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Ready':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Filming':
      case 'Editing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Scripting':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Generator Toolbar */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <CalendarIcon className="h-4 w-4" />
              <span>MODULE 7 · STRATEGIC AI CONTENT CALENDAR & PIPELINE</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              AI Content Calendar & Publishing Roadmap
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Automated 7, 15, or 30-day publishing schedules balanced between high-RPM evergreen tutorials and viral Shorts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{saveSuccess ? 'Saved to Library!' : 'Save Calendar'}</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Custom Video</span>
            </button>
          </div>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end pt-5 border-t border-slate-800/80">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Calendar Horizon
            </label>
            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-700">
              {[7, 15, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                    duration === d
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Channel Niche
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. AI Automation & Tech"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Publishing Cadence
            </label>
            <select
              value={formatPref}
              onChange={(e) => setFormatPref(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Mix (Shorts + Long-form)">Optimal Mix (Shorts + Long-form)</option>
              <option value="Long-form Only">Long-form Evergreen Focus</option>
              <option value="Shorts Heavy">Shorts Viral Growth Focus</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleGenerateCalendar}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 transition-colors"
            >
              <Sparkles className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Generating Roadmap...' : `Generate ${duration}-Day Plan`}</span>
            </button>
          </div>
        </div>

        {/* Format Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">Filter Format:</span>
            {(['All', 'Long-form', 'Shorts'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFilterFormat(fmt)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filterFormat === fmt
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400">
            {filteredSchedule.length} Scheduled Releases
          </span>
        </div>
      </div>

      {/* Add Custom Video Drawer / Inline Form */}
      {isAddingNew && (
        <div className="rounded-xl border border-red-500/40 bg-slate-900/95 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Add Custom Scheduled Video</h3>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] text-slate-400 mb-1">Working Title</label>
              <input
                type="text"
                placeholder="Title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Day Offset</label>
              <input
                type="text"
                placeholder="Day 4 (Friday)"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Format</label>
              <select
                value={newFormat}
                onChange={(e) => setNewFormat(e.target.value as any)}
                className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-white"
              >
                <option value="Long-form">Long-form</option>
                <option value="Shorts">Shorts</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAddCustomItem}
            className="px-4 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white hover:bg-red-500"
          >
            Add to Roadmap
          </button>
        </div>
      )}

      {/* Calendar Items Timeline / Cards */}
      <div className="space-y-4">
        {filteredSchedule.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5"
          >
            {/* Left: Timing, Format, Title, Details */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-red-400">
                  {item.dayName}
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  {item.format === 'Long-form' ? (
                    <Video className="h-3.5 w-3.5 text-cyan-400" />
                  ) : (
                    <Smartphone className="h-3.5 w-3.5 text-purple-400" />
                  )}
                  <span>{item.format}</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{item.topic}</span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
                <div className="rounded bg-slate-950/70 p-2.5 border border-slate-800/80">
                  <span className="block font-semibold text-slate-300 text-[11px] mb-0.5">
                    Thumbnail Concept:
                  </span>
                  <span className="italic text-slate-400">{item.thumbnailConcept}</span>
                </div>
                <div className="rounded bg-slate-950/70 p-2.5 border border-slate-800/80">
                  <span className="block font-semibold text-slate-300 text-[11px] mb-0.5">
                    SEO & Traffic Driver:
                  </span>
                  <span className="text-slate-400">{item.seoAngle}</span>
                </div>
              </div>
            </div>

            {/* Right: Status Selector & Actions */}
            <div className="flex items-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Status
                </label>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none ${getStatusColor(
                    item.status
                  )}`}
                >
                  <option value="Planned">Planned</option>
                  <option value="Scripting">Scripting</option>
                  <option value="Filming">Filming</option>
                  <option value="Editing">Editing</option>
                  <option value="Ready">Ready</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <button
                onClick={() => {
                  onSendTitleToStudio(item.title);
                  onNavigate('titles');
                }}
                className="flex items-center gap-1 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                title="Create Title Variations"
              >
                <span>Generate Titles</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
