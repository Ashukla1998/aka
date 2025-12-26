import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FullProjects } from "../Data/ProjectData";
import ProjectImageSlider from "../components/ProjectImageSlider";

const categories = [
  "All",
  "Healthcare",
  "Educational",
  "Housing",
  "Hospitality",
  "Commercial",
  "Public",
  "Residential",
];

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

  /* ================= FILTER ================= */
  const filtered =
    active === "All"
      ? FullProjects
      : FullProjects.filter((p) => p.category === active);

  /* ================= RESET PAGE ON FILTER ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ================= SCROLL ================= */
  useEffect(() => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="px-10 md:px-20 pt-28 pb-32 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

          <div className="md:col-span-5">
            <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-6">
              Our Work
            </p>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Explore Projects
            </h1>

            <p className="text-gray-600 max-w-md leading-relaxed">
              A curated selection of architectural, urban, and interior projects
              shaped by context, purpose, and long-term impact.
            </p>
          </div>

          <div className="md:col-span-7">
            <ProjectImageSlider
              images={filtered.map((p) => p.cover)}
              title="Featured Projects"
            />
          </div>

        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="sticky top-[72px] z-30 bg-white border-b border-gray-100">
        <div className="px-10 md:px-20 py-6 flex flex-wrap items-center justify-between gap-6">

          <div className="flex flex-wrap gap-8 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative pb-1 transition-colors
                  ${
                    active === cat
                      ? "text-arcadisGold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {cat}
                {active === cat && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-arcadisGold" />
                )}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="text-gray-900">
              {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of <span className="text-gray-900">{filtered.length}</span>
          </p>

        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section ref={gridRef} className="px-10 md:px-20 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {paginatedProjects.map((p, i) => (
            <Link key={p.slug} to={`/projects/${p.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group cursor-pointer"
              >

                {/* ===== CARD ===== */}
                <div
                  className="
                    relative overflow-hidden
                    bg-gray-100
                    rounded-[25px]
                    shadow-sm
                    transition-shadow duration-500
                    hover:shadow-lg
                  "
                >

                  {/* Image */}
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="
                      w-full h-[320px]
                      object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-105
                    "
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-sm text-white/80 mb-1">
                      {p.location}
                      {p.year && ` · ${p.year}`}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-lg text-white leading-snug">
                        {p.title}
                      </h3>

                      <div
                        className="
                          w-9 h-9 rounded-full
                          border border-white/60
                          flex items-center justify-center
                          translate-x-2 opacity-0
                          group-hover:translate-x-0 group-hover:opacity-100
                          transition-all duration-300
                        "
                      >
                        →
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </Link>
          ))}

        </div>
      </section>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <section className="pb-36">
          <div className="flex items-center justify-center gap-2 text-sm">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-600 disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10
                    ${
                      currentPage === page
                        ? "text-arcadisOrange border-b-2 border-arcadisOrange"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-gray-600 disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </section>
      )}

    </main>
  );
}
