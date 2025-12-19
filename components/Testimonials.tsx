
import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    location: "London, UK",
    text: "The AI Planner suggested a hidden cove in Greece I would have never found. The '100% guarantee' gave me peace of mind, but the trip exceeded all expectations.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Marcus Chen",
    location: "Singapore",
    text: "A truly world-class experience. The bespoke itinerary felt like it was written by a local expert. Highly recommend Wanderlust for premium travelers.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    text: "Professional, sleek, and reliable. I used the Visualizer to plan my honeymoon, and the actual villa looked exactly like the AI render. Incredible!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  }
];

const Testimonials: React.FC = () => {
  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
          <Star className="w-4 h-4 fill-current" />
          Verified Experiences
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16 tracking-tight">
          Don't just take our word for it.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-left relative group hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
               <Quote className="absolute top-10 right-10 w-12 h-12 text-indigo-100 group-hover:text-indigo-200 transition-colors" />
               
               <div className="flex gap-1 mb-6">
                 {[...Array(review.rating)].map((_, j) => (
                   <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                 ))}
               </div>

               <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8 relative z-10">
                 "{review.text}"
               </p>

               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{review.name}</h4>
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Traveler
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-[3rem] bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="flex -space-x-4">
                 {REVIEWS.map((r, i) => (
                   <img key={i} src={r.avatar} className="w-12 h-12 rounded-full border-4 border-slate-950" />
                 ))}
                 <div className="w-12 h-12 rounded-full border-4 border-slate-950 bg-indigo-600 flex items-center justify-center font-bold text-xs">+12k</div>
              </div>
              <div>
                 <p className="text-2xl font-black">Ready to join them?</p>
                 <p className="text-slate-400 font-medium">Over 50,000 itineraries generated this month alone.</p>
              </div>
           </div>
           <button 
              onClick={scrollToDestinations}
              className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
            >
             BOOK YOUR ADVENTURE
           </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
