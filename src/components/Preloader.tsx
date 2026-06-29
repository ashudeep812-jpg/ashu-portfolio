import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Generate high-speed progressive counting with easing
    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8 seconds for high-speed cycle

    function step(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      
      // Custom easing function: quartic ease-out
      const percentage = Math.min(progress / duration, 1);
      const easeVal = 1 - Math.pow(1 - percentage, 4);
      
      const currentCount = Math.floor(easeVal * 100);
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        // Slightly delay before starting clipping finish sequence
        setTimeout(() => {
          setIsDone(true);
        }, 300);
      }
    }

    requestAnimationFrame(step);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 w-screen h-screen bg-bg-primary text-text-primary z-50 flex flex-col justify-between p-12 overflow-hidden select-none"
        >
          {/* Header metadata decoration */}
          <div className="flex justify-between items-start font-mono text-[10px] tracking-widest text-text-primary/40 uppercase">
            <div>
              <span>ARSHDEEP SINGH — PORTFOLIO</span>
            </div>
            <div>
              <span>CREATIVE SYSTEM v1.02</span>
            </div>
          </div>

          {/* Central 0-100% counter with custom display styling */}
          <div className="w-full flex justify-center items-center">
            <div className="text-center overflow-hidden">
              <motion.div
                initial={{ y: 150 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold tracking-tighter antialiased leading-none flex items-baseline justify-center select-none"
                style={{ fontSize: 'calc(16vw + 2rem)' }}
              >
                {/* Pad the numbers with zeros (e.g. 05%, 45%, 100%) */}
                <span className="tabular-nums">
                  {count === 100 ? '100' : count.toString().padStart(2, '0')}
                </span>
                <span className="font-sans text-[0.25em] font-light ml-2 opacity-50">%</span>
              </motion.div>
              
              {/* Spinning typography description block */}
              <div className="h-6 overflow-hidden mt-4 relative font-mono text-xs tracking-widest text-accent uppercase select-none flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span>
                  {count < 30 && 'Initializing Engine Assets...'}
                  {count >= 30 && count < 65 && 'Mapping Marketing Strategies...'}
                  {count >= 65 && count < 95 && 'Injecting Visual Identities...'}
                  {count >= 95 && 'Render Framework Bound...'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom metadata details */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 font-mono text-[10px] tracking-widest text-text-primary/40 uppercase">
            <div className="flex gap-8">
              <span>DESIGN DICTIONARY</span>
              <span>DATA-BACKED DECISIONS</span>
            </div>
            <div className="text-right">
              <span>LATENCY: ZERO</span>
              <span className="ml-8">LOAD COMPLETE © 2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
