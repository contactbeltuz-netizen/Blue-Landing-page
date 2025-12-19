import React from 'react';
import { MessageSquare, PhoneCall, Zap } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const openEnquiry = () => {
    window.dispatchEvent(new CustomEvent('toggle-enquiry'));
  };

  return (
    <div className="fixed right-4 md:right-8 bottom-8 z-[150] flex flex-col md:flex-row gap-4 items-end pointer-events-none">
      {/* Background Glows for the group - subtle corner glow */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff6c00]/10 blur-[60px] pointer-events-none rounded-full"></div>

      {/* Quick Access Info Badge - hidden on small mobile, visible on desktop inline with buttons */}
      <div className="hidden md:flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none lg:flex self-center mr-2">
         <div className="bg-[#1a2b47]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 shadow-2xl">
            <Zap className="w-3 h-3 text-[#ff6c00]" />
            <span className="text-[8px] font-black text-white/70 uppercase tracking-widest">Instant Expert Help</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
        {/* Enquire Now Button */}
        <div className="relative group pointer-events-auto">
          <div className="absolute inset-0 bg-[#ff6c00] rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          <button 
            onClick={openEnquiry}
            className="relative flex items-center gap-0 group-hover:gap-5 bg-[#1a2b47] hover:bg-[#ff6c00] text-white p-4 md:p-5 rounded-full shadow-[0_20px_50px_-10px_rgba(26,43,71,0.5)] group-hover:shadow-[#ff6c00]/40 transition-all duration-500 active:scale-90 border border-white/10"
          >
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6c00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6c00]"></span>
              </span>
            </div>
            
            <div className="max-w-0 overflow-hidden group-hover:max-w-[180px] transition-all duration-500 ease-in-out">
              <span className="font-black text-xs uppercase tracking-[0.25em] whitespace-nowrap pr-3">
                Enquire
              </span>
            </div>
          </button>
        </div>

        {/* WhatsApp Link */}
        <div className="relative group pointer-events-auto">
          <div className="absolute inset-0 bg-[#25D366] rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          <a 
            href="https://wa.me/919903292946" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative flex items-center gap-0 group-hover:gap-5 bg-white/15 backdrop-blur-2xl hover:bg-[#25D366] text-[#25D366] hover:text-white p-4 md:p-5 rounded-full shadow-2xl transition-all duration-500 active:scale-90 border border-[#25D366]/40 hover:border-white/20"
          >
            <div className="flex items-center justify-center">
              <PhoneCall className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            
            <div className="max-w-0 overflow-hidden group-hover:max-w-[180px] transition-all duration-500 ease-in-out">
              <span className="font-black text-xs uppercase tracking-[0.25em] whitespace-nowrap pr-3">
                WhatsApp
              </span>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float-cta {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .fixed.right-4.md\\:right-8.bottom-8 {
          animation: float-cta 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default StickyCTA;