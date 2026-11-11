export type TabType =
  | 'overview'
  | 'audit'
  | 'trends'
  | 'titles'
  | 'thumbnail'
  | 'seo'
  | 'competitor'
  | 'calendar'
  | 'analytics'
  | 'saved';

export interface AuditRecommendation {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  title: string;
  description: string;
  expectedImpact: string;
}

export interface GrowthPlanWeek {
  week: number;
  focus: string;
  tasks: string[];
  targetKpi: string;
}

export interface ChannelAuditReport {
  channelName: string;
  handle: string;
  overallScore: number;
  subscriberEstimate: string;
  breakdown: {
    seoScore: number;
    thumbnailScore: number;
    contentQualityScore: number;
    engagementScore: number;
    uploadConsistencyScore: number;
    channelBrandingScore: number;
  };
  metrics: {
    avgViewsPerVideo: string;
    estimatedCtr: string;
    avgViewDuration: string;
    uploadFrequency: string;
    shortsVsLongRatio: string;
  };
  strengths: string[];
  weaknesses: string[];
  actionableRecommendations: AuditRecommendation[];
  bestPerformingPatterns: string[];
  underperformingPitfalls: string[];
  thirtyDayGrowthPlan: GrowthPlanWeek[];
}

export interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  whyTrending: string;
  searchInterest: 'Surging' | 'High' | 'Medium';
  trendDirection: string;
  competitionLevel: 'Low' | 'Medium' | 'High';
  opportunityScore: number;
  suggestedVideoAngle: string;
  targetAudienceInterest: string;
  suggestedPublishingWindow: string;
  recommendedFormat: 'Shorts' | 'Long-form' | 'Both';
  isEstimated: boolean;
}

export interface GeneratedTitle {
  id: string;
  title: string;
  category: 'SEO-Focused' | 'Curiosity-Gap' | 'Emotional' | 'Viral-Style' | 'Short & Punchy';
  charCount: number;
  mobileSafe: boolean;
  qualityScore: number;
  keywordDetected: boolean;
  hookExplanation: string;
}

export interface SeoPackage {
  optimizedTitle: string;
  alternativeTitles: string[];
  description: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
  studioTags: string;
  hashtags: string[];
  chapters: { timestamp: string; title: string }[];
  pinnedComment: string;
  ctaSuggestions: { type: string; hook: string; timing: string }[];
  seoScore: {
    total: number;
    keywordPlacement: number;
    titleRelevance: number;
    descriptionQuality: number;
    metadataCompleteness: number;
    searchIntentMatch: number;
  };
  actionableTips: string[];
}

export interface ThumbnailConcept {
  id: string;
  name: string;
  textOverlay: string;
  focalSubject: string;
  backgroundDescription: string;
  colorPalette: string[];
  psychologicalTrigger: string;
  compositionNotes: string;
  expectedCtrRating: string;
}

export interface CompetitorReport {
  competitorName: string;
  handle: string;
  estimatedCadence: string;
  avgPublicViews: string;
  coreStrengths: string[];
  vulnerabilities: string[];
  titlePatterns: string[];
  thumbnailStyle: string;
  uncoveredContentGaps: {
    gapTopic: string;
    whyCompetitorMissedIt: string;
    recommendedTitle: string;
    opportunityRating: 'Very High' | 'High' | 'Medium';
  }[];
  counterStrategy: string;
}

export interface CalendarItem {
  id: string;
  dayOffset: number;
  dayName: string;
  format: 'Long-form' | 'Shorts';
  topic: string;
  title: string;
  targetKeyword: string;
  thumbnailConcept: string;
  seoAngle: string;
  status: 'Planned' | 'Scripting' | 'Filming' | 'Editing' | 'Ready' | 'Published';
}

export interface SavedProject {
  id: string;
  type: 'title' | 'thumbnail' | 'seo' | 'calendar' | 'audit';
  title: string;
  timestamp: string;
  payload: any;
}
