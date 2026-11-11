import React, { useState } from 'react';
import { SavedProject, TabType } from '../types';
import {
  Bookmark,
  Trash2,
  Copy,
  Check,
  Download,
  Filter,
  Type,
  Image as ImageIcon,
  Search,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

interface SavedProjectsModuleProps {
  savedProjects: SavedProject[];
  onDeleteProject: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (tab: TabType) => void;
}

export const SavedProjectsModule: React.FC<SavedProjectsModuleProps> = ({
  savedProjects,
  onDeleteProject,
  onClearAll,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = savedProjects.filter((p) => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  const handleCopy = (proj: SavedProject) => {
    const content =
      typeof proj.payload === 'string'
        ? proj.payload
        : JSON.stringify(proj.payload, null, 2);
    navigator.clipboard.writeText(content);
    setCopiedId(proj.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAll = () => {
    const dataStr = JSON.stringify(savedProjects, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-saved-projects-${Date.now()}.json`;
    link.click();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'title':
        return <Type className="h-4 w-4 text-cyan-400" />;
      case 'thumbnail':
        return <ImageIcon className="h-4 w-4 text-amber-400" />;
      case 'seo':
        return <Search className="h-4 w-4 text-red-400" />;
      case 'calendar':
        return <Calendar className="h-4 w-4 text-purple-400" />;
      case 'audit':
        return <ShieldCheck className="h-4 w-4 text-emerald-400" />;
      default:
        return <Bookmark className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <Bookmark className="h-4 w-4" />
              <span>SAVED PROJECTS LIBRARY & EXPORT CENTER</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Creator Saved Projects & Artifacts
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              All generated titles, high-CTR thumbnail drafts, SEO metadata packages, and content calendars in one vault.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportAll}
              disabled={savedProjects.length === 0}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 disabled:opacity-40 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export All ({savedProjects.length})</span>
            </button>
            <button
              onClick={onClearAll}
              disabled={savedProjects.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-rose-900/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 disabled:opacity-40 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Vault</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-2">Filter Type:</span>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'title', label: 'Titles' },
              { id: 'thumbnail', label: 'Thumbnails' },
              { id: 'seo', label: 'SEO Bundles' },
              { id: 'calendar', label: 'Calendars' },
              { id: 'audit', label: 'Audits' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  filterType === f.id
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing {filtered.length} of {savedProjects.length} items
          </span>
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <Bookmark className="h-10 w-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Saved Projects Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Save titles from the Title Generator, designs from the Thumbnail Studio, or SEO packages from the SEO Optimizer.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('titles')}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors"
            >
              Start Generating
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(proj.type)}
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {proj.type}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">
                    {new Date(proj.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {proj.title}
                </h4>

                {/* Thumbnail image preview if available */}
                {proj.type === 'thumbnail' && proj.payload?.previewUrl && (
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-800 bg-black">
                    <img
                      src={proj.payload.previewUrl}
                      alt={proj.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Text summary */}
                {proj.type === 'title' && (
                  <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                    {proj.payload?.title || proj.title}
                  </p>
                )}

                {proj.type === 'seo' && (
                  <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1">
                    <div className="text-[11px] text-emerald-400 font-mono font-bold">
                      SEO Score: {proj.payload?.seoScore?.total || 94}/100
                    </div>
                    <p className="truncate text-slate-400">
                      {proj.payload?.studioTags?.slice(0, 70)}...
                    </p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleCopy(proj)}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium"
                >
                  {copiedId === proj.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Payload</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onDeleteProject(proj.id)}
                  className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  title="Delete from Library"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
