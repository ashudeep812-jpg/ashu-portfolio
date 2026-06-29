import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [hoveredType, setHoveredType] = useState<'none' | 'link' | 'image' | 'text'>('none');
  const [isMobile, setIsMobile] = useState(false);

  // Mouse positions using Motion Values for performance (no re-renders on mouse move)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Event listeners to handle interactive states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestLink = target.closest('a') || target.closest('button');
      const closestImage = target.closest('.portfolio-image-container');
      const closestText = target.closest('span') || target.closest('p') || target.closest('h1') || target.closest('h2');

      if (closestImage) {
        setHoveredType('image');
      } else if (closestLink) {
        setHoveredType('link');
      } else if (closestText && closestText.classList.contains('cursor-magnetic')) {
        setHoveredType('text');
      } else {
        setHoveredType('none');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  // Render cursor with distinct animated behaviors depending on hover target
  return (
    <>
      {/* Outer interactive bubble */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 pointer-events-none flex items-center justify-center font-mono mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: hoveredType === 'image' ? 90 : hoveredType === 'link' ? 40 : 16,
          height: hoveredType === 'image' ? 90 : hoveredType === 'link' ? 40 : 16,
          backgroundColor: hoveredType === 'image' ? 'rgba(255, 255, 255, 0.95)' : hoveredType === 'link' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 17, 17, 0.9)',
          color: '#111111',
        }}
        animate={{
          scale: hoveredType !== 'none' ? 1.15 : 1.0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {hoveredType === 'image' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] uppercase font-bold tracking-widest text-[#111111]"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* Inner tiny tracking core */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#E55B3C] rounded-full pointer-events-none z-50 pointer-events-none mix-blend-normal"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoveredType !== 'none' ? 0.5 : 1,
        }}
      />
    </>
  );
}
