import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

/**
 * ProjectImageSlider
 * @param {string[]} images - array of image URLs
 */
export default function ProjectImageSlider({ images = [] , title = "Project" }) {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 5000; // slide duration (ms)
  const INTERVAL = 50;

  /* ================= AUTO SLIDE + PROGRESS ================= */
  useEffect(() => {
    if (!images.length) return;

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
  }, [images.length]);

  const resetProgress = () => {
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  const settings = {
    infinite: images.length > 1,
    arrows: false,
    dots: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    beforeChange: (_, next) => {
      setCurrent(next);
      resetProgress();
    },
  };

  if (!images.length) return null;

  return (
    <section className="relative bg-white">

      {/* ================= SLIDER ================= */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <div className="px-6 md:px-24">
              <img
                src={img}
                alt={`${title} view ${i + 1}`}
                className="w-full max-h-[75vh] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* ================= ARROWS ================= */}
      {images.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 pointer-events-none">
          <button
            onClick={() => {
              sliderRef.current?.slickPrev();
              resetProgress();
            }}
            className="pointer-events-auto w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ArrowLeftIcon className="w-5 h-5 text-arcadisOrange" />
          </button>

          <button
            onClick={() => {
              sliderRef.current?.slickNext();
              resetProgress();
            }}
            className="pointer-events-auto w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ArrowRightIcon className="w-5 h-5 text-arcadisOrange" />
          </button>
        </div>
      )}

      {/* ================= PROGRESS + COUNTER ================= */}
      {images.length > 1 && (
        <div className="mt-6 px-6 md:px-24">
          <div className="h-[2px] bg-gray-200">
            <div
              className="h-full bg-arcadisOrange transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-xs tracking-widest text-gray-500 text-center">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </p>
        </div>
      )}

    </section>
  );
}
