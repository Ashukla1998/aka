import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FullProjects } from "../Data/ProjectData";
import ProjectImageSlider from "../components/ProjectImageSlider";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const sectionAnim = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = FullProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="px-8 md:px-24 py-32">
        <h2 className="font-serif font-medium text-2xl">
          Project not found
        </h2>
      </main>
    );
  }

  /* ================= IMAGE LIST ================= */
  const images = Array.from(
    { length: project.imageCount || 1 },
    (_, i) =>
      `${project.galleryPath}${String(i + 1).padStart(2, "0")}.jpg`
  );

  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO IMAGE ================= */}
      <section className="px-6 md:px-16 pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="border border-gray-200 p-4"
        >
          <img
            src={images[0]}
            alt={`${project.title} hero view`}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </section>

      {/* ================= INTRO + META ================= */}
      <section className="px-8 md:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

          {/* TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="font-sans text-xs tracking-[0.35em] uppercase text-gray-500 mb-4">
              {project.category}
            </p>

            <h1 className="font-serif font-medium text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
              {project.title}
            </h1>

            <p className="font-body text-gray-600 leading-relaxed mb-10 max-w-xl">
              {project.description ||
                "A context-driven architectural project balancing functionality, spatial clarity, and long-term performance."}
            </p>

            {project.work && (
              <div className="mt-6">
                <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Scope of Work
                </p>
                <p className="font-body text-gray-800">
                  {project.work}
                </p>
              </div>
            )}
          </motion.div>

          {/* META */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="grid grid-cols-2 gap-x-10 gap-y-8 text-sm"
          >
            {[
              ["Location", project.location],
              ["Site Area", project.size],
              ["Built-up Area", project.buildup],
              ["Status", project.status],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className="font-body text-gray-900">
                    {value}
                  </p>
                </div>
              ))}
          </motion.div>

        </div>
      </section>

      {/* ================= IMAGE SLIDER ================= */}
      <section className="py-24 border-t border-gray-100">
        <div className="px-8 md:px-24 mb-10">
          <h2 className="font-serif font-medium text-3xl mb-4">
            Project Gallery
          </h2>
          <p className="font-body text-gray-600 max-w-2xl">
            A visual walkthrough highlighting key architectural moments,
            spatial relationships, and material detailing.
          </p>
        </div>

        <ProjectImageSlider
          images={images}
          title={project.title}
        />
      </section>

      {/* ================= DESIGN NARRATIVE ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-8 md:px-24 py-36 bg-[#fafafa] text-gray-900"
      >
        <div className="max-w-5xl mx-auto">

          {/* ================= SECTION HEADER ================= */}
          <div className="max-w-2xl mb-20">
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-arcadisOrange mb-6">
              Project Narrative
            </p>

            <h2 className="font-serif font-medium text-4xl md:text-5xl leading-tight mb-6">
              Design Thinking & Outcomes
            </h2>

            <p className="font-body text-gray-600 leading-relaxed">
              An integrated design approach shaped by context, clarity, and
              long-term performance — translating intent into built form.
            </p>
          </div>

          {/* ================= CONTENT GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            {/* ================= DESIGN INTENT ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <span className="absolute -top-8 left-0 text-[72px] font-serif text-gray-200 leading-none">
                01
              </span>

              <h3 className="font-serif font-medium text-2xl mb-4 relative z-10">
                Design Intent
              </h3>

              <div className="w-12 h-[2px] bg-arcadisOrange mb-6" />

              <p className="font-body text-gray-600 leading-relaxed">
                The design intent was to respond sensitively to the site context,
                balancing functional requirements with adaptability for future
                needs while maintaining architectural clarity.
              </p>
            </motion.div>

            {/* ================= KEY CONSIDERATIONS ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <span className="absolute -top-8 left-0 text-[72px] font-serif text-gray-200 leading-none">
                02
              </span>

              <h3 className="font-serif font-medium text-2xl mb-4 relative z-10">
                Key Considerations
              </h3>

              <div className="w-12 h-[2px] bg-arcadisOrange mb-6" />

              <p className="font-body text-gray-600 leading-relaxed">
                Spatial hierarchy, natural daylight, circulation efficiency,
                material longevity, and environmental performance informed
                every design decision.
              </p>
            </motion.div>

            {/* ================= OUTCOME ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <span className="absolute -top-8 left-0 text-[72px] font-serif text-gray-200 leading-none">
                03
              </span>

              <h3 className="font-serif font-medium text-2xl mb-4 relative z-10">
                Outcome
              </h3>

              <div className="w-12 h-[2px] bg-arcadisOrange mb-6" />

              <p className="font-body text-gray-600 leading-relaxed">
                The final outcome is a cohesive architectural solution that
                balances aesthetics, performance, and long-term usability,
                delivering enduring value for users and stakeholders.
              </p>
            </motion.div>

          </div>
        </div>
      </motion.section>
    </main>
  );
}
