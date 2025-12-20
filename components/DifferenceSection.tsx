import React from 'react';
import { Trees, Search, Bird, BookOpen, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const DIFFERENCES = [
  {
    icon: <Trees className="w-8 h-8" />,
    title: "Living Ecosystem",
    text: "Discover Sundarbans as a living ecosystem shaped by history and wildlife — beyond just a tour."
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Tiger Insights",
    text: "Gain deeper insights into Royal Bengal Tigers and forest life through our expert naturalist network."
  },
  {
    icon: <Bird className="w-8 h-8" />,
    title: "Avian Wonders",
    text: "Discover the hidden birdlife and aquatic secrets of the UNESCO Biosphere with specialized gear."
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Deep Learning",
    text: "Explore the mangroves in a deeper, more informed way with our signature education-first approach."
  }
];

const DifferenceSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a2b47]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff6c00]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header aligned for consistency with WhyChooseUs and PackageSection */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 bg-slate-50 border border-slate-100 text-[#ff6c00] px-5 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 md:mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              The Elegant Distinction
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-[#1a2b47] tracking-tighter leading-tight">
              What Makes Us <br className="hidden md:block" /> <span className="text-[#ff6c00]">Different?</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-base md:text-lg max-w-sm border-l-4 border-[#ff6c00] pl-6 py-2">
            At Elegant Tours, we don’t just offer tours — we curate immersive Sundarbans experiences rooted in conservation values and deep local knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {DIFFERENCES.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-50 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-sm transition-all duration-700 hover:bg-[#1a2b47] hover:scale-[1.05] hover:shadow-[0_40px_80px_-20px_rgba(26,43,71,0.4)] flex flex-col items-start overflow-hidden"
            >
              {/* Animated Accent Glow on Hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6c00]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Icon Container */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-[#ff6c00] mb-6 md:mb-8 group-hover:bg-[#ff6c00] group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 shadow-sm group-hover:shadow-[0_0_30px_rgba(255,108,0,0.5)]">
                {item.icon}
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
              </div>

              {/* Text content with color transition */}
              <h3 className="relative text-xl md:text-2xl font-black text-[#1a2b47] group-hover:text-white mb-3 md:mb-4 transition-colors duration-500 uppercase tracking-tighter">
                {item.title}
              </h3>
              <p className="relative text-sm md:text-base text-slate-500 group-hover:text-slate-300 font-bold leading-relaxed transition-colors duration-500">
                {item.text}
              </p>

              {/* Bottom decorative interactive element */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                 <Zap className="w-5 h-5 text-[#ff6c00]" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section - Unified Style */}
        <div className="mt-20 md:mt-24 flex flex-col items-center">
          <div className="flex items-center gap-6 group cursor-default">
            <span className="h-px w-16 md:w-20 bg-slate-200 transition-all duration-500 group-hover:w-28 group-hover:bg-[#ff6c00]/30"></span>
            <span className="text-[10px] md:text-[11px] font-black text-[#1a2b47] uppercase tracking-[0.7em] transition-colors group-hover:text-[#ff6c00]">
              Beyond Expectations
            </span>
            <span className="h-px w-16 md:w-20 bg-slate-200 transition-all duration-500 group-hover:w-28 group-hover:bg-[#ff6c00]/30"></span>
          </div>
          <div className="mt-6 md:mt-8 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === 2 ? 'scale-150 bg-[#ff6c00]' : 'bg-slate-200'}`}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;