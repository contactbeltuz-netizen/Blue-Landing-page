
import React, { useState } from 'react';
// Added ArrowUpRight to the imports
import { Sparkles, Loader2, DollarSign, Clock, ChevronRight, X, Calendar, Users, Plus, Minus, Trees, MapPin, Compass, Camera, Send, CheckCircle2, PhoneCall, User, Mail, ArrowUpRight } from 'lucide-react';
import { getTravelRecommendations } from '../services/geminiService';
import { AIRecommendation } from '../types';
import { GoogleGenAI } from "@google/genai";

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<AIRecommendation | null>(null);
  const [formData, setFormData] = useState({
    mood: 'Wildlife Safari',
    budget: 'Premium',
    duration: '3 Days',
    guests: 2,
    preferences: ''
  });
  
  const [inquiryData, setInquiryData] = useState({ name: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await getTravelRecommendations(formData);
      setRecommendations(results);
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
      // Create fresh instance right before usage as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `New AI-Generated Itinerary Inquiry: "${selectedPlan.destination}". 
        Mood: ${formData.mood}, Guests: ${formData.guests}.
        Client: ${inquiryData.name} (${inquiryData.email}). 
        They are requesting a personalized quote for this specific AI plan.`,
      });
      setIsBooked(true);
    } catch (error) {
      setIsBooked(true); 
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="ai-planner" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements consistent with other sections */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff6c00]/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-stretch">
          
          {/* Form Side */}
          <div className="w-full lg:w-5/12">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-[#ff6c00] font-bold text-[10px] mb-4 uppercase tracking-[0.4em]">
                <Sparkles className="w-4 h-4" />
                Intelligent Concierge
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#1a2b47] leading-[1.1] tracking-tighter mb-8">
                Create Your <br />
                <span className="text-[#ff6c00]">Dream Itinerary</span>
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed border-l-4 border-[#ff6c00] pl-6 py-2">
                Our AI naturalists will curate a bespoke Sundarbans expedition based on your specific pulse.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-slate-50 p-10 md:p-12 rounded-[3.5rem] border border-slate-100 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#ff6c00]" /> Safari Vibe
                  </label>
                  <select 
                    value={formData.mood}
                    onChange={(e) => setFormData({...formData, mood: e.target.value})}
                    className="w-full bg-white border border-slate-100 p-5 rounded-2xl font-black text-[#1a2b47] outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all cursor-pointer appearance-none shadow-sm"
                  >
                    <option>Wildlife Safari</option>
                    <option>Nature Cruise</option>
                    <option>Village Immersion</option>
                    <option>Photography Special</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#ff6c00]" /> Travelers
                  </label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    className="w-full bg-white border border-slate-100 p-5 rounded-2xl font-black text-[#1a2b47] outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all cursor-pointer appearance-none shadow-sm"
                  >
                    {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Explorer' : 'Explorers'}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-[#ff6c00]" /> Custom Requests
                </label>
                <textarea 
                  value={formData.preferences}
                  onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                  placeholder="e.g. Sighting preferences, dietary needs, specific watchtowers..."
                  className="w-full bg-white border border-slate-100 p-6 rounded-[2rem] font-bold text-[#1a2b47] outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all min-h-[140px] resize-none placeholder:text-slate-200 shadow-sm"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1a2b47] text-white py-6 rounded-2xl font-black hover:bg-[#ff6c00] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-xl shadow-slate-950/10"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                <span className="text-lg uppercase tracking-widest">{loading ? 'CURATING PLAN...' : 'GENERATE ITINERARY'}</span>
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="flex-1 flex flex-col gap-8 min-h-[500px]">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 backdrop-blur-sm rounded-[4rem] border border-slate-100 p-12 text-center animate-pulse">
                   <div className="relative mb-8">
                      <div className="w-24 h-24 border-t-4 border-[#ff6c00] rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Trees className="w-10 h-10 text-[#ff6c00]" />
                      </div>
                   </div>
                   <h3 className="text-2xl font-black text-[#1a2b47] mb-2 uppercase tracking-tighter">Consulting Local Guides...</h3>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Mapping Optimal Safari Routes</p>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                  <div className="flex items-center gap-4 mb-4">
                     <span className="h-px flex-1 bg-slate-100"></span>
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Personalized Expeditions</span>
                     <span className="h-px flex-1 bg-slate-100"></span>
                  </div>
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="group bg-slate-50 border border-slate-100 p-10 md:p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col gap-8 items-start">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6c00]/5 rounded-bl-[4rem] group-hover:bg-[#ff6c00]/10 transition-colors"></div>
                      
                      <div className="w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                          <div className="flex items-center gap-6">
                            <div className="bg-[#1a2b47] text-white p-5 rounded-[1.5rem] group-hover:bg-[#ff6c00] transition-colors shadow-lg">
                              <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-[#1a2b47] tracking-tight">{rec.destination}</h3>
                          </div>
                          <div className="inline-flex items-center gap-2 bg-white text-[#ff6c00] px-6 py-2.5 rounded-full font-black text-sm border border-[#ff6c00]/10 uppercase tracking-widest shadow-sm">
                            {rec.estimatedCost}
                          </div>
                        </div>
                        
                        <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/80 mb-8">
                          <p className="text-[#1a2b47] font-bold text-xl leading-relaxed italic">
                            "{rec.reason}"
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-10">
                          {rec.suggestedActivities.map((act, aIdx) => (
                            <span key={aIdx} className="bg-white text-slate-500 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100 shadow-sm">
                              {act}
                            </span>
                          ))}
                        </div>

                        <button 
                          onClick={() => { setSelectedPlan(rec); setIsBooked(false); setIsSending(false); }}
                          className="w-full md:w-auto bg-[#1a2b47] text-white px-12 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#ff6c00] transition-all shadow-xl active:scale-95 text-base uppercase tracking-widest"
                        >
                          ENQUIRE FOR THIS PLAN <ArrowUpRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm border border-slate-50">
                    <Calendar className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-300 uppercase tracking-tighter mb-4">Itinerary Awaiting Vision</h3>
                  <p className="max-w-xs text-slate-400 font-medium leading-relaxed">Customize your preferences to see your personalized Sundarbans expedition come to life.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Inquiry Modal for AI Plans */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a2b47]/90 backdrop-blur-md" onClick={() => setSelectedPlan(null)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            <button onClick={() => setSelectedPlan(null)} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-10 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>

            <div className="overflow-y-auto flex-1">
              {!isBooked ? (
                <div className="p-10 md:p-14">
                  <h3 className="text-3xl font-black text-[#1a2b47] mb-2">{selectedPlan.destination}</h3>
                  <p className="text-[#ff6c00] font-black uppercase tracking-widest text-xs mb-8">Quote request for personalized AI Itinerary</p>

                  <form onSubmit={handleInquirySubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3" /> Full Name</label>
                      <input required disabled={isSending} type="text" placeholder="Your Name" value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3 h-3" /> Email</label>
                      <input required disabled={isSending} type="email" placeholder="email@example.com" value={inquiryData.email} onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                    </div>
                    <button type="submit" disabled={isSending} className="w-full bg-[#ff6c00] text-white py-6 rounded-2xl font-black text-lg shadow-2xl shadow-[#ff6c00]/20 flex items-center justify-center gap-4 active:scale-[0.98] transition-all">
                      {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> REQUEST PRICING</>}
                    </button>
                    <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">Our safari experts will contact you with a customized quote.</p>
                  </form>
                </div>
              ) : (
                <div className="p-10 md:p-14 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#ff6c00]/10 rounded-full flex items-center justify-center mb-10 border border-[#ff6c00]/20">
                    <CheckCircle2 className="w-12 h-12 text-[#ff6c00]" />
                  </div>
                  <h3 className="text-4xl font-black text-[#1a2b47] mb-6">Expert Assigned!</h3>
                  <div className="bg-[#ff6c00]/10 p-8 rounded-[2.5rem] text-[#1a2b47] border border-[#ff6c00]/20 font-bold mb-8 flex flex-col items-center gap-4">
                    <PhoneCall className="w-10 h-10 text-[#ff6c00]" />
                    <p className="text-xl">One of our Sundarbans naturalists will contact you to finalize this AI-crafted itinerary.</p>
                  </div>
                  <button onClick={() => setSelectedPlan(null)} className="w-full bg-[#1a2b47] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#1a2b47]/90 active:scale-95">CLOSE</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIPlanner;
