import React from 'react';
import { MapPin, Camera, Trees, Compass, Telescope, Ship, Landmark } from 'lucide-react';

const PLACES = [
  {
    title: "Sajnekhali Watch Tower",
    description: "The primary hub for wildlife enthusiasts, featuring a bird sanctuary and crocodile park.",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Sajnekhali-Watch-Tower.jpg",
    icon: <Telescope className="w-5 h-5" />
  },
  {
    title: "Sudhanyakhali Tower",
    description: "The most famous spot for spotting the Royal Bengal Tiger near the sweet water pond.",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Sudhanyakhali-Watch-Tower_0.jpg",
    icon: <Camera className="w-5 h-5" />
  },
  {
    title: "Jatar Deul",
    description: "A majestic 11th-century brick temple standing 98ft tall, a silent sentinel of ancient history.",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Jatar-Deul.jpg",
    icon: <Landmark className="w-5 h-5" />
  },
  {
    title: "Dobanki Canopy Walk",
    description: "Walk 20 feet above ground through the dense canopy for a bird's-eye view of the wilderness.",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/dobanki_watch-tower.jpg",
    icon: <Trees className="w-5 h-5" />
  },
  {
    title: "Netidhopani Ruins",
    description: "Legendary 400-year-old temple ruins linked to the myth of Behula and Lakhindar.",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Netidhopani.jpg",
    icon: <Compass className="w-5 h-5" />
  },
  {
    title: "Bonnie Camp",
    description: "Deep in the south, this remote tower offers the highest vantage point in the entire forest.",
    image: "https://eleganttours.co.in/wp-content/uploads/2025/12/Bnni-Camp-Watch-Tower.webp",
    icon: <MapPin className="w-5 h-5" />
  }
];

const MustVisitPlaces: React.FC = () => {
  return (
    <section id="places" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#ff6c00] font-black text-xs mb-4 uppercase tracking-[0.4em]">
            <MapPin className="w-4 h-4" />
            Heritage & Wilderness
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1a2b47] tracking-tight mb-6">
            Iconic Landmarks
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            From ancient brick temples to high-altitude canopy walks, explore the soul of the world's largest mangrove forest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PLACES.map((place, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl border border-slate-100"
            >
              <div className="relative h-72 overflow-hidden bg-slate-200">
                <img 
                  src={place.image} 
                  alt={place.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b47]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl text-[#ff6c00] shadow-xl z-10">
                  {place.icon}
                </div>
              </div>
              
              <div className="p-8 md:p-10 flex flex-col h-full">
                <h3 className="text-2xl font-black text-[#1a2b47] mb-4 group-hover:text-[#ff6c00] transition-colors">
                  {place.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                  {place.description}
                </p>
                <div className="h-1 w-0 bg-[#ff6c00] transition-all duration-500 group-hover:w-full rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MustVisitPlaces;