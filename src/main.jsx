import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {projects} from "./Data/ProjectData"

const sectionAnim = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function Home() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="min-h-[90vh] flex items-center px-10 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT : TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionAnim}
          >
            <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
              Architecture · Urban Design · Sustainability
            </p>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
              Designing Spaces <br />
              That Shape{" "}
              <span className="text-[#c5a879]">Better Futures</span>
            </h1>

            <p className="text-gray-600 max-w-xl mb-10 leading-relaxed">
              We design thoughtful, sustainable environments that enhance
              everyday life, strengthen communities, and shape resilient
              cities for the future.
            </p>

            <motion.button
              whileHover={{ x: 6 }}
              className="px-8 py-3 border border-gray-900 text-sm tracking-wide hover:bg-black hover:text-white transition"
              onClick={() => window.location.href = "/projects"}
            >
              Explore Our Work
            </motion.button>
          </motion.div>

          {/* RIGHT : IMAGE COLLAGE */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative hidden md:block"
          >
            {/* Main Image */}
            <div className="w-[420px] h-[520px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455"
                alt="Architecture"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Image */}
            <div className="absolute -bottom-16 -left-20 w-[260px] h-[180px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb"
                alt="Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= PROJECT SCROLLER ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-10 md:px-20 py-28 bg-gray-50 relative"
      >
        <div className="max-w-6xl mb-14">
          <h2 className="font-serif text-4xl mb-4">Selected Projects</h2>
          <p className="text-gray-600 max-w-xl">
            A curated selection of our architectural work.
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10
                     bg-white/80 backdrop-blur p-3 shadow rounded-full
                     hover:bg-black hover:text-white transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10
                     bg-white/80 backdrop-blur p-3 shadow rounded-full
                     hover:bg-black hover:text-white transition"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto scroll-smooth snap-x
                     snap-mandatory no-scrollbar pb-6"
        >
          {/* Project Cards */}
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="snap-start shrink-0 w-[420px] cursor-pointer"
            >
              <div className="relative overflow-hidden h-[280px]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover
                             transition-transform duration-700 hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.place}</p>
            </motion.div>
          ))}

          {/* EXPLORE MORE CARD */}
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            className="snap-start shrink-0 w-[420px] group cursor-pointer"
          >
            <div
              className="h-[280px] flex items-center justify-center
                         border border-dashed border-gray-300
                         bg-white hover:bg-black
                         transition-colors duration-300"
            >
              <div className="text-center">
                <p className="text-xs tracking-[0.3em] uppercase
                              text-gray-500 group-hover:text-gray-400 mb-4">
                  View All
                </p>

                <h3 className="font-serif text-2xl
                               text-gray-900 group-hover:text-white transition">
                  Explore More Projects
                </h3>

                <div
                  className="mt-6 inline-flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-300"
                >
                  See Portfolio <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </motion.section>


      {/* ================= SERVICES ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-10 md:px-20 py-28 bg-white"
      >
        <div className="max-w-6xl">

          {/* SECTION HEADER */}
          <div className="max-w-2xl mb-20">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-4">
              Our Expertise
            </p>

            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              What We Do
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our work spans architecture, urbanism, and sustainability —
              combining strategic thinking with design excellence to create
              places that deliver long-term value.
            </p>
          </div>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Architecture",
                desc:
                  "Designing meaningful buildings rooted in context, craft, and human experience.",
              },
              {
                title: "Urban Planning",
                desc:
                  "Shaping cities and communities through people-centric, resilient planning.",
              },
              {
                title: "Sustainability",
                desc:
                  "Embedding low-carbon strategies and future-ready solutions across projects.",
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-default"
              >
                {/* Accent Line */}
                <div className="w-10 h-[2px] bg-[#c5a879] mb-6 transition-all group-hover:w-16"></div>

                <h4 className="text-lg font-medium mb-4">
                  {service.title}
                </h4>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* ================= CTA ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-10 md:px-20 py-32 bg-[#fafafa] text-gray-900 text-center relative"
      >
        <div className="max-w-3xl mx-auto">

          {/* Eyebrow */}
          <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-6">
            Collaboration
          </p>

          {/* Headline */}
          <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
            Let’s Build Something <br />
            <span className="text-[#c5a879]">Meaningful Together</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-14 leading-relaxed">
            Whether you’re planning a new project, rethinking an existing space,
            or exploring sustainable design strategies, we’d be happy to collaborate.
          </p>

          {/* CTA Button */}
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-wide
                 border border-[#c5a879] text-[#c5a879]
                 hover:bg-[#c5a879] hover:text-white
                 transition-colors duration-300"
          >
            Get in Touch
            <span className="text-lg">→</span>
          </motion.a>

        </div>
      </motion.section>



    </main>
  );
}