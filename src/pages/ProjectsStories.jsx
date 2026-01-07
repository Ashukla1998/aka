import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

/* ===== DATA ===== */
const projectsStories = [
  {
    type: "Project",
    title: "GEIMS Hospital",
    description:
      "A state-of-the-art medical facility designed with patient-centric care.",
    image: "/images/projects/Healthcare/GEIMSHospital/01.jpg",
    slug: "/projects/geims-hospital",
  },
  {
    type: "Project",
    title: "Patanjali Hospital",
    description:
      "An allopathic hospital focused on emergency care and diagnostics.",
    image: "/images/projects/Healthcare/patanjali/01.jpg",
    slug: "/projects/patanjali-hospital",
  },
  {
    type: "Project",
    title: "Regal Manor",
    description:
      "An exclusive banquet hall designed for luxurious weddings and events.",
    image: "/images/projects/Commercial/malsiwedding/01.jpg",
    slug: "/projects/regal-manor",
  },
];

export default function ProjectsStories() {
  return (
    <main className="bg-white">

      {/* ================= HEADER ================= */}
      <section className="px-6 sm:px-10 md:px-20 pt-24 md:pt-32 pb-16 md:pb-20">
        <p className="text-xs tracking-[0.3em] uppercase text-arcadisOrange mb-4">
          Projects & Stories
        </p>

        <h1 className="text-xl md:text-2xl font-medium text-gray-900 max-w-2xl">
          Discover how we are improving quality of life
        </h1>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-6 sm:px-10 md:px-20 pb-24 md:pb-32"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">

          {projectsStories.map((item, i) => (
            <Link
              key={i}
              to={item.slug}
              className={i === 0 ? "md:col-span-6" : "md:col-span-3"}
            >
              <article
                className="
                  group relative overflow-hidden
                  rounded-xl shadow-lg
                  cursor-pointer
                  h-[400px]
                "
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    absolute inset-0
                    w-full h-full object-cover
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                />

                {/* OVERLAY */}
                <div className="absolute inset-x-0 bottom-0 h-[170px] bg-black/80" />

                {/* CONTENT */}
                <div className="absolute inset-x-0 bottom-0 px-5 md:px-6 pb-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-white/80">
                    {item.type}
                  </span>

                  <h3
                    className={
                      i === 0
                        ? "text-2xl md:text-3xl font-medium leading-tight mt-2 mb-2"
                        : "text-lg md:text-xl font-medium leading-tight mt-2 mb-2"
                    }
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm font-normal leading-relaxed text-white/90 max-w-md">
                    {item.description}
                  </p>
                </div>

                {/* ARROW */}
                <ArrowRightIcon
                  className="
                    absolute bottom-5 right-5
                    w-5 h-5 text-white
                    transition-all duration-300
                    group-hover:text-arcadisOrange
                    group-hover:translate-x-1
                  "
                />
              </article>
            </Link>
          ))}

        </div>

        {/* ================= CTA ROW ================= */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <p className="md:col-span-9 max-w-xl font-medium leading-relaxed text-gray-700">
            Find out how we work with our clients to achieve their goals and
            improve quality of life.
          </p>

          <div className="md:col-span-3 flex md:justify-end">
            <Link
              to="/projects"
              className="
                inline-flex items-center
                px-8 py-3
                bg-arcadisOrange text-white
                text-sm font-medium tracking-wide
                rounded-[5px]
                hover:opacity-90 transition
              "
            >
              View all projects
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
