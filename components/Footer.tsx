
import React from 'react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a2b47] pt-24 pb-12 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://eleganttours.co.in/wp-content/uploads/2025/12/Untitled-design-28.png" 
                alt="Elegant Tours Logo" 
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter text-white">ELEGANT</span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#ff6c00]">TOURS</span>
              </div>
            </div>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Elegant Tours is your gateway to the world's most breathtaking Sundarbans expeditions. We specialize in luxury boat safaris, wildlife tours, and heritage stays.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#ff6c00] hover:text-white transition-all shadow-sm border border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white mb-8 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-[#ff6c00]">Tiger Safaris</a></li>
              <li><a href="#" className="hover:text-[#ff6c00]">Houseboat Stays</a></li>
              <li><a href="#" className="hover:text-[#ff6c00]">Village Tours</a></li>
              <li><a href="#" className="hover:text-[#ff6c00]">Photography Trips</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white mb-8 uppercase tracking-widest text-xs">Destinations</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-[#ff6c00]">Sajnekhali</a></li>
              <li><a href="#" className="hover:text-[#ff6c00]">Dobanki</a></li>
              <li><a href="#" className="hover:text-[#ff6c00]">Sudhanyakhali</a></li>
              <li><a href="#" className="hover:text-[#ff6c00]">Netidhopani</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-black text-white mb-8 uppercase tracking-widest text-xs">Safari Club</h4>
            <p className="text-white/60 mb-6">Get exclusive Sundarbans updates and sighting alerts.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex-1 outline-none focus:ring-2 focus:ring-[#ff6c00] font-medium text-white" />
              <button className="bg-[#ff6c00] text-white p-4 rounded-2xl hover:bg-[#e65a00] transition-all">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm font-bold">
          <p>© 2024 Elegant Tours & Travels. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
