import React from "react";

export default function ValuesSection() {
  const values = [
    { title: "Transparency", desc: "Clear communication and shared understanding.", id: "01" },
    { title: "Craft", desc: "Attention to detail and quality in everything we do.", id: "02" },
    { title: "Empathy", desc: "Designing with people at the center.", id: "03" },
  ];

  return (
    <section>
      <div className="text-center mb-10 md:mb-14">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Our Values</h3>
        <p className="text-slate-600 text-sm">Principles that guide our work.</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {values.map((val, i) => (
          <div
            key={i}
            className="bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#ff6600]/40 p-6 md:p-8 rounded-[20px] md:rounded-[24px] transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span className="text-xs font-mono text-[#ff6600] tracking-widest block mb-3 font-semibold">
              {val.id} //
            </span>
            <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#ff6600] transition-colors">
              {val.title}
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}