import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, User, Users, MessageSquare, Send, CheckCircle2, Loader2, Sparkles, MapPin, PhoneCall, ChevronDown, ShieldCheck, Calendar, Plus, Minus, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PACKAGES = [
  "Day Tours: Nature Express",
  "1 Night 2 Days Expedition",
  "2 Night 3 Days Immersion",
  "Bespoke: Customized Package",
  "Photography Special",
  "Heritage: Village Walk"
];

const ContactForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPackageDropdown, setShowPackageDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 2,
    package: '',
    message: ''
  });

  useEffect(() => {
    const handleToggle = (e: any) => {
      const { packageName, message } = e.detail || {};
      setFormData(prev => ({ 
        ...prev, 
        package: packageName || prev.package,
        message: message || prev.message
      }));
      setIsOpen(true);
      setSuccess(false);
    };
    window.addEventListener('toggle-enquiry', handleToggle);
    window.addEventListener('select-package', handleToggle);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPackageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('toggle-enquiry', handleToggle);
      window.removeEventListener('select-package', handleToggle);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.package) {
      alert("Please select your preferred expedition package.");
      return;
    }
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `New Premium Lead:
        Name: ${formData.name}
        Phone/WhatsApp: ${formData.phone}
        Email: ${formData.email}
        Date: ${formData.date}
        Guests: ${formData.guests}
        Package: ${formData.package}
        Note: ${formData.message}`,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      <div 
        className="absolute inset-0 bg-[#1a2b47]/95 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[95vh]">
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-[#ff6c00] hover:text-white rounded-full z-[70] transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="lg:w-5/12 p-8 md:p-16 bg-gradient-to-br from-[#1a2b47] via-[#15233a] to-[#0f172a] text-white hidden lg:flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[#ff6c00] font-black text-[10px] mb-8 uppercase tracking-[0.4em]">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Concierge Desk
            </div>
            <h2 className="text-5xl font-black mb-6 leading-tight tracking-tighter">
              The Wild <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6c00] to-orange-400">Calls You.</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xs">
              Leave your details. A specialized naturalist will curate your sighting forecast and itinerary.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#ff6c00] border border-white/10 group-hover:bg-[#ff6c00] group-hover:text-white transition-all duration-500">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">WhatsApp Priority</p>
                <p className="text-xl font-bold tracking-tight text-white/90">+91 99032 92946</p>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex items-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
              <ShieldCheck className="w-4 h-4 text-[#ff6c00]" />
              Official Sundarbans Partner
            </div>
          </div>
        </div>

        <div className="lg:w-7/12 p-8 md:p-12 lg:p-16 bg-white overflow-y-auto custom-scrollbar relative">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="lg:hidden mb-10">
                <div className="inline-flex items-center gap-2 text-[#ff6c00] font-black text-[10px] mb-2 uppercase tracking-[0.3em]">
                  <Sparkles className="w-4 h-4" /> Quick Enquiry
                </div>
                <h3 className="text-4xl font-black text-[#1a2b47] tracking-tighter">Plan Expedition</h3>
              </div>

              {/* Identity Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#ff6c00]" /> Full Name
                  </label>
                  <input required type="text" placeholder="e.g. Rahul Sharma" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#ff6c00] uppercase tracking-[0.2em] flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> WhatsApp Number
                  </label>
                  <input required inputMode="tel" type="tel" placeholder="+91 00000 00000" className="w-full bg-[#ff6c00]/5 border border-[#ff6c00]/20 p-4 rounded-xl font-black outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              {/* Logistics Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#ff6c00]" /> Email Address
                  </label>
                  <input required type="email" placeholder="name@email.com" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#ff6c00]" /> Travel Date
                  </label>
                  <input required type="date" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47] cursor-pointer" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
              </div>

              {/* Custom Package Dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="space-y-2 relative" ref={dropdownRef}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ff6c00]" /> Select Journey
                  </label>
                  <div 
                    onClick={() => setShowPackageDropdown(!showPackageDropdown)}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-black flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all text-[#1a2b47]"
                  >
                    <span className={formData.package ? 'text-[#1a2b47]' : 'text-slate-400'}>
                      {formData.package || "Choose Your Package"}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showPackageDropdown ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {showPackageDropdown && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-[80] overflow-hidden py-2 animate-in slide-in-from-top-2 duration-200">
                      {PACKAGES.map(p => (
                        <div 
                          key={p} 
                          onClick={() => { setFormData({...formData, package: p}); setShowPackageDropdown(false); }}
                          className={`px-6 py-3.5 text-xs font-black uppercase tracking-widest cursor-pointer transition-all hover:bg-slate-50 ${formData.package === p ? 'text-[#ff6c00] bg-[#ff6c00]/5' : 'text-[#1a2b47]'}`}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#ff6c00]" /> No. of Guests
                  </label>
                  <div className="flex items-center bg-slate-50 border border-slate-100 p-1.5 rounded-xl h-[58px]">
                    <button type="button" onClick={() => setFormData(f => ({...f, guests: Math.max(1, f.guests - 1)}))} className="h-full aspect-square bg-white border border-slate-100 rounded-lg flex items-center justify-center text-[#1a2b47] hover:bg-[#ff6c00] hover:text-white transition-all shadow-sm"><Minus className="w-4 h-4" /></button>
                    <span className="flex-1 text-center font-black text-[#1a2b47] text-lg">{formData.guests}</span>
                    <button type="button" onClick={() => setFormData(f => ({...f, guests: f.guests + 1}))} className="h-full aspect-square bg-white border border-slate-100 rounded-lg flex items-center justify-center text-[#1a2b47] hover:bg-[#ff6c00] hover:text-white transition-all shadow-sm"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Communication Group */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#ff6c00]" /> Special Requests / Notes
                </label>
                <textarea 
                  placeholder="e.g. Sighting preferences, dietary restrictions..." 
                  className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all text-[#1a2b47] min-h-[100px] resize-none" 
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#1a2b47] text-white py-6 rounded-2xl font-black text-lg shadow-[0_20px_40px_-10px_rgba(26,43,71,0.3)] hover:bg-[#ff6c00] transition-all flex items-center justify-center gap-4 active:scale-[0.98] group">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /><span className="uppercase tracking-[0.2em]">Request Premium Quote</span></>}
              </button>
              
              <p className="text-center text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">
                Fastest Reply: <span className="text-[#ff6c00]">Within 15 Minutes</span>
              </p>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="w-28 h-28 bg-[#ff6c00]/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-[#ff6c00]/20 shadow-inner relative">
                <CheckCircle2 className="w-14 h-14 text-[#ff6c00]" />
                <div className="absolute inset-0 bg-[#ff6c00] rounded-[2.5rem] animate-ping opacity-10"></div>
              </div>
              <h3 className="text-4xl font-black text-[#1a2b47] mb-6 tracking-tight">Expedition Logged!</h3>
              <p className="text-slate-500 text-lg max-w-sm mb-12 font-medium leading-relaxed">
                Thank you, <span className="text-[#1a2b47] font-bold">{formData.name}</span>. Our lead naturalist will reach out to <span className="text-[#ff6c00] font-black underline decoration-2 underline-offset-8 decoration-[#ff6c00]/30">{formData.phone}</span> very shortly.
              </p>
              <button onClick={() => setIsOpen(false)} className="bg-[#1a2b47] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#ff6c00] transition-all shadow-xl active:scale-95">
                RETURN TO EXPLORER
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;