import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Camera, Trees, Info } from 'lucide-react';

const WILDLIFE = [
  {
    name: "Royal Bengal Tiger",
    category: "The Apex Predator",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Tigerjpg.jpg",
    position: "object-cover object-center",
    description: "The soul of Sundarbans. These tigers are unique for being the only ones in the world that inhabit mangrove forests and are excellent swimmers."
  },
  {
    name: "Saltwater Crocodile",
    category: "Aquatic Giants",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Saltwater-crocodile.webp",
    position: "object-cover object-center",
    description: "Lurking in the brackish waters, these prehistoric reptiles are a common sight during low tide safaris."
  },
  {
    name: "Spotted Deer",
    category: "Gentle Inhabitants",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Spotted-Deer.webp",
    position: "object-cover object-top", 
    description: "Often seen in groups near the watchtowers, they share a unique symbiotic relationship with the Macaque monkeys."
  },
  {
    name: "Lesser Whistling Duck",
    category: "Avian Wonders",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Lesser-Whistling-Duck.jpg",
    position: "object-cover object-top", 
    description: "Sundarbans is a paradise for birdwatchers with over 248 species, including rare kingfishers and raptors."
  }
];

const WildlifeSlider: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = () => setActive((prev) => (prev + 1) % WILDLIFE.length);
  const prev = () => setActive((prev) => (prev - 1 + WILDLIFE.length) % WILDLIFE.length);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(timer);
  }, [active, isPaused]);

  return (
    <section className="py-24 bg-[#1a2b47] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff6c00] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff6c00] rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#ff6c00] font-black text-[10px] mb-4 md:mb-6 uppercase tracking-[0.4em]">
              <Eye className="w-3.5 h-3.5" />
              WILDLIFE SPOTTING
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Fauna of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6c00] to-[#ff6c00]/60">Mangroves</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prev} 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="p-4 md:p-5 rounded-full border border-white/10 bg-white/5 hover:bg-[#ff6c00] hover:border-[#ff6c00] transition-all group active:scale-90"
            >
              <ChevronLeft className="w-5 md:w-6 h-5 md:h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={next} 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="p-4 md:p-5 rounded-full border border-white/10 bg-white/5 hover:bg-[#ff6c00] hover:border-[#ff6c00] transition-all group active:scale-90"
            >
              <ChevronRight className="w-5 md:w-6 h-5 md:h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          className="relative h-[500px] md:h-[600px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {WILDLIFE.map((item, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === active ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'} bg-[#1a2b47]`}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className={`w-full h-full ${item.position} transition-all duration-1000`} 
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-[#1a2b47] via-[#1a2b47]/20 to-transparent`}></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-20 flex flex-col md:flex-row items-end justify-between gap-8 md:gap-10">
                <div className="max-w-2xl animate-in slide-in-from-bottom duration-700">
                  <span className="inline-block bg-[#ff6c00] text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-4 md:mb-6">
                    {item.category}
                  </span>
                  <h3 className="text-3xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tighter">{item.name}</h3>
                  <p className="text-white/70 text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
                
                <div className="hidden md:flex flex-col gap-4 md:gap-6 animate-in slide-in-from-right duration-700">
                   <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-[2rem] flex items-center gap-4">
                      <div className="bg-[#ff6c00] p-2.5 md:p-3 rounded-2xl">
                        <Camera className="w-5 md:w-6 h-5 md:h-6" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-white/50">Best Sighting</p>
                        <p className="font-bold text-sm md:text-base">Winter Safaris</p>
                      </div>
                   </div>
                   <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-[2rem] flex items-center gap-4">
                      <div className="bg-[#ff6c00] p-2.5 md:p-3 rounded-2xl">
                        <Trees className="w-5 md:w-6 h-5 md:h-6" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-white/50">Habitat</p>
                        <p className="font-bold text-sm md:text-base">Deep Mangroves</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Progress indicators */}
          <div className="absolute top-8 md:top-10 right-8 md:right-10 flex flex-col gap-3 z-20">
            {WILDLIFE.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)}
                className={`h-1.5 transition-all duration-500 rounded-full outline-none ${i === active ? 'w-10 md:w-12 bg-[#ff6c00]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 md:mt-16 flex items-center gap-4 bg-white/5 border border-white/10 p-5 md:p-6 rounded-[2rem] max-w-max mx-auto md:mx-0">
          <div className="bg-[#ff6c00]/20 p-2 rounded-lg">
            <Info className="w-5 h-5 text-[#ff6c00]" />
          </div>
          <p className="text-xs md:text-sm font-bold text-white/60">Professional wildlife guides accompany all safaris for safe viewing.</p>
        </div>
      </div>
    </section>
  );
};

export default WildlifeSlider;