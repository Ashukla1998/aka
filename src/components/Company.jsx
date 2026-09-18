'use client';

import { motion } from 'framer-motion';

export default function AboutZHA() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 2013;

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

  const lineFade = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full bg-white text-neutral-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden border-b border-neutral-200/70">
      {/* Top Architectural Divider */}
      <motion.div
        variants={lineFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="h-[1px] w-full bg-neutral-200 origin-left mb-12 sm:mb-16"
      />

      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Left Column: Technical Metadata & Headline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Eyebrow / Technical Stamp */}
          <div className="overflow-hidden">
            {/* <motion.div
              variants={maskReveal}
              className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400"
            >
              {/* <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" /> */}
              {/* <span>[ 01 // OVERVIEW ]</span> */}
            {/* </motion.div> */}
          </div>

          {/* Bold Scaled Headline */}
          <div className="overflow-hidden">
            <motion.h2
              variants={maskReveal}
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-950 leading-[1.12]"
            >
              Over <span className="font-semibold">{experienceYears} Years</span> of
              designing, building, and spatial innovation.
            </motion.h2>
          </div>

          {/* Metric Callout */}
          {/* <div className="overflow-hidden pt-4">
            <motion.div variants={maskReveal} className="flex items-baseline gap-4">
              <span className="text-5xl sm:text-6xl font-extralight tracking-tighter text-neutral-900">
                {experienceYears}+
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-500">
                Years of Excellence / Since 2013
              </span>
            </motion.div>
          </div> */}

        </div>

        {/* Right Column: Editorial Paragraphs */}
        <div className="lg:col-span-7 space-y-8 lg:pt-3">
          <div className="overflow-hidden">
            <motion.p
              variants={maskReveal}
              className="text-lg sm:text-xl text-neutral-800 font-normal leading-relaxed tracking-tight"
            >
              Archana Kapil Associates Private Limited (A K Associates) has been providing comprehensive design solutions to a wide variety of built structures. At every scale and in every sector, we work with our clients to create unique spaces which are integrated, contextual, impressionist and sustainable. 
            </motion.p>
          </div>

          {/* <div className="overflow-hidden">
            <motion.p
              variants={maskReveal}
              className="text-sm sm:text-base text-neutral-500 leading-relaxed font-light"
            >
              At every scale and within every sector, we partner closely with our clients to
              conceive distinctive spaces that are structurally integrated, contextual,
              impressionist, and sustainably realized for future generations.
            </motion.p>
          </div> */}

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