// import React from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FullProjects } from "../Data/ProjectData";

// export default function ProjectDetail() {
//   const { slug } = useParams();

//   const project = FullProjects.find((p) => p.slug === slug);

//   if (!project) {
//     return (
//       <main className="px-10 md:px-24 py-32">
//         <h2 className="text-2xl font-medium">Project not found</h2>
//       </main>
//     );
//   }

//   /* Generate gallery images dynamically */
//   const images = Array.from(
//     { length: project.imageCount || 1 },
//     (_, i) =>
//       `${project.galleryPath}${String(i + 1).padStart(2, "0")}.jpg`
//   );

//   return (
//     <main className="bg-white text-gray-900">

//       {/* ================= HERO ================= */}
//       <section className="px-10 md:px-24 pt-24 pb-20">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl"
//         >
//           <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-4">
//             {project.category}
//           </p>

//           <h1 className="font-serif text-5xl md:text-6xl leading-[1.1] tracking-tight mb-6">
//             {project.title}
//           </h1>

//           <p className="text-gray-600 max-w-2xl leading-relaxed">
//             {project.description ||
//               "This project reflects our approach to context-driven design, balancing functionality, spatial clarity, and long-term performance."}
//           </p>
//         </motion.div>
//       </section>

//       {/* ================= META ================= */}
//       <section className="px-10 md:px-24 pb-24">
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
//           {[
//             { label: "Location", value: project.location },
//             { label: "Category", value: project.category },
//             { label: "Site Area", value: project.size },
//             { label: "Built-up Area", value: project.buildup },
//             { label: "Status", value: project.status },
//             { label: "Scope", value: project.work },
//           ]
//             .filter((item) => item.value)
//             .map((item) => (
//               <div key={item.label}>
//                 <p className="uppercase tracking-widest text-xs text-gray-500 mb-1">
//                   {item.label}
//                 </p>
//                 <p className="text-gray-900">{item.value}</p>
//               </div>
//             ))}
//         </div>
//       </section>

//       {/* ================= IMAGE GALLERY ================= */}
//       <section className="px-10 md:px-24 pb-32 space-y-32">

//         {/* HERO IMAGE */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.9 }}
//         >
//           <img
//             src={images[0]}
//             alt={`${project.title} hero`}
//             className="w-full h-auto object-contain"
//           />
//         </motion.div>

//         {/* EDITORIAL GRID */}
//         {images.length > 1 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
//             {images.slice(1).map((img, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <img
//                   src={img}
//                   alt={`${project.title} ${i + 2}`}
//                   className="w-full h-auto object-contain"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         )}

//       </section>

//       {/* ================= NARRATIVE ================= */}
//       <section className="px-10 md:px-24 pb-32">
//         <div className="max-w-3xl">
//           <h2 className="font-serif text-3xl mb-6">
//             Project Overview
//           </h2>

//           <p className="text-gray-600 leading-relaxed mb-6">
//             The design responds to site context, functional requirements,
//             and long-term operational efficiency while maintaining a clear
//             architectural identity.
//           </p>

//           <p className="text-gray-600 leading-relaxed">
//             Material selection, spatial planning, and sustainability
//             considerations were carefully integrated to ensure durability,
//             comfort, and adaptability over time.
//           </p>
//         </div>
//       </section>

//     </main>
//   );
// }

import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FullProjects } from "../Data/ProjectData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();

  const project = FullProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="px-8 md:px-24 py-32">
        <h2 className="text-2xl font-medium">Project not found</h2>
      </main>
    );
  }

  /* IMAGE LIST (fallback-safe) */
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
            alt={project.title}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="px-8 md:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

          {/* TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-4">
              {project.category}
            </p>

            <h1 className="font-serif text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
              {project.title}
            </h1>

            <p className="text-gray-600 leading-relaxed mb-10 max-w-xl">
              {project.description ||
                "A context-driven architectural project balancing functionality, spatial clarity, and long-term performance."}
            </p>
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
              ["Category", project.category],
              ["Site Area", project.size],
              ["Built-up Area", project.buildup],
              ["Status", project.status],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <p className="uppercase tracking-widest text-xs text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className="text-gray-900">{value}</p>
                </div>
              ))}
          </motion.div>

        </div>
      </section>

      {/* ================= IMAGE PAIR ================= */}
      {images.length > 2 && (
        <section className="px-8 md:px-24 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {images.slice(1, 3).map((img, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-gray-200 p-3"
              >
                <img
                  src={img}
                  alt={`${project.title} view ${i + 2}`}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================= STATEMENT IMAGE ================= */}
      {images[3] && (
        <section className="px-6 md:px-16 py-32 bg-[#fafafa]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="border border-gray-300 p-4"
          >
            <img
              src={images[3]}
              alt={`${project.title} statement`}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </section>
      )}

      {/* ================= IMAGE GRID ================= */}
      {images.length > 4 && (
        <section className="px-8 md:px-24 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {images.slice(4).map((img, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-gray-200 p-3"
              >
                <img
                  src={img}
                  alt={`${project.title} detail ${i + 5}`}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================= CLOSING NARRATIVE ================= */}
      <section className="px-8 md:px-24 pb-32">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl mb-6">
            Design Approach
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The design responds to site context, user requirements, and
            operational clarity while maintaining a strong architectural
            identity.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Material choices and spatial planning were guided by durability,
            comfort, and long-term adaptability.
          </p>
        </div>
      </section>

    </main>
  );
}

