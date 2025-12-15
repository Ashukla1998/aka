import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = ["All", "Architecture", "Urban", "Interior", "Sustainability"];

const projects = [
  {
    title: "Urban Housing",
    category: "Architecture",
    location: "Mumbai",
    year: "2024",
    img: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
  },
  {
    title: "Corporate Campus",
    category: "Urban",
    location: "Bengaluru",
    year: "2023",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
  {
    title: "Public Space",
    category: "Urban",
    location: "Delhi",
    year: "2022",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },
  {
    title: "Luxury Residence",
    category: "Interior",
    location: "Pune",
    year: "2024",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    title: "Cultural Center",
    category: "Architecture",
    location: "Jaipur",
    year: "2021",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
  },
  {
    title: "Sustainable Office",
    category: "Sustainability",
    location: "Hyderabad",
    year: "2023",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
  },
];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

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
          ))}

        </div>
      </section>

    </main>
  );
}
