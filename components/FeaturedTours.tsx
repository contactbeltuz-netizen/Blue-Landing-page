import React, { useState, useEffect } from 'react';
import { Star, MapPin, ArrowUpRight, Flame, Users, X, CheckCircle2, Calendar, Mail, User, Loader2, Send, Plus, Minus, PhoneCall, Globe, CheckCircle, Trees, Phone } from 'lucide-react';
import { generateDreamDestinationImage } from '../services/geminiService';
import { sendInquiry } from '../services/apiService';

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
    availability: 'Tour Coordinator Experts'
  }
];

const FeaturedTours: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<typeof TOURS[0] | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    date: '',
    guests: 2 
  });
  
  const [aiImages, setAiImages] = useState<Record<string, string | null>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const generateTourImage = async (tourId: string, tourName: string, tourCountry: string) => {
    setLoadingImages(prev => ({ ...prev, [tourId]: true }));
    try {
      const prompt = `${tourName} in Sundarbans. Wildlife photography, Royal Bengal Tiger.`;
      const imageUrl = await generateDreamDestinationImage(prompt);
      if (imageUrl) setAiImages(prev => ({ ...prev, [tourId]: imageUrl }));
    } catch (error) { console.error(error); }
    finally { setLoadingImages(prev => ({ ...prev, [tourId]: false })); }
  };

  useEffect(() => { TOURS.forEach(tour => generateTourImage(tour.id, tour.name, tour.country)); }, []);

  const handleBookNow = (tour: typeof TOURS[0]) => {
    setFormData(prev => ({ ...prev, tourName: tour.name }));
    setSelectedTour(tour);
    setIsBooked(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;
    setIsSending(true);
    try {
      const result = await sendInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: 'Tour',
        details: `Specific Tour: ${selectedTour.name}, Travel Date: ${formData.date}, Guests: ${formData.guests}`
      });
      if (result) setIsBooked(true);
    } catch (error) { setIsBooked(true); }
    finally { setIsSending(false); }
  };

  return (
    <section id="destinations" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[#ff6c00] font-bold text-[10px] mb-4 uppercase tracking-[0.4em]"><Trees className="w-4 h-4" />EXCLUSIVE PACKAGES</div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1a2b47]">Roar of the Wild Premium Escapes</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TOURS.map((tour) => (
            <div key={tour.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-slate-100 flex flex-col cursor-pointer" onClick={() => handleBookNow(tour)}>
              <div className="relative overflow-hidden aspect-[4/5] bg-slate-200">
                {loadingImages[tour.id] ? <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-8 h-8 text-[#ff6c00] animate-spin" /></div> : <img src={aiImages[tour.id] || tour.img} alt={tour.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                   <span className="bg-[#ff6c00] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">{tour.tags[0]}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="bg-white/95 backdrop-blur-xl p-4 md:p-5 rounded-[1.5rem] shadow-2xl flex justify-between items-center group-hover:translate-y-0 translate-y-2 transition-all duration-500">
                      <div>
                         <div className="flex items-center gap-1 text-[#ff6c00] font-black text-[10px] mb-1"><Star className="w-3.5 h-3.5 fill-current" /> {tour.rating}</div>
                         <h3 className="text-lg md:text-xl font-bold text-[#1a2b47] tracking-tight">{tour.name}</h3>
                      </div>
                   </div>
                </div>
              </div>
              <div className="p-6 md:p-8 pb-8 mt-auto">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs mb-6"><MapPin className="w-4 h-4 text-[#ff6c00]" /> {tour.country}</div>
                <button onClick={(e) => { e.stopPropagation(); handleBookNow(tour); }} className="w-full bg-[#1a2b47] text-white py-4 rounded-xl font-black hover:bg-[#ff6c00] transition-all flex items-center justify-center gap-2 shadow-xl">GET QUOTATION <ArrowUpRight className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTour && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a2b47]/90 backdrop-blur-md" onClick={() => setSelectedTour(null)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            <button onClick={() => setSelectedTour(null)} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-10 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>

            <div className="overflow-y-auto flex-1">
              {!isBooked ? (
                <div className="p-8 md:p-14">
                  <h3 className="text-2xl md:text-3xl font-black text-[#1a2b47] mb-2">{selectedTour.name}</h3>
                  <p className="text-[#ff6c00] font-bold mb-8 uppercase tracking-widest text-[10px]">Expedition Quote Request</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full Name</label>
                        <input required autoComplete="name" type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#ff6c00] uppercase tracking-widest flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> WhatsApp/Mobile</label>
                        <input required inputMode="tel" type="tel" placeholder="+91 00000 00000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#ff6c00]/5 border border-[#ff6c00]/20 p-5 rounded-2xl font-black outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#ff6c00]" /> Email Address</label>
                        <input required autoComplete="email" type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-[#ff6c00]" /> Travel Date</label>
                        <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" />
                      </div>
                    </div>
                    <button type="submit" disabled={isSending} className="w-full bg-[#ff6c00] text-white py-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all uppercase tracking-widest">
                      {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> REQUEST PRICING</>}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-10 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#ff6c00]/10 rounded-full flex items-center justify-center mb-10 border border-[#ff6c00]/20 shadow-inner"><CheckCircle2 className="w-12 h-12 text-[#ff6c00]" /></div>
                  <h3 className="text-4xl font-black text-[#1a2b47] mb-6">Expert Assigned!</h3>
                  <div className="bg-[#ff6c00]/10 p-8 rounded-[2rem] text-[#1a2b47] border border-[#ff6c00]/20 font-bold mb-8 flex flex-col items-center gap-4"><PhoneCall className="w-10 h-10 text-[#ff6c00]" /><p className="text-xl">Check <span className="text-[#ff6c00]">{formData.email}</span> for confirmation.</p></div>
                  <button onClick={() => setSelectedTour(null)} className="w-full bg-[#1a2b47] text-white py-6 rounded-2xl font-black text-xl active:scale-95">CLOSE</button>
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