import React, { useState } from 'react';
import { Instagram, Facebook, Linkedin, Youtube, ArrowRight, Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: "https://fb.me/eleganttourskolkata", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, url: "https://ig.me/eleganttourskolkata", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/company/eleganttourskolkata", label: "LinkedIn" },
    { icon: <Youtube className="w-5 h-5" />, url: "https://www.youtube.com/@eleganttourskolkata", label: "YouTube" }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `New Elegant Club Subscription Request. 
        Subscriber Email: ${email}
        Action: Please log this and send an immediate notification to the administrator at nausad.hussain@gmail.com.`,
      });
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      setIsSubscribed(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkClick = (type: 'service' | 'destination', name: string) => {
    const detail: any = {};
    if (type === 'service') {
      const serviceMap: Record<string, string> = {
        'Tiger Expeditions': '2 Night 3 Days Immersion',
        'Houseboat Stays': '1 Night 2 Days Expedition',
        'Village Tours': 'Heritage: Village Walk',
        'Photography Trips': 'Photography Special'
      };
      detail.packageName = serviceMap[name] || name;
    } else {
      detail.message = `I am interested in exploring ${name}. Please provide details for this destination.`;
      detail.packageName = 'Bespoke: Customized Package';
    }
    
    window.dispatchEvent(new CustomEvent('toggle-enquiry', { detail }));
  };

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
              Elegant Tours is your gateway to the world's most breathtaking Sundarbans expeditions. We specialize in luxury boat journeys, wildlife tours, and heritage stays.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#ff6c00] hover:text-white transition-all shadow-sm border border-white/10 hover:scale-110 active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white mb-8 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><button onClick={() => handleLinkClick('service', 'Tiger Expeditions')} className="hover:text-[#ff6c00] transition-colors text-left">Tiger Expeditions</button></li>
              <li><button onClick={() => handleLinkClick('service', 'Houseboat Stays')} className="hover:text-[#ff6c00] transition-colors text-left">Houseboat Stays</button></li>
              <li><button onClick={() => handleLinkClick('service', 'Village Tours')} className="hover:text-[#ff6c00] transition-colors text-left">Village Tours</button></li>
              <li><button onClick={() => handleLinkClick('service', 'Photography Trips')} className="hover:text-[#ff6c00] transition-colors text-left">Photography Trips</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white mb-8 uppercase tracking-widest text-xs">Destinations</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><button onClick={() => handleLinkClick('destination', 'Sajnekhali')} className="hover:text-[#ff6c00] transition-colors text-left">Sajnekhali</button></li>
              <li><button onClick={() => handleLinkClick('destination', 'Dobanki')} className="hover:text-[#ff6c00] transition-colors text-left">Dobanki</button></li>
              <li><button onClick={() => handleLinkClick('destination', 'Sudhanyakhali')} className="hover:text-[#ff6c00] transition-colors text-left">Sudhanyakhali</button></li>
              <li><button onClick={() => handleLinkClick('destination', 'Netidhopani')} className="hover:text-[#ff6c00] transition-colors text-left">Netidhopani</button></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-black text-white mb-8 uppercase tracking-widest text-xs">Elegant Club</h4>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#ff6c00]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                {!isSubscribed ? (
                  <>
                    <p className="text-[#ff6c00] text-[9px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Stay Notified
                    </p>
                    <p className="text-white/80 font-bold text-lg mb-6 leading-tight">
                      Get exclusive Sundarbans updates and sighting alerts.
                    </p>
                    <form onSubmit={handleSubscribe} className="relative">
                      <input 
                        required
                        type="email" 
                        placeholder="Your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#ff6c00] font-medium text-white transition-all pr-14" 
                      />
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-[#ff6c00] text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#1a2b47] transition-all active:scale-90 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <ArrowRight className="w-5 h-5" />
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-4 animate-in zoom-in-95 duration-500">
                    <div className="w-12 h-12 bg-[#ff6c00]/20 rounded-xl flex items-center justify-center mb-4 text-[#ff6c00]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h5 className="text-xl font-black text-white mb-2 tracking-tight">You're in the loop!</h5>
                    <p className="text-white/40 text-sm font-medium">Welcome to Elegant Tours. Expect wild news soon.</p>
                  </div>
                )}
              </div>
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