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
     RESET PAGE WHEN FILTER CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeService, activeCompletion]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  /* =========================================================
     SCROLL TO PROJECT GRID
  ========================================================= */

  useEffect(() => {
    if (currentPage > 1) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveService("All");
    setActiveCompletion("All");
    setCurrentPage(1);
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
        className={`project-card group relative block overflow-hidden bg-gray-100 ${isFirst ? "project-large-first" : isLast ? "project-large-last" : "project-small"
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
                className={`text-white font-medium leading-tight ${isFirst || isLast
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
      <section className="w-full min-h-[60vh] flex flex-col justify-center border-b border-gray-100 px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-14 md:py-16">
        {/* ================= LARGE TITLE ================= */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
            Our Work
          </h1>
        </div>

        {/* ================= IMAGE SCROLLER ================= */}
        <div className="w-full">
          <ProjectImageSlider projects={filtered} title="Featured Projects" />
        </div>

        {/* ================= PROJECT COUNT ================= */}
        <div className="flex items-center justify-between mt-5 sm:mt-6">
          <p className="text-xs sm:text-sm text-gray-500 font-mono uppercase tracking-[0.15em]">
            Showing <span className="text-gray-900 font-medium">{filtered.length}</span> Projects
          </p>

          <p className="hidden sm:block text-xs text-gray-400 font-mono uppercase tracking-[0.15em]">
            Scroll to Explore
          </p>
        </div>
      </section>

      {/* =========================================================
          2. FILTER BAR
      ========================================================= */}
      <section className="sticky top-[72px] z-30 bg-white border-b border-gray-100">
        <div className="px-5 sm:px-8 md:px-12 lg:px-20 py-5 sm:py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-6">
          {/* =====================================================
              FILTERS
          ===================================================== */}
          <div className="flex flex-wrap items-center gap-[5px] sm:gap-[5px]">
            {/* ================= CATEGORY ================= */}
            <div className="relative">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="appearance-none min-w-[150px] sm:min-w-[170px] bg-white border border-gray-300 px-4 py-3 pr-10 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
              >
                <option value="All">Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                ↓
              </span>
            </div>

            {/* ================= SERVICE ================= */}
            <div className="relative">
              <select
                value={activeService}
                onChange={(e) => setActiveService(e.target.value)}
                className="appearance-none min-w-[150px] sm:min-w-[170px] bg-white border border-gray-300 px-4 py-3 pr-10 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
              >
                <option value="All">Service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                ↓
              </span>
            </div>

            {/* ================= % COMPLETE ================= */}
            <div className="relative">
              <select
                value={activeCompletion}
                onChange={(e) => setActiveCompletion(e.target.value)}
                className="appearance-none min-w-[150px] sm:min-w-[170px] bg-white border border-gray-300 px-4 py-3 pr-10 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-500 focus:border-gray-900 transition-colors"
              >
                <option value="All">% Complete</option>
                <option value="0-25">0–25%</option>
                <option value="26-50">26–50%</option>
                <option value="51-75">51–75%</option>
                <option value="76-100">76–100%</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                ↓
              </span>
            </div>

            {(activeCategory !== "All" ||
              activeService !== "All" ||
              activeCompletion !== "All") && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Reset
                </button>
              )}
          </div>

          {/* =====================================================
              PROJECT COUNT
          ===================================================== */}
          <p className="text-xs sm:text-sm text-gray-500 shrink-0">
            Showing{" "}
            {filtered.length > 0 ? (
              <>
                <span className="text-gray-900 font-medium">
                  {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
                </span>{" "}
                of <span className="text-gray-900 font-medium">{filtered.length}</span>
              </>
            ) : (
              <span className="text-gray-900 font-medium">0</span>
            )}
          </p>
        </div>
      </section>

      {/* =========================================================
          3. PROJECT GRID
      ========================================================= */}
      <section ref={gridRef} className="px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20">
        {paginatedProjects.length > 0 ? (
          <div className="project-grid w-full">
            {paginatedProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="min-h-[300px] flex items-center justify-center text-center">
            <div>
              <p className="text-gray-500 text-sm mb-3">No projects found.</p>
              <button
                onClick={resetFilters}
                className="text-sm text-arcadisOrange hover:underline"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          4. PAGINATION
      ========================================================= */}
      {totalPages > 1 && (
        <section className="w-full border-t border-b border-gray-500 py-6 sm:py-8 flex items-center justify-center">
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
            {/* ================= PREV ================= */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 text-gray-600 disabled:opacity-40 hover:text-gray-900 transition-colors"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-colors ${currentPage === page
                      ? "text-arcadisOrange border-b-2 border-arcadisOrange font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            {/* ================= NEXT ================= */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 text-gray-600 disabled:opacity-40 hover:text-gray-900 transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {/* =========================================================
          5. RESPONSIVE PROJECT GRID
      ========================================================= */}
      <style>{`
        .project-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: repeat(2, minmax(220px, 28vw));
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
            grid-template-rows: repeat(2, 260px);
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
            min-height: 350px;
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