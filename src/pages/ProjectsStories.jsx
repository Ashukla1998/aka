import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
// import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { GoArrowRight } from "react-icons/go";

/* ===== 6 DISTINCT CATEGORY PROJECTS ===== */
const projectsStories = [
  {
    title: "GEIMS HOSPITAL",
    slug: "geims-hospital",
    category: "Healthcare",
    location: "Dhulkot, Dehradun",
    image: "/images/projects/Healthcare/GEIMSHospital/01.jpg",
  },
  {
    title: "GEIMS Medical College",
    category: "Educational",
    location: "Dhulkot, Dehradun",
    image: "/images/projects/Educational/GEIMSMedicalCollege/01.jpg",
    description: "Academic and teaching infrastructure designed to nurture modern medical practices.",
    slug: "/projects/geims-medical-college",
    size: "20 acres",
  },
  {
    title: "Serene Greens Oakwood",
    category: "Housing",
    location: "Dhulkot, Dehradun",
    image: "/images/projects/Housing/sgoakwood/01.jpg",
    description: "A contemporary residential enclave consisting of 280 integrated, sustainable apartments.",
    slug: "/projects/sg-oakwood",
    size: "2.25 acres",
  },
  {
    title: "Herbal World",
    category: "Hospitality",
    location: "Malegaon, Rishikesh",
    image: "/images/projects/Hospitality/mala/01.jpg",
    description: "A global wellness theme park centered on Ayurveda, native botany, and holistic healing.",
    slug: "/projects/herbal-world",
    size: "250 acres",
  },
  {
    title: "Agro Food Park",
    category: "Commercial",
    location: "Noida",
    image: "/images/projects/Commercial/fpn/01.jpg",
    description: "Large-scale agro-processing units integrated with exhibition and logistics facilities.",
    slug: "/projects/food-park",
    size: "320 acres",
  },
  {
    title: "IMA CSD Retrofit",
    category: "Public",
    location: "Chakrata Road, Dehradun",
    image: "/images/projects/Public/imacsd/01.jpg",
    description: "Adaptive reuse and heritage conservation within the historic Indian Military Academy.",
    slug: "/projects/ima-csd",
    size: "1 acre",
  },
  {
    title: "Pleasant Valley Studio",
    category: "Residential",
    location: "Pleasant Valley, Dehradun",
    image: "/images/projects/Residential/homeoffice/01.jpg",
    description: "A modern dual-purpose residence and studio featuring low-carbon passive design.",
    slug: "/projects/home-office",
    size: "4,050 sq ft",
  },
  
];

// const categories = [
//   "All",
//   "Educational",
//   "Housing",
//   "Hospitality",
//   "Commercial",
//   "Public",
//   "Residential",
// ];

export default function ProjectsStories() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsStories
      : projectsStories.filter((item) => item.category === activeCategory);

  return (
    <main className="bg-neutral-50 text-neutral-900 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            {/* <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-3">
              [ 02 // PORTFOLIO ]
            </span> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-950">
              <span className="font-semibold">Expertise</span>
            </h1>
          </div>

          <p className="text-sm md:text-base text-neutral-500 max-w-md font-light leading-relaxed">
            From intimate residential extensions to large-scale civic landmarks—we shape spaces of every scale, across all sectors and budgets.
          </p>
        </div>

        {/* ================= UNIFORM 6-CARD GRID ================= */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-white shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Link to={project.slug} className="flex flex-col h-full">
                  {/* Card Image Container with Smooth Zoom */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category Pill */}
                    {/* <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/90 backdrop-blur-md text-arcadisOrange rounded-full shadow-sm">
                        {project.category}
                      </span>
                    </div> */}

                    {/* Vignette Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-row flex-1 p-6 justify-between">
                    <div>
                      {/* Project Title */}
                      <h3 className="text-xl font-medium tracking-tight text-black transition-colors">
                        {project.category}
                      </h3>
                    </div>

                    <GoArrowRight className="w-6 h-6" />

                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ================= BOTTOM CTA ROW ================= */}
        <div className="mt-20 pt-10 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-neutral-500 max-w-md text-center sm:text-left">
            Interested in architectural planning or collaborative master development?
          </p>

          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-arcadisOrange text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-sm active:scale-95"
          >
            Browse Complete Archive
          </Link>
        </div>
      </div>
    </main>
  );
}