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
        <h2 className="font-sans font-medium text-2xl">
          Project not found
        </h2>
      </main>
    );
  }

  const images = Array.from(
    { length: project.imageCount || 1 },
    (_, i) =>
      `${project.galleryPath}${String(i + 1).padStart(2, "0")}.jpg`
  );

  return (
    <main className="bg-white text-arcadisDark font-sans">

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
            <p className="text-xs uppercase tracking-[0.35em] font-medium text-gray-500 mb-4">
              {project.category}
            </p>

            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
              {project.title}
            </h1>

            <p className="text-base font-normal text-gray-600 leading-relaxed mb-10 max-w-xl">
              {project.description ||
                "A context-driven architectural project balancing functionality, spatial clarity, and long-term performance."}
            </p>

            {project.work && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest font-medium text-gray-500 mb-2">
                  Scope of Work
                </p>
                <p className="text-base font-normal text-gray-800">
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
                  <p className="text-xs uppercase tracking-widest font-medium text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className="text-base font-normal text-gray-900">
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
          <h2 className="text-3xl font-semibold mb-4">
            Project Gallery
          </h2>
          <p className="text-base font-normal text-gray-600 max-w-2xl">
            A visual walkthrough highlighting key architectural moments,
            spatial relationships, and material detailing.
          </p>
        </div>

        <ProjectImageSlider images={images} title={project.title} />
      </section>

      {/* ================= DESIGN NARRATIVE ================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="px-8 md:px-24 py-36 bg-white"
      >
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="max-w-2xl mb-20">
            <p className="text-xs uppercase tracking-[0.4em] font-medium text-arcadisOrange mb-6">
              Project Narrative
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Design Thinking & Outcomes
            </h2>

            <p className="text-base font-normal text-gray-600 leading-relaxed">
              An integrated design approach shaped by context, clarity, and
              long-term performance — translating intent into built form.
            </p>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            {[
              {
                no: "01",
                title: "Design Intent",
                text:
                  "The design intent was to respond sensitively to the site context, balancing functional requirements with adaptability for future needs while maintaining architectural clarity.",
              },
              {
                no: "02",
                title: "Key Considerations",
                text:
                  "Spatial hierarchy, natural daylight, circulation efficiency, material longevity, and environmental performance informed every design decision.",
              },
              {
                no: "03",
                title: "Outcome",
                text:
                  "The final outcome is a cohesive architectural solution that balances aesthetics, performance, and long-term usability.",
              },
            ].map((item) => (
              <motion.div
                key={item.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <span className="absolute -top-8 left-0 text-[72px] font-normal text-gray-200">
                  {item.no}
                </span>

                <h3 className="text-2xl font-medium mb-4 relative z-10">
                  {item.title}
                </h3>

                <div className="w-12 h-[2px] bg-arcadisOrange mb-6" />

                <p className="text-base font-normal text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </motion.section>
    </main>
  );
}
