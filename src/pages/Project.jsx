// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FullProjects } from "../Data/ProjectData";
// import ProjectImageSlider from "../components/ProjectImageSlider";

// const categories = [
//   "Healthcare",
//   "Educational",
//   "Housing",
//   "Hospitality",
//   "Commercial",
//   "Public",
//   "Residential",
// ];

// const ITEMS_PER_PAGE = 5;

// export default function Projects() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [activeService, setActiveService] = useState("All");
//   const [activeCompletion, setActiveCompletion] = useState("All");

//   const [currentPage, setCurrentPage] = useState(1);

//   const gridRef = useRef(null);

//   const services = [
//     ...new Set(FullProjects.map((project) => project.work).filter(Boolean)),
//   ];

//   /* =========================================================
//      FILTER PROJECTS
//   ========================================================= */

//   const filtered = FullProjects.filter((project) => {
//     /* ================= CATEGORY ================= */
//     const categoryMatch = activeCategory === "All" || project.category === activeCategory;

//     /* ================= SERVICE ================= */
//     const serviceMatch = activeService === "All" || project.service === activeService;

//     /* ================= COMPLETION ================= */
//     let completionMatch = true;

//     if (activeCompletion !== "All") {
//       const [min, max] = activeCompletion.split("-").map(Number);
//       const completion = Number(project.complete_percent || 0);
//       completionMatch = completion >= min && completion <= max;
//     }

//     return categoryMatch && serviceMatch && completionMatch;
//   });

//   /* =========================================================
//      RESET PAGE WHEN FILTER CHANGES
//   ========================================================= */

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeCategory, activeService, activeCompletion]);

//   /* =========================================================
//      PAGINATION
//   ========================================================= */

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   /* =========================================================
//      SCROLL TO PROJECT GRID
//   ========================================================= */

//   useEffect(() => {
//     if (currentPage > 1) {
//       gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [currentPage]);

//   /* =========================================================
//      RESET FILTERS
//   ========================================================= */

//   const resetFilters = () => {
//     setActiveCategory("All");
//     setActiveService("All");
//     setActiveCompletion("All");
//     setCurrentPage(1);
//   };

//   /* =========================================================
//      PROJECT CARD
//   ========================================================= */

//   const ProjectCard = ({ project, index }) => {
//     const isFirst = index === 0;
//     const isLast = index === 5;

//     return (
//       <Link
//         to={`/projects/${project.slug}`}
//         className={`project-card group relative block overflow-hidden bg-gray-100 ${
//           isFirst ? "project-large-first" : isLast ? "project-large-last" : "project-small"
//         }`}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-50px" }}
//           transition={{ delay: (index % 5) * 0.08, duration: 0.6, ease: "easeOut" }}
//           className="relative w-full h-full"
//         >
//           {/* ================= IMAGE ================= */}
//           <img
//             src={project.cover}
//             alt={project.title}
//             className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//           />

//           {/* ================= GRADIENT ================= */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

//           {/* ================= PROJECT CONTENT ================= */}
//           <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
//             {/* ================= LOCATION / YEAR ================= */}
//             <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono mb-1.5">
//               {project.location}
//               {project.year && ` · ${project.year}`}
//             </p>

//             {/* ================= TITLE ================= */}
//             <div className="flex items-end justify-between gap-3">
//               <h3
//                 className={`text-white font-medium leading-tight ${
//                   isFirst || isLast
//                     ? "text-lg sm:text-xl md:text-2xl"
//                     : "text-sm sm:text-base md:text-lg"
//                 }`}
//               >
//                 {project.title}
//               </h3>

//               {/* ================= ARROW ================= */}
//               <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 flex items-center justify-center text-white text-sm translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
//                 →
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </Link>
//     );
//   };

//   return (
//     <main className="bg-white">
//       {/* 1. TOP HEADER & SLIDER: TIGHT SPACING */}
//       <section className="w-full border-b border-gray-100 px-4 sm:px-8 md:px-12 lg:px-20 pt-3 pb-2 sm:pt-4 sm:pb-3 md:pt-5 md:pb-3">
//         {/* ================= TITLE ================= */}
//         <div className="flex flex-col items-center text-center mb-2 sm:mb-3">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
//             Our Work
//           </h1>
//         </div>

//         {/* ================= IMAGE SCROLLER ================= */}
//         <div className="w-full">
//           <ProjectImageSlider projects={filtered} title="Featured Projects" />
//         </div>
//       </section>

//       {/* =========================================================
//           2. FILTER BAR: SLIM COMPACT BAR
//       ========================================================= */}
//       <section className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
//         <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-2 sm:py-2.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 sm:gap-3">
//           {/* ================= FILTERS ================= */}
//           <div className="flex flex-wrap items-center gap-[5px]">
//             {/* Category */}
//             <div className="relative">
//               <select
//                 value={activeCategory}
//                 onChange={(e) => setActiveCategory(e.target.value)}
//                 className="appearance-none min-w-[130px] sm:min-w-[150px] bg-white border border-gray-300 px-3 py-1.5 sm:py-2 pr-7 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
//               >
//                 <option value="All">Category (All)</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>

//               <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
//                 ↓
//               </span>
//             </div>

//             {/* Service */}
//             <div className="relative">
//               <select
//                 value={activeService}
//                 onChange={(e) => setActiveService(e.target.value)}
//                 className="appearance-none min-w-[130px] sm:min-w-[150px] bg-white border border-gray-300 px-3 py-1.5 sm:py-2 pr-7 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
//               >
//                 <option value="All">Service (All)</option>
//                 {services.map((service) => (
//                   <option key={service} value={service}>
//                     {service}
//                   </option>
//                 ))}
//               </select>

//               <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
//                 ↓
//               </span>
//             </div>

//             {/* % Complete */}
//             <div className="relative">
//               <select
//                 value={activeCompletion}
//                 onChange={(e) => setActiveCompletion(e.target.value)}
//                 className="appearance-none min-w-[130px] sm:min-w-[150px] bg-white border border-gray-300 px-3 py-1.5 sm:py-2 pr-7 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
//               >
//                 <option value="All">% Complete</option>
//                 <option value="0-25">0–25%</option>
//                 <option value="26-50">26–50%</option>
//                 <option value="51-75">51–75%</option>
//                 <option value="76-100">76–100%</option>
//               </select>
//               <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
//                 ↓
//               </span>
//             </div>

//             {/* Reset */}
//             {(activeCategory !== "All" ||
//               activeService !== "All" ||
//               activeCompletion !== "All") && (
//               <button
//                 onClick={resetFilters}
//                 className="px-2.5 py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.15em] font-mono text-arcadisOrange hover:text-gray-900 transition-colors"
//               >
//                 Reset
//               </button>
//             )}
//           </div>

//           {/* Project Count */}
//           <p className="text-xs sm:text-sm text-gray-600 shrink-0 font-medium ml-auto lg:ml-0">
//             Showing{" "}
//             {filtered.length > 0 ? (
//               <span className="text-gray-900 font-semibold">{filtered.length} Projects</span>
//             ) : (
//               <span className="text-gray-900 font-semibold">0 Projects</span>
//             )}
//           </p>
//         </div>
//       </section>

//       {/* =========================================================
//           3. PROJECT GRID: REMOVED EXCESSIVE VERTICAL GAP
//       ========================================================= */}
//       <section ref={gridRef} className="px-4 sm:px-8 md:px-12 lg:px-20 pt-4 pb-8 sm:pt-5 sm:pb-10">
//         {paginatedProjects.length > 0 ? (
//           <div className="project-grid w-full">
//             {paginatedProjects.map((project, index) => (
//               <ProjectCard key={project.slug} project={project} index={index} />
//             ))}
//           </div>
//         ) : (
//           /* ================= EMPTY STATE ================= */
//           <div className="min-h-[180px] flex items-center justify-center text-center">
//             <div>
//               <p className="text-gray-500 text-sm mb-2">No projects found.</p>
//               <button
//                 onClick={resetFilters}
//                 className="text-sm text-arcadisOrange hover:underline font-medium"
//               >
//                 Clear filters
//               </button>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* =========================================================
//           4. PAGINATION: TIGHT & RESPONSIVE
//       ========================================================= */}
//       {totalPages > 1 && (
//         <section className="w-full border-t border-b border-gray-300 py-3 sm:py-4 px-3 sm:px-6">
//           <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
//             {/* Prev */}
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-2.5 sm:px-3 py-1.5 text-gray-600 disabled:opacity-40 hover:text-gray-900 transition-colors shrink-0"
//             >
//               Prev
//             </button>

//             {/* Numbers */}
//             <div className="flex flex-wrap items-center justify-center gap-1">
//               {Array.from({ length: totalPages }).map((_, i) => {
//                 const page = i + 1;
//                 return (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors shrink-0 ${
//                       currentPage === page
//                         ? "text-arcadisOrange border-b-2 border-arcadisOrange font-bold"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Next */}
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-2.5 sm:px-3 py-1.5 text-gray-600 disabled:opacity-40 hover:text-gray-900 transition-colors shrink-0"
//             >
//               Next
//             </button>
//           </div>
//         </section>
//       )}

//       {/* =========================================================
//           5. RESPONSIVE PROJECT GRID (5PX GAP)
//       ========================================================= */}
//       <style>{`
//         .project-grid {
//           display: grid;
//           grid-template-columns: 2fr 1fr 1fr;
//           grid-template-rows: repeat(2, minmax(220px, 26vw));
//           gap: 5px;
//         }

//         .project-large-first {
//           grid-column: 1;
//           grid-row: 1 / span 2;
//         }

//         .project-small:nth-child(2) {
//           grid-column: 2;
//           grid-row: 1;
//         }

//         .project-small:nth-child(3) {
//           grid-column: 3;
//           grid-row: 1;
//         }

//         .project-small:nth-child(4) {
//           grid-column: 2;
//           grid-row: 2;
//         }

//         .project-small:nth-child(5) {
//           grid-column: 3;
//           grid-row: 2;
//         }

//         .project-large-last {
//           grid-column: 1 / span 3;
//           grid-row: 3;
//           min-height: 420px;
//         }

//         .project-grid > :nth-child(n + 7) {
//           grid-column: auto;
//           grid-row: auto;
//           min-height: 280px;
//         }

//         @media (max-width: 1023px) and (min-width: 640px) {
//           .project-grid {
//             grid-template-columns: 2fr 1fr 1fr;
//             grid-template-rows: repeat(2, 220px);
//             gap: 5px;
//           }

//           .project-large-first {
//             grid-column: 1;
//             grid-row: 1 / span 2;
//           }

//           .project-small:nth-child(2) {
//             grid-column: 2;
//             grid-row: 1;
//           }

//           .project-small:nth-child(3) {
//             grid-column: 3;
//             grid-row: 1;
//           }

//           .project-small:nth-child(4) {
//             grid-column: 2;
//             grid-row: 2;
//           }

//           .project-small:nth-child(5) {
//             grid-column: 3;
//             grid-row: 2;
//           }

//           .project-large-last {
//             grid-column: 1 / span 3;
//             grid-row: 3;
//             min-height: 320px;
//           }
//         }

//         /* ONE BY ONE VERTICAL ON MOBILE */
//         @media (max-width: 639px) {
//           .project-grid {
//             display: flex;
//             flex-direction: column;
//             gap: 5px;
//             width: 100%;
//           }

//           .project-card,
//           .project-large-first,
//           .project-small,
//           .project-large-last {
//             width: 100%;
//             height: 56vw;
//             min-height: 220px;
//             max-height: 320px;
//           }
//         }

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }

//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
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

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const gridRef = useRef(null);

  const services = [
    ...new Set(FullProjects.map((project) => project.work).filter(Boolean)),
  ];

  /* =========================================================
     FILTER PROJECTS
  ========================================================= */

  const filtered = FullProjects.filter((project) => {
    /* ================= CATEGORY ================= */
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;

    /* ================= SERVICE ================= */
    const serviceMatch = activeService === "All" || project.service === activeService;

    /* ================= COMPLETION ================= */
    let completionMatch = true;

    if (activeCompletion !== "All") {
      const [min, max] = activeCompletion.split("-").map(Number);
      const completion = Number(project.complete_percent || 0);
      completionMatch = completion >= min && completion <= max;
    }

    return categoryMatch && serviceMatch && completionMatch;
  });

  /* =========================================================
     RESET VISIBLE COUNT WHEN FILTER CHANGES
  ========================================================= */

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, activeService, activeCompletion]);

  const paginatedProjects = filtered.slice(0, visibleCount);

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveService("All");
    setActiveCompletion("All");
    setVisibleCount(ITEMS_PER_PAGE);
  };

  /* =========================================================
     PROJECT CARD
  ========================================================= */

  const ProjectCard = ({ project, index }) => {
    const isFirst = index === 0;
    const isLast = index === 5;

    return (
      <Link
        to={`/projects/${project.slug}`}
        className={`project-card group relative block overflow-hidden bg-gray-100 ${
          isFirst ? "project-large-first" : isLast ? "project-large-last" : "project-small"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: (index % 5) * 0.08, duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          {/* ================= IMAGE ================= */}
          <img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* ================= GRADIENT ================= */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

          {/* ================= PROJECT CONTENT ================= */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
            {/* ================= LOCATION / YEAR ================= */}
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono mb-1.5">
              {project.location}
              {project.year && ` · ${project.year}`}
            </p>

            {/* ================= TITLE ================= */}
            <div className="flex items-end justify-between gap-3">
              <h3
                className={`text-white font-medium leading-tight ${
                  isFirst || isLast
                    ? "text-lg sm:text-xl md:text-2xl"
                    : "text-sm sm:text-base md:text-lg"
                }`}
              >
                {project.title}
              </h3>

              {/* ================= ARROW ================= */}
              <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 flex items-center justify-center text-white text-sm translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
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
      {/* 1. OUR WORK SECTION (DOUBLED TOP & BOTTOM SPACING) */}
      <section className="w-full border-b border-gray-100 px-4 sm:px-8 md:px-12 lg:px-20 pt-6 pb-2 sm:pt-8 sm:pb-7 md:pt-9 md:pb-7">
        {/* ================= TITLE ================= */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Our Work
          </h1>
        </div>

        {/* ================= IMAGE SCROLLER ================= */}
        <div className="w-full">
          <ProjectImageSlider projects={filtered} title="Featured Projects" />
        </div>

      </section>

      {/* =========================================================
          2. FILTER BAR (DOUBLED TOP & BOTTOM SPACING: PY-4 SM:PY-5 MD:PY-6)
      ========================================================= */}
      <section className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-7 md:py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5 lg:gap-6">
          {/* ================= FILTERS ================= */}
          <div className="flex flex-wrap items-center gap-[5px] sm:gap-[5px]">
            {/* Category */}
            <div className="relative">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="appearance-none min-w-[130px] sm:min-w-[150px] bg-white border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 pr-8 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
              >
                <option value="All">Category (All)</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                ↓
              </span>
            </div>

            {/* Service */}
            <div className="relative">
              <select
                value={activeService}
                onChange={(e) => setActiveService(e.target.value)}
                className="appearance-none min-w-[130px] sm:min-w-[150px] bg-white border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 pr-8 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
              >
                <option value="All">Service (All)</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                ↓
              </span>
            </div>

            {/* % Complete */}
            <div className="relative">
              <select
                value={activeCompletion}
                onChange={(e) => setActiveCompletion(e.target.value)}
                className="appearance-none min-w-[130px] sm:min-w-[150px] bg-white border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 pr-8 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
              >
                <option value="All">% Complete</option>
                <option value="0-25">0–25%</option>
                <option value="26-50">26–50%</option>
                <option value="51-75">51–75%</option>
                <option value="76-100">76–100%</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                ↓
              </span>
            </div>

            {/* Reset */}
            {(activeCategory !== "All" ||
              activeService !== "All" ||
              activeCompletion !== "All") && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.15em] font-mono text-arcadisOrange hover:text-gray-900 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Project Count
          <p className="text-xs sm:text-sm text-gray-600 shrink-0 font-medium ml-auto lg:ml-0">
            Showing{" "}
            {filtered.length > 0 ? (
              <span className="text-gray-900 font-semibold">{filtered.length} Projects</span>
            ) : (
              <span className="text-gray-900 font-semibold">0 Projects</span>
            )}
          </p> */}
        </div>
      </section>

      {/* =========================================================
          3. PROJECT GRID
      ========================================================= */}
      <section ref={gridRef} className="px-3 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12">
        {paginatedProjects.length > 0 ? (
          <div className="project-grid w-full">
            {paginatedProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="min-h-[180px] flex items-center justify-center text-center">
            <div>
              <p className="text-gray-500 text-sm mb-2">No projects found.</p>
              <button
                onClick={resetFilters}
                className="text-sm text-arcadisOrange hover:underline font-medium"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          4. SHOW MORE BUTTON & COMMENTED OUT PAGINATION
      ========================================================= */}
      {visibleCount < filtered.length && (
        <section className="w-full border-t border-b border-gray-300 py-6 sm:py-8 px-3 sm:px-6 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 text-xs sm:text-sm uppercase tracking-[0.2em] font-mono font-medium"
          >
            Show More
          </button>
        </section>
      )}

      {/* 
      {totalPages > 1 && (
        <section className="w-full border-t border-b border-gray-300 py-3 sm:py-4 px-3 sm:px-6">
          <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 sm:px-3 py-1.5 text-gray-600 disabled:opacity-40 hover:text-gray-900 transition-colors shrink-0"
            >
              Prev
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors shrink-0 ${
                      currentPage === page
                        ? "text-arcadisOrange border-b-2 border-arcadisOrange font-bold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 sm:px-3 py-1.5 text-gray-600 disabled:opacity-40 hover:text-gray-900 transition-colors shrink-0"
            >
              Next
            </button>
          </div>
        </section>
      )}
      */}

      {/* =========================================================
          5. RESPONSIVE PROJECT GRID (5PX GAP)
      ========================================================= */}
      <style>{`
        .project-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: repeat(2, minmax(220px, 26vw));
          gap: 5px;
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
          min-height: 420px;
        }

        .project-grid > :nth-child(n + 7) {
          grid-column: auto;
          grid-row: auto;
          min-height: 280px;
        }

        @media (max-width: 1023px) and (min-width: 640px) {
          .project-grid {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: repeat(2, 220px);
            gap: 5px;
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
            min-height: 320px;
          }
        }

        /* ONE BY ONE VERTICAL ON MOBILE */
        @media (max-width: 639px) {
          .project-grid {
            display: flex;
            flex-direction: column;
            gap: 5px;
            width: 100%;
          }

          .project-card,
          .project-large-first,
          .project-small,
          .project-large-last {
            width: 100%;
            height: 56vw;
            min-height: 220px;
            max-height: 320px;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}