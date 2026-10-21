import React, { useEffect, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function ProjectImageSlider({
  projects = [],
  images = [],
  title = "Project",
  onImageClick,
}) {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 6000;
  const INTERVAL = 50;

  const isImageMode = images.length > 0;
  const slides = isImageMode ? images : projects;
  const totalSlides = slides.length;

  const resetProgress = useCallback(() => {
    startTimeRef.current = Date.now();
    setProgress(0);
  }, []);

  useEffect(() => {
    if (totalSlides <= 1) return;

    startTimeRef.current = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = Math.min((elapsed / DURATION) * 100, 100);

      setProgress(percent);

      if (percent >= 100) {
        sliderRef.current?.slickNext();
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const settings = {
    infinite: totalSlides > 1,
    arrows: false,
    dots: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    pauseOnHover: true,
    beforeChange: (_, next) => {
      setCurrent(next);
      resetProgress();
    },
  };

  if (!totalSlides) return null;

  return (
    <section className="relative w-full group/slider select-none">
      {/* Slider Viewport */}
      <div className="relative overflow-hidden bg-black/5">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((item, i) => {
            if (isImageMode) {
              return (
                <div key={i} className="outline-none">
                  <div
                    onClick={() => onImageClick && onImageClick(item)}
                    className="relative w-full h-[380px] sm:h-[500px] md:h-[650px] lg:h-[750px] flex items-center justify-center bg-gray-950 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item}
                      alt={`${title} plate ${i + 1}`}
                      className="w-full h-full object-contain transition-transform duration-700 hover:scale-[1.01]"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute bottom-4 left-4 font-mono text-[11px] text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1">
                      VIEW {String(i + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              );
            }

            const projectSlug = item.gallerypath || item.slug;
            const projectCover = item.cover || item.image;

            return (
              <div key={projectSlug || i} className="outline-none">
                <Link
                  to={projectSlug ? `/projects/${projectSlug}` : "#"}
                  className="block group/card relative h-[320px] sm:h-[420px] md:h-[520px] w-full overflow-hidden bg-gray-900"
                >
                  <img
                    src={projectCover}
                    alt={item.title || `${title} view`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-105"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white flex justify-between items-end">
                    <div>
                      {item.location && (
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-2">
                          {item.location} {item.year && `· ${item.year}`}
                        </p>
                      )}
                      <h3 className="text-2xl sm:text-4xl font-light tracking-tight">{item.title}</h3>
                    </div>
                    <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-sm group-hover/card:bg-white group-hover/card:text-black transition-colors">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>

        {/* Manual Navigation Controls */}
        {totalSlides > 1 && (
          <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => {
                sliderRef.current?.slickPrev();
                resetProgress();
              }}
              className="pointer-events-auto w-11 h-11 bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center backdrop-blur shadow-md transition-transform active:scale-95"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={() => {
                sliderRef.current?.slickNext();
                resetProgress();
              }}
              className="pointer-events-auto w-11 h-11 bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center backdrop-blur shadow-md transition-transform active:scale-95"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Progress Line & Monospace Counter */}
      {totalSlides > 1 && (
        <div className="mt-4 flex items-center justify-between gap-6">
          <div className="flex-1 h-[2px] bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-arcadisOrange transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="font-mono text-xs tracking-widest text-gray-500 shrink-0">
            {String(current + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
}