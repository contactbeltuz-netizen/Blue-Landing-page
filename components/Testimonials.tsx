import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ArrowRight, Zap, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: "Manish Kundu",
    text: "The coordination was very professional. The houseboat was maintained well and the crew was attentive to our needs throughout the expedition. Truly a 5-star experience in the wild.",
    rating: 5.0,
    tag: "Verified Explorer"
  },
  {
    name: "Supriyo Ghosh",
    text: "A well-managed tour. The itinerary was followed strictly and our local guide had impressive knowledge of the mangrove tracks. Highly recommend for bird watchers.",
    rating: 4.8,
    tag: "Photography Enthusiast"
  },
  {
    name: "Kartik Chandra Das",
    text: "Everything was handled efficiently. The safety measures on the boat were reassuring for a family trip. Decent food and excellent service throughout the 3-day journey.",
    rating: 5.0,
    tag: "Family Traveler"
  },
  {
    name: "Ananya Roy",
    text: "Seeing a Royal Bengal Tiger from such close proximity was a dream come true. Elegant Tours made it happen with their expert tracking. The hospitality was top-notch!",
    rating: 5.0,
    tag: "Wildlife Pro"
  },
  {
    name: "Vikram Mehta",
    text: "The best organized trip I've had in India. From the airport pickup to the deep-sea navigation, everything was seamless. The chef on the boat is a magician.",
    rating: 4.9,
    tag: "Solo Traveler"
  },
  {
    name: "Sneha Kapoor",
    text: "The Sundarbans are mysterious and beautiful. Elegant Tours provided the perfect balance of adventure and luxury. Those morning mists on the deck are unforgettable.",
    rating: 5.0,
    tag: "Nature Lover"
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-[#ff6c00] fill-[#ff6c00]' : 'text-slate-200 fill-slate-200'}`} />
        ))}
      </div>
      <span className="text-[10px] font-black text-[#1a2b47] ml-2 tracking-tighter">{rating.toFixed(1)}</span>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(REVIEWS.length / itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-sliding logic
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleOpenEnquiry = () => {
    window.dispatchEvent(new CustomEvent('toggle-enquiry'));
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-[#1a2b47]/5 text-[#1a2b47] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-[#1a2b47]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#ff6c00]" />
              Guest Stories
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1a2b47] tracking-tighter leading-tight">
              Trusted by <span className="text-[#ff6c00]">Explorers</span> <br /> Worldwide
            </h2>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="p-4 md:p-5 rounded-full border border-slate-100 bg-slate-50 hover:bg-[#ff6c00] hover:text-white transition-all group active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="p-4 md:p-5 rounded-full border border-slate-100 bg-slate-50 hover:bg-[#ff6c00] hover:text-white transition-all group active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Testimonial Slider Container */}
        <div 
          className="relative overflow-hidden mb-32"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {/* We map the reviews into "pages" based on itemsPerView */}
            {Array.from({ length: totalSlides }).map((_, slideIdx) => (
              <div key={slideIdx} className="flex min-w-full gap-6 md:gap-8">
                {REVIEWS.slice(slideIdx * itemsPerView, (slideIdx + 1) * itemsPerView).map((review, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col hover:shadow-2xl hover:bg-white transition-all duration-500 group relative flex-1"
                  >
                    <Quote className="absolute top-8 right-8 w-10 h-10 md:w-14 md:h-14 text-[#1a2b47]/5 group-hover:text-[#ff6c00]/10 transition-colors" />
                    <RatingStars rating={review.rating} />
                    <p className="mt-8 text-slate-600 font-medium text-base md:text-lg leading-relaxed italic flex-grow">
                      "{review.text}"
                    </p>
                    <div className="mt-10 flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1a2b47] text-white rounded-full flex items-center justify-center font-black text-xs uppercase shadow-lg group-hover:bg-[#ff6c00] transition-colors border-2 border-white">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-[#1a2b47] tracking-tight text-sm md:text-base">{review.name}</h4>
                        <p className="text-[#ff6c00] text-[9px] font-black uppercase tracking-widest">{review.tag}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`h-2 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-[#ff6c00]' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stripe-inspired Premium CTA Section */}
        <div className="relative group overflow-hidden rounded-[3rem] md:rounded-[4rem] shadow-2xl">
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0 bg-[#0f172a] overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-60">
                <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-[#ff6c00] rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-[#6366f1] rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
                <div className="absolute top-[20%] left-[30%] w-[50%] h-[50%] bg-[#4f46e5] rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0f172a]/20 to-[#0f172a]/90"></div>
          </div>

          <div className="relative z-10 px-8 py-20 md:px-24 md:py-28 text-white flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase mb-10 border border-white/10">
                <Zap className="w-4 h-4 text-[#ff6c00]" />
                Trusted by 10K+ Verified Customers
              </div>
              <h3 className="text-4xl md:text-[6.5rem] font-black mb-10 leading-[0.9] tracking-tighter">
                Ready for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Ultimate Escape?</span>
              </h3>
              <p className="text-white/70 text-lg md:text-2xl font-medium max-w-xl leading-relaxed">
                Experience the raw power of the Sundarbans with the region's most awarded voyage collection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <button 
                onClick={handleOpenEnquiry}
                className="group bg-[#ff6c00] text-white px-14 py-7 rounded-2xl font-black text-xl hover:bg-white hover:text-[#0f172a] transition-all shadow-2xl hover:shadow-[#ff6c00]/30 active:scale-95 flex items-center gap-4 uppercase tracking-widest"
              >
                BOOK YOUR ESCAPES
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex flex-col items-center lg:items-start gap-3">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-6 h-6 text-[#ff6c00]" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-[#0f172a] bg-[#ff6c00] flex items-center justify-center font-black text-xs shadow-lg">10K+</div>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Verified Explorers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;