// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { motion } from "framer-motion";
// import { Link, useSearchParams } from "react-router-dom";
// import Slider from "react-slick";
// import Spinner from "../components/Spinner"; // Adjust relative path to your Spinner component

// const ITEMS_PER_PAGE = 5;

// /* =========================================================
//    PROJECT IMAGE SLIDER COMPONENT
// ========================================================= */
// export function ProjectImageSlider({ projects = [], title = "Project" }) {
//   const sliderRef = useRef(null);
//   const startTimeRef = useRef(Date.now());

//   const [progress, setProgress] = useState(0);
//   const [current, setCurrent] = useState(0);

//   const DURATION = 5000;
//   const INTERVAL = 50;

//   useEffect(() => {
//     if (!projects.length) return;

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
//   }, [projects.length]);

//   const resetProgress = () => {
//     startTimeRef.current = Date.now();
//     setProgress(0);
//   };

//   const settings = {
//     infinite: projects.length > 1,
//     arrows: false,
//     dots: false,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipe: true,
//     draggable: true,
//     beforeChange: (_, next) => {
//       setCurrent(next);
//       resetProgress();
//     },
//   };

//   if (!projects.length) return null;

//   return (
//     <div className="w-full">
//       <Slider ref={sliderRef} {...settings}>
//         {projects.map((project, i) => {
//           const projectSlug = project.gallerypath;

//           return (
//             <div key={projectSlug}>
//               <Link
//                 to={`/projects/${projectSlug}`}
//                 state={{ projectId: project.id }}
//                 className="block group cursor-pointer outline-none"
//               >
//                 <div className="relative w-full overflow-hidden bg-gray-100 h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
//                   <img
//                     src={project.cover}
//                     alt={project.title || `${title} view ${i + 1}`}
//                     className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
//                     loading={i === 0 ? "eager" : "lazy"}
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 text-white">
//                     {project.location && (
//                       <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/75 font-mono mb-1.5">
//                         {project.location}
//                         {project.year && ` · ${project.year}`}
//                       </p>
//                     )}

//                     <div className="flex items-end justify-between gap-4">
//                       <h3 className="text-lg sm:text-xl md:text-2xl font-medium leading-tight">
//                         {project.title}
//                       </h3>

//                       <span className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 flex items-center justify-center text-white text-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
//                         →
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           );
//         })}
//       </Slider>

//       {/* Progress & Counter */}
//       {projects.length > 1 && (
//         <div className="mt-4 sm:mt-5">
//           <div className="h-[2px] bg-gray-200 w-full">
//             <div
//               className="h-full bg-arcadisOrange transition-all duration-75 ease-linear"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           <div className="flex justify-end pt-2">
//             <span className="text-xs tracking-widest text-gray-500 font-mono">
//               {String(current + 1).padStart(2, "0")} /{" "}
//               {String(projects.length).padStart(2, "0")} Projects
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    MAIN PROJECTS PAGE WITH SERVER-SIDE FILTER API
// ========================================================= */
// export default function Projects() {
//   const [projectsData, setProjectsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchError, setFetchError] = useState(null);

//   // Lists for dropdown options
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [servicesList, setServicesList] = useState([]);

//   const [searchParams, setSearchParams] = useSearchParams();
//   const categoryFromUrl = searchParams.get("category");

//   const [activeCategory, setActiveCategory] = useState(categoryFromUrl || "All");
//   const [activeService, setActiveService] = useState("All");
//   const [activeSort, setActiveSort] = useState("default");
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

//   const gridRef = useRef(null);

//   /* 1. INITIAL LOAD: Fetch master data to populate dropdown filter lists */
//   useEffect(() => {
//     const fetchMasterOptions = async () => {
//       try {
//         const res = await fetch("https://www.lifepage.in/n/api/GetProjectData");
//         const json = await res.json();
//         if (json.success && Array.isArray(json.data)) {
//           const uniqueCats = Array.from(
//             new Set(json.data.map((item) => item.category?.trim()).filter(Boolean))
//           );
//           const uniqueServices = Array.from(
//             new Set(json.data.map((item) => item.service?.trim()).filter(Boolean))
//           );
//           setCategoriesList(uniqueCats);
//           setServicesList(uniqueServices);
//         }
//       } catch (err) {
//         console.error("Failed to load filter options", err);
//       }
//     };

//     fetchMasterOptions();
//   }, []);

//   /* 2. FILTER API FETCH: Runs whenever any filter state changes */
//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchFilteredProjects = async () => {
//       try {
//         setIsLoading(true);
//         setFetchError(null);

//         // Build URLSearchParams for server-side filtration
//         const params = new URLSearchParams();
//         if (activeCategory !== "All") params.append("category", activeCategory);
//         if (activeService !== "All") params.append("service", activeService);

//         const queryString = params.toString();
//         const endpoint = `https://www.lifepage.in/n/api/GetProjectData${
//           queryString ? `?${queryString}` : ""
//         }`;

//         const res = await fetch(endpoint, { signal: controller.signal });
//         const json = await res.json();

//         if (json.success && Array.isArray(json.data)) {
//           setProjectsData(json.data);
//           setVisibleCount(ITEMS_PER_PAGE);
//         } else {
//           setFetchError("Invalid data format received from server.");
//         }
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           setFetchError(err.message || "Failed to fetch filtered projects.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFilteredProjects();

//     return () => controller.abort();
//   }, [activeCategory, activeService]);

//   /* URL Param sync for Category */
//   useEffect(() => {
//     if (categoryFromUrl && categoryFromUrl !== activeCategory) {
//       setActiveCategory(categoryFromUrl);
//     } else if (!categoryFromUrl && activeCategory !== "All") {
//       setActiveCategory("All");
//     }
//   }, [categoryFromUrl]);

//   const handleCategoryChange = (val) => {
//     setActiveCategory(val);
//     const newParams = new URLSearchParams(searchParams);
//     if (val === "All") {
//       newParams.delete("category");
//     } else {
//       newParams.set("category", val);
//     }
//     setSearchParams(newParams);
//   };

//   const resetFilters = () => {
//     setActiveCategory("All");
//     setActiveService("All");
//     setActiveSort("default");
//     setVisibleCount(ITEMS_PER_PAGE);
//     setSearchParams({});
//   };

//   const getYear = (p) => parseInt(p.year, 10) || 0;
//   const sortedProjects = [...projectsData].sort((a, b) => {
//     switch (activeSort) {
//       case "newest":
//         return getYear(b) - getYear(a);
//       case "oldest":
//         return getYear(a) - getYear(b);
//       case "az":
//         return (a.title || "").localeCompare(b.title || "");
//       case "za":
//         return (b.title || "").localeCompare(a.title || "");
//       default:
//         return 0;
//     }
//   });

//   const paginatedProjects = sortedProjects.slice(0, visibleCount);
//   const hasMore = visibleCount < sortedProjects.length;

//   const ProjectCard = ({ project, groupIndex }) => {
//     const isTall = groupIndex === 0;
//     const projectSlug = project.gallerypath;

//     return (
//       <Link
//         to={`/projects/${projectSlug}`}
//         state={{ projectId: project.id }}
//         className={`group relative block overflow-hidden bg-gray-100 ${
//           isTall
//             ? "col-span-1 md:col-start-1 md:row-span-2 min-h-[320px] sm:min-h-[380px] md:min-h-[460px]"
//             : "col-span-1 min-h-[220px] sm:min-h-[240px]"
//         }`}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-40px" }}
//           transition={{
//             delay: (groupIndex % 5) * 0.05,
//             duration: 0.45,
//             ease: "easeOut",
//           }}
//           className="relative w-full h-full min-h-[inherit]"
//         >
//           <img
//             src={project.cover}
//             alt={project.title}
//             className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//           />

//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

//           <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
//             <p className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono mb-1">
//               {project.location}
//               {project.year && ` · ${project.year}`}
//             </p>

//             <div className="flex items-end justify-between gap-3">
//               <h3
//                 className={`text-white font-medium leading-tight ${
//                   isTall
//                     ? "text-lg sm:text-xl md:text-2xl"
//                     : "text-base sm:text-lg"
//                 }`}
//               >
//                 {project.title}
//               </h3>

//               <div className="shrink-0 w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white text-sm translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
//                 →
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </Link>
//     );
//   };

//   const projectBatches = [];
//   for (let i = 0; i < paginatedProjects.length; i += ITEMS_PER_PAGE) {
//     projectBatches.push(paginatedProjects.slice(i, i + ITEMS_PER_PAGE));
//   }

//   return (
//     <main className="w-full bg-white text-gray-900">
//       <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
//         {/* 1. TITLE & SLIDER */}
//         <section className="pt-5 sm:pt-5 md:pt-5">
//           <div className="flex flex-col items-center text-center mb-5 sm:mb-5 md:mb-5">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
//               Our Work
//             </h1>
//           </div>

//           <ProjectImageSlider projects={projectsData} title="Featured Projects" />
//         </section>

//         {/* 2. FILTER BAR */}
//         <section className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 md:py-5">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
//               {/* Category Dropdown */}
//               <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
//                 <select
//                   value={activeCategory}
//                   onChange={(e) => handleCategoryChange(e.target.value)}
//                   className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
//                 >
//                   <option value="All">Category (All)</option>
//                   {categoriesList.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
//                   ▼
//                 </span>
//               </div>

//               {/* Service Dropdown */}
//               <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
//                 <select
//                   value={activeService}
//                   onChange={(e) => setActiveService(e.target.value)}
//                   className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
//                 >
//                   <option value="All">Service (All)</option>
//                   {servicesList.map((service) => (
//                     <option key={service} value={service}>
//                       {service}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
//                   ▼
//                 </span>
//               </div>

//               {/* Sort Dropdown */}
//               <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
//                 <select
//                   value={activeSort}
//                   onChange={(e) => {
//                     setActiveSort(e.target.value);
//                     setVisibleCount(ITEMS_PER_PAGE);
//                   }}
//                   className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
//                 >
//                   <option value="default">Sort By</option>
//                   <option value="size">By Area</option>
//                   <option value="end_year">End Year</option>
//                   <option value="buildup">Build up Area</option>
//                   <option value="status">Complete Percentage</option>
//                 </select>
//                 <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
//                   ▼
//                 </span>
//               </div>

//             </div>

//             {/* Reset Action */}
//             {(activeCategory !== "All" ||
//               activeService !== "All" ||
//               activeSort !== "default") && (
//               <button
//                 onClick={resetFilters}
//                 className="text-xs uppercase tracking-[0.15em] font-mono text-arcadisOrange hover:text-black transition-colors"
//               >
//                 Show All
//               </button>
//             )}
//           </div>
//         </section>

//         {/* 3. GRID SECTION */}
//         <section ref={gridRef} className="pt-5 sm:pt-5 pb-12 sm:pb-5 min-h-[300px]">
//           {isLoading ? (
//             <div className="py-24 flex justify-center items-center">
//               <Spinner isLoading={true} />
//             </div>
//           ) : fetchError ? (
//             <div className="py-24 text-center">
//               <p className="text-red-500 text-sm mb-3">{fetchError}</p>
//               <button
//                 onClick={resetFilters}
//                 className="text-xs uppercase font-mono tracking-widest underline"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           ) : projectBatches.length > 0 ? (
//             <div className="flex flex-col gap-2">
//               {projectBatches.map((batch, batchIdx) => (
//                 <div
//                   key={batchIdx}
//                   className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:auto-rows-[minmax(220px,24vw)]"
//                 >
//                   {batch.map((project, idx) => (
//                     <ProjectCard
//                       key={project.slug || project.title + idx}
//                       project={project}
//                       groupIndex={idx}
//                     />
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-16 sm:py-24 flex items-center justify-center text-center">
//               <div>
//                 <p className="text-gray-500 text-sm mb-2">No projects found.</p>
//                 <button
//                   onClick={resetFilters}
//                   className="text-sm text-arcadisOrange hover:underline font-medium"
//                 >
//                   Clear filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </section>

//         {/* 4. SHOW MORE BUTTON */}
//         {!isLoading && !fetchError && (
//           <section className="w-full pb-8 flex justify-center backdrop-blur-sm border-b border-gray-200">
//             <button
//               disabled={!hasMore}
//               onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
//               className={`px-8 py-3 border text-xs sm:text-sm uppercase tracking-[0.2em] font-mono font-medium transition-all duration-300 ${
//                 hasMore
//                   ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white cursor-pointer"
//                   : "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed opacity-60"
//               }`}
//             >
//               {hasMore ? "Show More" : "No More Items"}
//             </button>
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import Spinner from "../components/Spinner";

const ITEMS_PER_PAGE = 5;

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
      <Slider ref={sliderRef} {...settings}>
        {projects.map((project, i) => {
          const projectSlug = project.gallerypath;

          return (
            <div key={projectSlug || i}>
              <Link
                to={`/projects/${projectSlug}`}
                state={{ projectId: project.projectid }}
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
                        {project.end_year && ` · ${project.end_year}`}
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
          );
        })}
      </Slider>

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
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")} Projects
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export const ProjectCard = ({ project, groupIndex }) => {
  const isTall = groupIndex === 0;
  const projectSlug = project.gallerypath;

  return (
    <Link
      to={`/projects/${projectSlug}`}
      state={{ projectId: project.projectid }}
      className={`group relative block overflow-hidden bg-gray-100 ${
        isTall
          ? "col-span-1 md:col-start-1 md:row-span-2 min-h-[320px] sm:min-h-[380px] md:min-h-[460px]"
          : "col-span-1 min-h-[220px] sm:min-h-[240px]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          delay: (groupIndex % 5) * 0.05,
          duration: 0.45,
          ease: "easeOut",
        }}
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
            {project.end_year && ` · ${project.end_year}`}
          </p>

          <div className="flex items-end justify-between gap-3">
            <h3
              className={`text-white font-medium leading-tight ${
                isTall
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

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [categoriesList, setCategoriesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || "All");
  const [activeService, setActiveService] = useState("All");
  const [activeSort, setActiveSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const gridRef = useRef(null);

  /* 1. INITIAL LOAD: Fetch master options and initial featured slider list */
  useEffect(() => {
    const fetchMasterOptions = async () => {
      try {
        const res = await fetch("https://www.lifepage.in/n/api/GetProjectData");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setFeaturedProjects(json.data);

          const uniqueCats = Array.from(
            new Set(json.data.map((item) => item.category?.trim()).filter(Boolean))
          );
          const uniqueServices = Array.from(
            new Set(json.data.map((item) => item.service?.trim()).filter(Boolean))
          );
          setCategoriesList(uniqueCats);
          setServicesList(uniqueServices);
        }
      } catch (err) {
        console.error("Failed to load filter options", err);
      }
    };

    fetchMasterOptions();
  }, []);

  /* 2. SERVER-SIDE FILTER & SORT FETCH */
  useEffect(() => {
    const controller = new AbortController();

    const fetchFilteredProjects = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        // Build URL params with sort and order
        const params = new URLSearchParams();
        if (activeCategory !== "All") params.append("category", activeCategory);
        if (activeService !== "All") params.append("service", activeService);
        if (activeSort !== "default") {
          params.append("sort", activeSort);
          params.append("order", "DESC"); // Or "ASC" depending on requirement
        }

        const queryString = params.toString();
        const endpoint = `https://www.lifepage.in/n/api/GetProjectData${
          queryString ? `?${queryString}` : ""
        }`;

        const res = await fetch(endpoint, { signal: controller.signal });
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          setProjectsData(json.data);
          setVisibleCount(ITEMS_PER_PAGE);
        } else {
          setFetchError("Invalid data format received from server.");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setFetchError(err.message || "Failed to fetch filtered projects.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProjects();

    return () => controller.abort();
  }, [activeCategory, activeService, activeSort]);

  /* URL Param sync for Category */
  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== activeCategory) {
      setActiveCategory(categoryFromUrl);
    } else if (!categoryFromUrl && activeCategory !== "All") {
      setActiveCategory("All");
    }
  }, [categoryFromUrl]);

  const handleCategoryChange = (val) => {
    setActiveCategory(val);
    const newParams = new URLSearchParams(searchParams);
    if (val === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", val);
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveService("All");
    setActiveSort("default");
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams({});
  };

  const paginatedProjects = projectsData.slice(0, visibleCount);
  const hasMore = visibleCount < projectsData.length;


  const projectBatches = [];
  for (let i = 0; i < paginatedProjects.length; i += ITEMS_PER_PAGE) {
    projectBatches.push(paginatedProjects.slice(i, i + ITEMS_PER_PAGE));
  }

  return (
    <main className="w-full bg-white text-gray-900 font-primary">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* 1. TITLE & SLIDER */}
        <section className="pt-5 sm:pt-5 md:pt-5">
          <div className="flex flex-col items-center text-center mb-5 sm:mb-5 md:mb-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              Our Work
            </h1>
          </div>

          <ProjectImageSlider 
            projects={featuredProjects.length ? featuredProjects : projectsData} 
            title="Featured Projects" 
          />
        </section>

        {/* 2. FILTER BAR */}
        <section className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 md:py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              
              {/* Category Dropdown */}
              <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
                <select
                  value={activeCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
                >
                  <option value="All">Category (All)</option>
                  {categoriesList.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
                  ▼
                </span>
              </div>

              {/* Service Dropdown */}
              <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
                <select
                  value={activeService}
                  onChange={(e) => setActiveService(e.target.value)}
                  className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
                >
                  <option value="All">Service (All)</option>
                  {servicesList.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
                  ▼
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="relative group bg-white border border-gray-300 hover:border-gray-900 transition-colors">
                <select
                  value={activeSort}
                  onChange={(e) => {
                    setActiveSort(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className="appearance-none bg-transparent pl-3 pr-7 py-2 text-xs sm:text-sm font-medium text-gray-800 outline-none cursor-pointer tracking-tight"
                >
                  <option value="default">Sort By</option>
                  <option value="size">Site Area (Largest First)</option>
                  <option value="buildup">Built-up Area (Largest First)</option>
                  <option value="end_year">End Year (Latest First)</option>
                  <option value="status">Completion Status</option>
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 group-hover:text-gray-800 transition-colors">
                  ▼
                </span>
              </div>

            </div>

            {/* Reset Action */}
            {(activeCategory !== "All" ||
              activeService !== "All" ||
              activeSort !== "default") && (
              <button
                onClick={resetFilters}
                className="text-xs uppercase tracking-[0.15em] font-mono text-arcadisOrange hover:text-black transition-colors"
              >
                Show All
              </button>
            )}
          </div>
        </section>

        {/* 3. GRID SECTION */}
        <section ref={gridRef} className="pt-5 sm:pt-5 pb-12 sm:pb-5 min-h-[300px]">
          {isLoading ? (
            <div className="py-24 flex justify-center items-center">
              <Spinner isLoading={true} />
            </div>
          ) : fetchError ? (
            <div className="py-24 text-center">
              <p className="text-red-500 text-sm mb-3">{fetchError}</p>
              <button
                onClick={resetFilters}
                className="text-xs uppercase font-mono tracking-widest underline"
              >
                Reset Filters
              </button>
            </div>
          ) : projectBatches.length > 0 ? (
            <div className="flex flex-col gap-2">
              {projectBatches.map((batch, batchIdx) => (
                <div
                  key={batchIdx}
                  className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:auto-rows-[minmax(220px,24vw)]"
                >
                  {batch.map((project, idx) => (
                    <ProjectCard
                      key={project.slug || project.gallerypath || project.title + idx}
                      project={project}
                      groupIndex={idx}
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
        {!isLoading && !fetchError && (
          <section className="w-full pb-8 flex justify-center backdrop-blur-sm border-b border-gray-200">
            <button
              disabled={!hasMore}
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className={`px-8 py-3 border text-xs sm:text-sm uppercase tracking-[0.2em] font-mono font-medium transition-all duration-300 ${
                hasMore
                  ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white cursor-pointer"
                  : "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed opacity-60"
              }`}
            >
              {hasMore ? "Show More" : "No More Items"}
            </button>
          </section>
        )}
      </div>
    </main>
  );
} 