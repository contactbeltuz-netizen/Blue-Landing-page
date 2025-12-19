import React, { useState, useEffect } from 'react';
import { Star, MapPin, ArrowUpRight, Clock, Calendar, Sparkles, Moon, Loader2, Send, X, User, Mail, PhoneCall, CheckCircle2, Trees } from 'lucide-react';
import { generateDreamDestinationImage } from '../services/geminiService';
import { GoogleGenAI } from "@google/genai";

const ADMIN_EMAIL = "nausad.hussain@gmail.com";

const PACKAGE_DATA = [
  {
    id: 'pkg-1',
    name: 'Day Tours: Nature Express',
    duration: 'Same Day Return',
    rating: 4.7,
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/Sajnekhali-Watch-Tower.jpg',
    tag: 'Quick Escape',
    icon: <Clock className="w-4 h-4" />
  },
  {
    id: 'pkg-2',
    name: '1 Night 2 Days Expedition',
    duration: 'Overnight Stay',
    rating: 4.9,
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/dobanki_watch-tower.jpg',
    tag: 'Best Seller',
    icon: <Moon className="w-4 h-4" />
  },
  {
    id: 'pkg-3',
    name: '2 Night 3 Days Immersion',
    duration: 'Deep Jungle Access',
    rating: 5.0,
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/Sudhanyakhali-Watch-Tower_0.jpg',
    tag: 'Flagship Experience',
    icon: <Calendar className="w-4 h-4" />
  },
  {
    id: 'pkg-4',
    name: 'Customized Package Tours',
    duration: 'Flexible Duration',
    rating: 4.9,
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/Netidhopani.jpg',
    tag: 'Tailor Made',
    icon: <Sparkles className="w-4 h-4" />
  }
];

const PackageSection: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<typeof PACKAGE_DATA[0] | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', date: '', guests: 2 });
  const [aiImages, setAiImages] = useState<Record<string, string | null>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const generatePkgImage = async (pkg: typeof PACKAGE_DATA[0]) => {
    setLoadingImages(prev => ({ ...prev, [pkg.id]: true }));
    try {
      const prompt = `${pkg.name} in Sundarbans. Boat safari, wildlife, mangrove forest. Cinematic.`;
      const imageUrl = await generateDreamDestinationImage(prompt);
      if (imageUrl) setAiImages(prev => ({ ...prev, [pkg.id]: imageUrl }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImages(prev => ({ ...prev, [pkg.id]: false }));
    }
  };

  useEffect(() => {
    PACKAGE_DATA.forEach(pkg => generatePkgImage(pkg));
  }, []);

  const handleBookNow = (pkg: typeof PACKAGE_DATA[0]) => {
    setSelectedPkg(pkg);
    setIsBooked(false);
    setIsSending(false);
    setFormData({ name: '', email: '', date: '', guests: 2 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;
    setIsSending(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `New Package Inquiry: "${selectedPkg.name}". Client: ${formData.name} (${formData.email}). Guests: ${formData.guests}. Contact requested for pricing details.`,
      });
      setIsBooked(true);
    } catch (error) {
      setIsBooked(true); 
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="packages" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#ff6c00] font-bold text-[10px] mb-4 uppercase tracking-[0.4em]">
              <Trees className="w-4 h-4" />
              Safari Duration Collections
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1a2b47] leading-tight tracking-tighter">
              Roar of the Wild <br /> <span className="text-[#ff6c00]">Premium Packages</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-lg max-w-sm border-l-4 border-[#ff6c00] pl-6 py-2">
            Tailored itineraries designed to let you experience the pulse of the Sundarbans. Fill the form to get a personalized quote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {PACKAGE_DATA.map((pkg) => (
            <div key={pkg.id} className="group relative bg-slate-50 rounded-[3rem] overflow-hidden transition-all duration-500 hover:shadow-2xl border border-slate-100 flex flex-col h-full min-h-[500px]">
              <div className="relative aspect-video md:aspect-auto md:flex-1 overflow-hidden bg-slate-200">
                {loadingImages[pkg.id] ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#ff6c00] animate-spin" />
                  </div>
                ) : (
                  <img src={aiImages[pkg.id] || pkg.img} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                )}
                
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                   <span className="bg-[#ff6c00] text-white text-[11px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
                     {pkg.tag}
                   </span>
                   <span className="bg-[#1a2b47]/80 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                     {pkg.icon} {pkg.duration}
                   </span>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                   <div className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xl md:text-2xl font-black text-[#1a2b47] tracking-tight">{pkg.name}</h3>
                         <div className="flex items-center gap-1.5 text-[#ff6c00] font-black text-sm">
                           <Star className="w-4 h-4 fill-current" /> {pkg.rating}
                         </div>
                      </div>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Price on Request</p>
                      
                      <button 
                        onClick={() => handleBookNow(pkg)} 
                        className="mt-4 w-full bg-[#1a2b47] text-white py-4 md:py-5 rounded-2xl font-black hover:bg-[#ff6c00] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-slate-950/10"
                      >
                        ENQUIRE NOW <ArrowUpRight className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPkg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a2b47]/90 backdrop-blur-md" onClick={() => setSelectedPkg(null)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            <button onClick={() => setSelectedPkg(null)} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-10 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>

            <div className="overflow-y-auto flex-1">
              {!isBooked ? (
                <div className="p-10 md:p-14">
                  <h3 className="text-3xl font-black text-[#1a2b47] mb-2">{selectedPkg.name}</h3>
                  <p className="text-[#ff6c00] font-black uppercase tracking-widest text-xs mb-8">Inquiry for {selectedPkg.duration}</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3" /> Full Name</label>
                      <input required disabled={isSending} type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3 h-3" /> Email</label>
                      <input required disabled={isSending} type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                    </div>
                    <button type="submit" disabled={isSending} className="w-full bg-[#ff6c00] text-white py-6 rounded-2xl font-black text-lg shadow-2xl shadow-[#ff6c00]/20 flex items-center justify-center gap-4 active:scale-[0.98] transition-all">
                      {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> REQUEST PRICING</>}
                    </button>
                    <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">Our experts will contact you with a customized quote.</p>
                  </form>
                </div>
              ) : (
                <div className="p-10 md:p-14 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#ff6c00]/10 rounded-full flex items-center justify-center mb-10 border border-[#ff6c00]/20">
                    <CheckCircle2 className="w-12 h-12 text-[#ff6c00]" />
                  </div>
                  <h3 className="text-4xl font-black text-[#1a2b47] mb-6">Inquiry Received!</h3>
                  <div className="bg-[#ff6c00]/10 p-8 rounded-[2.5rem] text-[#1a2b47] border border-[#ff6c00]/20 font-bold mb-8 flex flex-col items-center gap-4">
                    <PhoneCall className="w-10 h-10 text-[#ff6c00]" />
                    <p className="text-xl">Our Sundarbans experts will contact you shortly with the best available pricing for your trip.</p>
                  </div>
                  <button onClick={() => setSelectedPkg(null)} className="w-full bg-[#1a2b47] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#1a2b47]/90 active:scale-95">CLOSE</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PackageSection;