import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { projects } from "./Data/ProjectData"
import { Link } from "react-router-dom";

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
            <p className="text-xs tracking-[0.3em] text-arcadisGray uppercase mb-6">
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

            <Link to="/projects">
              <motion.button
                whileHover={{ x: 6 }}
                className="px-8 py-3 border border-arcadisOrange bg-arcadisOrange text-white text-sm tracking-wide  hover:text-white transition"
              >
                Explore Our Work
              </motion.button>
            </Link>

          </motion.div>

          {/* RIGHT : IMAGE COLLAGE */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative hidden md:block"
          >
            {/* Main Image */}
            <div className="w-[420px] h-[520px] overflow-hidden rounded-sm shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455"
                alt="Architecture"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Floating Image */}
            <div className="absolute -bottom-16 -left-20 w-[260px] h-[180px] shadow-2xl rounded-sm">
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
                     hover:bg-arcadisOrange hover:text-white transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10
                     bg-white/80 backdrop-blur p-3 shadow rounded-full
                     hover:bg-arcadisOrange hover:text-white transition"
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
          <Link to="/projects" className="snap-start shrink-0 w-[420px]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div
                className="h-[280px] flex items-center justify-center
                 border border-dashed border-gray-300
                 bg-white hover:bg-arcadisOrange
                 transition-colors duration-300"
              >
                <div className="text-center">
                  <p className="text-xs tracking-[0.3em] uppercase
                      text-gray-500 group-hover:text-white mb-4">
                    View All
                  </p>

                  <h3 className="font-serif text-2xl
                       text-gray-900 group-hover:text-white transition">
                    Explore More Projects
                  </h3>

                  <div
                    className="mt-6 inline-flex items-center gap-2 text-sm
                     text-gray-600 group-hover:text-gray-300"
                  >
                    See Portfolio <span className="text-lg"><ArrowRightIcon className="w-5 h-5" /></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

        </div>
      </motion.section>


      {/* ================= SERVICES ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-10 md:px-20 py-32 bg-white"
      >
        <div className="max-w-6xl">

          {/* ================= WHAT WE DO ================= */}
          <div className="max-w-2xl mb-24">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-36">
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
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                whileHover={{ y: -8 }}
                className="group cursor-default"
              >
                <div className="w-10 h-[2px] bg-arcadisOrange mb-6 transition-all group-hover:w-16" />

                <h4 className="text-lg font-medium mb-4">
                  {service.title}
                </h4>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ================= HOW WE THINK ================= */}
          <div className="max-w-2xl mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
              Design Philosophy
            </p>

            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              How We Think
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our design philosophy is rooted in integration, context,
              experience, and long-term sustainability.
            </p>
          </div>

          {/* PHILOSOPHY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {[
              {
                title: "Integrated",
                desc:
                  "With strength in architecture, interior, and landscape design, we provide a unified, one-stop solution. Even when engaged for architecture alone, we actively integrate interior planning into the design process.",
              },
              {
                title: "Contextual",
                desc:
                  "Every design is site-specific. If a proposal can be placed elsewhere, we return to the drawing board. Context is not a reference — it is the foundation.",
              },
              {
                title: "Impressionist",
                desc:
                  "We believe a successful design leaves a lasting mental image. Our projects balance cohesive themes with memorable elements that remain with visitors long after they leave.",
              },
              {
                title: "Sustainable",
                desc:
                  "Sustainability is integral to all our work — extending beyond environmental responsibility to include economic, cultural, and social dimensions.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="group max-w-xl"
              >
                <div className="w-10 h-[2px] bg-arcadisOrange mb-6 transition-all group-hover:w-16" />

                <h3 className="text-xl font-medium mb-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
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
          <Link to="/contact">
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-wide
         border border-arcadisOrange bg-arcadisOrange text-white
         hover:bg-arcadisOrange hover:text-white
         transition-colors duration-300 cursor-pointer"
            >
              Get in Touch
              <span className="text-lg"><ArrowRightIcon className="w-5 h-5" /></span>
            </motion.div>
          </Link>


        </div>
      </motion.section>
    </main>
  );
}