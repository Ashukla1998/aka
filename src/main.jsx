// src/components/CircularProjectShowcase.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const exampleCategories = {
  Healthcare: new Array(12).fill(0).map((_, i) => ({
    id: `hc-${i + 1}`,
    title: `Healthcare ${i + 1}`,
    img: `https://images.unsplash.com/photo-1507089947368-19c1da9775ae`,
    excerpt: `Short summary for Healthcare ${i + 1}`,
    details: `Detailed description for Healthcare ${i + 1}. Replace with real data.`,
  })),
  Educational: new Array(7).fill(0).map((_, i) => ({
    id: `ed-${i + 1}`,
    title: `Education ${i + 1}`,
    img: `https://images.unsplash.com/photo-1493809842364-78817add7ffb`,
    excerpt: `Short summary for Education ${i + 1}`,
    details: `Detailed description for Education ${i + 1}.`,
  })),
  Commercial: new Array(10).fill(0).map((_, i) => ({
    id: `c-${i + 1}`,
    title: `Commercial ${i + 1}`,
    img: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c`,
    excerpt: `Short summary for Commercial ${i + 1}`,
    details: `Detailed description for Commercial ${i + 1}.`,
  })),
  Housing: new Array(5).fill(0).map((_, i) => ({
    id: `hs-${i + 1}`,
    title: `Housing ${i + 1}`,
    img: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c`,
    excerpt: `Short summary for Housing ${i + 1}`,
    details: `Detailed description for Housing ${i + 1}.`,
  })),
};

export default function CircularProjectShowcase({ categories = exampleCategories, size = 520 }) {
  const navigate = useNavigate();
  const categoryNames = Object.keys(categories);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  // removed activeIndex because click navigates to detail page
  const selectedCategory = categories[categoryNames[categoryIndex]] || [];

  // Geometry
  const center = size / 2;
  const radius = size * 0.42;
  const thumbSize = 92;
  const thumbHalf = thumbSize / 2;

  const previewIndex = hoverIndex;

  const thumbnails = useMemo(
    () =>
      selectedCategory.map((project, i) => {
        const angle = (i / selectedCategory.length) * Math.PI * 2 - Math.PI / 2;
        const x = center + Math.cos(angle) * radius - thumbHalf;
        const y = center + Math.sin(angle) * radius - thumbHalf;

        const isHovered = hoverIndex === i;

        return (
          <motion.button
            key={project.id}
            className="absolute rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white"
            style={{ width: thumbSize, height: thumbSize, left: x, top: y }}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            onFocus={() => setHoverIndex(i)}
            onBlur={() => setHoverIndex(null)}
            onClick={() =>
              // navigate to the detail page for this project
              navigate(`/project/${encodeURIComponent(categoryNames[categoryIndex])}/${encodeURIComponent(project.id)}`, {
                state: { project, categoryName: categoryNames[categoryIndex] },
              })
            }
            initial={false}
            animate={{
              scale: isHovered ? 1.15 : 1,
              zIndex: isHovered ? 100 : 10,
              opacity: 1,
              boxShadow: isHovered ? "0 12px 26px rgba(0,0,0,0.15)" : "0 6px 16px rgba(0,0,0,0.08)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <img src={project.img} alt={project.title} className="w-full h-full object-cover" />

            {/* Centered title overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/36 text-white font-semibold text-sm text-center px-1 rounded-xl">
              {project.title}
            </div>
          </motion.button>
        );
      }),
    [selectedCategory, hoverIndex, center, radius, categoryIndex, categoryNames, navigate]
  );

  return (
    <div className="w-full flex flex-col items-center gap-6 px-4 py-2">
      <div className="flex gap-3 flex-wrap justify-center mb-2">
        {categoryNames.map((name, idx) => (
          <button
            key={name}
            onClick={() => {
              setCategoryIndex(idx);
              setHoverIndex(null);
            }}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border flex items-center gap-2
              ${idx === categoryIndex ? "bg-indigo-600 text-white scale-105 shadow-lg" : "bg-white text-gray-700 hover:-translate-y-0.5"}`}
          >
            <span className={`w-3 h-3 rounded-full ${idx === categoryIndex ? "bg-white" : "bg-indigo-400"}`} />
            {name} ({categories[name].length})
          </button>
        ))}
      </div>

      <div className="relative rounded-full" style={{ width: size, height: size }}>
        {thumbnails}

        <AnimatePresence>
          {previewIndex !== null && selectedCategory[previewIndex] && (
            <motion.div
              key={`preview-${selectedCategory[previewIndex].id}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              className="absolute rounded-full overflow-hidden shadow-2xl"
              style={{ width: size - 40, height: size - 40, left: 20, top: 20 }}
            >
              <img src={selectedCategory[previewIndex].img} alt={selectedCategory[previewIndex].title} className="w-full h-full object-cover" />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-center">
                <div className="font-semibold text-lg">{selectedCategory[previewIndex].title}</div>
                <div className="text-sm text-white/80">Preview</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-sm text-gray-600">Hover to preview · Click to open details page</div>
    </div>
  );
}
