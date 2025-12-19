import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ShieldCheck, X, ChevronDown, Plus, Minus, Globe, Trees, Ship, Briefcase, Sparkles, Zap, Wand2, Compass, Camera } from 'lucide-react';

const TOUR_PACKAGES_DATA = [
  { name: "Day Tours: Nature Express", icon: <Trees className="w-3.5 h-3.5" /> },
  { name: "1 Night 2 Days Expedition", icon: <Ship className="w-3.5 h-3.5" /> },
  { name: "2 Night 3 Days Immersion", icon: <Compass className="w-3.5 h-3.5" /> },
  { name: "Customized Package Tours", icon: <Wand2 className="w-3.5 h-3.5" /> },
  { name: "Wildlife Photography Special", icon: <Camera className="w-3.5 h-3.5" /> },
  { name: "Village Heritage Walk", icon: <MapPin className="w-3.5 h-3.5" /> }
];

const TOUR_PACKAGES_NAMES = TOUR_PACKAGES_DATA.map(p => p.name);

const Hero: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [travelers, setTravelers] = useState({ adults: 2, children: 0 });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(TOUR_PACKAGES_NAMES);
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedPackage.trim() === '') {
      setFilteredSuggestions(TOUR_PACKAGES_NAMES);
      return;
    }
    const filtered = TOUR_PACKAGES_NAMES.filter(p => 
      p.toLowerCase().includes(selectedPackage.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [selectedPackage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (travelerRef.current && !travelerRef.current.contains(event.target as Node)) {
        setShowTravelerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedPackage(value);
    setShowSuggestions(false);
  };

  const scrollToPlanner = () => {
    document.getElementById('ai-planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickPick = (pkgName: string) => {
    if (selectedPackage === pkgName) {
      setSelectedPackage('');
    } else {
      setSelectedPackage(pkgName);
    }
    setShowSuggestions(false);
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          dateInputRef.current.showPicker();
        } catch (e) {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const totalTravelers = travelers.adults + travelers.children;

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background with Sundarbans Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 scale-100 overflow-hidden"
        style={{ backgroundImage: "url('https://eleganttours.co.in/wp-content/uploads/2025/12/Sundarbans.png')" }}
      >
        <div className="absolute inset-0 bg-[#1a2b47]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/20 via-transparent to-[#1a2b47]/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 text-center">
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-3xl border border-white/20 text-white px-5 py-2 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-6 md:mb-8 animate-fade-in shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 text-[#ff6c00] animate-pulse" />
          India's Most Trusted Safari Operators
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black text-white mb-6 md:mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
          WILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6c00] via-white to-[#ff6c00]/70">SUNDARBANS.</span>
        </h1>
        
        <div className="max-w-3xl mx-auto mb-10 md:mb-14 space-y-6">
          <p className="text-lg md:text-2xl text-white/90 font-medium tracking-tight px-4 drop-shadow-md">
            Journey into the kingdom where mangroves meet the tide.
          </p>
        </div>

        {/* Smarter, Helpful Booking Engine */}
        <div className="max-w-5xl mx-auto space-y-6 relative z-[60]">
          
          {/* QUICK SUGGESTIONS - ENSURING ALL 6 ARE PRESENT IN A CLEAN ROW WITH ICONS */}
          <div className="flex flex-col items-center gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
            <div className="flex items-center gap-2 opacity-80">
              <Zap className="w-3.5 h-3.5 text-[#ff6c00]" />
              <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em]">Explore Packages</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-5xl px-4">
              {TOUR_PACKAGES_DATA.map((pkg) => {
                const active = selectedPackage === pkg.name;
                return (
                  <button
                    key={pkg.name}
                    onClick={() => handleQuickPick(pkg.name)}
                    className={`group relative overflow-hidden backdrop-blur-md border px-5 py-3 rounded-full text-[10px] md:text-[11px] font-black tracking-wider transition-all duration-300 active:scale-95 flex items-center gap-2.5 ${
                      active 
                        ? 'bg-[#ff6c00] border-[#ff6c00] text-white shadow-xl shadow-[#ff6c00]/30 scale-105 z-10' 
                        : 'bg-white/5 hover:bg-white/15 border-white/10 text-white/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <div className={`${active ? 'text-white' : 'text-[#ff6c00]'} transition-colors group-hover:scale-110 duration-300`}>
                      {pkg.icon}
                    </div>
                    <span className="relative z-10">{pkg.name}</span>
                    {active && (
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite]"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-2xl md:bg-white p-2 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] border border-white/20 relative z-20">
            <div className="flex flex-col lg:flex-row items-stretch">
              
              {/* Package Selector */}
              <div className="flex-[1.5] relative border-b lg:border-b-0 lg:border-r border-slate-100" ref={suggestionRef}>
                <div 
                  className={`flex items-center px-6 py-4 gap-4 group transition-all hover:bg-slate-50 rounded-2xl lg:rounded-l-[2rem] h-full cursor-pointer ${showSuggestions ? 'bg-slate-50' : ''}`}
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${selectedPackage ? 'bg-[#ff6c00] text-white' : 'bg-[#ff6c00]/10 text-[#ff6c00] group-hover:bg-[#ff6c00]/20'}`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="text-left w-full flex flex-col justify-center overflow-hidden">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">I want to experience...</label>
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        value={selectedPackage} 
                        readOnly
                        placeholder="Choose a Package" 
                        className="w-full bg-transparent outline-none text-[#1a2b47] font-black text-base md:text-lg placeholder:text-slate-300 truncate cursor-pointer" 
                      />
                      {selectedPackage ? (
                        <X className="w-4 h-4 text-slate-400 ml-2 hover:text-[#ff6c00] transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedPackage(''); }} />
                      ) : (
                        <ChevronDown className={`w-4 h-4 text-slate-300 ml-2 transition-transform duration-300 ${showSuggestions ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* SUGGESTIONS DROPDOWN */}
                {showSuggestions && (
                  <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-[1.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-slate-200 py-3 z-[150] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="px-5 py-2.5 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/80 flex justify-between items-center mb-1">
                      <span>Available Packages</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#ff6c00]" />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {TOUR_PACKAGES_NAMES.map((suggestion, index) => (
                        <button 
                          key={index} 
                          onClick={() => handleSelect(suggestion)} 
                          className="w-full text-left px-6 py-3.5 hover:bg-[#ff6c00]/5 flex items-center gap-4 group transition-colors"
                        >
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedPackage === suggestion ? 'bg-[#ff6c00] scale-125' : 'bg-slate-200 group-hover:bg-[#ff6c00]/50'}`}></div>
                          <span className={`font-bold text-base ${selectedPackage === suggestion ? 'text-[#ff6c00]' : 'text-[#1a2b47] group-hover:text-[#1a2b47]'}`}>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selector */}
              <div 
                onClick={handleCalendarClick}
                className="flex-1 flex items-center px-6 py-4 gap-4 border-b lg:border-b-0 lg:border-r border-slate-100 group transition-all hover:bg-slate-50 cursor-pointer"
              >
                <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${startDate ? 'bg-[#ff6c00] text-white' : 'bg-[#ff6c00]/10 text-[#ff6c00] group-hover:bg-[#ff6c00]/20'}`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left w-full overflow-hidden">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Preferred Date</label>
                  <input 
                    ref={dateInputRef}
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="w-full bg-transparent outline-none text-[#1a2b47] font-black text-base md:text-lg cursor-pointer" 
                  />
                </div>
              </div>

              {/* Traveler Selector */}
              <div className="flex-1 relative border-b lg:border-b-0 lg:border-r border-slate-100" ref={travelerRef}>
                <div 
                  onClick={() => setShowTravelerDropdown(!showTravelerDropdown)} 
                  className={`flex items-center px-6 py-4 gap-4 group transition-all hover:bg-slate-50 h-full cursor-pointer ${showTravelerDropdown ? 'bg-slate-50' : ''}`}
                >
                  <div className="bg-[#ff6c00]/10 p-2.5 rounded-xl group-hover:bg-[#ff6c00]/20 transition-colors shrink-0 text-[#ff6c00]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-left w-full overflow-hidden">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Explorers</label>
                    <p className="text-[#1a2b47] font-black text-base md:text-lg truncate">{totalTravelers} {totalTravelers === 1 ? 'Guest' : 'Guests'}</p>
                  </div>
                </div>
                
                {/* TRAVELER DROPDOWN */}
                {showTravelerDropdown && (
                  <div className="absolute top-[calc(100%+12px)] left-0 w-full md:w-72 bg-white rounded-[1.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-slate-200 p-6 z-[150] animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-black text-[#1a2b47] text-sm">Adults</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-tight">Ages 12+</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button onClick={(e) => { e.stopPropagation(); setTravelers(t => ({...t, adults: Math.max(1, t.adults - 1)})); }} className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="font-black text-[#1a2b47] min-w-[16px] text-center text-lg">{travelers.adults}</span>
                          <button onClick={(e) => { e.stopPropagation(); setTravelers(t => ({...t, adults: t.adults + 1})); }} className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-black text-[#1a2b47] text-sm">Children</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-tight">Ages 2-12</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button onClick={(e) => { e.stopPropagation(); setTravelers(t => ({...t, children: Math.max(0, t.children - 1)})); }} className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="font-black text-[#1a2b47] min-w-[16px] text-center text-lg">{travelers.children}</span>
                          <button onClick={(e) => { e.stopPropagation(); setTravelers(t => ({...t, children: t.children + 1})); }} className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action Area */}
              <div className="p-2 lg:p-1.5 flex flex-col md:flex-row gap-2 lg:gap-1.5">
                <button className="flex-1 lg:flex-none bg-[#ff6c00] hover:bg-[#e65a00] text-white px-10 py-4 lg:py-0 h-full rounded-2xl lg:rounded-r-[2rem] font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95 group shadow-lg shadow-[#ff6c00]/20">
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="tracking-widest uppercase">Explore</span>
                </button>
                <button 
                  onClick={scrollToPlanner}
                  className="bg-[#1a2b47] hover:bg-slate-900 text-white p-4 lg:px-4 lg:py-0 h-full rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-lg shadow-slate-900/10"
                  title="Plan with AI"
                >
                  <Wand2 className="w-4 h-4 text-[#ff6c00] group-hover:rotate-12 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col items-center gap-3 animate-bounce opacity-40">
           <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Hero;