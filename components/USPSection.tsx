
import React from 'react';
import { Trees, ShieldCheck, Sparkles, Target, Compass, Camera, Heart } from 'lucide-react';

const USPs = [
  {
    icon: <Trees className="w-8 h-8 text-[#ff6c00]" />,
    title: "Eco-Conscious Travel",
    description: "Explore the Sundarbans Mangrove ecosystem with sustainable practices that protect the habitat of the Royal Bengal Tiger."
  },
  {
    icon: <Compass className="w-8 h-8 text-[#ff6c00]" />,
    title: "Expert Naturalists",
    description: "Every voyage is led by government-approved naturalists with deep knowledge of local flora, fauna, and tiger behavior."
  },
  {
    icon: <Camera className="w-8 h-8 text-[#ff6c00]" />,
    title: "Premium Photo Boats",
    description: "Specially designed low-noise houseboats with panoramic views, perfect for capturing that once-in-a-lifetime wildlife shot."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#ff6c00]" />,
    title: "Safety First",
    description: "Premium safety gear, satellite tracking, and real-time support to ensure your wilderness exploration is secure and comfortable."
  }
];

const USPSection: React.FC = () => {
  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {USPs.map((usp, index) => (
            <div key={index} className="group relative">
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl inline-block group-hover:bg-[#ff6c00]/10 transition-colors duration-300">
                {usp.icon}
              </div>
              <h3 className="text-xl font-black text-[#1a2b47] mb-3 tracking-tight">
                {usp.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {usp.description}
              </p>
              <div className="absolute -bottom-4 left-0 w-0 h-1 bg-[#ff6c00] transition-all duration-300 group-hover:w-12"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-[2.5rem] bg-[#1a2b47] text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           
           <div className="flex items-center gap-6 relative z-10">
              <div className="p-4 bg-white/10 rounded-full">
                <Target className="w-8 h-8 text-[#ff6c00]" />
              </div>
              <div>
                <p className="text-[#ff6c00]/80 text-sm font-black uppercase tracking-widest">Wildlife Sanctuary</p>
                <p className="text-2xl font-black">Trusted by 10,000+ Safarists</p>
              </div>
           </div>

           <div className="h-px w-full md:h-12 md:w-px bg-white/10"></div>

           <button 
              onClick={scrollToDestinations}
              className="bg-[#ff6c00] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#e65a00] transition-all shadow-xl shadow-black/20 relative z-10 active:scale-95"
            >
             BOOK YOUR SAFARI
           </button>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
