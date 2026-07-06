import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'motion/react';
import { ArrowDown, Flame, Disc, Layers } from 'lucide-react';
import { PERSONAL_BIO, JULIAN_AVATAR_PATH } from './CasesData';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll values for progressive scroll-parallax
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 500], [0, -120]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, 80]);

  // Track mouse coordinates over the viewport
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      
      // Normalize values between -0.5 and 0.5
      const nx = (e.clientX / innerWidth) - 0.5;
      const ny = (e.clientY / innerHeight) - 0.5;
      
      setMousePosition({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Soft springs to smooth out mouse tracking movements
  const photoX = useSpring(0, { stiffness: 120, damping: 20 });
  const photoY = useSpring(0, { stiffness: 120, damping: 20 });
  
  const textX = useSpring(0, { stiffness: 100, damping: 25 });
  const textY = useSpring(0, { stiffness: 100, damping: 25 });

  useEffect(() => {
    // Front card shifts with the mouse direction
    photoX.set(mousePosition.x * 50);
    photoY.set(mousePosition.y * 50);

    // Back layer shifts inversely
    textX.set(mousePosition.x * -70);
    textY.set(mousePosition.y * -40);
  }, [mousePosition, photoX, photoY, textX, textY]);

  // Handle scroll trigger down to cases
  const scrollDown = () => {
    const nextSection = document.getElementById('projects');
    if (nextSection) {
      const topOffset = nextSection.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full bg-bg-primary overflow-hidden flex flex-col justify-between pt-24 pb-8 select-none"
    >
      {/* Structural Ambient Background Grid Line */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.03]">
        <div className="col-span-1 border-r border-text-primary h-full"></div>
        <div className="col-span-1 border-r border-text-primary h-full"></div>
        <div className="col-span-1 border-r border-text-primary h-full animate-pulse"></div>
        <div className="col-span-6 border-r border-text-primary h-full"></div>
        <div className="col-span-1 border-r border-text-primary h-full"></div>
        <div className="col-span-1 border-r border-text-primary h-full"></div>
      </div>

      {/* Hero Header Meta Info */}
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 flex justify-between items-start font-mono text-[9px] md:text-[10px] tracking-wider text-text-primary/50 relative z-10 pointer-events-none">
        <div className="flex gap-4 md:gap-12">
          <span className="flex items-center gap-1.5"><Flame className="w-3 h-3 text-accent animate-pulse" /> MUMBAI, INDIA</span>
          <span className="hidden md:inline">• DIGITAL CONTENT ARCHITECTURE</span>
        </div>
        <div className="text-right flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E55B3C] animate-ping" />
          <span>PORTFOLIO v1.02 — DIGITAL INSIGHTS</span>
        </div>
      </div>

      {/* Screen-Filling Typography & Profile Central Card Overlay Container */}
      <div className="flex-1 w-full flex items-center justify-center relative min-h-[500px]">
        {/* HUGE BACKGROUND TEXT LAYER - INVERSE SHIFT PARALLAX */}
        <motion.div
          style={{
            x: textX,
            y: titleY,
            rotate: mousePosition.x * 2, // dynamic rotation
          }}
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0"
        >
          <h1 className="font-display font-bold leading-none text-text-primary/[0.04] text-[15vw] md:text-[13vw] tracking-tighter text-center select-none uppercase">
            {PERSONAL_BIO.name}
          </h1>
          <div className="font-mono text-[1.5vw] md:text-[1vw] text-text-primary/[0.12] tracking-[0.4em] mt-2 text-center select-none uppercase">
            {PERSONAL_BIO.title}
          </div>
        </motion.div>

        {/* RECTANGLE CENTRAL INTERACTIVE FOREGROUND PROFILE CARD */}
        <motion.div
          style={{
            x: photoX,
            y: subtitleY,
            rotate: -2, // Artistic Flair default base rotation
            rotateX: mousePosition.y * -18, // 3D Tilt rotation limit
            rotateY: mousePosition.x * 18,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-[280px] h-[370px] md:w-[320px] md:h-[430px] z-10 pointer-events-auto cursor-pointer flex justify-center items-center rounded-[120px] shadow-2xl transition-shadow duration-500 hover:shadow-[20px_20px_60px_rgba(0,0,0,0.08)] group border border-text-primary bg-bg-secondary"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={scrollDown}
          id="hero-profile-card"
        >
          {/* Card Border with subtle accent glow - with capsule rounded bounds */}
          <div className="absolute inset-0 border border-text-primary rounded-[120px] pointer-events-none z-20 group-hover:border-accent transition-colors duration-500" />

          {/* Profile Photo Wrapper - with organic 120px capsule border-radii */}
          <div className="w-full h-full overflow-hidden relative rounded-[120px] bg-bg-secondary z-10">
            {/* The profile director image */}
            <img
              src={JULIAN_AVATAR_PATH}
              alt="Arshdeep Singh Editorial Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            
            {/* Dark vignette gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#111111]/70 to-transparent opacity-90" />

            {/* Micro-interactive information panel in 3D Space */}
            <div 
              style={{ transform: 'translateZ(30px)' }}
              className="absolute bottom-10 left-6 right-6 text-white font-mono z-20 text-center flex flex-col items-center justify-center gap-1"
            >
              <div>
                <p className="text-[9px] tracking-widest text-[#E55B3C] font-semibold uppercase">CREATIVE STRATEGIST</p>
                <h3 className="text-xs font-bold tracking-wider leading-tight uppercase font-display">{PERSONAL_BIO.name}</h3>
              </div>
              <div>
                <span className="text-[8px] tracking-widest opacity-60">ENGAGE © 2026</span>
              </div>
            </div>
          </div>

          {/* Background Decorative Rings in 3D Depth */}
          <div 
            style={{ transform: 'translateZ(-15px) scale(0.96)' }}
            className="absolute inset-0 bg-[#E55B3C]/5 rounded-[120px] -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        </motion.div>
      </div>

      {/* Hero Bottom Bar Info */}
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 select-none">
        {/* Left Side: Statement tagline + Coordinate Tracking Label */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 max-w-lg text-center md:text-left">
          <div className="w-1.5 h-12 bg-accent rounded-full hidden md:block shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div>
              <p className="font-display font-bold text-xs tracking-wider uppercase text-text-primary">
                {PERSONAL_BIO.tagline}
              </p>
              <p className="font-sans text-[10px] text-text-primary/50 uppercase mt-0.5 tracking-wider">
                Fluid LIVING SPACE FOR DESIGN EXPERTS & DIGITAL MARKETERS.
              </p>
            </div>
            {/* Artistic Coordinate Label */}
            <div className="text-[9px] font-mono tracking-[0.2em] opacity-40 uppercase">
              COORDINATES: LAT: 19.0760° N | LONG: 72.8777° E • MERCATOR
            </div>
          </div>
        </div>

        {/* Central interactive spin banner indicator */}
        <div className="hidden lg:flex items-center gap-3 border border-text-primary/5 rounded-full px-4 py-2 bg-bg-secondary/60">
          <Disc className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: '4s' }} />
          <span className="font-mono text-[9px] tracking-widest text-text-primary/70 uppercase">DRAG OR SWIPE VIEWS DOWNWARD</span>
        </div>

        {/* Right Side Scroll Down prompt */}
        <button
          onClick={scrollDown}
          className="group flex flex-col items-center gap-2 text-text-primary font-mono text-[10px] tracking-[0.3em] hover:text-accent transition-colors duration-300"
        >
          <div className="relative w-8 h-8 rounded-full border border-text-primary/10 flex items-center justify-center bg-bg-primary group-hover:border-accent transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-text-primary group-hover:text-accent animate-bounce" />
          </div>
          <span>SCROLL DISCOVERY</span>
        </button>
      </div>
    </section>
  );
}
