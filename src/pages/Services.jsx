import React from "react";
import { motion } from "framer-motion";
import architectureImage from "../images/archi.jpg";
import landscapeImage from "../images/landscape.jpg";
import constructionImage from "../images/construction.jpg";

function ServiceCard({ title, desc, img }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <h3 className="text-lg font-medium text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm font-normal text-slate-600 leading-relaxed">
        {desc}
      </p>
    </motion.article>
  );
}

export default function Services() {
  const services = [
    {
      id: "architecture",
      title: "Architectural Design",
      desc: "Concept development, planning, and complete design solutions based on client needs and space utilization.",
      img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    },
    {
      id: "interior",
      title: "Interior Design",
      desc: "Elegant, functional interior spaces—residential, commercial, hospitality and bespoke executions.",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      id: "3d",
      title: "3D Modelling & Rendering",
      desc: "High-end 3D renders, walkthroughs, and visualizations for a realistic view of project outcomes.",
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      id: "construction",
      title: "Construction & Execution",
      desc: "End-to-end project execution with quality materials, experienced teams, and on-time delivery.",
      img: constructionImage,
    },
    {
      id: "landscape",
      title: "Landscape Design",
      desc: "Outdoor landscapes that balance nature, usability, and architectural form.",
      img: landscapeImage,
    },
    {
      id: "planning",
      title: "Master Planning",
      desc: "Large-scale planning for residential townships, commercial parks, and institutional projects.",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= PAGE HEADER ================= */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-arcadisOrange mb-2">
            What we offer
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
            Our Architectural Services
          </h2>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We create innovative, functional and aesthetic architectural
            solutions—from concept to execution.
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              desc={s.desc}
              img={s.img}
            />
          ))}
        </section>

        {/* ================= HOW WE WORK ================= */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="md:flex gap-6 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold">
                How we work
              </h3>

              <p className="text-slate-600 mt-3 leading-relaxed">
                From initial ideation to final execution, our process remains
                transparent, collaborative, and quality-driven.
              </p>

              <ul className="mt-6 grid gap-4">
                {[
                  {
                    title: "Concept & Planning",
                    desc: "Understanding site conditions, client preferences, and project requirements.",
                  },
                  {
                    title: "Design Development",
                    desc: "Detailed drawings, 3D renders, and material selection.",
                  },
                  {
                    title: "Execution & Handover",
                    desc: "Monitoring construction, quality control, and final project delivery.",
                  },
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-arcadisOrange mt-1">●</span>
                    <div>
                      <div className="font-medium">
                        {step.title}
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed">
                        {step.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2 mt-6 md:mt-0">
              <img
                src={architectureImage}
                alt="architecture workflow"
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
