// src/pages/Careers.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
const sectionAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Careers() {
  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="px-10 md:px-20 pt-32 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionAnim}
          className="max-w-4xl"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-6">
            Careers at AKA
          </p>

          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
            Build Your Career <br />
            <span className="text-[#c5a879]">With Purpose</span>
          </h1>

          <p className="text-gray-600 max-w-2xl leading-relaxed">
            At Archana Kapil Associates, we believe meaningful design begins
            with thoughtful people. We are always looking for curious minds,
            creative thinkers, and committed professionals who want to shape
            spaces that matter.
          </p>
        </motion.div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-10 md:px-20 py-28 bg-gray-50"
      >
        <div className="max-w-6xl">

          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Our Culture
          </p>

          <h2 className="font-serif text-4xl md:text-5xl mb-14">
            Why Work With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Integrated Thinking",
                desc:
                  "Work across architecture, interiors, landscape, and planning—developing a holistic design mindset.",
              },
              {
                title: "Context-Driven Design",
                desc:
                  "Every project responds to place, people, and purpose. No generic solutions.",
              },
              {
                title: "Long-Term Growth",
                desc:
                  "We invest in learning, mentorship, and responsibility at every career stage.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="group"
              >
                <div className="w-10 h-[2px] bg-arcadisOrange mb-6 transition-all group-hover:w-16" />
                <h4 className="text-lg font-medium mb-4">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= OPEN POSITIONS ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-10 md:px-20 py-28"
      >
        <div className="max-w-6xl">

          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Opportunities
          </p>

          <h2 className="font-serif text-4xl md:text-5xl mb-16">
            Current Openings
          </h2>

          <div className="space-y-10">
            {[
              {
                role: "Architect",
                exp: "3–6 Years",
                desc:
                  "Lead architectural design from concept to execution with strong technical and design skills.",
              },
              {
                role: "Interior Designer",
                exp: "2–5 Years",
                desc:
                  "Develop interior concepts, materials, and detailing across residential and commercial projects.",
              },
              {
                role: "Architectural Intern",
                exp: "Final Year / Fresh Graduate",
                desc:
                  "Support design development, drawings, and research across live projects.",
              },
            ].map((job, i) => (
              <motion.div
                key={job.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="border border-gray-200 p-8 hover:border-arcadisOrange transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      {job.role}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Experience: {job.exp}
                    </p>
                    <p className="text-sm text-gray-600 max-w-xl">
                      {job.desc}
                    </p>
                  </div>

                  <a
                    href="mailto:careers@archanakapilassociates.com"
                    className="inline-block px-6 py-3 text-sm border bg-arcadisOrange border-arcadisOrange text-white hover:bg-arcadisOrange hover:text-white
                               transition"
                  >
                    Apply Now
                  </a>
                </div>
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
          <h2 className="font-serif text-4xl md:text-5xl mb-8">
            Don’t See Your Role?
          </h2>

          <p className="text-gray-600 mb-12 leading-relaxed">
            We’re always open to meeting talented designers and thinkers.
            Send us your portfolio and resume, and we’ll reach out when
            an opportunity aligns.
          </p>

          <a
            href="mailto:careers@archanakapilassociates.com"
            className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-wide
                       border border-arcadisOrange text-white bg-arcadisOrange
                       hover:bg-arcadisOrange hover:text-white transition"
          >
            Send Your Profile <span className="text-lg"><ArrowRightIcon className="w-5 h-5" /></span>
          </a>
        </div>
      </motion.section>

    </main>
  );
}
