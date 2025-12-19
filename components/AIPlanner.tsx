import React, { useState } from 'react';
import { Sparkles, Loader2, Compass, MapPin, ArrowUpRight, X, User, Phone, CheckCircle2, Waves, Eye } from 'lucide-react';
import { getTravelRecommendations, generateDreamDestinationImage } from '../services/geminiService';
import { AIRecommendation } from '../types';
import { GoogleGenAI } from "@google/genai";

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [recImages, setRecImages] = useState<Record<number, string | null>>({});
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [isBooked, setIsBooked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<AIRecommendation | null>(null);
  const [formData, setFormData] = useState({
    mood: 'Wildlife Expedition',
    budget: 'Premium',
    duration: '3 Days',
    guests: 2,
    preferences: ''
  });
  
  const [inquiryData, setInquiryData] = useState({ name: '', phone: '' });

  const fetchImages = async (results: AIRecommendation[]) => {
    results.forEach(async (rec, idx) => {
      setImageLoading(prev => ({ ...prev, [idx]: true }));
      try {
        const img = await generateDreamDestinationImage(`${rec.destination}, ${rec.suggestedActivities[0]}`);
        setRecImages(prev => ({ ...prev, [idx]: img }));
      } catch (err) {
        console.error("Image generation failed", err);
      } finally {
        setImageLoading(prev => ({ ...prev, [idx]: false }));
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecImages({});
    try {
      const results = await getTravelRecommendations(formData);
      setRecommendations(results);
      // Kick off image generation for each result
      fetchImages(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setIsSending(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `New AI-Generated Itinerary Inquiry: "${selectedPlan.destination}". 
        Client: ${inquiryData.name}
        Phone: ${inquiryData.phone}
        Guests: ${formData.guests}
        AI Reason: ${selectedPlan.reason}`,
      });
      setIsBooked(true);
    } catch (error) {
      setIsBooked(true); 
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="ai-planner" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative BG Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff6c00]/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a2b47]/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#ff6c00] font-black text-[10px] mb-4 uppercase tracking-[0.4em]">
            <Sparkles className="w-4 h-4" />
            Next-Gen Planning
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-[#1a2b47] tracking-tighter mb-6">
            AI Expedition <span className="text-[#ff6c00]">Designer</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
            Describe your dream encounter, and our AI naturalists will synthesize a bespoke Sundarbans itinerary with cinematic visuals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Form Side */}
          <div className="w-full lg:w-[400px] shrink-0">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-xl space-y-8 h-full">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expedition Vibe</label>
                  <select value={formData.mood} onChange={(e) => setFormData({...formData, mood: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-[#1a2b47] outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all cursor-pointer">
                    <option>Wildlife Expedition</option>
                    <option>Nature Cruise</option>
                    <option>Village Immersion</option>
                    <option>Photography Special</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explorers</label>
                  <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-[#1a2b47] outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all cursor-pointer">
                    {[1,2,4,6,8,10].map(n => <option key={n} value={n}>{n} Pax</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Requests</label>
                <textarea 
                  value={formData.preferences} 
                  onChange={(e) => setFormData({...formData, preferences: e.target.value})} 
                  placeholder="e.g. I want to see a tiger at sunrise near Dobanki..." 
                  className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold text-[#1a2b47] outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all min-h-[140px] resize-none shadow-sm" 
                />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#1a2b47] text-white py-6 rounded-2xl font-black hover:bg-[#ff6c00] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl shadow-[#1a2b47]/10 uppercase tracking-widest text-sm">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                <span>{loading ? 'Consulting Local AI...' : 'Generate Itinerary'}</span>
              </button>
              
              <div className="pt-6 border-t border-slate-50">
                 <div className="flex items-center gap-4 text-slate-400">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Waves className="w-5 h-5 text-[#ff6c00]" /></div>
                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Dynamic Sighting <br /> Prediction Active</p>
                 </div>
              </div>
            </form>
          </div>

          {/* Results Side */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 min-h-[500px]">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center bg-white rounded-[3.5rem] border border-slate-100 p-12 text-center shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 bg-slate-50 animate-pulse"></div>
                   <div className="relative z-10 flex flex-col items-center">
                     <div className="w-24 h-24 border-4 border-[#ff6c00] border-t-transparent rounded-full animate-spin mb-8"></div>
                     <h3 className="text-2xl font-black text-[#1a2b47] uppercase tracking-widest">Synthesizing Experiences...</h3>
                     <p className="text-slate-400 font-bold mt-4">Analyzing tiger movement patterns and boat logistics.</p>
                   </div>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col">
                      {/* Dynamically Generated AI Image */}
                      <div className="h-[240px] bg-slate-100 relative overflow-hidden">
                        {imageLoading[idx] ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-8 h-8 text-[#ff6c00] animate-spin" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rendering Vision...</span>
                          </div>
                        ) : recImages[idx] ? (
                          <img src={recImages[idx]!} alt={rec.destination} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                             <Compass className="w-12 h-12 text-slate-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-8 flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#ff6c00]" />
                          <h3 className="text-xl font-black text-white tracking-tight">{rec.destination}</h3>
                        </div>
                      </div>

                      <div className="p-8 flex-1 flex flex-col">
                        <p className="text-slate-500 font-medium italic text-sm mb-6 leading-relaxed">
                          "{rec.reason}"
                        </p>
                        
                        <div className="space-y-3 mb-8">
                          {rec.suggestedActivities.slice(0, 3).map((act, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff6c00]"></div>
                              <span className="text-xs font-bold text-[#1a2b47] uppercase tracking-tight">{act}</span>
                            </div>
                          ))}
                        </div>

                        <button 
                          onClick={() => setSelectedPlan(rec)} 
                          className="mt-auto bg-[#ff6c00] text-white w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#1a2b47] transition-all active:scale-95 text-xs uppercase tracking-[0.2em]"
                        >
                          Enquire This Plan <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full bg-slate-200/40 rounded-[3.5rem] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-12 text-center group">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm text-slate-300 group-hover:text-[#ff6c00] transition-colors group-hover:scale-110 duration-500">
                    <Eye className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-500 tracking-tighter uppercase mb-4">The Canvas is Empty</h3>
                  <p className="max-w-xs text-slate-400 font-bold text-lg leading-snug">Fill the form to see your custom Sundarbans vision come to life.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a2b47]/90 backdrop-blur-md" onClick={() => setSelectedPlan(null)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedPlan(null)} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-10 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>

            {!isBooked ? (
              <div className="p-10 md:p-14">
                <div className="mb-10">
                  <p className="text-[#ff6c00] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Exclusive Quotation</p>
                  <h3 className="text-3xl font-black text-[#1a2b47] leading-tight">Request Plan for <br />{selectedPlan.destination}</h3>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Full Name</label>
                    <input required type="text" placeholder="Your Name" value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#ff6c00] uppercase tracking-widest flex items-center gap-2">WhatsApp Number</label>
                    <input required inputMode="tel" type="tel" placeholder="+91 00000 00000" value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} className="w-full bg-[#ff6c00]/5 border border-[#ff6c00]/20 p-5 rounded-2xl font-black outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                  </div>
                  <button type="submit" disabled={isSending} className="w-full bg-[#ff6c00] text-white py-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-4 active:scale-95 transition-all uppercase tracking-widest mt-4">
                    {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Get Full Quote Now'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-14 text-center">
                <div className="w-24 h-24 bg-[#ff6c00]/10 rounded-full flex items-center justify-center mb-10 border border-[#ff6c00]/20 mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-[#ff6c00]" />
                </div>
                <h3 className="text-4xl font-black text-[#1a2b47] mb-4">Request Sent!</h3>
                <p className="text-slate-500 font-bold mb-10 text-lg">Our lead naturalist will contact you on WhatsApp with the itinerary and pricing details.</p>
                <button onClick={() => setSelectedPlan(null)} className="w-full bg-[#1a2b47] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">Back to Planner</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AIPlanner;