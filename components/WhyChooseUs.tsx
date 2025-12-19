import React from 'react';
import { HeartHandshake, Utensils, ShieldCheck, Leaf, CheckCircle2 } from 'lucide-react';

const REASONS = [
  {
    icon: <HeartHandshake className="w-10 h-10" />,
    title: "Personalized Care",
    description: "We strictly limit group sizes to ensure you aren't just a number. Our guides adapt the itinerary to your pace and interests."
  },
  {
    icon: <Utensils className="w-10 h-10" />,
    title: "Culinary Delight",
    description: "Savor hygienic, home-cooked Bengali cuisine prepared fresh on board using organic ingredients sourced from local villages."
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "Safety First",
    description: "Travel with peace of mind. Our government-registered boats are equipped with life jackets, first aid, and experienced crews."
  },
  {
    icon: <Leaf className="w-10 h-10" />,
    title: "Respect for Nature",
    description: "We practice responsible tourism with a strict no-plastic and low-noise policy to protect the delicate mangrove ecosystem."
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#ff6c00]/10 px-4 py-2 rounded-full text-[#ff6c00] font-black text-[10px] md:text-xs mb-4 md:mb-6 uppercase tracking-[0.3em]">
              <CheckCircle2 className="w-4 h-4" />
              Our Excellence
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-[#1a2b47] leading-tight tracking-tighter">
              Why Travelers <br className="hidden md:block" /> Choose Elegant?
            </h2>
          </div>
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-sm border-l-4 border-[#ff6c00] pl-6 py-2">
            Every detail of your Sundarbans journey is crafted with precision, safety, and a deep love for the wilderness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {REASONS.map((reason, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-50 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] transition-all duration-500 hover:bg-[#1a2b47] hover:shadow-2xl hover:-translate-y-2 flex flex-col items-start"
            >
              <div className="mb-6 md:mb-8 p-4 bg-white rounded-2xl text-[#ff6c00] group-hover:bg-[#ff6c00] group-hover:text-white transition-all duration-500 shadow-sm">
                {reason.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#1a2b47] group-hover:text-white mb-3 md:mb-4 transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm md:text-base text-slate-500 group-hover:text-slate-300 font-medium leading-relaxed transition-colors">
                {reason.description}
              </p>
              
              {/* Subtle hover accent */}
              <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[#ff6c00] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;