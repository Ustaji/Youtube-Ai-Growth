import React, { useState, useRef, useEffect } from 'react';
import { ThumbnailConcept, TabType } from '../types';
import { THUMBNAIL_PRESET_IMAGES } from '../data/mockData';
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  Bookmark,
  RefreshCw,
  Sliders,
  Type,
  Layout,
  Smartphone,
  Monitor,
  Upload,
  Check,
  Eye,
  Layers,
} from 'lucide-react';

interface ThumbnailStudioModuleProps {
  currentTitle: string;
  onSaveToLibrary: (title: string, type: 'thumbnail', payload: any) => void;
  onNavigate: (tab: TabType) => void;
}

export const ThumbnailStudioModule: React.FC<ThumbnailStudioModuleProps> = ({
  currentTitle,
  onSaveToLibrary,
  onNavigate,
}) => {
  // Config state
  const [videoTitle, setVideoTitle] = useState(currentTitle || 'Autonomous AI Agents in 2026');
  const [topic, setTopic] = useState('AI Automation & Agent Workflows');
  const [selectedStyle, setSelectedStyle] = useState('MrBeast-inspired high-energy style');
  const [brandColor, setBrandColor] = useState('#EF4444'); // Crimson red
  const [textOverlay, setTextOverlay] = useState('DO NOT DO THIS!');
  const [subText, setSubText] = useState('2026 EDITION');
  const [fontSize, setFontSize] = useState(72);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(8);
  const [textPosition, setTextPosition] = useState<'top' | 'center' | 'bottom'>('bottom');
  const [badgeText, setBadgeText] = useState('100% SHOCKING');
  const [showBadge, setShowBadge] = useState(true);
  const [previewMode, setPreviewMode] = useState<'editor' | 'desktop' | 'mobile'>('editor');

  // Background selection: preset images or custom upload
  const [activeBgImage, setActiveBgImage] = useState<string>(THUMBNAIL_PRESET_IMAGES[0].src);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // AI Concepts from Gemini
  const [concepts, setConcepts] = useState<ThumbnailConcept[]>([
    {
      id: 'c-1',
      name: 'High-Contrast Extreme Shock',
      textOverlay: 'DO THIS INSTEAD!',
      focalSubject: 'Split frame: Left side red X with failed script, Right side glowing cyan success metrics.',
      backgroundDescription: 'Neon volumetric rim glow with saturated lighting.',
      colorPalette: ['#EF4444', '#10B981', '#0F172A'],
      psychologicalTrigger: 'Curiosity & Loss Aversion',
      compositionNotes: 'Text placed bottom-left; focal action in center-right.',
      expectedCtrRating: '11.8% Expected CTR',
    },
    {
      id: 'c-2',
      name: 'Documentary Truth Reveal',
      textOverlay: 'THE HARSH TRUTH',
      focalSubject: 'Dramatic side-lit portrait looking intensely at camera with dim warm tungsten backdrop.',
      backgroundDescription: 'Textured wood slats with cinematic shadows.',
      colorPalette: ['#F59E0B', '#1E293B', '#FFFFFF'],
      psychologicalTrigger: 'Exclusivity & Secret Knowledge',
      compositionNotes: 'Large bold condensed font, heavy black shadow.',
      expectedCtrRating: '10.2% Expected CTR',
    },
    {
      id: 'c-3',
      name: 'Future Tech Cyberpunk',
      textOverlay: '100 HOURS LATER',
      focalSubject: 'Glowing multi-monitor setup with code and high-velocity graphs.',
      backgroundDescription: 'Violet and laser-cyan haze with glowing terminal.',
      colorPalette: ['#A855F7', '#38BDF8', '#000000'],
      psychologicalTrigger: 'Effort Respect & High-Stakes Transformation',
      compositionNotes: 'Angular text overlay with electric cyan drop glow.',
      expectedCtrRating: '10.9% Expected CTR',
    },
  ]);

  const [isLoadingConcepts, setIsLoadingConcepts] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Hidden 1280x720 canvas ref for high-res export
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw on canvas whenever parameters change
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1280;
    canvas.height = 720;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = uploadedImage || activeBgImage;

    img.onload = () => {
      // Draw background image scaled to fit 1280x720
      ctx.drawImage(img, 0, 0, 1280, 720);

      // Dark gradient overlay for text readability
      const gradient = ctx.createLinearGradient(0, 720, 0, 300);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1280, 720);

      // Draw Badge Sticker if enabled
      if (showBadge && badgeText.trim()) {
        ctx.save();
        ctx.font = '900 32px "Plus Jakarta Sans", sans-serif';
        const badgeMetrics = ctx.measureText(badgeText.toUpperCase());
        const badgeW = badgeMetrics.width + 40;
        const badgeH = 54;
        const badgeX = 50;
        const badgeY = 60;

        // Badge Background with angle
        ctx.translate(badgeX, badgeY);
        ctx.rotate(-0.04);
        ctx.fillStyle = '#DC2626';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(0, 0, badgeW, badgeH, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(badgeText.toUpperCase(), 20, 38);
        ctx.restore();
      }

      // Draw Main Text Overlay
      if (textOverlay.trim()) {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = `900 ${fontSize}px "Plus Jakarta Sans", Impact, sans-serif`;

        let textY = 620;
        if (textPosition === 'top') textY = 180;
        if (textPosition === 'center') textY = 380;

        const textX = 640;

        // Draw Subtext if present
        if (subText.trim()) {
          ctx.save();
          ctx.font = `800 ${Math.floor(fontSize * 0.42)}px "Plus Jakarta Sans", sans-serif`;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 6;
          ctx.strokeText(subText.toUpperCase(), textX, textY - fontSize * 0.95);
          ctx.fillStyle = '#FBBF24'; // Golden yellow subtext
          ctx.fillText(subText.toUpperCase(), textX, textY - fontSize * 0.95);
          ctx.restore();
        }

        // Heavy drop shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 8;

        // Stroke
        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = strokeWidth * 2;
          ctx.lineJoin = 'round';
          ctx.miterLimit = 2;
          ctx.strokeText(textOverlay.toUpperCase(), textX, textY);
        }

        // Fill Text
        ctx.fillStyle = textColor;
        ctx.fillText(textOverlay.toUpperCase(), textX, textY);

        ctx.restore();
      }
    };

    img.onerror = () => {
      // Fallback solid gradient canvas if image fails
      const fallbackGrad = ctx.createLinearGradient(0, 0, 1280, 720);
      fallbackGrad.addColorStop(0, '#0F172A');
      fallbackGrad.addColorStop(1, '#1E1B4B');
      ctx.fillStyle = fallbackGrad;
      ctx.fillRect(0, 0, 1280, 720);

      // Simple text
      ctx.font = '900 64px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(textOverlay.toUpperCase() || 'YOUTUBE THUMBNAIL', 640, 380);
    };
  };

  useEffect(() => {
    renderCanvas();
  }, [
    activeBgImage,
    uploadedImage,
    textOverlay,
    subText,
    fontSize,
    textColor,
    strokeColor,
    strokeWidth,
    textPosition,
    badgeText,
    showBadge,
  ]);

  const handleDownload = (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mime = format === 'png' ? 'image/png' : 'image/jpeg';
    const dataUrl = canvas.toDataURL(mime, 0.95);
    const link = document.createElement('a');
    link.download = `youtube-thumbnail-${Date.now()}.${format}`;
    link.href = dataUrl;
    link.click();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas ? canvas.toDataURL('image/jpeg', 0.8) : '';
    onSaveToLibrary(`Thumbnail: ${textOverlay || videoTitle}`, 'thumbnail', {
      videoTitle,
      textOverlay,
      badgeText,
      selectedStyle,
      previewUrl: dataUrl,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2200);
  };

  const handleGenerateConcepts = async () => {
    setIsLoadingConcepts(true);
    try {
      const res = await fetch('/api/thumbnail-concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: videoTitle,
          topic,
          style: selectedStyle,
          brandColors: brandColor,
          textOverlay,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.concepts) {
        setConcepts(data.data.concepts);
      }
    } catch (err) {
      console.error('Failed to generate thumbnail concepts:', err);
    } finally {
      setIsLoadingConcepts(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hidden 1280x720 canvas */}
      <canvas ref={canvasRef} className="hidden" width={1280} height={720} />

      {/* Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <ImageIcon className="h-4 w-4" />
              <span>MODULE 4 · AI THUMBNAIL STUDIO & 1280×720 CANVAS ENGINE</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              AI YouTube Thumbnail Generator & Canvas Studio
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Design high-CTR 16:9 YouTube thumbnails with photorealistic AI backgrounds, punchy text overlays, and mobile feed simulation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{saveSuccess ? 'Saved to Library!' : 'Save Thumbnail'}</span>
            </button>
            <button
              onClick={() => handleDownload('png')}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-500 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download 1280×720 (PNG)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Split: Left Editor Controls / Right Live 16:9 Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Text and Typography Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Type className="h-4 w-4 text-red-400" />
              <span>Text Overlay & High-Impact Hook</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Main Headline (Max 3-4 Words Recommended)
              </label>
              <input
                type="text"
                value={textOverlay}
                onChange={(e) => setTextOverlay(e.target.value)}
                placeholder="e.g. DO NOT DO THIS!"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-bold text-white uppercase focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Sub-Heading Kicker</label>
                <input
                  type="text"
                  value={subText}
                  onChange={(e) => setSubText(e.target.value)}
                  placeholder="e.g. 2026 EDITION"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white uppercase focus:border-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Position</label>
                <select
                  value={textPosition}
                  onChange={(e) => setTextPosition(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="bottom">Bottom Third</option>
                  <option value="center">Center Focus</option>
                  <option value="top">Top Third</option>
                </select>
              </div>
            </div>

            {/* Font Size & Colors */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Font Size:</span>
                  <span className="font-mono">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="110"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Text Color</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-8 w-8 rounded cursor-pointer border border-slate-700 bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{textColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Stroke Color</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="h-8 w-8 rounded cursor-pointer border border-slate-700 bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{strokeColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Stroke Width</label>
                  <select
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value={0}>None</option>
                    <option value={4}>Light (4px)</option>
                    <option value={8}>Bold (8px)</option>
                    <option value={14}>Ultra (14px)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Badge / Sticker Option */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-300">
                  Corner Attention Sticker / Badge
                </label>
                <input
                  type="checkbox"
                  checked={showBadge}
                  onChange={(e) => setShowBadge(e.target.checked)}
                  className="h-4 w-4 accent-red-600 rounded"
                />
              </div>
              {showBadge && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="e.g. 100% SHOCKING"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white uppercase focus:border-red-500 focus:outline-none"
                  />
                  <div className="flex gap-1">
                    {['MUST WATCH', '100 DAYS', 'NEW'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBadgeText(b)}
                        className="px-2 py-1 text-[10px] font-bold rounded bg-slate-800 text-slate-300 hover:text-white"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Background Selection */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>16:9 Background Scene</span>
              </div>
              <label className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors">
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Custom</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {THUMBNAIL_PRESET_IMAGES.map((preset) => {
                const isSelected = activeBgImage === preset.src && !uploadedImage;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setUploadedImage(null);
                      setActiveBgImage(preset.src);
                    }}
                    className={`relative rounded-lg overflow-hidden border text-left transition-all group ${
                      isSelected
                        ? 'border-red-500 ring-2 ring-red-500/40'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="aspect-video w-full bg-slate-950 overflow-hidden">
                      <img
                        src={preset.src}
                        alt={preset.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 bg-slate-950/90 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-200 truncate">
                        {preset.name}
                      </span>
                      {isSelected && <Check className="h-3 w-3 text-red-500 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Concept Assistant Trigger */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Sparkles className="h-4 w-4 text-red-400" />
                <span>AI Thumbnail Strategy Generator</span>
              </div>
              <button
                onClick={handleGenerateConcepts}
                disabled={isLoadingConcepts}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${isLoadingConcepts ? 'animate-spin' : ''}`} />
                <span>{isLoadingConcepts ? 'Analyzing...' : 'Generate 3 Ideas'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => {
                    setTextOverlay(concept.textOverlay);
                    setBadgeText(concept.psychologicalTrigger.split(' ')[0] || 'MUST WATCH');
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 hover:border-slate-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">{concept.name}</span>
                    <span className="font-mono text-[11px] text-emerald-400">
                      {concept.expectedCtrRating}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    <strong className="text-slate-400">Overlay:</strong> "{concept.textOverlay}" · {concept.psychologicalTrigger}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">{concept.compositionNotes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Viewport & YouTube Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sticky top-20">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPreviewMode('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  previewMode === 'editor'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layout className="h-3.5 w-3.5" />
                <span>Canvas Editor</span>
              </button>
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  previewMode === 'desktop'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>YouTube Desktop Card</span>
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  previewMode === 'mobile'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Mobile Feed Test</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono hidden sm:block pr-2">
              16:9 · 1280 × 720 HD
            </div>
          </div>

          {/* Canvas Render Display */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-2xl">
            {previewMode === 'editor' && (
              <div className="space-y-3">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-800 bg-black">
                  <img
                    src={uploadedImage || activeBgImage}
                    alt="Thumbnail Preview"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  {showBadge && badgeText.trim() && (
                    <div className="absolute top-4 left-4 -rotate-2 rounded-lg bg-red-600 px-3 py-1 font-black text-white text-xs sm:text-sm tracking-wider shadow-lg border border-white/60 uppercase">
                      {badgeText}
                    </div>
                  )}

                  {/* Text Overlay */}
                  <div
                    className={`absolute inset-x-4 flex flex-col items-center pointer-events-none text-center ${
                      textPosition === 'top'
                        ? 'top-8'
                        : textPosition === 'center'
                        ? 'top-1/2 -translate-y-1/2'
                        : 'bottom-6'
                    }`}
                  >
                    {subText.trim() && (
                      <span
                        className="font-extrabold tracking-wider text-amber-400 uppercase text-xs sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        style={{
                          textShadow: '0 2px 8px #000, 0 0 10px #000',
                        }}
                      >
                        {subText}
                      </span>
                    )}
                    <h2
                      className="font-black tracking-tight uppercase leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]"
                      style={{
                        fontSize: `clamp(1.5rem, 5vw, ${fontSize * 0.55}px)`,
                        color: textColor,
                        WebkitTextStroke: `${strokeWidth > 0 ? strokeWidth * 0.5 : 0}px ${strokeColor}`,
                        textShadow: '0 4px 16px rgba(0,0,0,0.9)',
                      }}
                    >
                      {textOverlay || 'ENTER HEADLINE'}
                    </h2>
                  </div>

                  {/* YouTube Duration Timestamp Simulator */}
                  <div className="absolute bottom-3 right-3 rounded bg-black/90 px-1.5 py-0.5 font-mono text-[11px] font-bold text-white">
                    14:28
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Standard 1280×720px YouTube aspect ratio.</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload('png')}
                      className="text-red-400 hover:text-red-300 font-semibold"
                    >
                      Download PNG
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => handleDownload('jpeg')}
                      className="text-slate-300 hover:text-white font-semibold"
                    >
                      Download JPG
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: YouTube Desktop Card Simulator */}
            {previewMode === 'desktop' && (
              <div className="max-w-md mx-auto space-y-3 py-2">
                <div className="text-xs font-semibold text-slate-400 mb-1">
                  YouTube Desktop Home Feed Card:
                </div>
                <div className="space-y-3 rounded-lg bg-slate-900/90 p-3 border border-slate-800">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <img
                      src={uploadedImage || activeBgImage}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {showBadge && badgeText && (
                      <div className="absolute top-2 left-2 -rotate-2 rounded bg-red-600 px-2 py-0.5 font-black text-white text-[10px] uppercase">
                        {badgeText}
                      </div>
                    )}
                    <div className="absolute bottom-3 inset-x-2 text-center">
                      <div
                        className="font-black text-white text-sm uppercase leading-tight drop-shadow"
                        style={{
                          WebkitTextStroke: '2px black',
                          color: textColor,
                        }}
                      >
                        {textOverlay}
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/90 px-1 py-0.5 font-mono text-[10px] text-white">
                      14:28
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                      YT
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                        {videoTitle}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">Creator Studio · 48K views · 2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 3: YouTube Mobile Feed Simulator */}
            {previewMode === 'mobile' && (
              <div className="max-w-xs mx-auto space-y-3 py-2">
                <div className="text-xs font-semibold text-slate-400 mb-1">
                  YouTube Smartphone Feed Test (Simulated 375px width):
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 space-y-2.5 shadow-xl">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <img
                      src={uploadedImage || activeBgImage}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {showBadge && badgeText && (
                      <div className="absolute top-1.5 left-1.5 -rotate-2 rounded bg-red-600 px-1.5 py-0.5 font-black text-white text-[9px] uppercase">
                        {badgeText}
                      </div>
                    )}
                    <div className="absolute bottom-2 inset-x-2 text-center">
                      <div
                        className="font-black text-white text-xs uppercase leading-tight"
                        style={{
                          WebkitTextStroke: '1.5px black',
                          color: textColor,
                        }}
                      >
                        {textOverlay}
                      </div>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 rounded bg-black/90 px-1 py-0.2 font-mono text-[9px] text-white">
                      14:28
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                      YT
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {videoTitle}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Creator Studio · 48K views</p>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-400 text-center">
                  Notice: Headline is 100% readable even at small mobile scale!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
