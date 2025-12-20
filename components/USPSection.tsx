import React from 'react';
import { Trees, ShieldCheck, Target, Compass, Ship } from 'lucide-react';

const USPs = [
  {
    icon: <Trees className="w-8 h-8 text-[#ff6c00]" />,
    title: "Eco-Conscious Travel",
    description: "Explore the Sundarbans Mangrove ecosystem with sustainable practices that protect the habitat of the Royal Bengal Tiger."
  },
  {
    icon: <Compass className="w-8 h-8 text-[#ff6c00]" />,
    title: "Tour Experts",
    description: "Every voyage is led by government-approved Tour Experts with deep knowledge of local flora, fauna, and tiger behavior."
  },
  {
    icon: <Ship className="w-8 h-8 text-[#ff6c00]" />,
    title: "Tourist Boat",
    description: "Enjoy a scenic cruise through the waterways"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#ff6c00]" />,
    title: "Safety Standard",
    description: "Premium safety gear, satellite tracking, and real-time support to ensure your wilderness exploration is secure and comfortable."
  }
];

const USPSection: React.FC = () => {
  const handleOpenEnquiry = () => {
    window.dispatchEvent(new CustomEvent('toggle-enquiry'));
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {USPs.map((usp, index) => (
            <div key={index} className="group relative">
              <div className="mb-8 p-5 bg-slate-50 rounded-2xl inline-block group-hover:bg-[#ff6c00]/10 transition-all duration-500 group-hover:-translate-y-1">
                {usp.icon}
              </div>
              <h3 className="text-xl font-black text-[#1a2b47] mb-4 tracking-tight">
                {usp.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm">
                {usp.description}
              </p>
              <div className="absolute -bottom-4 left-0 w-0 h-1 bg-[#ff6c00] transition-all duration-500 group-hover:w-16"></div>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-12 rounded-[3rem] bg-[#1a2b47] text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(26,43,71,0.4)]">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
           
           <div className="flex items-center gap-8 relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10">
                <Target className="w-10 h-10 text-[#ff6c00]" />
              </div>
              <div>
                <p className="text-[#ff6c00] text-[10px] font-black uppercase tracking-[0.4em] mb-2">Signature Experience</p>
                <p className="text-2xl md:text-3xl font-black tracking-tighter">Trusted by 10K+ Verified Customers</p>
              </div>
           </div>

           <button 
              onClick={handleOpenEnquiry}
              className="w-full md:w-auto bg-[#ff6c00] text-white px-12 py-5 rounded-2xl font-black hover:bg-white hover:text-[#1a2b47] transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm relative z-10"
            >
             BOOK YOUR ESCAPES
           </button>
        </div>
      </div>
    </section>
  );
};

export default USPSection;