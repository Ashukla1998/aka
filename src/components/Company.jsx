'use client';

import { motion } from 'framer-motion';

export default function AboutZHA() {
  // const currentYear = new Date().getFullYear();
  // const experienceYears = currentYear - 2013;

  // Masked vertical reveal
  const maskReveal = {
    hidden: { y: '105%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const containerAnim = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // const lineFade = {
  //   hidden: { scaleX: 0, opacity: 0 },
  //   visible: {
  //     scaleX: 1,
  //     opacity: 1,
  //     transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  //   },
  // };

  return (
    <section className="relative w-full bg-white text-neutral-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden border-b border-neutral-200/70">

      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Left Column: Technical Metadata & Headline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Bold Scaled Headline */}
          <div className="overflow-hidden">
            <motion.h2
              variants={maskReveal}
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-950 leading-[1.12]"
            >
              Since <span className="font-semibold">2013</span> 
            </motion.h2>
          </div>
        </div>

        {/* Right Column: Editorial Paragraphs */}
        <div className="lg:col-span-7 space-y-8 lg:pt-3">
          <div className="overflow-hidden">
            <motion.p
              variants={maskReveal}
              className="text-lg sm:text-xl text-neutral-800 font-normal leading-relaxed tracking-tight"
            >
              Archana Kapil Associates has been delivering comprehensive design solutions tailored to your unique story. Driven by our four core principles, we partner with you to shape distinctive spaces that stand the test of time.
            </motion.p>
          </div>

          {/* Architectural Feature Pillars */}
          <div className="overflow-hidden pt-4 border-t border-neutral-100">
            <motion.div
              variants={maskReveal}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono tracking-wider uppercase text-neutral-600"
            >
              <div className="border-l border-neutral-300 pl-3">
                <span className="block text-[10px] text-neutral-400">01</span>
                Integrated
              </div>
              <div className="border-l border-neutral-300 pl-3">
                <span className="block text-[10px] text-neutral-400">02</span>
                Contextual
              </div>
              <div className="border-l border-neutral-300 pl-3">
                <span className="block text-[10px] text-neutral-400">03</span>
                Impressionist
              </div>
              <div className="border-l border-neutral-300 pl-3">
                <span className="block text-[10px] text-neutral-400">04</span>
                Sustainable
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}