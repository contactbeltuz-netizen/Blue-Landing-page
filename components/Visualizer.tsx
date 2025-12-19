import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Wand2, Download, Share2, Loader2, Sparkles, RefreshCw, Plus, Zap, Heart, Flame } from 'lucide-react';
import { generateDreamDestinationImage } from '../services/geminiService';

const TRENDING_VISIONS = [
  { 
    title: "Crystal Cove", 
    prompt: "A bioluminescent crystal cave with a hidden waterfall and turquoise pool",
    tags: ["Nature", "Bioluminescent", "Magical"]
  },
  { 
    title: "Cyber Kyoto", 
    prompt: "Traditional Kyoto temple surrounded by neon holograms and floating cherry blossoms",
    tags: ["Urban", "Cyberpunk", "Cultural"]
  },
  { 
    title: "Sky Villa", 
    prompt: "Ultra-modern glass villa floating above the clouds during a sunset in the Alps",
    tags: ["Luxury", "Sky", "Minimalist"]
  }
];

const VISION_BLOCKS = {
  Themes: [
    { label: "Sundarbans Mist", value: "misty mangrove forest" },
    { label: "Golden Safari", value: "golden hour tiger safari" },
    { label: "Ancient Ruins", value: "overgrown temple ruins" },
    { label: "Coastal Oasis", value: "tropical river bank" },
    { label: "Night Jungle", value: "bioluminescent mangrove" }
  ],
  Subjects: [
    { label: "Royal Tiger", value: "a majestic Royal Bengal Tiger" },
    { label: "Luxury Boat", value: "a premium wooden houseboat" },
    { label: "Jungle Cabin", value: "a cozy eco-resort balcony" },
    { label: "Spotted Deer", value: "a herd of spotted deer" },
    { label: "Sunset Watchtower", value: "a wooden watchtower at dusk" }
  ],
  Vibes: [
    { label: "Cinematic", value: "shot on 35mm film, cinematic lighting" },
    { label: "Hyper-Real", value: "8k photorealistic, high detail" },
    { label: "Dreamy", value: "ethereal atmosphere, soft focus" },
    { label: "National Geographic", value: "wildlife documentary style" },
    { label: "Vintage", value: "grainy film look, 1970s aesthetic" }
  ]
};

const Visualizer: React.FC = () => {
  const [vision, setVision] = useState({
    theme: VISION_BLOCKS.Themes[0],
    subject: VISION_BLOCKS.Subjects[0],
    vibe: VISION_BLOCKS.Vibes[1]
  });
  
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const finalPrompt = `${vision.subject} in a ${vision.theme.value}, ${vision.vibe.value}`;

  const handleGenerate = async () => {
    setLoading(true);
    const img = await generateDreamDestinationImage(finalPrompt);
    setGeneratedImage(img);
    setLoading(false);
  };

  const shuffleVision = () => {
    const t = VISION_BLOCKS.Themes[Math.floor(Math.random() * VISION_BLOCKS.Themes.length)];
    const s = VISION_BLOCKS.Subjects[Math.floor(Math.random() * VISION_BLOCKS.Subjects.length)];
    const v = VISION_BLOCKS.Vibes[Math.floor(Math.random() * VISION_BLOCKS.Vibes.length)];
    setVision({ theme: t, subject: s, vibe: v });
  };

  const selectTrending = (t: typeof TRENDING_VISIONS[0]) => {
    // For trending, we bypass the blocks and set a custom prompt flow
    // But for this guided UI, we'll map it to a specific feeling
    setVision({
      theme: { label: "Trending", value: t.prompt },
      subject: { label: t.title, value: "" },
      vibe: { label: "Featured", value: "" }
    });
  };

  return (
    <section id="visualize" className="py-24 bg-[#0a0f1a] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6c00] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 px-5 py-2 rounded-full text-[#ff6c00] font-black text-xs mb-6 border border-white/10 uppercase tracking-[0.4em]">
            <Sparkles className="w-4 h-4" />
            Sundarbans AI Studio
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
            Visualize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6c00] to-[#ff6c00]/60">Safari Vision</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Craft your perfect Sundarbans moment with our guided AI vision builder. No complex prompts required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Guided Builder */}
          <div className="lg:col-span-5 space-y-8 flex flex-col">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl backdrop-blur-xl flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#ff6c00] animate-pulse"></div>
                  <h3 className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">Vision Builder</h3>
                </div>
                <button 
                  onClick={shuffleVision}
                  className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all group active:scale-90 border border-white/5"
                  title="Shuffle Inspiration"
                >
                  <RefreshCw className="w-5 h-5 text-[#ff6c00] group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>

              <div className="space-y-10 flex-1">
                {/* Theme Selection */}
                <div className="space-y-4">
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-3 h-3 text-[#ff6c00]" /> 1. Select Atmosphere
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {VISION_BLOCKS.Themes.map(t => (
                      <button
                        key={t.label}
                        onClick={() => setVision(v => ({ ...v, theme: t }))}
                        className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                          vision.theme.label === t.label 
                            ? 'bg-[#ff6c00] border-[#ff6c00] text-white shadow-xl shadow-[#ff6c00]/20' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="space-y-4">
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Heart className="w-3 h-3 text-[#ff6c00]" /> 2. Choose Hero
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {VISION_BLOCKS.Subjects.map(s => (
                      <button
                        key={s.label}
                        onClick={() => setVision(v => ({ ...v, subject: s }))}
                        className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                          vision.subject.label === s.label 
                            ? 'bg-[#ff6c00] border-[#ff6c00] text-white shadow-xl shadow-[#ff6c00]/20' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aesthetic Selection */}
                <div className="space-y-4">
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Camera className="w-3 h-3 text-[#ff6c00]" /> 3. Set The Vibe
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {VISION_BLOCKS.Vibes.map(v => (
                      <button
                        key={v.label}
                        onClick={() => setVision(vis => ({ ...vis, vibe: v }))}
                        className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                          vision.vibe.label === v.label 
                            ? 'bg-[#ff6c00] border-[#ff6c00] text-white shadow-xl shadow-[#ff6c00]/20' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5">
                <div className="bg-black/40 rounded-[2rem] p-6 border border-white/5 mb-8">
                  <p className="text-[10px] font-black text-[#ff6c00] uppercase tracking-widest mb-3">Vision Sentence</p>
                  <p className="text-sm md:text-base font-bold text-slate-200 leading-relaxed">
                    "I want to see <span className="text-[#ff6c00] underline underline-offset-4 decoration-white/20">{vision.subject.label}</span> in a <span className="text-[#ff6c00] underline underline-offset-4 decoration-white/20">{vision.theme.label}</span> setting with a <span className="text-[#ff6c00] underline underline-offset-4 decoration-white/20">{vision.vibe.label}</span> aesthetic."
                  </p>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-white text-[#1a2b47] hover:bg-[#ff6c00] hover:text-white disabled:bg-slate-800 disabled:text-slate-600 py-6 rounded-2xl font-black flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl text-base uppercase tracking-[0.2em]"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                  <span>{loading ? 'GENERATING VISION...' : 'RENDER SAFARI VISION'}</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TRENDING_VISIONS.map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => selectTrending(t)}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-3xl border border-white/5 transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Flame className="w-3.5 h-3.5 text-[#ff6c00]" />
                    <span className="text-[8px] font-black text-slate-500 uppercase">Trending</span>
                  </div>
                  <p className="text-[11px] font-black text-white/80 group-hover:text-white truncate">{t.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Output Canvas */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[400px] md:min-h-[600px] bg-white/5 border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden relative group shadow-2xl flex flex-col">
              {!generatedImage && !loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 p-8 text-center bg-slate-900/40">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                    <ImageIcon className="w-12 h-12 md:w-16 md:h-16 opacity-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-400 mb-4 tracking-tighter uppercase">Canvas Primed</h4>
                  <p className="max-w-xs text-slate-500 text-sm font-medium leading-relaxed">Select your vibe-blocks and render your custom Sundarbans vision.</p>
                </div>
              ) : null}

              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1a]/80 backdrop-blur-3xl z-20 p-8 text-center">
                  <div className="relative mb-12">
                    <div className="w-24 h-24 md:w-32 md:h-32 border-t-4 border-[#ff6c00] rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wand2 className="w-10 h-10 text-[#ff6c00] animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#ff6c00] font-black tracking-[0.4em] uppercase text-xs">Simulating Reality...</p>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Optimizing Mangrove Textures</p>
                  </div>
                </div>
              )}

              {generatedImage && (
                <div className="relative flex-1 group">
                  <img src={generatedImage} alt="AI Generated Vision" className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 md:p-12">
                     <div className="flex w-full items-center justify-between gap-6">
                        <div className="bg-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 flex-1 min-w-0">
                          <p className="text-[10px] font-black uppercase text-[#ff6c00] mb-1 tracking-widest">Vision Attributes</p>
                          <p className="text-xs md:text-sm font-bold text-white/90 truncate">{vision.subject.label} | {vision.theme.label}</p>
                        </div>
                        <div className="flex gap-3 shrink-0">
                          <button className="bg-white text-[#1a2b47] hover:bg-[#ff6c00] hover:text-white p-4 rounded-2xl transition-all shadow-xl active:scale-90">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="bg-white/10 backdrop-blur-xl hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 active:scale-90">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Visualizer;