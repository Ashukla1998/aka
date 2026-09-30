// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FullProjects } from "../Data/ProjectData";
// import ProjectImageSlider from "../components/ProjectImageSlider";

// const categories = [
//   "All",
//   "Healthcare",
//   "Educational",
//   "Housing",
//   "Hospitality",
//   "Commercial",
//   "Public",
//   "Residential",
// ];

// const ITEMS_PER_PAGE = 6;

// export default function Projects() {
//   const [active, setActive] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const gridRef = useRef(null);

//   /* ================= FILTER ================= */
//   const filtered =
//     active === "All"
//       ? FullProjects
//       : FullProjects.filter((p) => p.category === active);

//   /* ================= RESET PAGE ON FILTER ================= */
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [active]);

//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedProjects = filtered.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   /* ================= SCROLL ================= */
//   useEffect(() => {
//     gridRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentPage]);

//   return (
//     <main className="bg-white">

//       {/* ================= HERO ================= */}
//       <section className="px-10 md:px-20 pt-28 pb-32 border-b border-gray-100">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

//           <div className="md:col-span-5">
//             <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-6">
//               Our Work
//             </p>

//             <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
//               Explore Projects
//             </h1>

//             <p className="text-gray-600 max-w-md leading-relaxed">
//               A curated selection of architectural, urban, and interior projects
//               shaped by context, purpose, and long-term impact.
//             </p>
//           </div>

//           <div className="md:col-span-7">
//             <ProjectImageSlider
//               images={filtered.map((p) => p.cover)}
//               title="Featured Projects"
//             />
//           </div>

//         </div>
//       </section>

//       {/* ================= FILTER BAR ================= */}
//       <section className="sticky top-[72px] z-30 bg-white border-b border-gray-100">
//         <div className="px-10 md:px-20 py-6 flex flex-wrap items-center justify-between gap-6">

//           <div className="flex flex-wrap gap-8 text-sm font-medium">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActive(cat)}
//                 className={`relative pb-1 transition-colors
//                   ${
//                     active === cat
//                       ? "text-arcadisOrange"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//               >
//                 {cat}
//                 {active === cat && (
//                   <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-arcadisOrange" />
//                 )}
//               </button>
//             ))}
//           </div>

//           <p className="text-sm text-gray-500">
//             Showing{" "}
//             <span className="text-gray-900 font-medium">
//               {startIndex + 1}–
//               {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
//             </span>{" "}
//             of{" "}
//             <span className="text-gray-900 font-medium">
//               {filtered.length}
//             </span>
//           </p>

//         </div>
//       </section>

//       {/* ================= PROJECT GRID ================= */}
//       <section ref={gridRef} className="px-10 md:px-20 py-24">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

//           {paginatedProjects.map((p, i) => (
//             <Link key={p.slug} to={`/projects/${p.slug}`}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.08, duration: 0.6 }}
//                 className="group cursor-pointer"
//               >

//                 {/* ===== CARD ===== */}
//                 <div
//                   className="
//                     relative overflow-hidden
//                     bg-gray-100
//                     shadow-sm
//                     transition-shadow duration-500
//                     hover:shadow-lg rounded-lg
//                   "
//                 >

//                   {/* Image */}
//                   <img
//                     src={p.cover}
//                     alt={p.title}
//                     className="
//                       w-full h-[320px]
//                       object-cover
//                       transition-transform duration-700 ease-out
//                       group-hover:scale-105
//                     "
//                   />

//                   {/* Gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

//                   {/* Content */}
//                   <div className="absolute inset-0 flex flex-col justify-end p-6">
//                     <p className="text-sm text-white/80 mb-1">
//                       {p.location}
//                       {p.year && ` · ${p.year}`}
//                     </p>

//                     <div className="flex items-center justify-between gap-4">
//                       <h3 className="text-lg font-medium text-white leading-snug">
//                         {p.title}
//                       </h3>

//                       <div
//                         className="
//                           w-9 h-9 rounded-full
//                           border border-white/60
//                           flex items-center justify-center
//                           translate-x-2 opacity-0
//                           group-hover:translate-x-0 group-hover:opacity-100
//                           transition-all duration-300
//                         "
//                       >
//                         →
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//               </motion.div>
//             </Link>
//           ))}

//         </div>
//       </section>

//       {/* ================= PAGINATION ================= */}
//       {totalPages > 1 && (
//         <section className="pb-36">
//           <div className="flex items-center justify-center gap-2 text-sm font-medium">

//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 text-gray-600 disabled:opacity-40"
//             >
//               Prev
//             </button>

//             {Array.from({ length: totalPages }).map((_, i) => {
//               const page = i + 1;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`w-10 h-10
//                     ${
//                       currentPage === page
//                         ? "text-arcadisOrange border-b-2 border-arcadisOrange"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() =>
//                 setCurrentPage((p) => Math.min(p + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 text-gray-600 disabled:opacity-40"
//             >
//               Next
//             </button>

//           </div>
//         </section>
//       )}

//     </main>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FullProjects } from "../Data/ProjectData";
import ProjectImageSlider from "../components/ProjectImageSlider";

const categories = [
  "Healthcare",
  "Educational",
  "Housing",
  "Hospitality",
  "Commercial",
  "Public",
  "Residential",
];

const ITEMS_PER_PAGE = 5;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState("All");
  const [activeCompletion, setActiveCompletion] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const gridRef = useRef(null);

  /* =========================================================
     SERVICE OPTIONS
     Get services directly from ProjectData
  ========================================================= */

  const services = [
    ...new Set(
      FullProjects
        .map((project) => project.work)
        .filter(Boolean)
    ),
  ];

  /* =========================================================
     FILTER PROJECTS
  ========================================================= */

  const filtered = FullProjects.filter((project) => {
    /* ================= CATEGORY ================= */

    const categoryMatch =
      activeCategory === "All" ||
      project.category === activeCategory;

    /* ================= SERVICE ================= */

    const serviceMatch =
      activeService === "All" ||
      project.service === activeService;

    /* ================= COMPLETION ================= */

    let completionMatch = true;

    if (activeCompletion !== "All") {
      const [min, max] = activeCompletion
        .split("-")
        .map(Number);

      const completion = Number(
        project.complete_percent || 0
      );

      completionMatch =
        completion >= min &&
        completion <= max;
    }

    return (
      categoryMatch &&
      serviceMatch &&
      completionMatch
    );
  });

  /* =========================================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeCategory,
    activeService,
    activeCompletion,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filtered.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProjects = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );


  useEffect(() => {
    if (currentPage > 1) {
      gridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveService("All");
    setActiveCompletion("All");
    setCurrentPage(1);
  };

  const ProjectCard = ({ project, index }) => {
    const isFirst = index === 0;
    const isLast = index === 5;

    const isLarge = isFirst || isLast;

    return (
      <Link
        to={`/projects/${project.slug}`}
        className={`
          project-card
          group
          relative
          block
          overflow-hidden
          bg-gray-100

          ${isFirst ? "project-large-first" : ""}
          ${isLast ? "project-large-last" : ""}
          ${
            !isFirst && !isLast
              ? "project-small"
              : ""
          }
        `}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-50px",
          }}
          transition={{
            delay: (index % 5) * 0.08,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="relative w-full h-full"
        >
          <img
            src={project.cover}
            alt={project.title}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/75
              via-black/20
              to-transparent
              opacity-90
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          {/* =================================================
              PROJECT CONTENT
          ================================================= */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              p-4
              sm:p-5
              md:p-6
            "
          >
            {/* ================= LOCATION / YEAR ================= */}

            <p
              className="
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                text-white/70
                uppercase
                tracking-[0.15em]
                font-mono
                mb-1.5
              "
            >
              {project.location}

              {project.year &&
                ` · ${project.year}`}
            </p>

            {/* ================= TITLE ================= */}

            <div
              className="
                flex
                items-end
                justify-between
                gap-3
              "
            >
              <h3
                className={`
                  text-white
                  font-medium
                  leading-tight

                  ${
                    isLarge
                      ? "text-lg sm:text-xl md:text-2xl"
                      : "text-sm sm:text-base md:text-lg"
                  }
                `}
              >
                {project.title}
              </h3>

              {/* ================= ARROW ================= */}

              <div
                className="
                  shrink-0
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-full
                  border
                  border-white/60
                  flex
                  items-center
                  justify-center
                  text-white
                  text-sm
                  translate-x-2
                  opacity-0
                  group-hover:translate-x-0
                  group-hover:opacity-100
                  transition-all
                  duration-300
                "
              >
                →
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  return (
    <main className="bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          px-5
          sm:px-8
          md:px-12
          lg:px-20

          pt-24
          sm:pt-28
          md:pt-32

          pb-20
          md:pb-32

          border-b
          border-gray-100
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-12

            gap-12
            md:gap-16

            items-center
          "
        >

          {/* ================= HERO TEXT ================= */}

          <div className="md:col-span-5">

            <p
              className="
                text-[10px]
                sm:text-xs
                tracking-[0.35em]
                uppercase
                text-gray-500
                mb-5
                sm:mb-6
              "
            >
              Our Work
            </p>

            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-semibold
                leading-tight
                mb-5
                sm:mb-6
              "
            >
              Explore Projects
            </h1>

            <p
              className="
                text-sm
                sm:text-base
                text-gray-600
                max-w-md
                leading-relaxed
              "
            >
              A curated selection of architectural,
              urban, and interior projects shaped by
              context, purpose, and long-term impact.
            </p>
          </div>

          {/* ================= FEATURED SLIDER ================= */}

          <div className="md:col-span-7">
            <ProjectImageSlider
              images={filtered.map(
                (project) => project.cover
              )}
              title="Featured Projects"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FILTER BAR
      ========================================================= */}

      <section
        className="
          sticky
          top-[72px]
          z-30
          bg-white
          border-b
          border-gray-100
        "
      >
        <div
          className="
            px-5
            sm:px-8
            md:px-12
            lg:px-20

            py-5
            sm:py-6

            flex
            flex-col
            lg:flex-row

            lg:items-center
            lg:justify-between

            gap-5
            lg:gap-6
          "
        >

          {/* =====================================================
              FILTERS
          ===================================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
              sm:gap-4
            "
          >

            {/* =================================================
                CATEGORY
            ================================================= */}

            <div className="relative">

              <select
                value={activeCategory}
                onChange={(e) =>
                  setActiveCategory(e.target.value)
                }
                className="
                  appearance-none
                  min-w-[150px]
                  sm:min-w-[170px]

                  bg-white
                  border
                  border-gray-300

                  px-4
                  py-3
                  pr-10

                  text-xs
                  sm:text-sm

                  text-gray-700

                  outline-none
                  cursor-pointer

                  hover:border-gray-500
                  focus:border-gray-900

                  transition-colors
                "
              >
                <option value="All">
                  Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              <span
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  text-xs
                "
              >
                ↓
              </span>
            </div>

            {/* =================================================
                SERVICE
            ================================================= */}

            <div className="relative">

              <select
                value={activeService}
                onChange={(e) =>
                  setActiveService(e.target.value)
                }
                className="
                  appearance-none
                  min-w-[150px]
                  sm:min-w-[170px]

                  bg-white
                  border
                  border-gray-300

                  px-4
                  py-3
                  pr-10

                  text-xs
                  sm:text-sm

                  text-gray-700

                  outline-none
                  cursor-pointer

                  hover:border-gray-500
                  focus:border-gray-900

                  transition-colors
                "
              >
                <option value="All">
                  Service
                </option>

                {services.map((service) => (
                  <option
                    key={service}
                    value={service}
                  >
                    {service}
                  </option>
                ))}
              </select>

              <span
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  text-xs
                "
              >
                ↓
              </span>
            </div>

            {/* =================================================
                % COMPLETE
            ================================================= */}

            <div className="relative">

              <select
                value={activeCompletion}
                onChange={(e) =>
                  setActiveCompletion(
                    e.target.value
                  )
                }
                className="
                  appearance-none
                  min-w-[150px]
                  sm:min-w-[170px]

                  bg-white
                  border
                  border-gray-300

                  px-4
                  py-3
                  pr-10

                  text-xs
                  sm:text-sm

                  text-gray-700

                  outline-none
                  cursor-pointer

                  hover:border-gray-500
                  focus:border-gray-900

                  transition-colors
                "
              >
                <option value="All">
                  % Complete
                </option>

                <option value="0-25">
                  0–25%
                </option>

                <option value="26-50">
                  26–50%
                </option>

                <option value="51-75">
                  51–75%
                </option>

                <option value="76-100">
                  76–100%
                </option>
              </select>

              <span
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  text-xs
                "
              >
                ↓
              </span>
            </div>

            {/* =================================================
                RESET
            ================================================= */}

            {(activeCategory !== "All" ||
              activeService !== "All" ||
              activeCompletion !== "All") && (
              <button
                onClick={resetFilters}
                className="
                  px-4
                  py-3

                  text-[10px]
                  sm:text-xs

                  uppercase
                  tracking-[0.15em]

                  text-gray-500
                  hover:text-gray-900

                  transition-colors
                "
              >
                Reset
              </button>
            )}
          </div>

          {/* =====================================================
              PROJECT COUNT
          ===================================================== */}

          <p
            className="
              text-xs
              sm:text-sm
              text-gray-500
              shrink-0
            "
          >
            Showing{" "}

            {filtered.length > 0 ? (
              <>
                <span className="text-gray-900 font-medium">
                  {startIndex + 1}–
                  {Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    filtered.length
                  )}
                </span>

                {" "}of{" "}

                <span className="text-gray-900 font-medium">
                  {filtered.length}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-medium">
                0
              </span>
            )}
          </p>
        </div>
      </section>

      {/* =========================================================
          PROJECT GRID
      ========================================================= */}

      <section
        ref={gridRef}
        className="
          px-5
          sm:px-8
          md:px-12
          lg:px-20

          py-16
          sm:py-20
          md:py-24
        "
      >
        {paginatedProjects.length > 0 ? (

          <div className="project-grid w-full">

            {paginatedProjects.map(
              (project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              )
            )}

          </div>

        ) : (

          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <div
            className="
              min-h-[300px]
              flex
              items-center
              justify-center
              text-center
            "
          >
            <div>

              <p
                className="
                  text-gray-500
                  text-sm
                  mb-3
                "
              >
                No projects found.
              </p>

              <button
                onClick={resetFilters}
                className="
                  text-sm
                  text-arcadisOrange
                  hover:underline
                "
              >
                Clear filters
              </button>

            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          PAGINATION
      ========================================================= */}

      {totalPages > 1 && (
        <section className="pb-24 sm:pb-28 md:pb-36">

          <div
            className="
              flex
              items-center
              justify-center

              gap-1
              sm:gap-2

              text-xs
              sm:text-sm

              font-medium
            "
          >

            {/* ================= PREV ================= */}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.max(p - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="
                px-3
                sm:px-4
                py-2

                text-gray-600

                disabled:opacity-40

                hover:text-gray-900

                transition-colors
              "
            >
              Prev
            </button>

            {/* ================= PAGE NUMBERS ================= */}

            {Array.from({
              length: totalPages,
            }).map((_, i) => {

              const page = i + 1;

              return (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`
                    w-9
                    h-9

                    sm:w-10
                    sm:h-10

                    transition-colors

                    ${
                      currentPage === page
                        ? "text-arcadisOrange border-b-2 border-arcadisOrange"
                        : "text-gray-600 hover:text-gray-900"
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}

            {/* ================= NEXT ================= */}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(
                    p + 1,
                    totalPages
                  )
                )
              }
              disabled={
                currentPage === totalPages
              }
              className="
                px-3
                sm:px-4
                py-2

                text-gray-600

                disabled:opacity-40

                hover:text-gray-900

                transition-colors
              "
            >
              Next
            </button>

          </div>
        </section>
      )}

      {/* =========================================================
          RESPONSIVE PROJECT GRID
      ========================================================= */}

      <style>{`

        /* =====================================================
           DESKTOP

           ┌─────────────────┬───────────┬───────────┐
           │                 │ Project 2 │ Project 3 │
           │                 ├───────────┼───────────┤
           │    Project 1    │ Project 4 │ Project 5 │
           │                 │           │           │
           └─────────────────┴───────────┴───────────┘

           Project 6 = large image below
        ===================================================== */

        .project-grid {
          display: grid;

          grid-template-columns:
            2fr
            1fr
            1fr;

          grid-template-rows:
            repeat(
              2,
              minmax(220px, 28vw)
            );

          gap: 16px;
        }


        /* ================= PROJECT 1 ================= */

        .project-large-first {
          grid-column: 1;
          grid-row: 1 / span 2;
        }


        /* ================= PROJECT 2 ================= */

        .project-small:nth-child(2) {
          grid-column: 2;
          grid-row: 1;
        }


        /* ================= PROJECT 3 ================= */

        .project-small:nth-child(3) {
          grid-column: 3;
          grid-row: 1;
        }


        /* ================= PROJECT 4 ================= */

        .project-small:nth-child(4) {
          grid-column: 2;
          grid-row: 2;
        }


        /* ================= PROJECT 5 ================= */

        .project-small:nth-child(5) {
          grid-column: 3;
          grid-row: 2;
        }


        /* ================= PROJECT 6 ================= */

        .project-large-last {
          grid-column: 1 / span 3;
          grid-row: 3;

          min-height: 420px;
        }


        /* =====================================================
           EXTRA PROJECTS
        ===================================================== */

        .project-grid > :nth-child(n + 7) {
          grid-column: auto;
          grid-row: auto;

          min-height: 280px;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (
          max-width: 1023px
        ) and (
          min-width: 640px
        ) {

          .project-grid {
            grid-template-columns:
              2fr
              1fr
              1fr;

            grid-template-rows:
              repeat(
                2,
                260px
              );

            gap: 12px;
          }


          .project-large-first {
            grid-column: 1;
            grid-row: 1 / span 2;
          }


          .project-small:nth-child(2) {
            grid-column: 2;
            grid-row: 1;
          }


          .project-small:nth-child(3) {
            grid-column: 3;
            grid-row: 1;
          }


          .project-small:nth-child(4) {
            grid-column: 2;
            grid-row: 2;
          }


          .project-small:nth-child(5) {
            grid-column: 3;
            grid-row: 2;
          }


          .project-large-last {
            grid-column: 1 / span 3;
            grid-row: 3;

            min-height: 350px;
          }
        }


        /* =====================================================
           MOBILE

           ┌──────────────────────┐
           │                      │
           │      Project 1       │
           │                      │
           └──────────────────────┘

           ┌──────────┬───────────┐
           │ Project2 │ Project 3 │
           ├──────────┼───────────┤
           │ Project4│ Project 5 │
           └──────────┴───────────┘

           ┌──────────────────────┐
           │      Project 6       │
           └──────────────────────┘
        ===================================================== */

        @media (max-width: 639px) {

          .project-grid {
            display: grid;

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            grid-template-rows: auto;

            gap: 10px;
          }


          /* ================= FIRST LARGE ================= */

          .project-large-first {
            grid-column: 1 / span 2;
            grid-row: auto;

            height: 65vw;

            min-height: 280px;
            max-height: 430px;
          }


          /* ================= SMALL PROJECTS ================= */

          .project-small {
            grid-column: span 1;
            grid-row: auto;

            height: 42vw;

            min-height: 170px;
            max-height: 260px;
          }


          .project-small:nth-child(2),
          .project-small:nth-child(3),
          .project-small:nth-child(4),
          .project-small:nth-child(5) {
            grid-column: span 1;
            grid-row: auto;
          }


          /* ================= LAST LARGE ================= */

          .project-large-last {
            grid-column: 1 / span 2;
            grid-row: auto;

            height: 65vw;

            min-height: 280px;
            max-height: 430px;
          }


          /* ================= EXTRA PROJECTS ================= */

          .project-grid > :nth-child(n + 7) {
            grid-column: span 1;
            grid-row: auto;

            height: 42vw;

            min-height: 170px;
          }
        }

      `}</style>

    </main>
  );
}