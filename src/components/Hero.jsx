import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import pavitra from "../images/support/pavitra.png";
import hospital from "../images/projects/Healthcare/GEIMSHospital/01.jpg";
import jd from "../images/projects/Hospitality/jd/01.jpg";
import regal from "../images/support/regal.JPG";

// Homepage API has no gallerypath, so derive the slug from the cover URL folder:
// .../Projects/<slug>/cover.jpg
const getProjectSlug = (p) => {
  if (p.gallerypath) return p.gallerypath;
  const match = p.cover?.match(/\/Projects\/([^/]+)\//);
  return match ? match[1] : null;
};

const Defaultslides = [
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

export default function HeroArcadis( { projects = [] } ) {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 6500;
  const INTERVAL = 50;

  const activeSlides =
  projects && projects.length > 0
    ? projects.map((p) => ({
        image: p.cover || hospital,
        title: p.title || "Featured Project",
        text: p.description || "",
        slug: getProjectSlug(p),
        projectId: p.projectid,
      }))
    : Defaultslides;

  /* =========================================================
      AUTO SLIDE PROGRESS
  ========================================================= */
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
    infinite: activeSlides.length > 1,
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
    <section className="relative w-full max-w-full overflow-hidden bg-slate-950 select-none">
      <Slider
        ref={sliderRef}
        {...settings}
        className="w-full h-full overflow-hidden"
      >
        {activeSlides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div
              key={index}
              className="outline-none w-full max-w-full overflow-hidden"
            >
              {/* SLIDE */}
              <SlideWrapper slide={slide}>
                {/* BACKGROUND IMAGE */}
                <motion.div
                  key={`bg-${index}-${isActive}`}
                  initial={{ scale: 1.05 }}
                  animate={isActive ? { scale: 1 } : { scale: 1.05 }}
                  transition={{ duration: 7, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  role="img"
                  aria-label={slide.title}
                  style={{
                    backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2400&q=85)`,
                  }}
                />

                {/* BOTTOM SCRIM GRADIENT */}
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* CONTENT CONTAINER */}
                <div className="absolute z-10 left-0 right-0 bottom-[95px] sm:bottom-[105px] md:bottom-[115px] lg:bottom-[130px] w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
                  <div className="w-full">

                    {/* TITLE + PROGRESS (TABLET / DESKTOP) */}
                    <div className="flex items-end justify-between gap-6 w-full">
                      <div className="min-w-0 flex-1">
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.h2
                              key={`title-${index}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.5 }}
                              className="text-white text-xl sm:text-2xl md:text-[26px] lg:text-[30px] font-light uppercase leading-snug tracking-[0.05em] m-0 p-0 drop-shadow-sm"
                            >
                              {slide.title}
                            </motion.h2>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* PROGRESS BAR - TABLET & DESKTOP */}
                      <div className="hidden sm:flex items-center gap-2.5 md:gap-3 shrink-0 pb-[3px]">
                        <span className="font-mono text-[11px] md:text-xs text-white/90 tracking-wider">
                          {String(current + 1).padStart(2, "0")}
                        </span>

                        <div className="relative w-12 sm:w-16 md:w-20 lg:w-24 h-[2px] bg-white/30 overflow-hidden rounded-full">
                          <div
                            className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <span className="font-mono text-[11px] md:text-xs text-white/50 tracking-wider">
                          {String(activeSlides.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-2 md:mt-2.5 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            key={`desc-${index}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-white/85 text-xs sm:text-[13px] md:text-[14px] lg:text-[15px] font-normal leading-relaxed tracking-normal m-0 p-0 drop-shadow-sm"
                          >
                            {slide.text}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* PROGRESS BAR - MOBILE ONLY */}
                    <div className="flex sm:hidden items-center gap-2 mt-4">
                      <span className="font-mono text-[10px] text-white/90 tracking-wider">
                        {String(current + 1).padStart(2, "0")}
                      </span>

                      <div className="relative w-10 h-[2px] bg-white/30 overflow-hidden rounded-full">
                        <div
                          className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <span className="font-mono text-[10px] text-white/50 tracking-wider">
                        {String(activeSlides.length).padStart(2, "0")}
                      </span>
                    </div>

                  </div>
                </div>
              </SlideWrapper>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}

function SlideWrapper({ slide, children }) {
  const className = "relative block h-[100dvh] w-full overflow-hidden";

  if (!slide.slug) return <div className={className}>{children}</div>;

  return (
    <Link
      to={`/projects/${slide.slug}`}
      state={{ projectId: slide.projectId }}
      className={`${className} cursor-pointer outline-none`}
      draggable={false}
    >
      {children}
    </Link>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import { motion, AnimatePresence } from "framer-motion";

// import pavitra from "../images/support/pavitra.png";
// import hospital from "../images/projects/Healthcare/GEIMSHospital/01.jpg";
// import jd from "../images/projects/Hospitality/jd/01.jpg";
// import regal from "../images/support/regal.JPG";

// const defaultSlides = [
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

// export default function HeroArcadis({ projects = [] }) {
//   const sliderRef = useRef(null);
//   const startTimeRef = useRef(Date.now());

//   const [progress, setProgress] = useState(0);
//   const [current, setCurrent] = useState(0);

//   const DURATION = 6500;
//   const INTERVAL = 50;

//   // Use dynamic projects if available, otherwise fallback to static slides
//   const activeSlides =
//     projects && projects.length > 0
//       ? projects.map((p) => ({
//           image: p.cover || hospital,
//           title: p.title || "Featured Project",
//           text: p.description || "",
//         }))
//       : defaultSlides;

//   /* =========================================================
//       AUTO SLIDE PROGRESS
//   ========================================================= */
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

//   /* =========================================================
//       RESET PROGRESS
//   ========================================================= */
//   const resetProgress = () => {
//     startTimeRef.current = Date.now();
//     setProgress(0);
//   };

//   /* =========================================================
//       SLIDER SETTINGS
//   ========================================================= */
//   const settings = {
//     infinite: activeSlides.length > 1,
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

//   return (
//     <section className="relative w-full max-w-full overflow-hidden bg-slate-950 select-none">
//       <Slider
//         ref={sliderRef}
//         {...settings}
//         className="w-full h-full overflow-hidden"
//       >
//         {activeSlides.map((slide, index) => {
//           const isActive = current === index;

//           return (
//             <div
//               key={index}
//               className="outline-none w-full max-w-full overflow-hidden"
//             >
//               {/* SLIDE */}
//               <div className="relative h-[100dvh] w-full overflow-hidden">
//                 {/* BACKGROUND IMAGE */}
//                 <motion.div
//                   key={`bg-${index}-${isActive}`}
//                   initial={{ scale: 1.05 }}
//                   animate={isActive ? { scale: 1 } : { scale: 1.05 }}
//                   transition={{ duration: 7, ease: "easeOut" }}
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{
//                     backgroundImage: `url(${slide.image})`,
//                   }}
//                 />

//                 {/* BOTTOM SCRIM GRADIENT */}
//                 <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

//                 {/* CONTENT CONTAINER */}
//                 <div className="absolute z-10 left-0 right-0 bottom-[95px] sm:bottom-[105px] md:bottom-[115px] lg:bottom-[130px] w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
//                   <div className="w-full">
//                     {/* TITLE + PROGRESS (TABLET / DESKTOP) */}
//                     <div className="flex items-end justify-between gap-6 w-full">
//                       <div className="min-w-0 flex-1">
//                         <AnimatePresence mode="wait">
//                           {isActive && (
//                             <motion.h2
//                               key={`title-${index}`}
//                               initial={{ opacity: 0, y: 8 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               exit={{ opacity: 0, y: -8 }}
//                               transition={{ duration: 0.5 }}
//                               className="text-white text-xl sm:text-2xl md:text-[26px] lg:text-[30px] font-light uppercase leading-snug tracking-[0.05em] m-0 p-0 drop-shadow-sm"
//                             >
//                               {slide.title}
//                             </motion.h2>
//                           )}
//                         </AnimatePresence>
//                       </div>

//                       {/* PROGRESS BAR - TABLET & DESKTOP */}
//                       <div className="hidden sm:flex items-center gap-2.5 md:gap-3 shrink-0 pb-[3px]">
//                         <span className="font-mono text-[11px] md:text-xs text-white/90 tracking-wider">
//                           {String(current + 1).padStart(2, "0")}
//                         </span>

//                         <div className="relative w-12 sm:w-16 md:w-20 lg:w-24 h-[2px] bg-white/30 overflow-hidden rounded-full">
//                           <div
//                             className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(255,255,255,0.8)]"
//                             style={{ width: `${progress}%` }}
//                           />
//                         </div>

//                         <span className="font-mono text-[11px] md:text-xs text-white/50 tracking-wider">
//                           {String(activeSlides.length).padStart(2, "0")}
//                         </span>
//                       </div>
//                     </div>

//                     {/* DESCRIPTION */}
//                     <div className="mt-2 md:mt-2.5 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
//                       <AnimatePresence mode="wait">
//                         {isActive && (
//                           <motion.p
//                             key={`desc-${index}`}
//                             initial={{ opacity: 0, y: 6 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.5, delay: 0.1 }}
//                             className="text-white/85 text-xs sm:text-[13px] md:text-[14px] lg:text-[15px] font-normal leading-relaxed tracking-normal m-0 p-0 drop-shadow-sm"
//                           >
//                             {slide.text}
//                           </motion.p>
//                         )}
//                       </AnimatePresence>
//                     </div>

//                     {/* PROGRESS BAR - MOBILE ONLY */}
//                     <div className="flex sm:hidden items-center gap-2 mt-4">
//                       <span className="font-mono text-[10px] text-white/90 tracking-wider">
//                         {String(current + 1).padStart(2, "0")}
//                       </span>

//                       <div className="relative w-10 h-[2px] bg-white/30 overflow-hidden rounded-full">
//                         <div
//                           className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(255,255,255,0.8)]"
//                           style={{ width: `${progress}%` }}
//                         />
//                       </div>

//                       <span className="font-mono text-[10px] text-white/50 tracking-wider">
//                         {String(activeSlides.length).padStart(2, "0")}
//                       </span>
//                     </div>
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