// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { FullProjects } from "../Data/ProjectData";
// // import { Link } from "react-router-dom";
// // import ProjectImageSlider from "../components/ProjectImageSlider";
// // const categories = ["All", "Healthcare", "Educational", "Housing", "Hospitality", "Commercial", "Public", "Residential"];


// // export default function Projects() {
// //   const [active, setActive] = useState("All");

// //   const filtered =
// //     active === "All"
// //       ? FullProjects
// //       : FullProjects.filter((p) => p.category === active);
// //   const coverImages = filtered.map((p) => p.cover);

// //   return (
// //     <main className="bg-white">

// //       {/* ================= HEADER ================= */}
// //       <section className="px-10 md:px-20 pt-24 pb-16">
// //         <div className="max-w-4xl">
// //           <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">
// //             Our Work
// //           </p>

// //           <h1 className="font-serif text-5xl md:text-6xl mb-6">
// //             Explore Projects
// //           </h1>

// //           <p className="text-gray-600 max-w-2xl leading-relaxed">
// //             A selection of our architectural, urban, and interior projects —
// //             designed with purpose, context, and long-term impact.
// //           </p>
// //         </div>
// //       </section>

// //       <section className="py-24 border-t border-gray-100">
// //               <div className="px-8 md:px-24 mb-10">
// //                 <h2 className="font-serif font-medium text-3xl mb-4">
// //                   Project Gallery
// //                 </h2>
// //                 <p className="font-body text-gray-600 max-w-2xl">
// //                   A visual walkthrough highlighting key architectural moments,
// //                   spatial relationships, and material detailing.
// //                 </p>
// //               </div>

// //               <ProjectImageSlider images={coverImages} title={filtered.title}/>
// //             </section>

// //       {/* ================= FILTERS ================= */}
// //       <section className="px-10 md:px-20 mb-20">
// //         <div className="flex flex-wrap gap-6 text-sm">
// //           {categories.map((cat) => (
// //             <button
// //               key={cat}
// //               onClick={() => setActive(cat)}
// //               className={`pb-1 transition-colors
// //                 ${
// //                   active === cat
// //                     ? "text-[#c5a879] border-b border-[#c5a879]"
// //                     : "text-gray-600 hover:text-gray-900"
// //                 }`}
// //             >
// //               {cat}
// //             </button>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ================= PROJECT GRID ================= */}
// //       <section className="px-10 md:px-20 pb-32">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

// //           {filtered.map((p, i) => (
// //             <Link to={`/projects/${p.slug}`}>
// //             <motion.div
// //               key={i}
// //               initial={{ opacity: 0, y: 40 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: i * 0.08, duration: 0.6 }}
// //               className="group cursor-pointer"
// //             >
// //               {/* Image */}
// //               <div className="relative h-[280px] overflow-hidden">
// //                 <img
// //                   src={p.cover}
// //                   alt={p.title}
// //                   className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
// //                 />

// //                 {/* Overlay */}
// //                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
// //               </div>

// //               {/* Meta */}
// //               <div className="mt-4">
// //                 <h3 className="text-lg font-medium">{p.title}</h3>
// //                 <p className="text-sm text-gray-500">
// //                   {p.location} · {p.year}
// //                 </p>
// //               </div>
// //             </motion.div>
// //             </Link>
// //           ))}

// //         </div>
// //       </section>

// //     </main>
// //   );
// // }


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FullProjects } from "../Data/ProjectData";
// import { Link } from "react-router-dom";
// import ProjectImageSlider from "../components/ProjectImageSlider";

// const categories = [
//   "All",
//   "Healthcare",
//   "Educational",
//   "Housing",
//   "Hospitality",
//   "Commercial",
//   "Public",
//   "Residential",
// ];

// export default function Projects() {
//   const [active, setActive] = useState("All");

//   const filtered =
//     active === "All"
//       ? FullProjects
//       : FullProjects.filter((p) => p.category === active);

//   const coverImages = filtered.map((p) => p.cover);

//   return (
//     <main className="bg-white">
//       {/* ================= FEATURED SLIDER ================= */}
//       <section className="py-24 border-t border-gray-100">
//         <ProjectImageSlider
//           images={coverImages}
//           title="Featured Projects"
//         />
//       </section>

//       {/* ================= FILTERS ================= */}
//       <section className="px-10 md:px-20 py-16">
//         <div className="flex flex-wrap gap-8 text-sm font-sans">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActive(cat)}
//               className={`relative pb-1 transition-colors duration-300
//                 ${active === cat
//                   ? "text-arcadisGold"
//                   : "text-gray-600 hover:text-gray-900"
//                 }`}
//             >
//               {cat}
//               {active === cat && (
//                 <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-arcadisGold" />
//               )}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* ================= PROJECT GRID ================= */}
//       <section className="px-10 md:px-20 pb-36">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

//           {filtered.map((p, i) => (
//             <Link key={p.slug} to={`/projects/${p.slug}`}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.08, duration: 0.6 }}
//                 className="group cursor-pointer"
//               >

//                 {/* ================= IMAGE ================= */}
//                 <div className="relative overflow-hidden bg-gray-100">

//                   <img
//                     src={p.cover}
//                     alt={p.title}
//                     className="w-full h-[320px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                   />

//                   {/* Gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />

//                   {/* ================= TEXT + ARROW ================= */}
//                   <div className="absolute inset-0 flex flex-col justify-end p-6">

//                     {/* Meta */}
//                     <p className="font-body text-sm text-white/80 mb-1">
//                       {p.location}
//                       {p.year && ` · ${p.year}`}
//                     </p>

//                     {/* Title + Arrow */}
//                     <div className="flex items-center justify-between gap-4">
//                       <h3 className="font-serif font-medium text-lg text-white leading-snug">
//                         {p.title}
//                       </h3>

//                       {/* Arrow */}
//                       <div
//                         className="
//                     w-9 h-9 rounded-full border border-white/60
//                     flex items-center justify-center
//                     transform translate-x-2 opacity-0
//                     group-hover:translate-x-0 group-hover:opacity-100
//                     transition-all duration-300 hover:bg-arcadisOrange
//                   "
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="white"
//                           className="w-4 h-4"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//                           />
//                         </svg>
//                       </div>
//                     </div>

//                   </div>
//                 </div>

//               </motion.div>
//             </Link>
//           ))}

//         </div>
//       </section>


//     </main>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FullProjects } from "../Data/ProjectData";
import { Link } from "react-router-dom";
import ProjectImageSlider from "../components/ProjectImageSlider";

const categories = [
  "All",
  "Healthcare",
  "Educational",
  "Housing",
  "Hospitality",
  "Commercial",
  "Public",
  "Residential",
];

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

  /* ================= FILTER ================= */
  const filtered =
    active === "All"
      ? FullProjects
      : FullProjects.filter((p) => p.category === active);

  /* ================= RESET PAGE ON FILTER CHANGE ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const coverImages = filtered.map((p) => p.cover);

  /* ================= SCROLL ON PAGE CHANGE ================= */
  useEffect(() => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <main className="bg-white">

      {/* ================= FEATURED SPLIT HERO ================= */}
      <section className="px-10 md:px-20 pt-28 pb-32 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

          <div className="md:col-span-5">
            <p className="font-sans text-xs tracking-[0.35em] uppercase text-gray-500 mb-6">
              Our Work
            </p>

            <h1 className="font-serif font-medium text-5xl md:text-6xl leading-tight mb-6">
              Explore Projects
            </h1>

            <p className="font-body text-gray-600 max-w-md leading-relaxed">
              A curated selection of architectural, urban, and interior projects
              shaped by context, purpose, and long-term impact.
            </p>
          </div>

          <div className="md:col-span-7">
            <ProjectImageSlider
              images={coverImages}
              title="Featured Projects"
            />
          </div>

        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="sticky top-[72px] z-30 bg-white border-b border-gray-100">
        <div className="px-10 md:px-20 py-6 flex flex-wrap items-center justify-between gap-6">

          {/* Filters */}
          <div className="flex flex-wrap gap-8 text-sm font-sans">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative pb-1 transition-colors
                  ${
                    active === cat
                      ? "text-arcadisGold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {cat}
                {active === cat && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-arcadisGold" />
                )}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="font-body text-sm text-gray-500">
            Showing{" "}
            <span className="text-gray-900">
              {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of <span className="text-gray-900">{filtered.length}</span> projects
          </p>

        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section ref={gridRef} className="px-10 md:px-20 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {paginatedProjects.map((p, i) => (
            <Link key={p.slug} to={`/projects/${p.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group cursor-pointer"
              >

                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="font-body text-sm text-white/80 mb-1">
                      {p.location}
                      {p.year && ` · ${p.year}`}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif font-medium text-lg text-white leading-snug">
                        {p.title}
                      </h3>

                      <div className="
                        w-9 h-9 rounded-full border border-white/60
                        flex items-center justify-center
                        translate-x-2 opacity-0
                        group-hover:translate-x-0 group-hover:opacity-100
                        transition-all duration-300
                      ">
                        →
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </Link>
          ))}

        </div>
      </section>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <section className="pb-36">
          <div className="flex items-center justify-center gap-2 font-sans">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm text-gray-600 disabled:opacity-40"
            >
               Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-sm
                    ${
                      currentPage === page
                        ? "text-arcadisOrange  border-b-2 border-arcadisOrange"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm text-gray-600 disabled:opacity-40"
            >
              Next 
            </button>

          </div>
        </section>
      )}

    </main>
  );
}

