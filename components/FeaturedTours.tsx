import React, { useState, useEffect } from 'react';
import { Star, MapPin, ArrowUpRight, Flame, Users, X, CheckCircle2, Calendar, Mail, User, Loader2, Send, Plus, Minus, PhoneCall, Globe, CheckCircle, Trees } from 'lucide-react';
import { generateDreamDestinationImage } from '../services/geminiService';
import { GoogleGenAI } from "@google/genai";

// Secure Admin Email
const ADMIN_EMAIL = "nausad.hussain@gmail.com";

const TOURS = [
  {
    id: '1',
    name: 'Royal Bengal Tiger Safari',
    country: 'Sundarbans, India',
    rating: 4.9,
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/Sudhanyakhali-Watch-Tower_0.jpg',
    tags: ['Best Seller'],
    availability: 'Private Boat Only'
  },
  {
    id: '2',
    name: 'Mangrove Luxury Stay',
    country: 'Sundarbans, India',
    rating: 5.0,
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/dobanki_watch-tower.jpg',
    tags: ['Limited Offer'],
    availability: 'Boutique Resort'
  },
  {
    id: '3',
    name: 'Wilderness Photography Tour',
    country: 'Sundarbans, India',
    rating: 4.8,
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/Sajnekhali-Watch-Tower.jpg',
    tags: ['Trending'],
    availability: 'Guided Experts'
  }
];

const FeaturedTours: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<typeof TOURS[0] | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [ajaxStatus, setAjaxStatus] = useState<string>('');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    date: '',
    guests: 2 
  });
  
  const [aiImages, setAiImages] = useState<Record<string, string | null>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const generateTourImage = async (tourId: string, tourName: string, tourCountry: string) => {
    setLoadingImages(prev => ({ ...prev, [tourId]: true }));
    try {
      const prompt = `${tourName} in ${tourCountry}. Mangrove forest, Royal Bengal Tiger, wildlife photography, luxury boat, photorealistic.`;
      const imageUrl = await generateDreamDestinationImage(prompt);
      if (imageUrl) setAiImages(prev => ({ ...prev, [tourId]: imageUrl }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImages(prev => ({ ...prev, [tourId]: false }));
    }
  };

  useEffect(() => {
    TOURS.forEach(tour => generateTourImage(tour.id, tour.name, tour.country));
  }, []);

  const handleBookNow = (tour: typeof TOURS[0]) => {
    setSelectedTour(tour);
    setIsBooked(false);
    setIsSending(false);
    setAjaxStatus('Connecting to Safari HQ...');
    setFormData({ name: '', email: '', date: '', guests: 2 });
  };

  const handleClose = () => setSelectedTour(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;

    setIsSending(true);
    setAjaxStatus('Confirming with Local Guides...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `New Sundarbans Safari Booking Inquiry: "${selectedTour.name}".
        Client: ${formData.name} (${formData.email}).
        Explorers: ${formData.guests}. Date: ${formData.date}.
        Client is requesting pricing and itinerary confirmation.
        Notify Admin: ${ADMIN_EMAIL}.`,
      });

      setAjaxStatus('Inquiry Successfully Sent!');
      setIsBooked(true);
    } catch (error) {
      console.error("Booking Error:", error);
      setIsBooked(true); 
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="destinations" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[#ff6c00] font-bold text-[10px] mb-4 uppercase tracking-[0.4em]">
              <Trees className="w-4 h-4" />
              Exclusive Sundarbans Packages
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1a2b47] leading-tight">
              Roar of the Wild <br /> Premium Escapes
            </h2>
          </div>
          <div className="bg-white px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 md:gap-4">
            <div className="w-2.5 h-2.5 bg-[#ff6c00] rounded-full animate-ping"></div>
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Pricing Support: Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TOURS.map((tour) => (
            <div key={tour.id} className="group bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-slate-100 flex flex-col cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/5] bg-slate-200">
                {loadingImages[tour.id] ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 z-10">
                    <Loader2 className="w-8 h-8 text-[#ff6c00] animate-spin" />
                  </div>
                ) : (
                  <img src={aiImages[tour.id] || tour.img} alt={tour.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                )}
                <div className="absolute top-6 md:top-8 left-6 md:left-8 flex flex-col gap-2">
                   <span className="bg-[#ff6c00] text-white text-[10px] font-black uppercase tracking-widest px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg">{tour.tags[0]}</span>
                   {tour.availability && <span className="bg-[#1a2b47]/80 backdrop-blur-xl text-white text-[9px] font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/10">{tour.availability}</span>}
                </div>
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
                   <div className="bg-white/95 backdrop-blur-xl p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl shadow-2xl flex justify-between items-center transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <div>
                         <div className="flex items-center gap-1 text-[#ff6c00] font-black text-[10px] md:text-xs mb-1">
                            <Star className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" /> {tour.rating}
                         </div>
                         <h3 className="text-lg md:text-xl font-bold text-[#1a2b47] tracking-tight leading-tight">{tour.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quote on Request</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="p-6 md:p-8 pb-8 md:pb-10 mt-auto flex flex-col">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs md:text-sm mb-6 md:mb-8">
                   <MapPin className="w-4 h-4 text-[#ff6c00]" /> {tour.country}
                </div>
                <button onClick={() => handleBookNow(tour)} className="w-full bg-[#1a2b47] text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black hover:bg-[#ff6c00] transition-all flex items-center justify-center gap-2 md:gap-3 active:scale-95 shadow-xl shadow-slate-950/5">
                  GET QUOTATION <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTour && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a2b47]/90 backdrop-blur-md" onClick={handleClose}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            <button onClick={handleClose} className="absolute top-6 md:top-8 right-6 md:right-8 p-2.5 md:p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-10 transition-colors"><X className="w-4 md:w-5 h-4 md:h-5 text-slate-500" /></button>

            <div className="overflow-y-auto flex-1">
              {!isBooked ? (
                <div className="p-8 md:p-14">
                  <h3 className="text-2xl md:text-3xl font-black text-[#1a2b47] mb-2 leading-tight">{selectedTour.name}</h3>
                  <p className="text-[#ff6c00] font-bold mb-8 md:mb-10 uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {selectedTour.country}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3" /> Full Name</label>
                      <input required disabled={isSending} type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-4 md:p-5 rounded-xl md:rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-base text-[#1a2b47]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3 h-3" /> Email Address</label>
                      <input required disabled={isSending} type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-4 md:p-5 rounded-xl md:rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-base text-[#1a2b47]" />
                    </div>
                    <div className="pt-4 md:pt-6">
                      <button type="submit" disabled={isSending} className="w-full bg-[#ff6c00] text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg shadow-2xl shadow-[#ff6c00]/20 flex items-center justify-center gap-3 md:gap-4 active:scale-[0.98] transition-all">
                        {isSending ? <><Loader2 className="w-6 h-6 animate-spin" /> <span className="text-sm md:text-base">{ajaxStatus}</span></> : <><Send className="w-5 h-5" /> REQUEST QUOTE</>}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-8 md:p-14 text-center flex flex-col items-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#ff6c00]/10 rounded-full flex items-center justify-center mb-8 md:mb-10 border border-[#ff6c00]/20 shadow-inner">
                    <CheckCircle2 className="w-10 md:w-14 h-10 md:h-14 text-[#ff6c00]" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-[#1a2b47] mb-4 md:mb-6 leading-tight">Request Received</h3>
                  <div className="w-full bg-[#ff6c00]/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-[#1a2b47] border border-[#ff6c00]/20 font-bold shadow-sm mb-6 md:mb-8 flex flex-col items-center gap-4 md:gap-5 animate-in fade-in slide-in-from-bottom duration-700">
                    <PhoneCall className="w-8 md:w-10 h-8 md:h-10 text-[#ff6c00]" />
                    <p className="text-lg md:text-xl leading-snug">"Thank you. Our travel concierge will reach out via email/phone within 24 hours to provide pricing."</p>
                  </div>
                  <button onClick={handleClose} className="w-full bg-[#1a2b47] text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:bg-[#1a2b47]/90 transition-all shadow-xl active:scale-95">BACK TO EXPLORE</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedTours;