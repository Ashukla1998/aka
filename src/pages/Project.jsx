import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import { FullProjects } from "../Data/ProjectData";

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

/* =========================================================
   PROJECT IMAGE SLIDER COMPONENT
========================================================= */
export function ProjectImageSlider({ projects = [], title = "Project" }) {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 5000;
  const INTERVAL = 50;

  useEffect(() => {
    if (!projects.length) return;

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
  }, [projects.length]);

  const resetProgress = () => {
    startTimeRef.current = Date.now();
    setProgress(0);
  };

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
    <div className="w-full">
      {/* Slider view */}
      <Slider ref={sliderRef} {...settings}>
        {projects.map((project, i) => (
          <div key={project.slug || i}>
            <Link
              to={`/projects/${project.slug}`}
              className="block group cursor-pointer outline-none"
            >
              <div className="relative w-full overflow-hidden bg-gray-100 h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
                <img
                  src={project.cover}
                  alt={project.title || `${title} view ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading={i === 0 ? "eager" : "lazy"}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 text-white">
                  {project.location && (
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/75 font-mono mb-1.5">
                      {project.location}
                      {project.year && ` · ${project.year}`}
                    </p>
                  )}

                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium leading-tight">
                      {project.title}
                    </h3>

                    <span className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 flex items-center justify-center text-white text-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>

      {/* Progress & Counter */}
      {projects.length > 1 && (
        <div className="mt-4 sm:mt-5">
          <div className="h-[2px] bg-gray-200 w-full">
            <div
              className="h-full bg-arcadisOrange transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-end pt-2">
            <span className="text-xs tracking-widest text-gray-500 font-mono">
              {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} Projects
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MAIN PROJECTS PAGE
========================================================= */
export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl && categories.includes(categoryFromUrl) ? categoryFromUrl : "All"
  );
  const [activeService, setActiveService] = useState("All");
  const [activeCompletion, setActiveCompletion] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const gridRef = useRef(null);

  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else if (!categoryFromUrl) {
      setActiveCategory("All");
    }
  }, [categoryFromUrl]);

  const handleCategoryChange = (val) => {
    setActiveCategory(val);
    if (val === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", val);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveService("All");
    setActiveCompletion("All");
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams({});
  };

  const services = [
    ...new Set(FullProjects.map((project) => project.work).filter(Boolean)),
  ];

  const filtered = FullProjects.filter((project) => {
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;
    const serviceMatch = activeService === "All" || project.service === activeService;

    let completionMatch = true;
    if (activeCompletion !== "All") {
      const [min, max] = activeCompletion.split("-").map(Number);
      const completion = Number(project.complete_percent || 0);
      completionMatch = completion >= min && completion <= max;
    }

    return categoryMatch && serviceMatch && completionMatch;
  });

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, activeService, activeCompletion]);

  const paginatedProjects = filtered.slice(0, visibleCount);

  const ProjectCard = ({ project, groupIndex }) => {
    const isTall = groupIndex === 0;

    return (
      <Link
        to={`/projects/${project.slug}`}
        className={`group relative block overflow-hidden bg-gray-100 ${isTall
            ? "col-span-1 md:col-start-1 md:row-span-2 min-h-[300px] sm:min-h-[340px] md:min-h-full"
            : "col-span-1 min-h-[220px] sm:min-h-[240px]"
          }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: (groupIndex % 5) * 0.05, duration: 0.45, ease: "easeOut" }}
          className="relative w-full h-full min-h-[inherit]"
        >
          <img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
            <p className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono mb-1">
              {project.location}
              {project.year && ` · ${project.year}`}
            </p>

            <div className="flex items-end justify-between gap-3">
              <h3
                className={`text-white font-medium leading-tight ${isTall
                    ? "text-lg sm:text-xl md:text-2xl"
                    : "text-base sm:text-lg"
                  }`}
              >
                {project.title}
              </h3>

              <div className="shrink-0 w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white text-sm translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                →
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  const projectBatches = [];
  for (let i = 0; i < paginatedProjects.length; i += ITEMS_PER_PAGE) {
    projectBatches.push(paginatedProjects.slice(i, i + ITEMS_PER_PAGE));
  }

  return (
    <main className="w-full bg-white text-gray-900">
      {/* 
        MASTER CONTAINER: Ensures the Slider, Filters, and Grid all line up 
        on the exact same left/right gridline at every viewport size.
      */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">

        {/* 1. TITLE & SLIDER */}
        <section className="pt-8 sm:pt-12 md:pt-16">
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              Our Work
            </h1>
          </div>

          <ProjectImageSlider projects={filtered} title="Featured Projects" />
        </section>

        {/* 
          2. FILTER BAR WITH MATCHING DIVIDER LINE
          - Identical top & bottom spacing (`py-4 md:py-5`)
          - Border-b cleanly separates the filter bar from the cards
        */}
        <section className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 md:py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Category */}
              <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
                <select
                  value={activeCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
                >
                  <option value="All">Category (All)</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
                  ▼
                </span>
              </div>

              {/* Service */}
              <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
                <select
                  value={activeService}
                  onChange={(e) => setActiveService(e.target.value)}
                  className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
                >
                  <option value="All">Service (All)</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
                  ▼
                </span>
              </div>

              {/* % Complete */}
              <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
                <select
                  value={activeCompletion}
                  onChange={(e) => setActiveCompletion(e.target.value)}
                  className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
                >
                  <option value="All">% Complete</option>
                  <option value="0-25">0–25%</option>
                  <option value="26-50">26–50%</option>
                  <option value="51-75">51–75%</option>
                  <option value="76-100">76–100%</option>
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
                  ▼
                </span>
              </div>
            </div>

            {/* Reset Action */}
            {(activeCategory !== "All" ||
              activeService !== "All" ||
              activeCompletion !== "All") && (
                <button
                  onClick={resetFilters}
                  className="text-xs uppercase tracking-[0.15em] font-mono text-arcadisOrange hover:text-black transition-colors"
                >
                  Show All
                </button>
              )}
          </div>
        </section>

        {/* 
          3. PROJECT GRID 
          - `pt-6 sm:pt-8` mirrors the spacing above the filter line
        */}
        <section ref={gridRef} className="pt-6 sm:pt-8 pb-12 sm:pb-16">
          {projectBatches.length > 0 ? (
            <div className="flex flex-col gap-2">
              {projectBatches.map((batch, batchIdx) => (
                <div
                  key={batchIdx}
                  className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-2 md:auto-rows-[minmax(220px,24vw)]"
                >
                  {batch.map((project, idx) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      groupIndex={idx}
                      globalIndex={batchIdx * ITEMS_PER_PAGE + idx}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 sm:py-24 flex items-center justify-center text-center">
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

        {/* 4. SHOW MORE BUTTON */}
        {visibleCount < filtered.length && (
          <section className="w-full pb-16 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 text-xs sm:text-sm uppercase tracking-[0.2em] font-mono font-medium"
            >
              Show More
            </button>
          </section>
        )}

      </div>
    </main>
  );
}