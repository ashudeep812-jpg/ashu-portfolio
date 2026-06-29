import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Sparkles, Calendar, TrendingUp, ChevronRight, X, ArrowUpRight, Zap, Target, BarChart, Info } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PERSONAL_BIO } from './CasesData';
import { PortfolioProject } from '../types';

export default function NarrativeGrid() {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  
  // Track scroll speed state to influence rotation speed
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let rAFId: number;
    let timer: any;

    const calculateSpeed = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      const distance = Math.abs(currentScrollY - lastScrollY);
      const timeDiff = currentTime - lastTime || 1;
      
      const speed = distance / timeDiff; // pixels per millisecond
      setScrollSpeed(Math.min(speed * 35, 25)); // clamp acceleration

      lastScrollY = currentScrollY;
      lastTime = currentTime;

      // Gradually ease scroll velocity down to zero
      clearTimeout(timer);
      timer = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);

      rAFId = requestAnimationFrame(calculateSpeed);
    };

    rAFId = requestAnimationFrame(calculateSpeed);

    return () => {
      cancelAnimationFrame(rAFId);
      clearTimeout(timer);
    };
  }, []);

  // Spinning badge rotational angle tracker
  const [stampAngle, setStampAngle] = useState(0);
  useEffect(() => {
    let animationFrameId: number;
    
    const updateAngle = () => {
      // Base rotation of 0.4 deg + bonus speed component from scrolling velocity
      setStampAngle((prev) => (prev + 0.4 + scrollSpeed * 0.15) % 360);
      animationFrameId = requestAnimationFrame(updateAngle);
    };

    animationFrameId = requestAnimationFrame(updateAngle);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollSpeed]);

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-bg-primary py-24 md:py-36 px-6 md:px-12 border-t border-text-primary/10 select-none overflow-hidden"
    >
      {/* Background Decorative Typography Badge */}
      <div className="absolute right-0 top-12 font-mono text-[14vw] font-bold text-text-primary/[0.02] tracking-tighter uppercase pointer-events-none select-none select-none select-none">
        STRATEGY
      </div>

      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-18 xl:gap-24 items-start">
        
        {/* LEFT COLUMN: ASYMMETRIC MASONRY SEQUENCE OF STAGGERED PROJECTS */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24">
          
          <div className="col-span-1 md:col-span-2 mb-4">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#E55B3C] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>ACTIVE SELECTIONS</span>
            </div>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary uppercase leading-none">
              Crafted Projects
            </h2>
            <p className="font-sans text-xs text-text-primary/50 uppercase tracking-widest mt-2">
              Asymmetric digital activations making quantifiable brand gains
            </p>
          </div>

          {PORTFOLIO_PROJECTS.map((project, index) => {
            const isFullWidthImg = project.aspect === '16:9';
            return (
              <motion.div
                key={project.id}
                className={`group flex flex-col pointer-events-auto ${project.offsetClass} ${
                  isFullWidthImg ? 'md:col-span-2' : 'col-span-1'
                }`}
                onClick={() => setActiveProject(project)}
              >
                {/* 1. Direct clip-path Transition on reveal and Scale Stabilization */}
                <motion.div
                  initial={{ 
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                    scale: 1.15
                  }}
                  whileInView={{ 
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    scale: 1.0
                  }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="portfolio-image-container relative w-full aspect-square overflow-hidden bg-bg-secondary rounded-lg mb-6 cursor-pointer border border-text-primary/5 shadow-xs group-hover:shadow-lg transition-all"
                  style={{
                    aspectRatio: project.aspect === '16:9' ? '16/9' : project.aspect === '4:3' ? '4/3' : project.aspect === '3:4' ? '3/4' : '1/1'
                  }}
                >
                  {/* Subtle rust red border glow */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-accent/20 rounded-lg z-20 pointer-events-none transition-colors" />

                  {/* Portfolio Project image */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale scale-102 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />

                  {/* Minimal Dark Hover Mask */}
                  <div className="absolute inset-0 bg-[#111111]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-bg-primary flex items-center justify-center text-text-primary"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-[#E55B3C]" />
                    </motion.div>
                  </div>

                  {/* Date Stamp Tag */}
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest bg-bg-primary/90 text-text-primary px-3 py-1.5 rounded-full z-10 backdrop-blur-xs flex items-center gap-1.5 uppercase">
                    <Calendar className="w-3 h-3 text-accent" />
                    <span>CYCLE: {project.year}</span>
                  </div>
                </motion.div>

                {/* Info block under image */}
                <div className="flex flex-col text-left">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <span className="font-mono text-[10px] tracking-widest text-[#E55B3C] uppercase">
                      {project.category}
                    </span>
                    <span className="font-mono text-[9px] text-text-primary/30 tracking-wider">
                      [0{index + 1}]
                    </span>
                  </div>
                  
                  <h3 className="font-display font-medium text-lg lg:text-xl tracking-tight text-text-primary uppercase group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-text-primary/60 mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Direct preview metrics list */}
                  <div className="flex flex-wrap gap-2.5 mt-4">
                    {project.metrics.slice(0, 2).map((metric, idx) => (
                      <span key={idx} className="font-mono text-[9px] tracking-widest border border-text-primary/10 rounded-xs px-2.5 py-1 text-text-primary/70 uppercase bg-bg-secondary/40">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: STICKY CONTENT CARD (#ECECE9) & VELOCITY VECTOR BADGES */}
        <div id="about" className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col gap-10 mt-12 lg:mt-36">
          
          {/* Main Editorial Text Block Card with background: #ECECE9 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="p-8 md:p-12 background-bg-secondary bg-[#ECECE9] rounded-[2px] border border-text-primary flex flex-col relative overflow-hidden shadow-[10px_10px_0px_#111111]"
            id="narrative-sticky-card"
          >
            {/* Subtle rust red ribbon */}
            <div className="absolute top-0 right-0 w-24 h-1 bg-accent" />

            {/* Quote badge decoration */}
            <div className="font-mono text-xs tracking-widest text-accent font-semibold uppercase mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE STORYTELLER PROTOCOL</span>
            </div>

            <h3 className="font-display font-medium text-2xl md:text-3xl tracking-tight text-text-primary uppercase leading-tight mb-6">
              {PERSONAL_BIO.role}
            </h3>

            <p className="font-sans text-xs md:text-sm text-text-primary/80 leading-relaxed font-normal mb-8">
              {PERSONAL_BIO.editorialCopy}
            </p>

            <blockquote className="font-sans italic text-xs text-[#E55B3C] border-l-2 border-accent pl-4 py-1 leading-relaxed mb-8 uppercase tracking-wide">
              "We replace dry, metric-chasing conversion tables with elegant narratives that command premium margins."
            </blockquote>

            {/* Direct list stats indicator */}
            <div className="grid grid-cols-2 gap-4 border-t border-text-primary/10 pt-8">
              <div>
                <p className="font-display text-2xl font-bold text-text-primary">08+</p>
                <p className="font-mono text-[9px] text-text-primary/40 uppercase tracking-widest mt-1">Years Working</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-text-primary">12M+</p>
                <p className="font-mono text-[9px] text-text-primary/40 uppercase tracking-widest mt-1">Platform Impact</p>
              </div>
            </div>
          </motion.div>

          {/* DYNAMIC MICRO-ASSETS: CONTINUOUS VELOCITY ROTATING VECTOR BADGES */}
          <div className="flex justify-center items-center gap-8 py-4 relative">
            
            {/* Stamp 1: Circular Decorative Spin Badge */}
            <div className="relative w-36 h-36 flex items-center justify-center transform scale-95 border border-dashed border-text-primary rounded-full p-2">
              <motion.div
                style={{ rotate: stampAngle }}
                className="absolute inset-2 pointer-events-none select-none"
              >
                {/* Typographic spinner path using clean circular text arrangement */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-text-primary/70 fill-none">
                  <path id="circlePath1" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  <text className="font-mono text-[7px] tracking-[0.22em] uppercase font-bold fill-text-primary">
                    <textPath href="#circlePath1" startOffset="0%">
                      • MARKETING ARCHITECT • EDITORIAL FOCUS •
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Central Badge Core Anchor */}
              <div className="w-14 h-14 rounded-full bg-[#E55B3C] shadow-sm flex items-center justify-center text-bg-primary text-xs font-mono select-none z-10 border border-text-primary">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Stamp 2: Horizontal Scroll Speed Status Meter */}
            <div className="flex flex-col gap-2 p-5 border border-text-primary/10 rounded-lg bg-bg-primary items-start min-w-[200px]">
              <span className="font-mono text-[9px] tracking-widest text-[#E55B3C] font-semibold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E55B3C] animate-ping" />
                <span>SCROLL VELOCITY</span>
              </span>
              <div className="font-mono text-lg font-bold text-text-primary">
                {(scrollSpeed * 10).toFixed(0)} <span className="text-[10px] opacity-40 font-normal">HZ</span>
              </div>
              
              {/* Dynamic width progress indicator bar showing scroll friction */}
              <div className="w-full bg-text-primary/10 h-1 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="bg-[#E55B3C] h-full"
                  animate={{ width: `${Math.min(scrollSpeed * 8, 100)}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              </div>
              <span className="font-mono text-[8px] text-text-primary/40 uppercase mt-0.5 tracking-wider">
                BADGE ACCELERATOR RATIO: {(1 + scrollSpeed * 0.1).toFixed(2)}x
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* DETAIL MODAL POPUP FOR CASE STUDIES */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-text-primary/70 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 select-none"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-bg-primary w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Anchor */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-bg-primary/95 text-text-primary border border-text-primary/10 flex items-center justify-center shadow-md hover:bg-accent hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image Display Left with strict 8px radius boundary */}
              <div className="w-full md:w-1/2 relative bg-bg-secondary min-h-[300px] md:min-h-full">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale-xs"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-transparent to-transparent z-10" />
                
                {/* Year Indicator Label */}
                <div className="absolute bottom-6 left-6 text-white font-mono z-20">
                  <p className="text-[10px] tracking-widest text-[#E55B3C] font-bold">CASE STUDY TIMELINE</p>
                  <p className="text-xl font-bold uppercase font-display">CYCLE YEAR {activeProject.year}</p>
                </div>
              </div>

              {/* Modal Description Content Details Right */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[50vh] md:max-h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-accent uppercase mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeProject.category}</span>
                  </div>

                  <h3 className="font-display font-medium text-2xl lg:text-3xl tracking-tight text-text-primary uppercase leading-tight mb-4">
                    {activeProject.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-text-primary/70 leading-relaxed mb-6">
                    {activeProject.description}
                  </p>

                  {/* High Quality Marketing Proof Points */}
                  <div className="flex flex-col gap-3 border-t border-text-primary/10 pt-6 mb-8 select-none">
                    <h4 className="font-mono text-[10px] tracking-widest text-text-primary/40 uppercase">DATA-BACKED RESULTS ACHIEVED</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeProject.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-3 font-mono text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-text-primary font-bold">{metric.split(' ')[0]}</span>
                          <span className="text-text-primary/60">{metric.split(' ').slice(1).join(' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connect / Actions */}
                <div className="flex flex-col lg:flex-row gap-4 border-t border-text-primary/10 pt-6">
                  <a
                    href="#contact"
                    onClick={() => {
                      setActiveProject(null);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        window.scrollTo({
                          top: contactSection.offsetTop - 82,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="flex justify-center items-center gap-2 bg-[#E55B3C] hover:bg-[#111111] text-white py-3 px-6 rounded-md font-mono text-[10px] tracking-widest uppercase transition-colors duration-300"
                  >
                    <span>REQUEST METHODOLOGY BRIEF</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
