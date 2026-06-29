import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAVIGATION_LINKS, PERSONAL_BIO } from './CasesData';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection to update active sections and sticky nav container styling
  useEffect(() => {
    const handleScroll = () => {
      // Background blur scroll transition
      setScrolled(window.scrollY > 50);

      // Simple active link calculation
      const sections = ['hero', 'projects', 'about', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'py-4 bg-bg-primary/95 backdrop-blur-md border-b border-text-primary/10 shadow-xs' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand Title */}
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex flex-col pointer-events-auto"
          >
            <span className="font-display font-bold text-lg tracking-widest text-text-primary uppercase group-hover:text-accent transition-colors duration-300">
              {PERSONAL_BIO.name}
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-text-primary/40 uppercase">
              Digital Strategist • Storyteller
            </span>
          </a>

          {/* Inline Navigation Links - Minimalist & Balanced spacing */}
          <nav className="hidden md:flex items-center gap-10">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative py-2 font-mono text-xs tracking-widest text-text-primary/70 hover:text-text-primary transition-colors duration-200 uppercase"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="group flex items-center gap-2 border border-text-primary/10 px-5 py-2.5 rounded-full bg-text-primary hover:bg-accent text-bg-primary hover:text-bg-primary font-mono text-[10px] tracking-widest transition-all duration-300 hover:border-accent"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Responsive Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-full border border-text-primary/10 text-text-primary hover:bg-bg-secondary transition-all"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Full-width overlay Drawer Menu for Mobile viewports */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[70px] bg-bg-primary border-b border-text-primary/10 shadow-xl z-30 py-8 px-6 flex flex-col gap-6 md:hidden select-none"
          >
            <div className="flex flex-col gap-4">
              {NAVIGATION_LINKS.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-display font-medium text-lg tracking-wider py-1 border-b border-text-primary/5 uppercase flex justify-between items-center ${
                    activeSection === link.id ? 'text-accent border-accent/20' : 'text-text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[10px] opacity-40">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex justify-center items-center gap-2 bg-text-primary text-bg-primary py-3 rounded-md font-mono text-xs tracking-widest uppercase hover:bg-accent hover:text-bg-primary transition-all duration-300"
            >
              <span>CONNECT NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
