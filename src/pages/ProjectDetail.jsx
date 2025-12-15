import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FullProjects } from "../Data/ProjectData";

export default function ProjectDetail() {
  const { slug } = useParams();

  const project = FullProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="px-10 md:px-20 py-32">
        <h2 className="text-2xl font-medium">Project not found</h2>
      </main>
    );
  }

  const images = project.images || [project.img];

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

          {project.location && (
            <div>
              <p className="uppercase tracking-wider text-xs mb-1">Location</p>
              <p className="text-gray-900">{project.location}</p>
            </div>
          )}

          {project.category && (
            <div>
              <p className="uppercase tracking-wider text-xs mb-1">Category</p>
              <p className="text-gray-900">{project.category}</p>
            </div>
          )}

          {project.size && (
            <div>
              <p className="uppercase tracking-wider text-xs mb-1">Site Area</p>
              <p className="text-gray-900">{project.size}</p>
            </div>
          )}

          {project.buildup && (
            <div>
              <p className="uppercase tracking-wider text-xs mb-1">Built-up Area</p>
              <p className="text-gray-900">{project.buildup}</p>
            </div>
          )}

          {project.status && (
            <div>
              <p className="uppercase tracking-wider text-xs mb-1">Status</p>
              <p className="text-gray-900 capitalize">{project.status}</p>
            </div>
          )}
        </div>
      </section>

      {/* ================= IMAGES (EDITORIAL LAYOUT) ================= */}
      <section className="px-10 md:px-20 pb-32">
        <div className="space-y-24">

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <img
              src={images[0]}
              alt={`${project.title} hero`}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* IMAGE GRID */}
          {images.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={img}
                    alt={`${project.title} ${i + 2}`}
                    className="w-full h-[420px] object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ================= NARRATIVE ================= */}
      <section className="px-10 md:px-20 pb-32">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl mb-6">
            Project Overview
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The design responds to site context, functional requirements,
            and long-term operational efficiency while maintaining a clear
            architectural identity.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Material selection, spatial planning, and sustainability
            considerations were carefully integrated to ensure durability,
            comfort, and adaptability over time.
          </p>
        </div>
      </section>

    </main>
  );
}
