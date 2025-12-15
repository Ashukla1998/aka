// import React, { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import logo from "./images/akalogo.jpg";
// const exampleCategories = {
//   Healthcare: new Array(12).fill(0).map((_, i) => ({
//     id: `hc-${i + 1}`,
//     title: `Healthcare ${i + 1}`,
//     img: `https://images.unsplash.com/photo-1507089947368-19c1da9775ae`,
//     excerpt: `Short summary for Healthcare ${i + 1}`,
//     details: `Detailed description for Healthcare ${i + 1}. Replace with real data.`,
//   })),
//   Educational: new Array(7).fill(0).map((_, i) => ({
//     id: `ed-${i + 1}`,
//     title: `Education ${i + 1}`,
//     img: `https://images.unsplash.com/photo-1493809842364-78817add7ffb`,
//     excerpt: `Short summary for Education ${i + 1}`,
//     details: `Detailed description for Education ${i + 1}.`,
//   })),
//   Commercial: new Array(10).fill(0).map((_, i) => ({
//     id: `c-${i + 1}`,
//     title: `Commercial ${i + 1}`,
//     img: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c`,
//     excerpt: `Short summary for Commercial ${i + 1}.`,
//     details: `Detailed description for Commercial ${i + 1}.`,
//   })),
//   Housing: new Array(5).fill(0).map((_, i) => ({
//     id: `hs-${i + 1}`,
//     title: `Housing ${i + 1}`,
//     img: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c`,
//     excerpt: `Short summary for Housing ${i + 1}.`,
//     details: `Detailed description for Housing ${i + 1}.`,
//   })),
// };

// export default function CircularProjectShowcase({ categories = exampleCategories, size = 520 }) {
//   const navigate = useNavigate();
//   const categoryNames = Object.keys(categories);
//   const [categoryIndex, setCategoryIndex] = useState(0);
//   const [hoverIndex, setHoverIndex] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const selectedCategory = categories[categoryNames[categoryIndex]] || [];

//   // Responsive detection
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Geometry for circular layout
//   const center = size / 2;
//   const radius = size * 0.42;
//   const thumbSize = 92;
//   const thumbHalf = thumbSize / 2;
//   const previewIndex = hoverIndex;

//   const thumbnails = useMemo(() => {
//     if (isMobile) return null;

//     return selectedCategory.map((project, i) => {
//       const angle = (i / selectedCategory.length) * Math.PI * 2 - Math.PI / 2;
//       const x = center + Math.cos(angle) * radius - thumbHalf;
//       const y = center + Math.sin(angle) * radius - thumbHalf;

//       const isHovered = hoverIndex === i;
//       const isAnyHovered = hoverIndex !== null;

//       return (
//         <motion.button
//           key={project.id}
//           className="absolute rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white"
//           style={{ width: thumbSize, height: thumbSize, left: x, top: y }}
//           onMouseEnter={() => setHoverIndex(i)}
//           onMouseLeave={() => setHoverIndex(null)}
//           onFocus={() => setHoverIndex(i)}
//           onBlur={() => setHoverIndex(null)}
//           onClick={() =>
//             navigate(
//               `/project/${encodeURIComponent(categoryNames[categoryIndex])}/${encodeURIComponent(project.id)}`,
//               { state: { project, categoryName: categoryNames[categoryIndex] } }
//             )
//           }
//           initial={false}
//           animate={{
//             scale: isHovered ? 1.15 : 1,
//             zIndex: isHovered ? 100 : 10,
//             opacity: isAnyHovered ? (isHovered ? 1 : 0.3) : 1,
//             boxShadow: isHovered
//               ? "0 12px 26px rgba(0,0,0,0.15)"
//               : "0 6px 16px rgba(0,0,0,0.08)",
//           }}
//           transition={{ type: "spring", stiffness: 260, damping: 26 }}
//         >
//           <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 flex items-center justify-center bg-black/36 text-white font-semibold text-sm text-center px-1 rounded-xl">
//             {project.title}
//           </div>
//         </motion.button>
//       );
//     });
//   }, [selectedCategory, hoverIndex, center, radius, categoryIndex, categoryNames, navigate, isMobile]);

//   return (
//     <div className="w-full flex flex-col items-center gap-6 px-4 py-2">
//       {/* Company Info Box */}
//       <div className="w-full max-w-xl p-6 rounded-lg bg-gradient-to-r from-indigo-50 to-white border-l-4 border-indigo-600 shadow-lg text-center">
//         <h2 className="font-bold text-2xl mb-3 text-gray-900">ARCHANA KAPIL ASSOCIATES</h2>

//         <div className="flex justify-center mb-3">
//           <img src={logo} alt="AKA Logo" className="w-20 h-30 object-cover rounded" />
//         </div>

//         <p className="text-md text-gray-700 leading-relaxed">
//           We are a Dehradun based Design Company (incorporated in 2013) providing end-to-end solutions for all types of construction projects. Our design services include Site Planning, Architectural Designing, Interior Designing, and Landscape Designing.
//         </p>
//       </div>


//       <div className="w-full max-w-xl p-6 rounded-lg bg-gradient-to-r from-indigo-50 to-white border-l-4 border-indigo-600 shadow-lg text-center">
//         <h2 className="font-bold text-2xl mb-3 text-gray-900">Projects</h2>
//       </div>

//       {/* Category buttons */}
//       <div className="flex gap-3 flex-wrap justify-center mb-2">
//         {categoryNames.map((name, idx) => (
//           <button
//             key={name}
//             onClick={() => {
//               setCategoryIndex(idx);
//               setHoverIndex(null);
//             }}
//             className={`px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border flex items-center gap-2
//               ${idx === categoryIndex ? "bg-indigo-600 text-white scale-105 shadow-lg" : "bg-white text-gray-700 hover:-translate-y-0.5"}`}
//           >
//             <span className={`w-3 h-3 rounded-full ${idx === categoryIndex ? "bg-white" : "bg-indigo-400"}`} />
//             {name} ({categories[name].length})
//           </button>
//         ))}
//       </div>

//       {/* Circular or List layout */}
//       {isMobile ? (
//         <div className="w-full flex flex-col gap-3">
//           {selectedCategory.map((project) => (
//             <motion.button
//               key={project.id}
//               className="w-full flex gap-3 items-center rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white"
//               onClick={() =>
//                 navigate(
//                   `/project/${encodeURIComponent(categoryNames[categoryIndex])}/${encodeURIComponent(project.id)}`,
//                   { state: { project, categoryName: categoryNames[categoryIndex] } }
//                 )
//               }
//               whileHover={{ scale: 1.02, boxShadow: "0 12px 26px rgba(0,0,0,0.15)" }}
//               transition={{ type: "spring", stiffness: 260, damping: 26 }}
//             >
//               <img src={project.img} alt={project.title} className="w-24 h-24 object-cover" />
//               <div className="flex flex-col justify-center pr-2">
//                 <div className="font-semibold text-sm">{project.title}</div>
//                 <div className="text-xs text-gray-500">{project.excerpt}</div>
//               </div>
//             </motion.button>
//           ))}
//         </div>
//       ) : (
//         <div className="relative rounded-full" style={{ width: size, height: size }}>
//           {thumbnails}

//           <AnimatePresence>
//             {previewIndex !== null && selectedCategory[previewIndex] && (
//               <motion.div
//                 key={`preview-${selectedCategory[previewIndex].id}`}
//                 initial={{ opacity: 0, scale: 0.7 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.85 }}
//                 transition={{ type: "spring", stiffness: 160, damping: 22 }}
//                 className="absolute rounded-full overflow-hidden shadow-2xl"
//                 style={{ width: size - 40, height: size - 40, left: 20, top: 20 }}
//               >
//                 <img
//                   src={selectedCategory[previewIndex].img}
//                   alt={selectedCategory[previewIndex].title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-center">
//                   <div className="font-semibold text-lg">{selectedCategory[previewIndex].title}</div>
//                   <div className="text-sm text-white/80">Preview</div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       )}

//       <div className="text-sm text-gray-600">
//         {isMobile ? "Tap to open details page" : "Hover to preview · Click to open details page"}
//       </div>

//       <div className="w-full max-w-xl p-6 rounded-lg bg-gradient-to-r from-indigo-50 to-white border-l-4 border-indigo-600 shadow-lg text-center">
//         <h2 className="font-bold text-2xl mb-3 text-gray-900">Architecture firm operating in Dehradun, India | Archana Kapil Associates</h2>
//         <p>We provide design consulting services globally. Please connect with Kapil Rawat on kapil@aka.net.in or +919719799992 to initiate a conversation.</p>
//       </div>

//     </div>
//   );
// }
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

/* Unsplash images for testing */
const projects = [
  {
    title: "Urban Housing",
    place: "Mumbai · 2024",
    img: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
  },
  {
    title: "Corporate Campus",
    place: "Bengaluru · 2023",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
  {
    title: "Public Space",
    place: "Delhi · 2022",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },
  {
    title: "Cultural Center",
    place: "Jaipur · 2021",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
];

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
          <h2 className="font-serif text-4xl mb-4">
            Selected Projects
          </h2>
          <p className="text-gray-600 max-w-xl">
            A curated selection of our architectural work.
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur p-3 shadow rounded-full hover:bg-black hover:text-white transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur p-3 shadow rounded-full hover:bg-black hover:text-white transition"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6"
        >
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
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.place}</p>
            </motion.div>
          ))}
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




// import { useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowLeftIcon,
//   ArrowRightIcon,
//   PlayIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";
// import logo from "./images/akalogo.jpg";
// const projects = [
//   {
//     id: 1,
//     img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
//     title: "Urban Apartment",
//     category: "Residential",
//     location: "Mumbai, India",
//     year: "2023",
//     description: "A contemporary apartment focused on open zoning and natural light.",
//   },
//   {
//     id: 2,
//     img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
//     title: "Minimal Living",
//     category: "Interior Design",
//     location: "Bengaluru, India",
//     year: "2022",
//     description: "Minimal interiors blending warm textures with functional elegance.",
//   },
//   {
//     id: 3,
//     img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//     title: "Modern Interior",
//     category: "Residential",
//     location: "Delhi NCR, India",
//     year: "2021",
//     description: "A modern interior emphasizing material contrast and spatial flow.",
//   },
//   {
//     id: 4,
//     img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
//     title: "Courtyard House",
//     category: "Architecture",
//     location: "Jaipur, India",
//     year: "2023",
//     description: "A courtyard-centric home inspired by traditional Indian planning.",
//   },
//   {
//     id: 5,
//     img: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
//     title: "Luxury Penthouse",
//     category: "High-End Residential",
//     location: "Pune, India",
//     year: "2024",
//     description: "Luxury penthouse with panoramic views and layered spatial zoning.",
//   },
//   {
//     id: 6,
//     img: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
//     title: "Creative Studio",
//     category: "Commercial",
//     location: "Ahmedabad, India",
//     year: "2022",
//     description: "A creative studio designed for collaboration and flexibility.",
//   },
//   {
//     id: 7,
//     img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
//     title: "Urban Villa",
//     category: "Residential",
//     location: "Indore, India",
//     year: "2023",
//     description: "A modern villa balancing privacy, openness, and landscape views.",
//   },
//   {
//     id: 8,
//     img: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
//     title: "Open Workspace",
//     category: "Office Design",
//     location: "Hyderabad, India",
//     year: "2024",
//     description: "An open workspace promoting flexibility and natural interaction.",
//   },
// ];


// export default function HeroSection() {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;

//     const scrollAmount = 420;
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="min-h-screen bg-white">
//       {/* HEADER */}
//       <motion.header
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex items-center justify-between px-20 py-10"
//       >
//         <img src={logo} className="w-10 h-10 rounded" />

//         <nav className="flex gap-12 text-sm text-gray-500">
//           {["Home", "Projects", "About Us", "Contact Us"].map((item) => (
//             <a key={item} className="hover:text-black transition" href="#">
//               {item}
//             </a>
//           ))}
//         </nav>

//         <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
//       </motion.header>

//       {/* GRID */}
//       <div className="grid grid-cols-[120px_1fr_380px] px-20 gap-16">

//         {/* LEFT META */}
//         <aside className="text-xs text-gray-500 space-y-10 pt-12">
//           <div>
//             <p>Date</p>
//             <p className="text-black font-medium">20.11.2023</p>
//           </div>

//           <div>
//             <p>Created</p>
//             <p className="text-black font-medium">2023</p>
//           </div>

//           <div className="flex flex-col gap-6 text-base pt-16">
//             <span className="cursor-pointer hover:text-black">𝕏</span>
//             <span className="cursor-pointer hover:text-black">f</span>
//             <span className="cursor-pointer hover:text-black">◎</span>
//           </div>
//         </aside>

//         {/* CENTER */}
//         <main>
//           {/* TITLE */}
//           <motion.h2
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="font-serif text-6xl leading-tight max-w-3xl"
//           >
//             COMFORTABLE <br /> ZONING IN ONE OPEN SPACE
//           </motion.h2>

//           {/* PROJECT SCROLLER */}
//           <div className="relative mt-20">
//             {/* Floating Arrows */}
//             <button
//               onClick={() => scroll("left")}
//               className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow rounded-full hover:bg-black hover:text-white transition"
//             >
//               <ArrowLeftIcon className="w-5 h-5" />
//             </button>

//             <button
//               onClick={() => scroll("right")}
//               className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow rounded-full hover:bg-black hover:text-white transition"
//             >
//               <ArrowRightIcon className="w-5 h-5" />
//             </button>

//             {/* Scroll Area */}
//             <div
//               ref={scrollRef}
//               className="flex gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6"
//             >
//               {projects.map((p) => (
//                 <motion.div
//                   key={p.id}
//                   whileHover={{ scale: 1.04 }}
//                   className="relative snap-start shrink-0 w-[400px]"
//                 >
//                   <img
//                     src={p.img}
//                     className="h-[260px] w-full object-cover shadow-xl"
//                   />

//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex flex-col justify-end p-5 text-white">
//                     <p className="text-xs uppercase">{p.category}</p>
//                     <h3 className="text-lg font-medium">{p.title}</h3>
//                     <p className="text-xs">{p.location} · {p.year}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* CAPTION */}
//           <div className="mt-10 text-sm text-gray-600 max-w-md">
//             <p className="text-black font-medium">Architecture</p>
//             <p>The interior of the apartments.</p>
//           </div>

//           {/* PLAY */}
//           <motion.div
//             whileHover={{ x: 8 }}
//             className="mt-12 flex items-center gap-4 text-sm cursor-pointer"
//           >
//             <span className="w-11 h-11 border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
//               <PlayIcon className="w-4 h-4" />
//             </span>
//             <span>Play Document</span>
//           </motion.div>
//         </main>

//         {/* RIGHT */}
//         <aside className="pt-40 text-sm text-gray-600">
//           <p className="text-black font-medium mb-2">Architecture</p>
//           <p>
//             The interior of the apartments in the color of Siena.
//             Combinations give warmth to strict materials.
//           </p>

//           <div className="mt-40 text-6xl font-semibold text-black">
//             07
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// }