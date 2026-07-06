import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowUpRight, Send, HelpCircle, Check, Copy, Sparkles, Building, Briefcase } from 'lucide-react';
import { PERSONAL_BIO } from './CasesData';

export default function ContactSection() {
  const [selectedInterest, setSelectedInterest] = useState<string>('Creative Strategy');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const queryTypes = [
    'Creative Strategy',
    'Social Media Posts',
    'Canva Design / Menus',
    'Local Marketing',
    'Other Project'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ashudeep812@gmail.com'); // Using the user's email from metadata
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Simulate pristine server submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 4500);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#111111] text-bg-primary py-24 md:py-36 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute left-[-10%] bottom-[-5%] font-display font-bold text-[18vw] text-bg-primary/[0.015] tracking-tighter uppercase pointer-events-none select-none">
        VANE
      </div>

      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* LEFT COLUMN: CONTACT DETAILS & IDENTITY */}
        <div className="lg:col-span-5 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#E55B3C] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>ACQUISITIONS DIVISION</span>
            </div>
            
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-none mb-6">
              Establish a Brief
            </h2>
            
            <p className="font-sans text-xs md:text-sm text-bg-primary/60 leading-relaxed max-w-md uppercase tracking-wider mb-8">
              Open for curated digital collaborations, senior advisory board positions, or high-concept visual directions.
            </p>
          </div>

          {/* Quick email clipboard interaction */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] tracking-widest text-bg-primary/30 uppercase">DIRECT CORRESPONDENCE</p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="group flex items-center justify-between border border-bg-primary/10 px-6 py-4 rounded-lg bg-[#ECECE9]/[0.03] hover:bg-[#E55B3C] hover:border-accent text-left transition-all duration-300 w-full max-w-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-primary/[0.05] group-hover:bg-bg-primary/10 flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4 text-accent group-hover:text-bg-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-widest text-bg-primary/40 group-hover:text-bg-primary/60 uppercase">EMAIL ADVISOR</p>
                    <p className="font-sans text-xs md:text-sm font-semibold tracking-wide text-bg-primary">ashudeep812@gmail.com</p>
                  </div>
                </div>

                <div className="font-mono text-[9px] tracking-widest flex items-center gap-1">
                  {copiedEmail ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-bg-primary font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> COPIED</motion.span>
                  ) : (
                    <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex items-center gap-1">COPY <Copy className="w-3 h-3 text-bg-primary/50" /></span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Copyright signature details */}
          <div className="pt-8 border-t border-bg-primary/10 flex flex-col md:flex-row justify-between text-bg-primary/40 font-mono text-[9px] tracking-widest uppercase gap-4 mt-8">
            <div>
              <p>© 2026 {PERSONAL_BIO.name} CREATIVE. SITE BY AGENT BUILD.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#E55B3C]">LINKEDIN</a>
              <a href="#" className="hover:text-[#E55B3C]">READ.CV</a>
              <a href="#" className="hover:text-[#E55B3C]">INSTAGRAM</a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-INTERACTIVE BRIEF BUILDER */}
        <div className="lg:col-span-7 bg-[#EAEDE7]/[0.02] border border-bg-primary/10 rounded-xl p-8 md:p-12 relative">
          
          {/* Subtle Rust Light */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E55B3C]/5 blur-3xl rounded-full" />

          <h3 className="font-display font-medium text-xl md:text-2xl tracking-normal uppercase mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span>LET'S WORK TOGETHER</span>
          </h3>

          <form onSubmit={handleSubmitForm} className="flex flex-col gap-6">
            
            {/* Category / Inquiry Selection Panel */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[9px] tracking-widest text-[#E55B3C] uppercase">WHAT DO YOU NEED HELP WITH?</p>
              
              <div className="flex flex-wrap gap-2.5">
                {queryTypes.map((type) => {
                  const isSelected = selectedInterest === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedInterest(type)}
                      className={`font-mono text-[9px] tracking-widest uppercase py-2 px-4 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E55B3C] border-accent text-white font-bold'
                          : 'border-bg-primary/10 text-bg-primary/60 hover:text-bg-primary hover:bg-bg-primary/[0.03] hover:border-bg-primary/25'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] tracking-widest text-bg-primary/40 uppercase">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-bg-primary/40"><Briefcase className="w-3.5 h-3.5" /></span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-bg-primary/[0.04] border border-bg-primary/10 rounded-md py-3 pl-10 pr-4 font-sans text-xs tracking-wide text-bg-primary focus:outline-none focus:border-accent focus:bg-bg-primary/[0.08]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] tracking-widest text-bg-primary/40 uppercase">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-bg-primary/40"><Mail className="w-3.5 h-3.5" /></span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="advisor@company.com"
                    className="w-full bg-bg-primary/[0.04] border border-bg-primary/10 rounded-md py-3 pl-10 pr-4 font-sans text-xs tracking-wide text-bg-primary focus:outline-none focus:border-accent focus:bg-bg-primary/[0.08]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[9px] tracking-widest text-bg-primary/40 uppercase">Business Name (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-bg-primary/40"><Building className="w-3.5 h-3.5" /></span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="ACME Digital Labs"
                  className="w-full bg-bg-primary/[0.04] border border-bg-primary/10 rounded-md py-3 pl-10 pr-4 font-sans text-xs tracking-wide text-bg-primary focus:outline-none focus:border-accent focus:bg-bg-primary/[0.08]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[9px] tracking-widest text-bg-primary/40 uppercase">Describe Your Initiative</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell me a little bit about your business and what you want to create..."
                className="w-full bg-bg-primary/[0.04] border border-bg-primary/10 rounded-md py-3.5 px-4 font-sans text-xs tracking-wide text-bg-primary focus:outline-none focus:border-accent focus:bg-bg-primary/[0.08]"
              />
            </div>

            {/* Simulated Server Feedback Alerts */}
            <AnimatePresence mode="wait">
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-accent/10 border border-accent/20 rounded-lg p-5 text-xs text-white leading-relaxed flex items-start gap-3 uppercase font-mono tracking-wider mb-2 select-none"
                >
                  <Send className="w-4 h-4 text-accent shrink-0 animate-bounce" />
                  <div>
                    <p className="font-bold text-[#E55B3C]">MESSAGE SENT SUCCESSFULLY</p>
                    <p className="text-[10px] text-bg-primary/75 mt-1 font-sans leading-relaxed lowercase">
                      your inquiry for <strong>{selectedInterest}</strong> was packaged securely. Arshdeep will reply within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={formSubmitted}
              className="flex justify-center items-center gap-2.5 bg-[#E55B3C] hover:bg-bg-primary text-white hover:text-text-primary py-4 px-8 rounded-md font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer w-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{formSubmitted ? 'SENDING...' : 'SEND MESSAGE'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
