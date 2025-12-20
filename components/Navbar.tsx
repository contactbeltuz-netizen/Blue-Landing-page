import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, PhoneCall } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Persistent Utility Bar for Contact Info */}
      <div className={`transition-all duration-500 bg-[#1a2b47] border-b border-white/5 py-2 ${isScrolled ? 'opacity-0 h-0 -translate-y-full overflow-hidden' : 'opacity-100 h-auto'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
            <div className="flex items-center gap-6">
              <a href="mailto:info@eleganttours.co.in" className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-white/70 hover:text-[#ff6c00] uppercase tracking-[0.2em] transition-colors">
                <Mail className="w-3 h-3 text-[#ff6c00]" />
                info@eleganttours.co.in
              </a>
            </div>
            <div className="flex items-center gap-4 md:gap-8">
              <a href="tel:+919903292946" className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-white/70 hover:text-[#ff6c00] uppercase tracking-[0.2em] transition-colors">
                <Phone className="w-3 h-3 text-[#ff6c00]" />
                +91 99032 92946
              </a>
              <div className="hidden md:block w-px h-3 bg-white/10"></div>
              <a href="tel:+919831221626" className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-white/70 hover:text-[#ff6c00] uppercase tracking-[0.2em] transition-colors">
                <PhoneCall className="w-3 h-3 text-[#ff6c00]" />
                +91 98312 21626
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(26,43,71,0.1)] py-3' : 'bg-transparent py-4'}`}>
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              <button 
                onClick={() => scrollToSection('packages')} 
                className={`font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:-translate-y-0.5 ${isScrolled ? 'text-[#1a2b47]/60 hover:text-[#ff6c00]' : 'text-white/80 hover:text-[#ff6c00]'}`}
              >
                Tour Packages
              </button>
              
              <div className={`flex items-center gap-8 border-l pl-10 ${isScrolled ? 'border-slate-200' : 'border-white/15'}`}>
                {/* Compact Scrolled State Contacts */}
                {isScrolled && (
                  <div className="flex flex-col items-end gap-1">
                    <a href="tel:+919903292946" className="flex items-center gap-2 font-black text-[11px] text-[#1a2b47] hover:text-[#ff6c00] transition-colors">
                      <Phone className="w-3 h-3 text-[#ff6c00]" />
                      +91 99032 92946
                    </a>
                    <a href="mailto:info@eleganttours.co.in" className="flex items-center gap-2 font-black text-[10px] text-slate-400 hover:text-[#ff6c00] transition-colors">
                      <Mail className="w-3 h-3 text-[#ff6c00]" />
                      info@eleganttours.co.in
                    </a>
                  </div>
                )}
                
                <button 
                  onClick={openEnquiry}
                  className="bg-[#ff6c00] hover:bg-[#1a2b47] text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#ff6c00]/20 transition-all active:scale-95"
                >
                  BOOK NOW
                </button>
              </div>
            </div>

            {/* Mobile Header Icons */}
            <div className="flex items-center gap-4 lg:hidden">
              <div className="flex flex-col items-end gap-1 mr-2">
                 <a href="tel:+919903292946" className={`flex items-center gap-1.5 text-[10px] font-black tracking-tighter ${isScrolled ? 'text-[#ff6c00]' : 'text-white'}`}>
                   <Phone className="w-3 h-3" />
                   +91 99032 92946
                 </a>
                 <a href="mailto:info@eleganttours.co.in" className={`flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest ${isScrolled ? 'text-slate-400' : 'text-white/60'}`}>
                   <Mail className="w-2.5 h-2.5" />
                   info@eleganttours.co.in
                 </a>
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isScrolled ? 'text-[#1a2b47]' : 'text-white'}>
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-2xl fixed inset-x-0 top-full p-8 flex flex-col gap-8 animate-in slide-in-from-top duration-500 rounded-b-[3rem] border-t border-slate-100 max-h-[85vh] overflow-y-auto">
            <button onClick={() => scrollToSection('packages')} className="text-left text-2xl font-black text-[#1a2b47] flex items-center justify-between group">
              Tour Packages <span className="text-[#ff6c00]">→</span>
            </button>
            
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 space-y-6">
               <div>
                 <div className="flex flex-col gap-4">
                   <a href="tel:+919903292946" className="text-2xl font-black text-[#1a2b47] tracking-tighter flex items-center gap-4 hover:text-[#ff6c00] transition-colors">
                     <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#ff6c00]">
                       <Phone className="w-5 h-5" />
                     </div>
                     +91 99032 92946
                   </a>
                   <a href="tel:+919831221626" className="text-2xl font-black text-[#1a2b47] tracking-tighter flex items-center gap-4 hover:text-[#ff6c00] transition-colors">
                     <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#ff6c00]">
                       <PhoneCall className="w-5 h-5" />
                     </div>
                     +91 98312 21626
                   </a>
                 </div>
               </div>
               
               <div className="pt-6 border-t border-slate-200">
                  <a href="mailto:info@eleganttours.co.in" className="flex items-center gap-4 text-base font-black text-[#1a2b47] uppercase tracking-wider hover:text-[#ff6c00] transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#ff6c00]">
                      <Mail className="w-5 h-5" />
                    </div>
                    info@eleganttours.co.in
                  </a>
               </div>
            </div>

            <button 
              onClick={openEnquiry}
              className="bg-[#ff6c00] text-white w-full py-6 rounded-2xl font-black text-lg shadow-2xl shadow-[#ff6c00]/30 active:scale-95 uppercase tracking-widest"
            >
              START BOOKING
            </button>

            <div className="flex justify-center gap-6 pt-4">
               <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Available 24/7</span>
               <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">WhatsApp Support</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
