// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
// import pavitra from "../images/support/pavitra.png";
// import hospital from "../images/projects/Healthcare/GEIMSHospital/01.jpg";
// import jd from "../images/projects/Hospitality/jd/01.jpg";
// import regal from "../images/support/regal.JPG";

// const slides = [
//   {
//     image: hospital,
//     title: "GEIMS Hospital",
//     text: "A State of the art medical facility designed with patient-centric care",
//   },
//   {
//     image: pavitra,
//     title: "Pavitra Sarovar Dehradun",
//     text: "Engineered structures built for people and generations ahead.",
//   },
//   {
//     image: jd,
//     title: "J D Club",
//     text: "JD SCHOOL Is a primary school designed on a theme which enhances the learning environment.",
//   },
//   {
//     image: regal,
//     title: "Regal Manor",
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
//         delayChildren: 0.15,
//       },
//     },
//   };

//   const wordVariants = {
//     hidden: { y: "115%", opacity: 0 },
//     visible: {
//       y: "0%",
//       opacity: 1,
//       transition: {
//         duration: 0.85,
//         ease: [0.16, 1, 0.3, 1],
//       },
//     },
//   };

//   return (
//     <section className="relative h-[100svh] w-full max-w-full overflow-hidden bg-slate-950 select-none">
//       <Slider ref={sliderRef} {...settings} className="w-full h-full overflow-hidden">
//         {slides.map((slide, index) => {
//           const isActive = current === index;
//           const words = slide.title.split(" ");

//           return (
//             <div key={index} className="outline-none w-full max-w-full overflow-hidden">
//               {/* Bottom aligned flex container to pair with controls */}
//               <div className="relative h-[100svh] w-full overflow-hidden flex items-end pb-24 md:pb-28">
//                 {/* ================= NATURAL BACKGROUND IMAGE (NO BRIGHTNESS FILTER) ================= */}
//                 <motion.div
//                   key={`bg-${index}-${isActive}`}
//                   initial={{ scale: 1.1 }}
//                   animate={isActive ? { scale: 1.0 } : { scale: 1.1 }}
//                   transition={{ duration: 7, ease: "easeOut" }}
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{
//                     backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2400&q=85)`,
//                   }}
//                 />

//                 {/* Soft legibility scrim behind bottom text */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
//                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

//                 {/* ================= ANIMATED TYPOGRAPHY CONTENT ================= */}
//                 <div className="relative z-10 w-full max-w-7xl px-6 sm:px-12 md:px-20 text-white">
//                   <AnimatePresence mode="wait">
//                     {isActive && (
//                       <motion.div
//                         key={`content-${index}`}
//                         variants={containerVariants}
//                         initial="hidden"
//                         animate="visible"
//                         className="space-y-2 max-w-2xl"
//                       >
//                         {/* Compact Kinetic Title */}
//                         <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight flex flex-wrap gap-x-2 gap-y-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
//                           {words.map((word, i) => (
//                             <span
//                               key={i}
//                               className="inline-block overflow-hidden pb-1"
//                             >
//                               <motion.span
//                                 variants={wordVariants}
//                                 className="inline-block"
//                               >
//                                 {word}
//                               </motion.span>
//                             </span>
//                           ))}
//                         </h3>

//                         {/* Compact Subtitle / Description */}
//                         <motion.p
//                           variants={{
//                             hidden: { opacity: 0, y: 12 },
//                             visible: {
//                               opacity: 1,
//                               y: 0,
//                               transition: {
//                                 duration: 0.8,
//                                 delay: 0.25,
//                                 ease: [0.16, 1, 0.3, 1],
//                               },
//                             },
//                           }}
//                           className="text-xs sm:text-sm md:text-base text-neutral-200 font-light max-w-xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
//                         >
//                           {slide.text}
//                         </motion.p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>

//       {/* ================= MOBILE ARROWS ================= */}
//       <div className="md:hidden absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-3">
//         <button
//           onClick={() => {
//             sliderRef.current?.slickPrev();
//             resetProgress();
//           }}
//           className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform"
//           aria-label="Previous Slide"
//         >
//           <ArrowLeftIcon className="w-5 h-5" />
//         </button>

//         <button
//           onClick={() => {
//             sliderRef.current?.slickNext();
//             resetProgress();
//           }}
//           className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform"
//           aria-label="Next Slide"
//         >
//           <ArrowRightIcon className="w-5 h-5" />
//         </button>
//       </div>

//       {/* ================= DESKTOP CONTROLS & COUNTER ================= */}
//       <div className="hidden md:flex absolute bottom-24 right-16 z-30 items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
//         <button
//           onClick={() => {
//             sliderRef.current?.slickPrev();
//             resetProgress();
//           }}
//           className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center"
//           aria-label="Previous Slide"
//         >
//           <ArrowLeftIcon className="w-4 h-4" />
//         </button>

//         <span className="text-xs uppercase tracking-[0.25em] text-white font-mono min-w-[70px] text-center">
//           {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
//         </span>

//         <button
//           onClick={() => {
//             sliderRef.current?.slickNext();
//             resetProgress();
//           }}
//           className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center"
//           aria-label="Next Slide"
//         >
//           <ArrowRightIcon className="w-4 h-4" />
//         </button>
//       </div>

//       {/* ================= ARCHITECTURAL PROGRESS BAR ================= */}
//       <div className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 z-20">
//         <div className="h-[2px] bg-white/20 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-orange-500 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(249,115,22,0.8)]"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative h-[100svh] w-full max-w-full overflow-hidden bg-slate-950 select-none">
      <Slider ref={sliderRef} {...settings} className="w-full h-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div key={index} className="outline-none w-full max-w-full overflow-hidden">
              <div className="relative h-[100svh] w-full overflow-hidden flex items-end pb-12 sm:pb-16 md:pb-20">
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

                {/* Subtle bottom shadow to guarantee legibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* ================= BOTTOM CONTENT ROW ================= */}
                <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  {/* Left: Typography */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={`content-${index}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-1.5 max-w-2xl"
                      >
                        <motion.h2
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                        >
                          {slide.title}
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.15 }}
                          className="text-xs sm:text-sm text-neutral-300 font-light tracking-wide max-w-xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                        >
                          {slide.text}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right: Inline Counter + Progress Line */}
                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0 pb-1">
                    <span className="font-mono text-xs text-white/80 tracking-wider">
                      {String(current + 1).padStart(2, "0")}
                    </span>

                    {/* Progress Track */}
                    <div className="w-16 sm:w-20 md:w-24 h-[1.5px] bg-white/30 overflow-hidden relative rounded-full">
                      <div
                        className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <span className="font-mono text-xs text-white/50 tracking-wider">
                      {String(slides.length).padStart(2, "0")}
                    </span>
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