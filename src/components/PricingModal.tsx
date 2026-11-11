import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free Creator',
      tagline: 'For new creators getting started',
      price: '$0',
      period: 'forever',
      features: [
        '1 YouTube Channel Audit / Month',
        'Top 5 Daily Trending Topics',
        '5 AI Title Generations / Day',
        'Standard 1280×720 Thumbnail Canvas',
        'Basic Video SEO Optimizer',
        'Community Support',
      ],
      cta: 'Current Plan',
      isPopular: false,
      tierBadge: 'Starter',
    },
    {
      name: 'Pro Creator',
      tagline: 'For serious YouTubers scaling views & subscribers',
      price: billingCycle === 'monthly' ? '$29' : '$23',
      period: 'per month',
      features: [
        'Unlimited In-Depth Channel Audits',
        'Unrestricted Global Trend Breakout Signals',
        'Unlimited AI Title Generation & Comparison',
        'AI Thumbnail Strategy & Photorealistic Backdrops',
        'Full Video SEO Packages (Tags, Chapters, Comments)',
        'Competitor Channel Gap Detection',
        '30-Day Content Calendar & Roadmap',
        'Priority Gemini Flash AI Processing',
      ],
      cta: 'Upgrade to Pro',
      isPopular: true,
      tierBadge: 'Most Popular',
    },
    {
      name: 'Agency & Studio',
      tagline: 'For production teams, agencies & multi-channel networks',
      price: billingCycle === 'monthly' ? '$99' : '$79',
      period: 'per month',
      features: [
        'Up to 15 Connected Client YouTube Channels',
        'Team Collaboration & Multi-Seat Access',
        'Bulk SEO Generation for Entire Video Catalogs',
        'Advanced Competitor Tracking & Audience Stealing',
        'White-Label PDF & Client Audit Reports',
        'Direct YouTube Analytics OAuth Integration',
        'Dedicated Growth Account Manager',
      ],
      cta: 'Start Agency Trial',
      isPopular: false,
      tierBadge: 'Enterprise',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-xs font-bold text-red-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>TRANSPARENT CREATOR PRICING</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Scale Your YouTube Channel Faster
          </h2>
          <p className="text-sm text-slate-400">
            Unlock unrestricted algorithmic audits, viral title generation, high-CTR thumbnail creation, and competitor gap research.
          </p>

          {/* Billing Switch */}
          <div className="pt-3 inline-flex items-center gap-2 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                billingCycle === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                billingCycle === 'annual' ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl border p-6 flex flex-col justify-between transition-all ${
                p.isPopular
                  ? 'border-red-500 bg-slate-900/90 shadow-xl shadow-red-950/20 relative'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                  {p.tierBadge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {p.tierBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[32px]">{p.tagline}</p>

                <div className="mt-4 mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white font-mono">{p.price}</span>
                  <span className="text-xs text-slate-400">/ {p.period}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  {p.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={onClose}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold transition-colors ${
                    p.isPopular
                      ? 'bg-red-600 text-white hover:bg-red-500 shadow-md'
                      : 'bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 text-center text-xs text-slate-500">
          All plans include 14-day money-back guarantee. No lock-in contracts. Cancel anytime with one click.
        </div>
      </div>
    </div>
  );
};
