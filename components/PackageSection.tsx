import React, { useState, useEffect } from 'react';
import { Star, ArrowUpRight, Clock, Calendar, Sparkles, Moon, Loader2, Trees, ShieldCheck, Ship, Camera, Map, Waves, MapPin } from 'lucide-react';
import { generateDreamDestinationImage } from '../services/geminiService';

const PACKAGE_DATA = [
  { 
    id: 'pkg-1', 
    name: 'Day Tours: Nature Express', 
    duration: '6:00 AM - 6:00 PM', 
    rating: 4.7, 
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/photo-15516155771c7e180a77ac.webp', 
    tag: 'Popular', 
    highlights: ['Sajnekhali Watch Tower', 'Mangrove Interpretation Centre', 'Breakfast & Lunch on Boat'],
    icon: <Clock className="w-5 h-5" />
  },
  { 
    id: 'pkg-2', 
    name: '1 Night 2 Days Expedition', 
    duration: 'Overnight Adventure', 
    rating: 4.9, 
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/IMG20241109135240-scaled.jpg', 
    tag: 'Best Seller', 
    highlights: ['Sudhanyakhali Tiger Reserve', 'Dobanki Canopy Walk', 'Traditional Village Experience'],
    icon: <Moon className="w-5 h-5" />
  },
  { 
    id: 'pkg-3', 
    name: '2 Night 3 Days Immersion', 
    duration: 'The Full Experience', 
    rating: 5.0, 
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/unnamed-1.webp', 
    tag: 'Elite Choice', 
    highlights: ['Deep Jungle Navigation', 'Evening Cultural Performance'],
    icon: <Calendar className="w-5 h-5" />
  },
  { 
    id: 'pkg-6', 
    name: 'Customized Tour Packages', 
    duration: 'Flexible Duration', 
    rating: 4.9, 
    img: 'https://eleganttours.co.in/wp-content/uploads/2025/12/premium_photo-1686310335921-38acc0679321.webp', 
    tag: 'Tailor Made', 
    highlights: ['Exclusive Private Boat', 'Custom Itinerary Design'],
    icon: <Sparkles className="w-5 h-5" />
  }
];

const PackageSection: React.FC = () => {
  const [aiImages, setAiImages] = useState<Record<string, string | null>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const generatePkgImage = async (pkg: typeof PACKAGE_DATA[0]) => {
    setLoadingImages(prev => ({ ...prev, [pkg.id]: true }));
    try {
      const prompt = `${pkg.name} in Sundarbans. High-end boat safari, Royal Bengal Tiger landscape.`;
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
    window.dispatchEvent(new CustomEvent('select-package', { 
      detail: { packageName: pkg.name } 
    }));
  };

  return (
    <section id="packages" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-[#ff6c00]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-[#1a2b47]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 bg-slate-50 border border-slate-100 text-[#ff6c00] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-sm">
              <Ship className="w-4 h-4" />
              Signature Voyages
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-[#1a2b47] tracking-tighter leading-[0.9]">
              Curated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6c00] to-orange-400">Expeditions.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-sm border-l-4 border-[#ff6c00] pl-6 py-2">
            Each package is a masterclass in wildlife exploration, balancing raw adventure with refined hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {PACKAGE_DATA.map((pkg) => (
            <div 
              key={pkg.id} 
              onClick={() => handleBookNow(pkg)}
              className="group relative bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(26,43,71,0.15)] transition-all duration-700 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-[260px] md:h-[320px] overflow-hidden bg-slate-100">
                {loadingImages[pkg.id] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-8 h-8 text-[#ff6c00] animate-spin" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Generating Vision...</span>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={aiImages[pkg.id] || pkg.img} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                
                {/* Top Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-[#ff6c00] text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
                    {pkg.tag}
                  </span>
                  <div className="bg-white/90 backdrop-blur-md text-[#1a2b47] px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                    <div className="text-[#ff6c00]">{pkg.icon}</div>
                    <span className="text-[9px] font-black uppercase tracking-wider">{pkg.duration}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-xl flex flex-col items-center justify-center min-w-[40px]">
                  <Star className="w-3 h-3 text-[#ff6c00] fill-current mb-0.5" />
                  <span className="text-[10px] font-black text-[#1a2b47]">{pkg.rating}</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a2b47] tracking-tight group-hover:text-[#ff6c00] transition-colors duration-300">
                    {pkg.name}
                  </h3>
                </div>

                {/* Highlights List */}
                <div className="grid grid-cols-1 gap-2.5 mb-8">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-500 group-hover:text-slate-700 transition-colors">
                      <div className="w-1 h-1 rounded-full bg-[#ff6c00]/30 group-hover:bg-[#ff6c00] transition-colors"></div>
                      <span className="text-sm font-bold tracking-tight">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Inclusive</p>
                      <p className="text-[10px] font-bold text-[#1a2b47]">Secure</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleBookNow(pkg); }}
                    className="bg-[#1a2b47] text-white h-12 md:h-14 px-6 md:px-8 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#ff6c00] transition-all duration-300 shadow-xl active:scale-95 group/btn"
                  >
                    SELECT
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Section Footer */}
        <div className="mt-20 p-10 md:p-14 rounded-[4rem] bg-[#1a2b47] text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Waves className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rotate-12" />
          </div>
          
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
              <Map className="w-10 h-10 text-[#ff6c00]" />
            </div>
            <div>
              <p className="text-[#ff6c00] font-black text-xs uppercase tracking-[0.3em] mb-2">Unmatched Customization</p>
              <h4 className="text-3xl font-black tracking-tighter">Need a fully custom route?</h4>
            </div>
          </div>

          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-enquiry'))}
            className="group bg-white text-[#1a2b47] px-12 py-5 rounded-2xl font-black text-lg hover:bg-[#ff6c00] hover:text-white transition-all shadow-xl active:scale-95 relative z-10 uppercase tracking-widest"
          >
            CHAT WITH EXPERT
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;