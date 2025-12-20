import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, Sparkles, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';

const TOUR_PACKAGES_DATA = [
  "Day Tours: Nature Express",
  "1 Night 2 Days Expedition",
  "2 Night 3 Days Immersion",
  "Customized Tour Packages"
];

const Hero: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenEnquiry = () => {
    window.dispatchEvent(new CustomEvent('toggle-enquiry', { 
      detail: { packageName: selectedPackage } 
    }));
  };

  return (
    <div className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center z-[30]">
      {/* Background Layer - Contained so the zoom doesn't leak, but parent allows UI overflow */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 animate-subtle-zoom"
          style={{ backgroundImage: "url('https://eleganttours.co.in/wp-content/uploads/2025/12/Sundarbans.png')" }}
        >
          <div className="absolute inset-0 bg-slate-950/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b47] via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pt-32 pb-40 text-center">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-12 shadow-2xl animate-in fade-in slide-in-from-top duration-700">
          <ShieldCheck className="w-4 h-4 text-[#ff6c00]" />
          Trusted by 10K+ Verified Customers
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] font-black text-white mb-10 leading-[1.1] tracking-tighter drop-shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 delay-100 uppercase">
          Experience Sundarbans <br />
          <span className="text-2xl sm:text-4xl lg:text-5xl block mt-4 mb-2 text-white/80 font-bold tracking-normal">like never before!</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6c00] to-orange-400 block mt-4">
            Sundarbans Tour Packages
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto mb-16 text-lg md:text-2xl text-white/90 font-medium tracking-tight px-4 leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          Where History, Wildlife & the Living Biosphere Come Together
        </p>

        {/* High-Conversion Search Bar */}
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-300 relative z-[60]">
          <div className="bg-white p-2 md:p-3 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-stretch gap-2">
            
            <div className="flex-1 relative" ref={suggestionRef}>
              <div 
                className="flex items-center px-6 md:px-10 py-5 md:py-6 gap-5 cursor-pointer hover:bg-slate-50 rounded-3xl md:rounded-l-[3.5rem] h-full transition-all"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <div className={`p-3.5 rounded-2xl ${selectedPackage ? 'bg-[#ff6c00] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Expedition Type</label>
                  <p className={`font-black text-base md:text-xl truncate ${selectedPackage ? 'text-[#1a2b47]' : 'text-slate-300'}`}>
                    {selectedPackage || 'Select Your Journey'}
                  </p>
                </div>
                <ChevronDown className={`text-slate-300 transition-transform shrink-0 ${showSuggestions ? 'rotate-180' : ''}`} />
              </div>

              {/* Custom Dropdown - Very high Z-Index and clear of parent constraints */}
              <div 
                className={`absolute top-[calc(100%+16px)] left-0 w-full bg-white rounded-[2.5rem] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.5)] border border-slate-100 py-4 z-[100] text-left transition-all duration-300 origin-top ${showSuggestions ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}
              >
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {TOUR_PACKAGES_DATA.map(pkg => (
                    <button 
                      key={pkg} 
                      onClick={() => { setSelectedPackage(pkg); setShowSuggestions(false); }} 
                      className="w-full px-10 py-4 hover:bg-slate-50 flex items-center gap-5 transition-all border-b border-slate-50 last:border-0 group"
                    >
                      <div className={`w-3 h-3 rounded-full border-2 transition-all ${selectedPackage === pkg ? 'bg-[#ff6c00] border-[#ff6c00]' : 'border-slate-200 group-hover:border-[#ff6c00]'}`}></div>
                      <span className={`font-black uppercase text-xs tracking-widest transition-colors ${selectedPackage === pkg ? 'text-[#ff6c00]' : 'text-[#1a2b47]'}`}>
                        {pkg}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleOpenEnquiry}
              className="bg-[#ff6c00] text-white px-12 md:px-16 py-6 md:py-0 rounded-3xl md:rounded-[3.5rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-[#e65a00] transition-all shadow-2xl shadow-[#ff6c00]/30 active:scale-95 group uppercase tracking-[0.1em] min-h-[70px]"
            >
              BOOK YOUR ESCAPES
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform text-white/50" />
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/60 text-[10px] font-black uppercase tracking-[0.25em]">
             <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#ff6c00]" /> Verified Tour Coordinators</div>
             <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#ff6c00]" /> 24/7 Concierge Support</div>
             <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#ff6c00]" /> Eco-Certified Expeditions</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 25s infinite alternate ease-in-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff6c00;
        }
      `}</style>
    </div>
  );
};

export default Hero;