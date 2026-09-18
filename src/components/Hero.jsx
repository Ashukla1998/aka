import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    tagline: "Sustainable Architecture",
    title: "Improving quality of life",
    text: "Through sustainable design and continuous spatial innovation.",
  },
  {
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    tagline: "Urban Planning",
    title: "Resilient cities for tomorrow",
    text: "Engineered structures built for people and generations ahead.",
  },
  {
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    tagline: "Digital Craft",
    title: "Engineering high impact",
    text: "Where analytical insight converges with structural elegance.",
  },
  {
    image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4",
    tagline: "Parametric Design",
    title: "Designing tomorrow today",
    text: "Redefining form, light, and architectural boundaries.",
  },
];

export default function HeroArcadis() {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 6500;
  const INTERVAL = 50;

  /* ===== Auto Slide Progress ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(percent);

      if (percent >= 100) {
        sliderRef.current?.slickNext();
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const resetProgress = () => {
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Seamless cinematic fade between architectural photos
    swipe: true,
    beforeChange: (_, next) => {
      setCurrent(next);
      resetProgress();
    },
  };

  // Motion variants for kinetic text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // ZHA luxury cubic-bezier easing
      },
    },
  };

  return (
    <section className="relative h-[100svh] overflow-hidden bg-slate-950 rounded-[25px] select-none">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => {
          const isActive = current === index;
          const words = slide.title.split(" ");

          return (
            <div key={index} className="outline-none">
              <div className="relative h-[100svh] w-full overflow-hidden flex items-center">
                {/* ================= BACKGROUND IMAGE WITH SLOW DRIFT ================= */}
                <motion.div
                  key={`bg-${index}-${isActive}`}
                  initial={{ scale: 1.15, filter: "brightness(0.55)" }}
                  animate={
                    isActive
                      ? { scale: 1.0, filter: "brightness(0.65)" }
                      : { scale: 1.15, filter: "brightness(0.4)" }
                  }
                  transition={{ duration: 7, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2400&q=85)`,
                  }}
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                {/* ================= ANIMATED TYPOGRAPHY CONTENT ================= */}
                <div className="relative z-10 w-full max-w-7xl px-6 sm:px-12 md:px-20 text-white">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={`content-${index}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                      >
                        {/* Eyebrow / Tagline */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.6, ease: "easeOut" },
                            },
                          }}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-300"
                        >
                          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                          {slide.tagline}
                        </motion.div>

                        {/* Masked Kinetic Title */}
                        <h1 className="text-[34px] sm:text-[48px] md:text-[62px] lg:text-[76px] font-bold leading-[1.05] tracking-tight max-w-5xl flex flex-wrap gap-x-3 gap-y-1">
                          {words.map((word, i) => (
                            <span
                              key={i}
                              className="inline-block overflow-hidden pb-2"
                            >
                              <motion.span
                                variants={wordVariants}
                                className="inline-block"
                              >
                                {word}
                              </motion.span>
                            </span>
                          ))}
                        </h1>

                        {/* Subtitle */}
                        <motion.p
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.8,
                                delay: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                              },
                            },
                          }}
                          className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed"
                        >
                          {slide.text}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.7,
                                delay: 0.5,
                                ease: "easeOut",
                              },
                            },
                          }}
                          className="pt-4"
                        >
                          <Link to="/projects">
                            <button className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-slate-950 text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl shadow-black/40 active:scale-95 group">
                              Explore Our Work
                              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      {/* ================= MOBILE ARROWS ================= */}
      <div className="md:hidden absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-3">
        <button
          onClick={() => {
            sliderRef.current?.slickPrev();
            resetProgress();
          }}
          className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform"
          aria-label="Previous Slide"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            sliderRef.current?.slickNext();
            resetProgress();
          }}
          className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform"
          aria-label="Next Slide"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* ================= DESKTOP CONTROLS & COUNTER ================= */}
      <div className="hidden md:flex absolute bottom-16 right-16 z-30 items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
        <button
          onClick={() => {
            sliderRef.current?.slickPrev();
            resetProgress();
          }}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center"
          aria-label="Previous Slide"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>

        <span className="text-xs uppercase tracking-[0.25em] text-white font-mono min-w-[70px] text-center">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        <button
          onClick={() => {
            sliderRef.current?.slickNext();
            resetProgress();
          }}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center"
          aria-label="Next Slide"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* ================= MINIMAL ARCHITECTURAL PROGRESS BAR ================= */}
      <div className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 z-20">
        <div className="h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(249,115,22,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}