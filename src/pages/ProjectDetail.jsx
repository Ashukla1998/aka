import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";
import ProjectImageSlider from "../components/ProjectImageSlider";
import { ProjectCard } from "./Project";
import Seo, { SITE_URL, SITE_NAME } from "../components/Seo";

const FEATURED_IMAGE_COUNT = 5;
const SIMILAR_PROJECT_COUNT = 5;

export default function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  /* Similar projects: same category first, topped up with others if needed */
  useEffect(() => {
    if (!project) return;
    const fetchSimilarProjects = async () => {
      try {
        const res = await fetch(`https://www.lifepage.in/n/api/GetProjectData?category=${project.category}&gallerypath=${project.gallerypath}`);
        const json = await res.json();
        if (!json.success || !Array.isArray(json.data)) return;
        setSimilarProjects(json.data);
      } catch (err) {
        console.error("Similar projects error:", err);
      }
    };

    fetchSimilarProjects();
  }, [project]);

  useEffect(() => {
    if (!activeLightboxImg) return;
    const onKey = (e) => e.key === "Escape" && setActiveLightboxImg(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeLightboxImg]);

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
        <Seo title="Project Not Found" noindex />
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
        .filter((img) => img.image_location)
        .sort((a, b) => (a.order_no || 0) - (b.order_no || 0))
    : [];

  const heroImage = project.cover || galleryImages[0]?.image_location;
  const featuredImages = galleryImages.slice(0, FEATURED_IMAGE_COUNT);
  const scrollerImages = galleryImages.slice(FEATURED_IMAGE_COUNT);

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

  const projectUrl = `${SITE_URL}/projects/${project.gallerypath || slug}`;
  const seoDescription =
    project.description ||
    `${project.title}${project.category ? `, a ${project.category.toLowerCase()} project` : ""}${
      project.location ? ` in ${project.location}` : ""
    } by ${SITE_NAME}.`;

  const projectSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: seoDescription,
      url: projectUrl,
      image: [heroImage, ...galleryImages.map((img) => img.image_location)].filter(Boolean).slice(0, 10),
      genre: project.category,
      locationCreated: project.location ? { "@type": "Place", name: project.location } : undefined,
      dateCreated: project.start_year || undefined,
      creator: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
        { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
      ],
    },
  ];

  return (
    <main className="bg-white text-gray-900  selection:bg-arcadisOrange selection:text-white">
      <Seo
        title={[project.title, project.location].filter(Boolean).join(", ")}
        description={seoDescription}
        image={heroImage}
        type="article"
        schema={projectSchema}
      />
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

      {/* ================= 2. TITLE & OPENING IMAGE================= */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-8"
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

        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] max-h-[85vh] overflow-hidden bg-gray-100 group cursor-zoom-in"
            onClick={() => setActiveLightboxImg(heroImage)}
          >
            <img
              src={heroImage}
              alt={`${project.title} overview`}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
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

      {/* ================= 4. IMAGE + DESCRIPTION (first 5) ================= */}
      {featuredImages.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-16 border-t border-gray-200 flex flex-col gap-16 sm:gap-20">
          {featuredImages.map((img, idx) => (
            <motion.figure
              key={img.image_location}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="w-full overflow-hidden bg-gray-100 cursor-zoom-in"
                onClick={() => setActiveLightboxImg(img.image_location)}
              >
                <img
                  src={img.image_location}
                  alt={img.description || `${project.title} view ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto max-h-[85vh] object-cover"
                />
              </div>
              {img.description && (
                <figcaption className="mt-5 max-w-3xl text-base sm:text-lg font-light text-gray-700 leading-relaxed">
                  {img.description}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </section>
      )}

      {/* ================= 5. MORE IMAGES SCROLLER (6+) ================= */}
      {scrollerImages.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-20">
          <span className=" text-[11px] uppercase tracking-[0.3em] text-gray-400 block mb-5">
            More Images ({scrollerImages.length})
          </span>
          <ProjectImageSlider
            images={scrollerImages.map((img) => img.image_location)}
            title={project.title}
            onImageClick={(imgUrl) => setActiveLightboxImg(imgUrl)}
          />
        </section>
      )}

      {/* ================= 6. SIMILAR PROJECTS ================= */}
      {similarProjects.length > 0 && (
        <section className="w-full bg-gray-100 border-t border-gray-200">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-gray-900">
              Similar Projects
            </h2>
            <Link
              to="/projects"
              className="text-xs uppercase tracking-[0.15em] font-mono text-arcadisOrange hover:text-black transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:auto-rows-[minmax(220px,24vw)]">
            {similarProjects.map((p, idx) => (
              <ProjectCard key={p.gallerypath || p.title + idx} project={p} groupIndex={idx} />
            ))}
          </div>
          </div>
        </section>
      )}

      {/* ================= 7. LIGHTBOX MODAL ================= */}
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