import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
// import {AllTeamMembers} from "../Data/Team";

// const teamMembers = [
//   {
//     name: "Archana Rawat",
//     role: "Leader & Co-Founder",
//     degree: "MLA | B.Arch",
//     experience: "2001",
//     category: "Leadership Team",
//     image: "/images/team/archana.jpg",
//   },
//   {
//     name: "Kapil Kumar",
//     role: "Director & Principal Architect",
//     degree: "M.Arch | B.Arch",
//     experience: "2003",
//     category: "Leadership Team",
//     image: "/images/team/kapil.jpg",
//   },
//   {
//     name: "Dr. Arjun Verma",
//     role: "Lead Computational Designer",
//     degree: "Ph.D in AI & Form",
//     experience: "2012",
//     category: "Design Team",
//     image: "/images/team/arjun.jpg",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Senior Urban Planner",
//     degree: "M.Plan | B.Arch",
//     experience: "2015",
//     category: "Planning Team",
//     image: "/images/team/priya.jpg",
//   },
//   {
//     name: "Rohan Nair",
//     role: "Project Director",
//     degree: "B.Arch | PMP",
//     experience: "2008",
//     category: "Management Team",
//     image: "/images/team/rohan.jpg",
//   },
//   {
//     name: "Ananya Mehta",
//     role: "Landscape Architect",
//     degree: "MLA | CEPT",
//     experience: "2017",
//     category: "Landscape Team",
//     image: "/images/team/ananya.jpg",
//   },
//   {
//     name: "Devendra Singh",
//     role: "Structural Consultant",
//     degree: "M.Tech Structures",
//     experience: "2005",
//     category: "Engineering",
//     image: "/images/team/devendra.jpg",
//   },
//   {
//     name: "Meera Joshi",
//     role: "Interior Design Lead",
//     degree: "M.Des | B.Arch",
//     experience: "2016",
//     category: "Interior Team",
//     image: "/images/team/meera.jpg",
//   },
// ];

const easeCurve = [0.16, 1, 0.3, 1];

const containerAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const maskReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeCurve },
  },
};

export default function TeamSection() {
  // const currentYear = new Date().getFullYear();

  return (
    // <section className="w-full py-24 sm:py-32 bg-white border-t border-neutral-200/80 text-neutral-900">
    //   {/* Same 7XL Container for Perfect Page Alignment */}
    //   <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

    //     {/* ================= HEADER WITH JOIN US LINK ================= */}
    //     <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200/80 mb-14">
    //       <motion.div
    //         variants={containerAnim}
    //         initial="hidden"
    //         whileInView="visible"
    //         viewport={{ once: true, margin: "-60px" }}
    //         className="max-w-3xl"
    //       >

    //         <motion.h2
    //           variants={itemReveal}
    //           className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-950 leading-[1.15]"
    //         >
    //           <span className="font-semibold">20 Team Members</span> with{" "}
    //           <span className="text-neutral-500 font-light">
    //             306 years of combined experience
    //           </span>
    //         </motion.h2>
    //         <p className="text-sm md:text-base mt-2 text-neutral-500 max-w-md font-light leading-relaxed">Behind every great space is a passionate team. From architects and interior designers to landscape artists and meticulous project managers, we blend creative flair with expert precision to bring your vision to life, from the first sketch to the final touch.</p>
    //       </motion.div>

    //       {/* Join Us Link at Top */}
    //       <div className="shrink-0 pb-1">
    //         <Link
    //           to="/about"
    //           className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-neutral-300 text-xs font-mono uppercase tracking-[0.2em] text-neutral-800 hover:border-arcadisOrange hover:bg-arcadisOrange hover:text-white transition-all duration-300 shadow-sm"
    //         >
    //           <span>The Teams</span>
    //           <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="relative w-50% bg-white text-neutral-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden border-b border-neutral-200/70">

      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Left Column: Technical Metadata & Headline */}
        {/* Left Column: Technical Metadata & Headline */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden">
            <motion.p
              variants={maskReveal}
              className="text-lg sm:text-xl lg:text-3xl font-light tracking-tight text-neutral-950 leading-[1.12]"
            >
              <span className="font-bold">20</span> Team Members with
              {/* <span className="font-bold">306 years of experience </span> */}
            </motion.p>

            <motion.p
              variants={maskReveal}
              className=" mt-2 text-lg sm:text-xl lg:text-3xl tracking-tight text-neutral-950 leading-[1.12] font-bold"
            >
             306 years of experience
            </motion.p>
          </div>
        </div>

        {/* Right Column: Editorial Paragraphs */}
        <div className="lg:col-span-7 space-y-8 lg:pt-3">
          <div className="overflow-hidden">
            <motion.p
              variants={maskReveal}
              className="text-lg sm:text-xl text-neutral-800 font-normal leading-relaxed tracking-tight"
            >
              Behind every great space is a passionate team. From architects and interior designers to landscape artists and meticulous project managers, we blend creative flair with expert precision to bring your vision to life, from the first sketch to the final touch.
            </motion.p>
          </div>

          {/* Architectural Feature Pillars */}
          <div className="overflow-hidden pt-10 border-t border-neutral-100 flex justify-end mt-20">
            <div className="shrink-0 pb-1">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-neutral-300 text-xs font-mono uppercase tracking-[0.2em] text-neutral-800 hover:border-arcadisOrange hover:bg-arcadisOrange hover:text-white transition-all duration-300 shadow-sm"
              >
                <span>The Team</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}