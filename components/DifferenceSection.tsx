
import React from 'react';
import { Trees, Search, Bird, BookOpen, ShieldCheck } from 'lucide-react';

const DIFFERENCES = [
  {
    icon: <Trees className="w-6 h-6" />,
    text: "Discover Sundarbans as a living ecosystem shaped by history and wildlife — beyond just a tour."
  },
  {
    icon: <Search className="w-6 h-6" />,
    text: "Gain deeper insights into Royal Bengal Tigers and forest life."
  },
  {
    icon: <Bird className="w-6 h-6" />,
    text: "Discover the birdlife and aquatic world of the Biosphere."
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    text: "Explore Sundarbans in a deeper, more informed way."
  }
];

const DifferenceSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative navy circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a2b47]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#ff6c00] font-bold text-[10px] md:text-sm mb-4 uppercase tracking-[0.4em]">
            <ShieldCheck className="w-4 h-4" />
            Why Choose Elegant Tours
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b47] tracking-tight">
            What Makes Us Different?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIFFERENCES.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-[#ff6c00]/10 rounded-2xl flex items-center justify-center text-[#ff6c00] mb-6 group-hover:bg-[#ff6c00] group-hover:text-white transition-colors duration-300 shadow-sm">
                {item.icon}
              </div>
              <p className="text-[#1a2b47] font-bold text-lg leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#1a2b47] to-[#ff6c00] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
