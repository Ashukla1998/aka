// import React from "react";
// import { useParams,useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// // import { FullProjects } from "../Data/ProjectData";
// import ProjectImageSlider from "../components/ProjectImageSlider";

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.9, ease: "easeOut" },
//   },
// };

// const sectionAnim = {
//   hidden: { opacity: 0, y: 80 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 1, ease: "easeOut" },
//   },
// };

// export default function ProjectDetail() {
//   // const { slug } = useParams();
//   const location = useLocation();
//   const projectId = location.state?.projectId;
//   // const project = FullProjects.find((p) => p.slug === slug);
//   if(!projectId){
//     return (
//       <main className="px-8 md:px-24 py-32">
//         <h2 className=" font-medium text-2xl">
//           Project not found
//         </h2>
//       </main>
//     );
//   }else{

//   }

//   if (!project) {
//     return (
//       <main className="px-8 md:px-24 py-32">
//         <h2 className=" font-medium text-2xl">
//           Project not found
//         </h2>
//       </main>
//     );
//   }

//   const images = Array.from(
//     { length: project.imageCount || 1 },
//     (_, i) =>
//       `${project.galleryPath}${String(i + 1).padStart(2, "0")}.jpg`
//   );

//   return (
//     <main className="bg-white text-arcadisDark ">

//       {/* ================= HERO IMAGE ================= */}
//       <section className="px-6 md:px-16 pt-20">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeUp}
//           className="border border-gray-200 p-4"
//         >
//           <img
//             src={images[0]}
//             alt={`${project.title} hero view`}
//             className="w-full h-auto object-contain"
//           />
//         </motion.div>
//       </section>

//       {/* ================= INTRO + META ================= */}
//       <section className="px-8 md:px-24 py-24">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

//           {/* TEXT */}
//           <motion.div initial="hidden" animate="visible" variants={fadeUp}>
//             <p className="text-xs uppercase tracking-[0.35em] font-medium text-gray-500 mb-4">
//               {project.category}
//             </p>

//             <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
//               {project.title}
//             </h1>

//             <p className="text-base font-normal text-gray-600 leading-relaxed mb-10 max-w-xl">
//               {project.description ||
//                 "A context-driven architectural project balancing functionality, spatial clarity, and long-term performance."}
//             </p>

//             {project.work && (
//               <div className="mt-6">
//                 <p className="text-xs uppercase tracking-widest font-medium text-gray-500 mb-2">
//                   Scope of Work
//                 </p>
//                 <p className="text-base font-normal text-gray-800">
//                   {project.work}
//                 </p>
//               </div>
//             )}
//           </motion.div>

//           {/* META */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeUp}
//             className="grid grid-cols-2 gap-x-10 gap-y-8 text-sm"
//           >
//             {[
//               ["Location", project.location],
//               ["Site Area", project.size],
//               ["Built-up Area", project.buildup],
//               ["Status", project.status],
//             ]
//               .filter(([, value]) => value)
//               .map(([label, value]) => (
//                 <div key={label}>
//                   <p className="text-xs uppercase tracking-widest font-medium text-gray-500 mb-1">
//                     {label}
//                   </p>
//                   <p className="text-base font-normal text-gray-900">
//                     {value}
//                   </p>
//                 </div>
//               ))}
//           </motion.div>

//         </div>
//       </section>

//       {/* ================= IMAGE SLIDER ================= */}
//       <section className="py-24 border-t border-gray-100">
//         <div className="px-8 md:px-24 mb-10">
//           <h2 className="text-3xl font-semibold mb-4">
//             Project Gallery
//           </h2>
//           <p className="text-base font-normal text-gray-600 max-w-2xl">
//             A visual walkthrough highlighting key architectural moments,
//             spatial relationships, and material detailing.
//           </p>
//         </div>

//         <ProjectImageSlider images={images} title={project.title} />
//       </section>

//       {/* ================= DESIGN NARRATIVE ================= */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={sectionAnim}
//         className="px-8 md:px-24 py-36 bg-white"
//       >
//         <div className="max-w-5xl mx-auto">

//           {/* HEADER */}
//           <div className="max-w-2xl mb-20">
//             <p className="text-xs uppercase tracking-[0.4em] font-medium text-arcadisOrange mb-6">
//               Project Narrative
//             </p>

//             <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
//               Design Thinking & Outcomes
//             </h2>

//             <p className="text-base font-normal text-gray-600 leading-relaxed">
//               An integrated design approach shaped by context, clarity, and
//               long-term performance — translating intent into built form.
//             </p>
//           </div>

//           {/* CONTENT GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

//             {[
//               {
//                 no: "01",
//                 title: "Design Intent",
//                 text:
//                   "The design intent was to respond sensitively to the site context, balancing functional requirements with adaptability for future needs while maintaining architectural clarity.",
//               },
//               {
//                 no: "02",
//                 title: "Key Considerations",
//                 text:
//                   "Spatial hierarchy, natural daylight, circulation efficiency, material longevity, and environmental performance informed every design decision.",
//               },
//               {
//                 no: "03",
//                 title: "Outcome",
//                 text:
//                   "The final outcome is a cohesive architectural solution that balances aesthetics, performance, and long-term usability.",
//               },
//             ].map((item) => (
//               <motion.div
//                 key={item.no}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.7 }}
//                 className="relative"
//               >
//                 <span className="absolute -top-8 left-0 text-[72px] font-normal text-gray-200">
//                   {item.no}
//                 </span>

//                 <h3 className="text-2xl font-medium mb-4 relative z-10">
//                   {item.title}
//                 </h3>

//                 <div className="w-12 h-[2px] bg-arcadisOrange mb-6" />

//                 <p className="text-base font-normal text-gray-600 leading-relaxed">
//                   {item.text}
//                 </p>
//               </motion.div>
//             ))}

//           </div>
//         </div>
//       </motion.section>
//     </main>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectImageSlider from "../components/ProjectImageSlider";
import Spinner from "../components/Spinner";

export default function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://www.lifepage.in/n/api/GetProjectDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
          signal: controller.signal,
        });

        const result = await response.json();

        if (result.success && result.data) {
          setProject(result.data);
        } else {
          setError(result.message || "Project not found.");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError("Failed to load project details.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProjectDetails();

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full min-h-[70vh] flex flex-col justify-center items-center bg-white">
        <Spinner isLoading={true} />
        <span className="mt-4  text-xs uppercase tracking-[0.25em] text-gray-400 animate-pulse">
          Loading Project Archive
        </span>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-white">
        <span className=" text-xs uppercase tracking-[0.3em] text-arcadisOrange mb-3">
          Error 404
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight mb-4">
          {error || "Project Not Found"}
        </h2>
        <p className="text-gray-500 max-w-md text-sm mb-8 leading-relaxed">
          The requested architectural record could not be retrieved or has been relocated.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-900 text-xs uppercase  tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
        >
          ← Return to All Projects
        </Link>
      </main>
    );
  }

  const galleryImages = Array.isArray(project.images)
    ? [...project.images]
        .sort((a, b) => (a.order_no || 0) - (b.order_no || 0))
        .map((img) => img.image_location)
        .filter(Boolean)
    : [];

  const heroImage = project.cover || galleryImages[0];

  const metaSpecs = [
    { label: "Location", value: project.location },
    { label: "Typology", value: project.category },
    { label: "Site Area", value: project.size },
    { label: "Built-up Area", value: project.buildup },
    { label: "Project Phase", value: project.status },
    {
      label: "Timeline",
      value:
        project.start_year === project.end_year
          ? project.start_year
          : [project.start_year, project.end_year].filter(Boolean).join(" — "),
    },
    { label: "Scope", value: project.service, fullWidth: true },
  ].filter((item) => Boolean(item.value));

  return (
    <main className="bg-white text-gray-900  selection:bg-arcadisOrange selection:text-white">
      {/* ================= 1. BREADCRUMB & HEADER BAR ================= */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-xs  uppercase tracking-[0.2em] text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Index</span>
          </Link>

          <div className="flex items-center gap-4">
            {project.status && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px]  tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-arcadisOrange animate-pulse" />
                {project.status}
              </span>
            )}
            <span className="hidden sm:inline  text-xs text-gray-400">
              ID: {String(project.projectid || "00").padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* ================= 2. EDITORIAL HERO ================= */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-4xl"
        >
          {project.category && (
            <p className=" text-xs uppercase tracking-[0.3em] text-arcadisOrange mb-3">
              {project.category}
            </p>
          )}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.08] text-gray-950">
            {project.title}
          </h1>
        </motion.div>

        {/* Hero Image Container */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] max-h-[80vh] overflow-hidden bg-gray-100 group cursor-pointer"
            onClick={() => setActiveLightboxImg(heroImage)}
          >
            <img
              src={heroImage}
              alt={`${project.title} overview`}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded text-[11px]  tracking-wider text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view high-res ↗
            </div>
          </motion.div>
        )}
      </section>

      {/* ================= 3. ARCHITECTURAL SPECIFICATIONS & OVERVIEW ================= */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 border-t border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Project Overview Statement */}
          <div className="lg:col-span-5">
            <span className=" text-[11px] uppercase tracking-[0.3em] text-gray-400 block mb-4">
              Project Statement
            </span>
            <p className="text-xl sm:text-2xl font-light text-gray-900 leading-relaxed mb-6">
              {project.description ||
                "A context-driven architectural intervention focusing on spatial balance, tactile material honesty, and resilient performance."}
            </p>
            {project.gallerypath && (
              <p className=" text-xs text-gray-400">
                archive ref / {project.gallerypath}
              </p>
            )}
          </div>

          {/* Right Column: Clean Spec Matrix */}
          <div className="lg:col-span-7">
            <span className=" text-[11px] uppercase tracking-[0.3em] text-gray-400 block mb-4">
              Project Parameters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-gray-200">
              {metaSpecs.map((item, idx) => (
                <div
                  key={idx}
                  className={`py-4 border-b border-gray-200 flex flex-col justify-between ${
                    item.fullWidth ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className=" text-[11px] uppercase tracking-widest text-gray-400 mb-1">
                    {item.label}
                  </span>
                  <span className="text-base font-normal text-gray-900 leading-snug">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 4. GALLERY WALKTHROUGH ================= */}
      {galleryImages.length > 0 && (
        <section className="py-20 bg-gray-50/60 border-t border-gray-200">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className=" text-[11px] uppercase tracking-[0.3em] text-arcadisOrange block mb-2">
                Visual Documentation
              </span>
              <h2 className="text-3xl font-normal tracking-tight text-gray-900">
                Spatial Walkthrough
              </h2>
            </div>
            <p className="text-xs  text-gray-500 uppercase tracking-wider">
              {galleryImages.length} Curated Plates
            </p>
          </div>

          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <ProjectImageSlider
              images={galleryImages}
              title={project.title}
              onImageClick={(imgUrl) => setActiveLightboxImg(imgUrl)}
            />
          </div>
        </section>
      )}

      {/* ================= 5. DESIGN THINKING & NARRATIVE ================= */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-28 border-t border-gray-200">
        <div className="max-w-2xl mb-16">
          <span className=" text-[11px] uppercase tracking-[0.3em] text-arcadisOrange block mb-3">
            Design Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight leading-tight mb-4">
            Intent, Methodology & Execution
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Every volumetric decision is filtered through programmatic necessity, environmental response, and refined craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              code: "01",
              title: "Contextual Integration",
              body: "Responding directly to geographical, climate, and urban contours. The volume respects its environment through sensible orientation and massing modulation.",
            },
            {
              code: "02",
              title: "Material Honesty",
              body: "Prioritizing materials that age gracefully over time. Surfaces remain tactile and unpretentious, elevating structural transparency throughout each space.",
            },
            {
              code: "03",
              title: "Spatial Performance",
              body: "Balancing fluid daylight penetration with acoustic comfort and flexible utility, ensuring longevity for changing spatial requirements.",
            },
          ].map((block) => (
            <div
              key={block.code}
              className="p-8 border border-gray-200/80 bg-white hover:border-gray-900 transition-colors duration-500 flex flex-col justify-between"
            >
              <div>
                <span className=" text-xs text-arcadisOrange block mb-6">
                  [{block.code}]
                </span>
                <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-tight">
                  {block.title}
                </h3>
                <p className="text-sm font-light text-gray-600 leading-relaxed">
                  {block.body}
                </p>
              </div>
              <div className="w-6 h-[1.5px] bg-gray-200 mt-8" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 text-white  text-xs uppercase tracking-widest px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all"
            >
              Close [ESC]
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={activeLightboxImg}
              alt="Enlarged architectural view"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}