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

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeCurve },
  },
};

export default function TeamSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="w-full py-24 sm:py-32 bg-white border-t border-neutral-200/80 text-neutral-900">
      {/* Same 7XL Container for Perfect Page Alignment */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ================= HEADER WITH JOIN US LINK ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200/80 mb-14">
          <motion.div
            variants={containerAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-3xl"
          >
            
            <motion.h2
              variants={itemReveal}
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-950 leading-[1.15]"
            >
              <span className="font-semibold">20 Team Members</span> with{" "}
              <span className="text-neutral-500 font-light">
                306 years of combined experience
              </span>
            </motion.h2>
          </motion.div>

          {/* Join Us Link at Top */}
          <div className="shrink-0 pb-1">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-neutral-300 text-xs font-mono uppercase tracking-[0.2em] text-neutral-800 hover:border-arcadisOrange hover:bg-arcadisOrange hover:text-white transition-all duration-300 shadow-sm"
            >
              <span>About Us</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ================= TEAM MATRIX GRID ================= */}
        {/* <motion.div
          variants={containerAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        > */}
          {/* {AllTeamMembers.map((member, index) => {
            const expYears = member.experience
              ? currentYear - parseInt(member.experience, 10)
              : null;

            return ( */}
              {/* <motion.article
                key={member.name || index}
                variants={itemReveal}
                className="group relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

               
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md text-white rounded-md border border-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div> */}

{/*                 
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-500" />

                
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-white transition-all duration-300">
                 
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-arcadisOrange mb-1">
                    {member.category}
                  </span>

                  
                  <h3 className="text-base sm:text-lg font-medium leading-snug text-white group-hover:text-white transition-colors">
                    {member.name}
                  </h3>

                  
                  <p className="text-xs text-neutral-300 font-light mt-0.5">
                    {member.role}
                  </p>

                  
                  <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out pt-0 group-hover:pt-3">
                    <div className="pt-2.5 border-t border-white/20 flex flex-col gap-1 text-[11px] font-mono text-neutral-300">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Degree</span>
                        <span className="text-white truncate max-w-[130px]">
                          {member.degree}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Experience</span>
                        <span className="text-arcadisOrange font-semibold">
                          {expYears ? `${expYears}+ Yrs` : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div> */}
      </div>
    </section>
  );
}