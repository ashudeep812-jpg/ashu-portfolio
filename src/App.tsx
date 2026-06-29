/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import NarrativeGrid from './components/NarrativeGrid';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {/* 1. Canvas Interactive Color-Inverting Cursor */}
      <CustomCursor />

      {/* 2. Absolute 0-100% Preloader Overlay Block */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* 3. Primary Webflow/Editorial Canvas */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-full relative bg-bg-primary text-text-primary selection:bg-text-primary selection:text-bg-primary overflow-hidden min-h-screen flex flex-col justify-between"
          >
            {/* Header Sticky Navigation */}
            <Navigation />

            <main className="w-full flex flex-col">
              {/* Section 2: Monolithic Hero Parallax Canvas Row */}
              <Hero />

              {/* Section 3: Asymmetrical Masonry Grid & Sticky Content Card */}
              <NarrativeGrid />

              {/* Section 4: Lead Generator Acquisition Contact Deck */}
              <ContactSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

