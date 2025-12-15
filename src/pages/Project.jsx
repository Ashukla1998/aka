import React, { useState } from "react";
import { motion } from "framer-motion";
import { FullProjects } from "../Data/ProjectData";
import { Link } from "react-router-dom";
const categories = ["All", "Healthcare", "Educational", "Housing", "Hospitality", "Commercial", "Public", "Residential"];


export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? FullProjects
      : FullProjects.filter((p) => p.category === active);

  return (
    <main className="bg-white">

      {/* ================= HEADER ================= */}
      <section className="px-10 md:px-20 pt-24 pb-16">
        <div className="max-w-4xl">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">
            Our Work
          </p>

          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Explore Projects
          </h1>

          <p className="text-gray-600 max-w-2xl leading-relaxed">
            A selection of our architectural, urban, and interior projects —
            designed with purpose, context, and long-term impact.
          </p>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="px-10 md:px-20 mb-20">
        <div className="flex flex-wrap gap-6 text-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`pb-1 transition-colors
                ${
                  active === cat
                    ? "text-[#c5a879] border-b border-[#c5a879]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section className="px-10 md:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {filtered.map((p, i) => (
            <Link to={`/projects/${p.slug}`}>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
              </div>

              {/* Meta */}
              <div className="mt-4">
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="text-sm text-gray-500">
                  {p.location} · {p.year}
                </p>
              </div>
            </motion.div>
            </Link>
          ))}

        </div>
      </section>

    </main>
  );
}
