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
  const totalSlides = slides.length;

  /* ===== Auto slide + progress (NO PAUSE ON HOVER) ===== */
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
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    swipe: true, // mobile-friendly
    beforeChange: (_, next) => setCurrent(next),
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="
                relative h-screen
                bg-cover bg-center
                flex items-center
                pt-24 md:pt-32
              "
              style={{
                backgroundImage: `url(${slide.image}?auto=format&fit=crop&w=2000&q=80)`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25" />

              {/* ===== HERO CONTENT ===== */}
              <div className="relative z-10 w-full max-w-7xl px-6 sm:px-10 md:px-16 text-white">
                <h1
                  className="
                    font-sans font-bold
                    text-[32px] leading-[1.15]
                    sm:text-[42px]
                    md:text-[56px]
                    lg:text-[68px]
                    tracking-[-0.02em]
                    max-w-[900px]
                    mb-6 md:mb-8
                  "
                >
                  {slide.title}
                </h1>

                <p
                  className="
                    font-sans font-normal
                    text-[16px]
                    sm:text-[18px]
                    md:text-[22px]
                    lg:text-[24px]
                    leading-[1.5]
                    text-white/90
                    max-w-[620px]
                    mb-8 md:mb-10
                  "
                >
                  {slide.text}
                </p>

                {/* CTA */}
                <Link to="/projects">
                  <button
                    className="
                      px-8 py-3
                      bg-arcadisOrange
                      text-white
                      text-sm tracking-wide
                      rounded-[4px]
                    "
                  >
                    Explore Our Work
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* ===== CENTER NAV (RESPONSIVE) ===== */}
      <div
        className="
          absolute
          bottom-24 md:bottom-20
          left-1/2 -translate-x-1/2
          z-30
        "
      >
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              sliderRef.current?.slickPrev();
              resetProgress();
            }}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center"
          >
            <ArrowLeftIcon className="w-5 h-5 text-arcadisOrange" />
          </button>

          <span className="text-sm tracking-widest text-white min-w-[70px] text-center">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </span>

          <button
            onClick={() => {
              sliderRef.current?.slickNext();
              resetProgress();
            }}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center"
          >
            <ArrowRightIcon className="w-5 h-5 text-arcadisOrange" />
          </button>
        </div>
      </div>

      {/* ===== PROGRESS BAR ===== */}
      <div className="absolute bottom-10 left-6 right-6 md:left-10 md:right-10 z-20">
        <div className="h-[2px] bg-white/30">
          <div
            className="h-[2px] bg-arcadisOrange transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
