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
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const openEnquiry = () => {
    window.dispatchEvent(new CustomEvent('toggle-enquiry'));
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(26,43,71,0.1)] py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://eleganttours.co.in/wp-content/uploads/2025/12/Untitled-design-28.png" 
              alt="Elegant Tours Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col leading-none">
              <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-[#1a2b47]' : 'text-white'}`}>ELEGANT</span>
              <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-[#ff6c00]`}>TOURS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button 
              onClick={() => scrollToSection('packages')} 
              className={`font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:-translate-y-0.5 ${isScrolled ? 'text-[#1a2b47]/60 hover:text-[#ff6c00]' : 'text-white/80 hover:text-[#ff6c00]'}`}
            >
              Tour Packages
            </button>
            <button 
              onClick={() => scrollToSection('ai-planner')} 
              className={`font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:-translate-y-0.5 ${isScrolled ? 'text-[#1a2b47]/60 hover:text-[#ff6c00]' : 'text-white/80 hover:text-[#ff6c00]'}`}
            >
              AI Itinerary
            </button>
            
            <div className={`flex items-center gap-8 border-l pl-10 ${isScrolled ? 'border-slate-200' : 'border-white/15'}`}>
               <div className={`flex flex-col items-end ${isScrolled ? 'text-slate-400' : 'text-white/40'}`}>
                 <span className="text-[8px] font-black uppercase tracking-[0.3em] mb-1">Expert Concierge</span>
                 <a href="tel:+919903292946" className={`font-black text-lg md:text-xl tracking-tight transition-colors ${isScrolled ? 'text-[#1a2b47] hover:text-[#ff6c00]' : 'text-white hover:text-[#ff6c00]'}`}>+91 99032 92946</a>
               </div>
               <button 
                 onClick={openEnquiry}
                 className="bg-[#ff6c00] hover:bg-[#1a2b47] text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#ff6c00]/20 transition-all active:scale-95"
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-2xl fixed inset-x-0 top-full p-8 flex flex-col gap-8 animate-in slide-in-from-top duration-500 rounded-b-[3rem] border-t border-slate-50">
          <button onClick={() => scrollToSection('packages')} className="text-left text-2xl font-black text-[#1a2b47] flex items-center justify-between group">
            Packages <span className="text-[#ff6c00] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
          <button onClick={() => scrollToSection('ai-planner')} className="text-left text-2xl font-black text-[#1a2b47] flex items-center justify-between group">
            AI Designer <span className="text-[#ff6c00] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Instant Sighting Forecast</p>
             <p className="text-3xl font-black text-[#ff6c00] tracking-tighter">+91 99032 92946</p>
          </div>
          <button 
            onClick={openEnquiry}
            className="bg-[#ff6c00] text-white w-full py-6 rounded-2xl font-black text-lg shadow-2xl shadow-[#ff6c00]/30 active:scale-95 uppercase tracking-widest"
          >
            START BOOKING
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;