// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import { motion, AnimatePresence } from "framer-motion";
// import pavitra from "../images/support/pavitra.png";
// import hospital from "../images/projects/Healthcare/GEIMSHospital/01.jpg";
// import jd from "../images/projects/Hospitality/jd/01.jpg";
// import regal from "../images/support/regal.JPG";

// const slides = [
//   {
//     image: hospital,
//     title: "GEIMS HOSPITAL",
//     text: "A State of the art medical facility designed with patient-centric care.",
//   },
//   {
//     image: pavitra,
//     title: "PAVITRA SAROVAR DEHRADUN",
//     text: "Engineered structures built for people and generations ahead.",
//   },
//   {
//     image: jd,
//     title: "J D CLUB",
//     text: "JD SCHOOL Is a primary school designed on a theme which enhances the learning environment.",
//   },
//   {
//     image: regal,
//     title: "REGAL MANOR",
//     text: "REGAL MANOR Is an exclusive Banquet Hall designed to host luxurious weddings.",
//   },
// ];

// export default function HeroArcadis() {
//   const sliderRef = useRef(null);
//   const startTimeRef = useRef(Date.now());

//   const [progress, setProgress] = useState(0);
//   const [current, setCurrent] = useState(0);

//   const DURATION = 6500;
//   const INTERVAL = 50;

//   /* ===== Auto Slide Progress ===== */
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const elapsed = Date.now() - startTimeRef.current;
//       const percent = Math.min((elapsed / DURATION) * 100, 100);
//       setProgress(percent);

//       if (percent >= 100) {
//         sliderRef.current?.slickNext();
//         startTimeRef.current = Date.now();
//         setProgress(0);
//       }
//     }, INTERVAL);

//     return () => clearInterval(timer);
//   }, []);

//   const resetProgress = () => {
//     startTimeRef.current = Date.now();
//     setProgress(0);
//   };

//   const settings = {
//     infinite: true,
//     arrows: false,
//     dots: false,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     fade: true,
//     swipe: true,
//     beforeChange: (_, next) => {
//       setCurrent(next);
//       resetProgress();
//     },
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   return (
//     <section className="relative h-[100dvh] w-full max-w-full overflow-hidden bg-slate-950 select-none">
//       <Slider ref={sliderRef} {...settings} className="w-full h-full overflow-hidden">
//         {slides.map((slide, index) => {
//           const isActive = current === index;

//           return (
//             <div key={index} className="outline-none w-full max-w-full overflow-hidden">
//               <div className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-8 sm:pb-12 md:pb-16">
                
//                 {/* Natural Background Image */}
//                 <motion.div
//                   key={`bg-${index}-${isActive}`}
//                   initial={{ scale: 1.05 }}
//                   animate={isActive ? { scale: 1.0 } : { scale: 1.05 }}
//                   transition={{ duration: 7, ease: "easeOut" }}
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{
//                     backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2400&q=85)`,
//                   }}
//                 />

//                 {/* Bottom Legibility Scrim */}
//                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

//                 {/* ================= BOTTOM BAR ================= */}
//                 <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
                  
//                   {/* Row 1: Title and Progress Bar aligned on the exact same axis */}
//                   <div className="flex items-center justify-between gap-4">
//                     <AnimatePresence mode="wait">
//                       {isActive && (
//                         <motion.h2
//                           key={`title-${index}`}
//                           initial={{ opacity: 0, y: 8 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -8 }}
//                           transition={{ duration: 0.5 }}
//                           className="text-base sm:text-xl md:text-2xl font-light tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] leading-none"
//                         >
//                           {slide.title}
//                         </motion.h2>
//                       )}
//                     </AnimatePresence>

//                     {/* Progress Bar & Counter */}
//                     <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
//                       <span className="font-mono text-[11px] sm:text-xs text-white/90 tracking-wider">
//                         {String(current + 1).padStart(2, "0")}
//                       </span>

//                       <div className="w-12 sm:w-16 md:w-20 h-[1.5px] bg-white/30 overflow-hidden relative rounded-full">
//                         <div
//                           className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(255,255,255,0.8)]"
//                           style={{ width: `${progress}%` }}
//                         />
//                       </div>

//                       <span className="font-mono text-[11px] sm:text-xs text-white/50 tracking-wider">
//                         {String(slides.length).padStart(2, "0")}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Row 2: Subtitle text below */}
//                   <div className="mt-2 max-w-xl">
//                     <AnimatePresence mode="wait">
//                       {isActive && (
//                         <motion.p
//                           key={`desc-${index}`}
//                           initial={{ opacity: 0, y: 6 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0 }}
//                           transition={{ duration: 0.5, delay: 0.1 }}
//                           className="text-xs sm:text-sm text-neutral-300 font-light tracking-wide leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
//                         >
//                           {slide.text}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>
//     </section>
//   );
// }

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
    fade: true,
    swipe: true,
    beforeChange: (_, next) => {
      setCurrent(next);
      resetProgress();
    },
  };

  return (
    <section className="relative h-[100dvh] w-full max-w-full overflow-hidden bg-slate-950 select-none">
      <Slider ref={sliderRef} {...settings} className="w-full h-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div key={index} className="outline-none w-full max-w-full overflow-hidden">
              {/* Positioned higher up from the bottom */}
              <div className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-14 sm:pb-20 md:pb-28">
                
                {/* Natural Background Image */}
                <motion.div
                  key={`bg-${index}-${isActive}`}
                  initial={{ scale: 1.05 }}
                  animate={isActive ? { scale: 1.0 } : { scale: 1.05 }}
                  transition={{ duration: 7, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2400&q=85)`,
                  }}
                />

                {/* Bottom Legibility Scrim */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* ================= BOTTOM BAR ================= */}
                <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 md:px-16">
                  
                  {/* Row 1: Title and Progress Bar locked to exact baseline */}
                  <div className="flex items-end justify-between gap-3 sm:gap-6">
                    <div className="min-w-0 flex-1">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.h2
                            key={`title-${index}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.45 }}
                            className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.18em] sm:tracking-[0.22em] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight"
                          >
                            {slide.title}
                          </motion.h2>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Progress Bar & Counter */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0 pb-0.5">
                      <span className="font-mono text-[10px] sm:text-xs text-white/90 tracking-wider">
                        {String(current + 1).padStart(2, "0")}
                      </span>

                      <div className="w-10 sm:w-16 md:w-20 h-[1.5px] bg-white/30 overflow-hidden relative rounded-full">
                        <div
                          className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <span className="font-mono text-[10px] sm:text-xs text-white/50 tracking-wider">
                        {String(slides.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Subtitle text below */}
                  <div className="mt-1.5 sm:mt-2 max-w-xl pr-4 sm:pr-0">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key={`desc-${index}`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45, delay: 0.08 }}
                          className="text-[11px] sm:text-xs md:text-sm text-neutral-300 font-light tracking-wide leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] line-clamp-2 sm:line-clamp-none"
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