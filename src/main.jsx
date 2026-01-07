import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Hero from "./components/Hero";
import ProjectDetail from "./pages/ProjectsStories";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const sectionAnim = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <main className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="mt-2">
        <Hero />
      </section>

      {/* ================= PROJECT SCROLLER ================= */}
      <ProjectDetail />

      {/* ================= SERVICES ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-10 md:px-20 py-32"
      >
        <div className="max-w-6xl">

          {/* ===== WHAT WE DO ===== */}
          <div className="max-w-2xl mb-24">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-arcadisOrange">
              Our Expertise
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              What We Do
            </h2>

            <p className="text-base leading-relaxed font-medium max-w-3xl">
              Our work spans architecture, urbanism, and sustainability —
              combining strategic thinking with design excellence to create
              places that deliver long-term value.
            </p>
          </div>

          {/* ===== SERVICES GRID ===== */}
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
                className="group"
              >
                <div className="w-10 h-[2px] bg-arcadisOrange mb-6 transition-all group-hover:w-16" />

                <h3 className="text-2xl font-medium mb-4 uppercase">
                  {service.title}
                </h3>

                <p className="leading-relaxed font-normal">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ===== HOW WE THINK ===== */}
          <div className="max-w-2xl mb-20">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-arcadisOrange">
              Design Philosophy
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              How We Think
            </h2>

            <p className="font-medium leading-relaxed">
              Our design philosophy is rooted in integration, context,
              experience, and long-term sustainability.
            </p>
          </div>

          {/* ===== PHILOSOPHY GRID ===== */}
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

                <h3 className="text-2xl uppercase font-medium mb-4">
                  {item.title}
                </h3>

                <p className="leading-relaxed font-normal">
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
        className="px-10 md:px-20 py-32 bg-[#fafafa] text-center"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase text-arcadisOrange mb-6">
            Collaboration
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">
            Let’s Build Something <br />
            <span className="text-arcadisGold">Meaningful Together</span>
          </h2>

          <p className="leading-relaxed font-normal">
            Whether you’re planning a new project, rethinking an existing space,
            or exploring sustainable design strategies, we’d be happy to collaborate.
          </p>

          <Link to="/contact">
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-4 text-sm font-medium tracking-wide
              border border-arcadisOrange bg-arcadisOrange text-white rounded-[5px] mt-8"
            >
              Get in Touch
              <ArrowRightIcon className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>
      </motion.section>

      {/* ================= SHARE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 sm:px-10 md:px-20 py-10"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 text-arcadisDark">

          <p className="text-xs tracking-[0.25em] uppercase text-center md:text-left">
            Share with your friends
          </p>

          <div className="hidden md:block flex-1 h-[1px] bg-gray-200" />

          <div className="flex items-center justify-center md:justify-end gap-4">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
              (Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  aria-label="Share"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center
                    border border-arcadisOrange rounded-full
                    text-arcadisOrange
                    hover:bg-arcadisOrange hover:text-white
                    transition-all duration-300"
                >
                  <Icon size={14} />
                </motion.a>
              )
            )}
          </div>
        </div>
      </motion.div>

    </main>
  );
}
