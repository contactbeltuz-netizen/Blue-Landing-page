import React, { useState } from 'react';
import { Instagram, Facebook, Linkedin, Youtube, ArrowRight, Mail, CheckCircle2, Sparkles, MapPin, Phone, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import { sendInquiry } from '../services/apiService';

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
      const result = await sendInquiry({
        name: 'Newsletter Subscriber',
        email: email,
        phone: 'N/A',
        type: 'Newsletter',
        details: `Customer has requested to join the Elegant Tour Club.`
      });
      if (result) {
        setIsSubscribed(true);
        setEmail('');
      }
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
        'Houseboat Stays': '1 Night 2 Days Expedition'
      };
      detail.packageName = serviceMap[name] || name;
    } else {
      detail.message = `I am interested in exploring ${name}. Please provide details for this destination.`;
      detail.packageName = 'Customized Tour Packages';
    }
    
    window.dispatchEvent(new CustomEvent('toggle-enquiry', { detail }));
  };

  return (
    <footer className="bg-[#0f172a] pt-28 pb-12 text-white relative overflow-hidden">
      {/* Premium Gradient Overlays for high-end look */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff6c00]/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24 items-start">
          
          {/* Brand & Socials Column */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-4 mb-8 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-white p-2 rounded-2xl shadow-xl shadow-white/5 transition-transform group-hover:scale-105">
                <img 
                  src="https://eleganttours.co.in/wp-content/uploads/2025/12/Untitled-design-28.png" 
                  alt="Elegant Tours Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter text-white">ELEGANT</span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#ff6c00]">TOURS</span>
              </div>
            </div>
            
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
              Elevating wildlife tourism in the Sundarbans. We craft bespoke expeditions seeking raw majesty and refined hospitality.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#ff6c00] hover:text-white transition-all border border-white/5 hover:scale-110 active:scale-95 group"
                >
                  <div className="transition-transform group-hover:rotate-6">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-white mb-8 uppercase tracking-[0.3em] text-[10px] flex items-center gap-3">
              <span className="w-6 h-px bg-[#ff6c00]"></span> Services
            </h4>
            <ul className="space-y-5 text-slate-400 font-bold text-sm">
              {['Tiger Expeditions', 'Houseboat Stays', 'Day Expeditions'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleLinkClick('service', item)} 
                    className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group text-left"
                  >
                    {item} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#ff6c00]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="font-black text-white mb-8 uppercase tracking-[0.3em] text-[10px] flex items-center gap-3">
              <span className="w-6 h-px bg-[#ff6c00]"></span> Contact Info
            </h4>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#ff6c00]/10 rounded-xl flex items-center justify-center text-[#ff6c00] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">HQ Kolkata</p>
                  <p className="text-sm text-slate-300 font-bold leading-relaxed">
                    1, Abdul Hamid Street, Kolkata 700069
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#ff6c00]/10 rounded-xl flex items-center justify-center text-[#ff6c00] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Direct Line</p>
                  <div className="space-y-1.5">
                    <a href="tel:+919903292946" className="block text-sm text-slate-200 font-black hover:text-[#ff6c00] transition-colors">+91 99032 92946</a>
                    <a href="tel:+919831221626" className="block text-sm text-slate-200 font-black hover:text-[#ff6c00] transition-colors">+91 98312 21626</a>
                    <a href="tel:+919831023824" className="block text-sm text-slate-200 font-black hover:text-[#ff6c00] transition-colors">+91 98310 23824</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#ff6c00]/10 rounded-xl flex items-center justify-center text-[#ff6c00] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Us</p>
                  <a href="mailto:info@eleganttours.co.in" className="block text-sm text-slate-200 font-black hover:text-[#ff6c00] transition-colors">info@eleganttours.co.in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6c00]/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                {!isSubscribed ? (
                  <>
                    <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[#ff6c00] font-black text-[9px] mb-4 uppercase tracking-[0.3em] shadow-inner">
                      <Sparkles className="w-3.5 h-3.5" />
                      Elegant Insider
                    </div>
                    <h5 className="text-xl font-black text-white mb-3 tracking-tighter">
                      Join the <span className="text-[#ff6c00]">Elegant Tour Club</span>
                    </h5>
                    <p className="text-slate-400 font-medium text-xs mb-6 leading-relaxed">
                      Early access to Tiger sighting forecasts and exclusive off-season rates.
                    </p>
                    <form onSubmit={handleSubscribe} className="relative group/form">
                      <input 
                        required
                        type="email" 
                        placeholder="Explorer email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#ff6c00] font-bold text-white transition-all pr-14 text-xs placeholder:text-slate-600 focus:bg-black/60 shadow-inner" 
                      />
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-[#ff6c00] text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#1a2b47] transition-all active:scale-90 disabled:opacity-50 shadow-lg shadow-[#ff6c00]/20"
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
                  <div className="py-4 animate-in zoom-in-95 duration-500 text-center">
                    <div className="w-16 h-16 bg-[#ff6c00]/20 rounded-2xl flex items-center justify-center mb-6 text-[#ff6c00] mx-auto border border-[#ff6c00]/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h5 className="text-xl font-black text-white mb-2 tracking-tighter">You're Enlisted</h5>
                    <p className="text-slate-400 text-xs font-medium">Welcome to the inner circle.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
               <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff6c00]" />
                  Secure
               </div>
               <div className="w-1 h-1 rounded-full bg-slate-700"></div>
               <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  <Globe className="w-3.5 h-3.5 text-[#ff6c00]" />
                  Global
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            © 2025 Elegant Tours. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
              Privacy <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
            </a>
            <a href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
              Terms <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;