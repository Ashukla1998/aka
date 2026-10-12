import React from "react";
import { motion } from "framer-motion";

export default function MissionSection({ teamImage }) {
  const missionPoints = [
    { title: "Research-led design", desc: "Insights and data guide every decision we make." },
    { title: "Iterative delivery", desc: "Small, focused releases reduce risk and add clarity." },
    { title: "Human outcomes", desc: "Success is measured by real-world impact." },
  ];

  return (
    <section className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-32">
      <motion.div
        initial={{ x: -25, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-[22px] md:rounded-[28px] overflow-hidden border border-slate-200 shadow-xl group bg-white"
      >
        <img
          src={teamImage}
          alt="Our team"
          className="w-full h-[320px] sm:h-[420px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-white">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-orange-300 font-mono font-semibold">
            Our Culture
          </span>
          <p className="text-xs md:text-sm font-medium">Cross-disciplinary innovation at scale</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 25, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900">
          Our Mission
        </h3>
        <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
          We help organisations unlock growth by designing thoughtful,
          sustainable and human-centered solutions that create measurable value.
        </p>

        <ul className="space-y-3 md:space-y-4">
          {missionPoints.map((item, i) => (
            <li
              key={i}
              className="p-4 rounded-xl md:rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900 text-sm md:text-base">{item.title}</div>
              <div className="text-xs md:text-sm text-slate-500 mt-0.5">{item.desc}</div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}