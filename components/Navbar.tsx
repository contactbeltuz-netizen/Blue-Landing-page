
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://eleganttours.co.in/wp-content/uploads/2025/12/Untitled-design-28.png" 
              alt="Elegant Tours Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className={`text-xl md:text-2xl font-black tracking-tighter ${isScrolled ? 'text-[#1a2b47]' : 'text-white'}`}>ELEGANT</span>
              <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.4em] ${isScrolled ? 'text-[#ff6c00]' : 'text-[#ff6c00]'}`}>TOURS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('destinations')} 
              className={`font-bold text-sm uppercase tracking-widest transition-colors ${isScrolled ? 'text-[#1a2b47]/70 hover:text-[#ff6c00]' : 'text-white/90 hover:text-[#ff6c00]'}`}
            >
              Tours
            </button>
            <button 
              onClick={() => scrollToSection('ai-planner')} 
              className={`font-bold text-sm uppercase tracking-widest transition-colors ${isScrolled ? 'text-[#1a2b47]/70 hover:text-[#ff6c00]' : 'text-white/90 hover:text-[#ff6c00]'}`}
            >
              Itinerary Planner
            </button>
            
            <div className="flex items-center gap-4 border-l border-slate-300/30 pl-8">
               <div className={`flex flex-col items-end ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}>
                 <span className="text-[10px] font-black uppercase tracking-tighter">Talk to an expert</span>
                 <a href="tel:+919876543210" className={`font-black text-lg ${isScrolled ? 'text-[#1a2b47]' : 'text-white'}`}>+91-ELEGANT</a>
               </div>
               <button 
                 onClick={() => scrollToSection('destinations')}
                 className="bg-[#ff6c00] hover:bg-[#e65a00] text-white px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-[#ff6c00]/30 transition-all active:scale-95"
               >
                 BOOK NOW
               </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isScrolled ? 'text-[#1a2b47]' : 'text-white'}>
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-2xl absolute top-full left-0 right-0 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <button onClick={() => scrollToSection('destinations')} className="text-left text-xl font-black text-[#1a2b47] border-b border-slate-100 pb-4">Destinations</button>
          <button onClick={() => scrollToSection('ai-planner')} className="text-left text-xl font-black text-[#1a2b47] border-b border-slate-100 pb-4">AI Itinerary</button>
          <div className="bg-slate-50 p-6 rounded-2xl">
             <p className="text-xs font-bold text-slate-400 uppercase mb-2">Customer Support 24/7</p>
             <p className="text-2xl font-black text-[#ff6c00]">+91-ELEGANT</p>
          </div>
          <button 
            onClick={() => scrollToSection('destinations')}
            className="bg-[#ff6c00] text-white w-full py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#ff6c00]/20"
          >
            START BOOKING
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
