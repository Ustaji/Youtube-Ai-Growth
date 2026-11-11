import React from 'react';
import { TabType } from '../types';
import {
  Sparkles,
  TrendingUp,
  Type,
  Image as ImageIcon,
  Search,
  Users,
  Calendar,
  BarChart3,
  Bookmark,
  Zap,
  PlaySquare,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenPricing: () => void;
  connectedHandle: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPricing,
  connectedHandle,
}) => {
  const navItems = [
    { id: 'overview' as TabType, label: 'Overview', icon: PlaySquare },
    { id: 'audit' as TabType, label: 'Channel Audit', icon: ShieldCheck },
    { id: 'trends' as TabType, label: 'Daily Trends', icon: TrendingUp },
    { id: 'titles' as TabType, label: 'Title Generator', icon: Type },
    { id: 'thumbnail' as TabType, label: 'Thumbnail Studio', icon: ImageIcon },
    { id: 'seo' as TabType, label: 'Video SEO', icon: Search },
    { id: 'competitor' as TabType, label: 'Competitors', icon: Users },
    { id: 'calendar' as TabType, label: 'Content Calendar', icon: Calendar },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'saved' as TabType, label: 'Saved Library', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 shadow-sm shadow-red-900/40">
            <PlaySquare className="h-4.5 w-4.5 text-white fill-white" />
          </div>
          <span className="font-extrabold tracking-tight">
            YouTube <span className="text-red-500">AI Growth</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (single line, whitespace-nowrap) */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-red-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('audit')}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <span className="text-slate-400">Channel:</span>
            <span className="font-semibold text-slate-200">{connectedHandle}</span>
          </button>

          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-500 transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Upgrade to Pro</span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Nav Row */}
      <div className="flex xl:hidden overflow-x-auto border-t border-slate-900/80 px-4 py-2 gap-1.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className={`h-3 w-3 ${isActive ? 'text-red-500' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
