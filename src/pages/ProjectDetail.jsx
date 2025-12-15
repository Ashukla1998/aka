import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FullProjects } from "../Data/ProjectData";


export default function ProjectDetail() {
  const { slug } = useParams();
  console.log("Slug:", slug);
  const project = FullProjects.find(
    (p) => p.slug === slug
  );

  if (!project) {
    return (
      <main className="px-10 md:px-20 py-32">
        <h2 className="text-2xl font-medium">Project not found</h2>
      </main>
    );
  }

  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="px-10 md:px-20 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            {project.category}
          </p>

          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            {project.title}
          </h1>

          <p className="text-gray-600 max-w-2xl leading-relaxed">
            {project.description ||
              "This project reflects our approach to context-driven design, balancing functionality, spatial clarity, and long-term performance."}
          </p>
        </motion.div>
      </section>

      {/* ================= META ================= */}
      <section className="px-10 md:px-20 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm text-gray-600">
          <div>
            <p className="uppercase tracking-wider text-xs mb-1">Location</p>
            <p className="text-gray-900">{project.location}</p>
          </div>

          <div>
            <p className="uppercase tracking-wider text-xs mb-1">Category</p>
            <p className="text-gray-900">{project.category}</p>
          </div>

          <div>
            <p className="uppercase tracking-wider text-xs mb-1">Size</p>
            <p className="text-gray-900">{project.size}</p>
          </div>

          <div>
            <p className="uppercase tracking-wider text-xs mb-1">Build Up</p>
            <p className="text-gray-900">{project.buildup}</p>
          </div>

          <div>
            <p className="uppercase tracking-wider text-xs mb-1">Status</p>
            <p className="text-gray-900">Completed</p>
          </div>
        </div>
      </section>

      {/* ================= IMAGES ================= */}
      <section className="px-10 md:px-20 pb-32">
        <div className="space-y-16">
          {(project.images || [project.img]).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={img}
                alt={`${project.title} ${i + 1}`}
                className="w-full max-h-[80vh] object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= NARRATIVE ================= */}
      <section className="px-10 md:px-20 pb-32">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl mb-6">
            Project Overview
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The design responds to site context, user requirements,
            and functional efficiency while maintaining a clear architectural
            identity. Material choices and spatial planning were guided by
            durability, comfort, and long-term adaptability.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Sustainability and operational clarity were key drivers in shaping
            the project outcome.
          </p>
        </div>
      </section>

    </main>
  );
}
