// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// // import {
// //   ArrowLeftIcon,
// //   ArrowRightIcon,
// // } from "@heroicons/react/24/outline";

// /**
//  * ProjectImageSlider
//  * @param {string[]} images - array of image URLs
//  */
// export default function ProjectImageSlider({ images = [] , title = "Project" }) {
//   const sliderRef = useRef(null);
//   const startTimeRef = useRef(Date.now());

//   const [progress, setProgress] = useState(0);
//   const [current, setCurrent] = useState(0);

//   const DURATION = 5000; // slide duration (ms)
//   const INTERVAL = 50;

//   /* ================= AUTO SLIDE + PROGRESS ================= */
//   useEffect(() => {
//     if (!images.length) return;

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
//   }, [images.length]);

//   const resetProgress = () => {
//     startTimeRef.current = Date.now();
//     setProgress(0);
//   };

//   const settings = {
//     infinite: images.length > 1,
//     arrows: false,
//     dots: false,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipe: true,
//     beforeChange: (_, next) => {
//       setCurrent(next);
//       resetProgress();
//     },
//   };

//   if (!images.length) return null;

//   return (
//     <section className="relative bg-white">

//       {/* ================= SLIDER ================= */}
//       <Slider ref={sliderRef} {...settings}>
//         {images.map((img, i) => (
//           <div key={i}>
//             <div className="px-6 md:px-24">
//               <img
//                 src={img}
//                 alt={`${title} view ${i + 1}`}
//                 className="w-full max-h-[75vh] object-contain"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         ))}
//       </Slider>

//       {/* ================= ARROWS ================= */}
//       {/* {images.length > 1 && (
//         <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 pointer-events-none">
//           <button
//             onClick={() => {
//               sliderRef.current?.slickPrev();
//               resetProgress();
//             }}
//             className="pointer-events-auto w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
//           >
//             <ArrowLeftIcon className="w-5 h-5 text-arcadisOrange" />
//           </button>

//           <button
//             onClick={() => {
//               sliderRef.current?.slickNext();
//               resetProgress();
//             }}
//             className="pointer-events-auto w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
//           >
//             <ArrowRightIcon className="w-5 h-5 text-arcadisOrange" />
//           </button>
//         </div>
//       )} */}

//       {/* ================= PROGRESS + COUNTER ================= */}
//       {images.length > 1 && (
//         <div className="mt-6 px-6 md:px-24">
//           <div className="h-[2px] bg-gray-200">
//             <div
//               className="h-full bg-arcadisOrange transition-all duration-75 ease-linear"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           <p className="mt-3 text-xs tracking-widest text-gray-500 text-center">
//             {String(current + 1).padStart(2, "0")} /{" "}
//             {String(images.length).padStart(2, "0")}
//           </p>
//         </div>
//       )}

//     </section>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

/**
 * ProjectImageSlider
 *
 * @param {Array} projects - array of project objects
 * @param {string} title - slider title
 */
export default function ProjectImageSlider({
  projects = [],
  title = "Project",
}) {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 5000;
  const INTERVAL = 50;

  /* =========================================================
     AUTO SLIDE + PROGRESS
  ========================================================= */

  useEffect(() => {
    if (!projects.length) return;

    const timer = setInterval(() => {
      const elapsed =
        Date.now() - startTimeRef.current;

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
  }, [projects.length]);

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
    infinite: projects.length > 1,
    arrows: false,
    dots: false,

    speed: 700,

    slidesToShow: 1,
    slidesToScroll: 1,

    swipe: true,
    draggable: true,

    beforeChange: (_, next) => {
      setCurrent(next);
      resetProgress();
    },
  };

  if (!projects.length) return null;

  return (
    <section className="relative w-full bg-white">

      {/* =====================================================
          IMAGE SLIDER
      ===================================================== */}

      <Slider
        ref={sliderRef}
        {...settings}
      >
        {projects.map((project, i) => (
          <div key={project.slug || i}>
            <Link
              to={`/projects/${project.slug}`}
              className="
                block
                group
                cursor-pointer
                outline-none
              "
            >
              <div className="px-0 sm:px-2 md:px-4 lg:px-6">

                <div
                  className="
                    relative
                    w-full
                    overflow-hidden
                    bg-gray-100
                    h-[220px]
                    sm:h-[280px]
                    md:h-[340px]
                    lg:h-[390px]
                  "
                >

                  {/* ================= IMAGE ================= */}

                  <img
                    src={project.cover}
                    alt={
                      project.title ||
                      `${title} view ${i + 1}`
                    }
                    className="
                      w-full
                      h-full
                      object-cover

                      transition-transform
                      duration-700
                      ease-out

                      group-hover:scale-[1.03]
                    "
                    loading={
                      i === 0
                        ? "eager"
                        : "lazy"
                    }
                  />

                  {/* ================= OVERLAY ================= */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/50
                      via-transparent
                      to-transparent

                      opacity-60
                      group-hover:opacity-80

                      transition-opacity
                      duration-300
                    "
                  />

                  {/* ================= PROJECT INFO ================= */}

                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      bottom-0
                      p-4
                      sm:p-5
                      md:p-6

                      text-white
                    "
                  >

                    {project.location && (
                      <p
                        className="
                          text-[9px]
                          sm:text-[10px]
                          uppercase
                          tracking-[0.18em]
                          text-white/70
                          font-mono
                          mb-1
                        "
                      >
                        {project.location}

                        {project.year &&
                          ` · ${project.year}`}
                      </p>
                    )}

                    <div
                      className="
                        flex
                        items-end
                        justify-between
                        gap-4
                      "
                    >
                      <h3
                        className="
                          text-lg
                          sm:text-xl
                          md:text-2xl
                          font-medium
                          leading-tight
                        "
                      >
                        {project.title}
                      </h3>

                      {/* ================= ARROW ================= */}

                      <span
                        className="
                          shrink-0
                          w-9
                          h-9

                          rounded-full
                          border
                          border-white/60

                          flex
                          items-center
                          justify-center

                          text-white

                          opacity-0
                          translate-x-2

                          group-hover:opacity-100
                          group-hover:translate-x-0

                          transition-all
                          duration-300
                        "
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>

      {/* =====================================================
          PROGRESS + COUNTER
      ===================================================== */}

      {projects.length > 1 && (
        <div
          className="
            mt-4
            sm:mt-5
            px-0
            sm:px-2
            md:px-4
            lg:px-6
          "
        >

          {/* ================= PROGRESS BAR ================= */}

          <div className="h-[2px] bg-gray-200">
            <div
              className="
                h-full
                bg-arcadisOrange
                transition-all
                duration-75
                ease-linear
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* ================= COUNTER ================= */}

          <p
            className="
              mt-3
              text-xs
              tracking-widest
              text-gray-500
              text-right
              font-mono
            "
          >
            {String(current + 1).padStart(2, "0")}
            {" / "}
            {String(projects.length).padStart(2, "0")} Projects
          </p>

        </div>
      )}

    </section>
  );
}