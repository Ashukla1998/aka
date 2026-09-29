import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";

import pavitra from "../images/support/pavitra.png";
import hospital from "../images/projects/Healthcare/GEIMSHospital/01.jpg";
import jd from "../images/projects/Hospitality/jd/01.jpg";
import regal from "../images/support/regal.JPG";

const slides = [
  {
    image: hospital,
    title: "GEIMS HOSPITAL",
    text: "A State of the art medical facility designed with patient-centric care.",
  },
  {
    image: pavitra,
    title: "PAVITRA SAROVAR DEHRADUN",
    text: "Engineered structures built for people and generations ahead.",
  },
  {
    image: jd,
    title: "J D CLUB",
    text: "JD SCHOOL Is a primary school designed on a theme which enhances the learning environment.",
  },
  {
    image: regal,
    title: "REGAL MANOR",
    text: "REGAL MANOR Is an exclusive Banquet Hall designed to host luxurious weddings.",
  },
];

export default function HeroArcadis() {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 6500;
  const INTERVAL = 50;

  /* =========================================================
     AUTO SLIDE PROGRESS
  ========================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;

      const percent = Math.min(
        (elapsed / DURATION) * 100,
        100
      );

      setProgress(percent);

      if (percent >= 100) {
        sliderRef.current?.slickNext();

        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  /* =========================================================
     RESET PROGRESS
  ========================================================= */

  const resetProgress = () => {
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  /* =========================================================
     SLIDER SETTINGS
  ========================================================= */

  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: true,

    beforeChange: (_, next) => {
      setCurrent(next);
      resetProgress();
    },
  };

  return (
    <section
      className="
        relative
        w-full
        max-w-full
        overflow-hidden
        bg-slate-950
        select-none
      "
    >
      <Slider
        ref={sliderRef}
        {...settings}
        className="w-full h-full overflow-hidden"
      >
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div
              key={index}
              className="
                outline-none
                w-full
                max-w-full
                overflow-hidden
              "
            >
              {/* =================================================
                  SLIDE
              ================================================= */}

              <div
                className="
                  relative
                  h-[100dvh]
                  w-full
                  overflow-hidden
                "
              >
                {/* =================================================
                    BACKGROUND IMAGE
                ================================================= */}

                <motion.div
                  key={`bg-${index}-${isActive}`}
                  initial={{
                    scale: 1.05,
                  }}
                  animate={
                    isActive
                      ? { scale: 1 }
                      : { scale: 1.05 }
                  }
                  transition={{
                    duration: 7,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                  "
                  style={{
                    backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2400&q=85)`,
                  }}
                />

                {/* =================================================
                    BOTTOM SCRIM
                ================================================= */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-[55%]
                    bg-gradient-to-t
                    from-black/90
                    via-black/40
                    to-transparent
                    pointer-events-none
                  "
                />

                {/* =================================================
                    FIXED CONTENT BLOCK
                    Title + Progress + Description
                ================================================= */}

                <div
                  className="
                    absolute
                    z-10
                    left-0
                    right-0
                    bottom-[90px]
                    sm:bottom-[100px]
                    md:bottom-[110px]
                    lg:bottom-[120px]
                    w-full
                    max-w-[1440px]
                    mx-auto
                    
                  "
                >
                  {/* =================================================
                      TITLE + PROGRESS BAR
                  ================================================= */}

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                      gap-6
                      w-full
                    "
                  >
                    {/* ================= TITLE ================= */}

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.h2
                            key={`title-${index}`}
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -8,
                            }}
                            transition={{
                              duration: 0.5,
                            }}
                            className="
                              text-sm
                              sm:text-lg
                              md:text-xl
                              lg:text-2xl
                              font-light
                              tracking-[0.16em]
                              sm:tracking-[0.2em]
                              text-white
                              uppercase
                              leading-tight
                              break-words
                              drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
                            "
                          >
                            {slide.title}
                          </motion.h2>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ================= PROGRESS ================= */}

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        sm:gap-2.5
                        md:gap-3
                        shrink-0
                        pb-[2px]
                      "
                    >
                      {/* CURRENT NUMBER */}

                      <span
                        className="
                          font-mono
                          text-[10px]
                          sm:text-[11px]
                          md:text-xs
                          text-white/90
                          tracking-wider
                        "
                      >
                        {String(current + 1).padStart(2, "0")}
                      </span>

                      {/* PROGRESS BAR */}

                      <div
                        className="
                          relative
                          w-10
                          sm:w-14
                          md:w-20
                          lg:w-24
                          h-[2px]
                          bg-white/30
                          overflow-hidden
                          rounded-full
                        "
                      >
                        <div
                          className="
                            h-full
                            bg-white
                            transition-all
                            duration-75
                            ease-linear
                            shadow-[0_0_6px_rgba(255,255,255,0.8)]
                          "
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>

                      {/* TOTAL NUMBER */}

                      <span
                        className="
                          font-mono
                          text-[10px]
                          sm:text-[11px]
                          md:text-xs
                          text-white/50
                          tracking-wider
                        "
                      >
                        {String(slides.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <div
                    className="
                      mt-2
                      sm:mt-2.5
                      md:mt-3
                      max-w-[280px]
                      sm:max-w-md
                      md:max-w-lg
                      lg:max-w-xl
                    "
                  >
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key={`desc-${index}`}
                          initial={{
                            opacity: 0,
                            y: 6,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.1,
                          }}
                          className="
                            text-[11px]
                            sm:text-xs
                            md:text-sm
                            text-neutral-300
                            font-light
                            tracking-wide
                            leading-relaxed
                            drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]
                          "
                        >
                          {slide.text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}