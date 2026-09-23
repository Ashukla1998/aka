import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Hero from "./components/Hero";
import ProjectDetail from "./pages/ProjectsStories";
import Company from "./components/Company";
import TeamSection from "./components/TeamSection";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const easeCurve = [0.16, 1, 0.3, 1];

const containerAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeCurve },
  },
};

export default function Home() {
  return (
    <main className="w-full min-h-screen relative overflow-x-hidden bg-white text-neutral-900 selection:bg-arcadisOrange selection:text-white">
      
      {/* ================= 1. HERO ================= */}
      <section className="w-full">
        <Hero />
      </section>

      {/* ================= 2. COMPANY OVERVIEW ================= */}
      <section className="w-full">
        <Company />
      </section>

      {/* ================= 3. SELECTED PROJECTS ================= */}
      <section className="w-full">
        <ProjectDetail />
      </section>

      {/* ================= TEAM ================= */}
      <TeamSection />

      {/* ================= 4. WHAT WE DO (EXPERTISE) ================= */}
      {/* <section className="w-full py-24 sm:py-28 border-t border-neutral-200/80 bg-neutral-50/50">
        {/* Unified 7XL Container */}
        {/* <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12"> */}
          
          {/* <motion.div
            variants={containerAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-3xl mb-16 md:mb-20"
          > */}
            {/* <motion.div variants={itemReveal} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-arcadisOrange" />
              <span>[ 02 // EXPERTISE ]</span>
            </motion.div> */}

            {/* <motion.h2 variants={itemReveal} className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-950 mb-5">
              What We <span className="font-semibold">Do</span>
            </motion.h2> */}

            {/* <motion.p variants={itemReveal} className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Our work spans architecture, urbanism, and environmental sustainability —
              combining strategic rigor with design excellence to create places that deliver long-term value.
            </motion.p>
          </motion.div> */}

          {/* <motion.div
            variants={containerAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {[
              {
                num: "01",
                title: "Architecture",
                desc: "Designing meaningful buildings rooted in context, tectonic craft, and responsive human experience.",
              },
              {
                num: "02",
                title: "Urban Planning",
                desc: "Shaping tomorrow’s civic landscapes through people-centric, resilient master planning and ecological balance.",
              },
              {
                num: "03",
                title: "Sustainability",
                desc: "Embedding advanced low-carbon methodologies, passive environmental control, and future-ready circular solutions.",
              },
            ].map((service) => (
              <motion.div
                key={service.title}
                variants={itemReveal}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider">
                      {service.num}
                    </span>
                    <div className="w-8 h-[2px] bg-neutral-200 group-hover:w-12 group-hover:bg-arcadisOrange transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-medium text-neutral-900 mb-3 group-hover:text-arcadisOrange transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div> */}
      {/* </section> */} 

      {/* ================= 5. DESIGN PHILOSOPHY ================= */}
      <section className="w-full py-24 sm:py-28 bg-white border-t border-neutral-200/80">
        {/* Unified 7XL Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          
          <motion.div
            variants={containerAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-3xl mb-16 md:mb-20"
          >
            {/* <motion.div variants={itemReveal} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-arcadisOrange" />
              <span>[ 03 // PHILOSOPHY ]</span>
            </motion.div> */}

            <motion.h2 variants={itemReveal} className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-950 mb-5">
              How We <span className="font-semibold">Think</span>
            </motion.h2>

            <motion.p variants={itemReveal} className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Our design philosophy rejects arbitrary form-making. Every project gesture
              originates from spatial integration, contextual necessity, emotive memory, and ecological balance.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12"
          >
            {[
              {
                index: "01",
                title: "Integrated",
                desc: "Uniting architecture, interior planning, and landscape into a cohesive spatial language. Even when engaged strictly for building shells, interior spatial flow actively informs our structural decisions.",
              },
              {
                index: "02",
                title: "Contextual",
                desc: "Every design is hyper-specific to its topography, orientation, and climate. If a proposal can be transplanted to another site without friction, we discard it. Context is the foundation.",
              },
              {
                index: "03",
                title: "Impressionist",
                desc: "Great architecture leaves an indelible mental silhouette. We balance rigorous tectonic discipline with expressive moments of light and fluid geometry that linger long after visitors depart.",
              },
              {
                index: "04",
                title: "Sustainable",
                desc: "Environmental responsibility is woven into every detail. Beyond checklist certifications, our sustainability model addresses regional construction culture, lifecycle economy, and intergenerational lifespans.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemReveal}
                className="group relative pl-6 border-l border-neutral-200 hover:border-arcadisOrange transition-colors duration-300"
              >
                <span className="font-mono text-xs text-neutral-400 tracking-widest block mb-1.5">
                  // {item.index}
                </span>

                <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-2.5 group-hover:text-arcadisOrange transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 6. COLLABORATION CTA ================= */}
      <section className="relative w-full py-28 md:py-36 bg-neutral-950 text-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-arcadisOrange/15 blur-[140px] pointer-events-none" />

        {/* Unified 7XL Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          <motion.div
            variants={containerAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* <motion.div variants={itemReveal} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-arcadisOrange animate-pulse" />
              <span>[ 04 // COLLABORATION ]</span>
            </motion.div> */}

            <motion.h2 variants={itemReveal} className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1]">
              Let’s Build Something <br />
              <span className="font-semibold text-white">Meaningful Together</span>
            </motion.h2>

            <motion.p variants={itemReveal} className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
              Whether you are conceptualizing an institutional master plan, rethinking an urban landmark, or planning a sustainable residence, our studio is ready to collaborate.
            </motion.p>

            <motion.div variants={itemReveal} className="pt-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] bg-white text-neutral-950 rounded-full hover:bg-arcadisOrange hover:text-white transition-all duration-300 shadow-xl shadow-black/50 group"
                >
                  <span>Initiate Dialogue</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= 7. FOOTER SOCIAL STRIP ================= */}
      <div className="w-full py-10 bg-white border-t border-neutral-200">
        {/* Unified 7XL Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 text-center md:text-left">
            Connect & Share
          </p>

          <div className="hidden md:block flex-1 mx-8 h-[1px] bg-neutral-200" />

          <div className="flex items-center justify-center gap-3">
            {[
              { icon: FaFacebookF, href: "#", label: "Facebook" },
              { icon: FaInstagram, href: "#", label: "Instagram" },
              { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
              { icon: FaTwitter, href: "#", label: "Twitter" },
            ].map(({ icon: Icon, href, label }, idx) => (
              <a
                key={idx}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:border-arcadisOrange hover:bg-arcadisOrange hover:text-white transition-all duration-300"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}