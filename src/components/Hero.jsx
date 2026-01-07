import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Improving quality of life",
    text: "Through sustainable design and innovation",
  },
  {
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    title: "Resilient cities",
    text: "Built for people and future generations",
  },
  {
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    title: "Engineering impact",
    text: "Where insight meets action",
  },
  {
    image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4",
    title: "Designing tomorrow",
    text: "Today",
  },
];

export default function HeroArcadis() {
  const sliderRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const DURATION = 6000;
  const INTERVAL = 50;

  /* ===== Auto Slide Progress ===== */
  useEffect(() => {
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
  }, []);

  const resetProgress = () => {
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    beforeChange: (_, next) => {
      setCurrent(next);
      resetProgress();
    },
  };

  return (
    <section className="relative h-[100svh] overflow-hidden bg-black rounded-[25px]">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="relative h-[100svh] bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2200&q=80)`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

              {/* ================= CONTENT ================= */}
              <div className="relative z-10 w-full max-w-7xl px-6 sm:px-10 md:px-16 text-white">
                <h1 className="
                  text-[30px] sm:text-[42px] md:text-[56px] lg:text-[68px]
                  font-semibold leading-tight tracking-tight
                  max-w-4xl mb-6
                ">
                  {slide.title}
                </h1>

                <p className="
                  text-base sm:text-lg md:text-xl lg:text-2xl
                  font-normal leading-relaxed text-white/90
                  max-w-xl mb-10
                ">
                  {slide.text}
                </p>

                <Link to="/projects">
                  <button className="
                    inline-flex items-center gap-2
                    bg-arcadisOrange px-8 py-3
                    text-sm font-medium text-white
                    rounded-md transition-all
                    hover:bg-orange-600
                    focus:outline-none focus:ring-2 focus:ring-white
                  ">
                    Explore Our Work
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* ================= MOBILE ARROWS ================= */}
      <div className="md:hidden absolute inset-y-0 left-0 right-0 z-30 pointer-events-none">
        <button
          onClick={() => {
            sliderRef.current?.slickPrev();
            resetProgress();
          }}
          className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-5 h-5 text-arcadisOrange" />
        </button>

        <button
          onClick={() => {
            sliderRef.current?.slickNext();
            resetProgress();
          }}
          className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
        >
          <ArrowRightIcon className="w-5 h-5 text-arcadisOrange" />
        </button>
      </div>

      {/* ================= DESKTOP ARROWS ================= */}
      <div className="hidden md:flex absolute bottom-20 left-1/2 -translate-x-1/2 z-30 items-center gap-6">
        <button
          onClick={() => {
            sliderRef.current?.slickPrev();
            resetProgress();
          }}
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white transition flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-5 h-5 text-arcadisOrange" />
        </button>

        <span className="text-sm tracking-widest text-white min-w-[80px] text-center">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>

        <button
          onClick={() => {
            sliderRef.current?.slickNext();
            resetProgress();
          }}
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white transition flex items-center justify-center"
        >
          <ArrowRightIcon className="w-5 h-5 text-arcadisOrange" />
        </button>
      </div>

      {/* ================= PROGRESS BAR ================= */}
      <div className="absolute bottom-10 left-6 right-6 md:left-10 md:right-10 z-20">
        <div className="h-[3px] bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-arcadisOrange transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
