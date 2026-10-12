import React from "react";

export default function AboutHeader() {
  return (
    <div className="text-center mb-16 md:mb-24">
      <p className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-[#ff6600] border border-orange-200 bg-orange-50 px-4 py-1.5 rounded-full mb-4 font-semibold">
        About Us
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight text-slate-900">
        We design meaningful experiences
      </h2>
      <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed px-2">
        We combine research, creativity and engineering to deliver products
        and services that move people.
      </p>
    </div>
  );
}