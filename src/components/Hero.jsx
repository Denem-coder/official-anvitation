import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import hero1 from '../assets/img/hero-img/hero-1.png';
import hero1Mobile from '../assets/img/hero-img/hero-1-mobile.png';

import hero2 from '../assets/img/hero-img/hero-2.png';
import hero2Mobile from '../assets/img/hero-img/hero-2-mobile.png';

import hero3 from '../assets/img/hero-img/hero-3.png';
import hero3Mobile from '../assets/img/hero-img/hero-3-mobile.png';

/* =========================
   BUTTON THEMES
========================= */
const buttonThemes = {
  orange: {
    primary: { bg: '#f97316', text: '#ffffff', border: '#f97316' },
  },
  blue: {
    primary: { bg: '#3b82f6', text: '#ffffff', border: '#3b82f6' },
  },
  dark: {
    primary: { bg: '#111827', text: '#ffffff', border: '#111827' },
  },
};

/* =========================
   SLIDES
========================= */
const slides = [
  {
    image: hero1,
    mobileImage: hero1Mobile,
    ...buttonThemes.blue,
  },
  {
    image: hero2,
    mobileImage: hero2Mobile,
    ...buttonThemes.blue,
  },
  {
    image: hero3,
    mobileImage: hero3Mobile,
    ...buttonThemes.blue,
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevSlide();
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isActive
                ? 'translate-y-0 opacity-100 z-20'
                : 'translate-y-2 opacity-0 z-10'
            }`}
          >
            <img
              src={slide.image}
              alt={`Hero ${index + 1}`}
              className="hidden h-full w-full object-cover object-left md:block"
              draggable="false"
            />

            <img
              src={slide.mobileImage}
              alt={`Hero ${index + 1} mobile`}
              className="block h-full w-full object-cover md:hidden"
              draggable="false"
            />

            <div
              className={`absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 transition-all duration-700
              md:left-16 md:top-auto md:bottom-16 md:translate-x-0 md:translate-y-0 ${
                isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <div className="flex justify-center md:justify-start">
                <Link
                  to="/designs"
                  className="mt-28 rounded-full border px-8 py-3 text-center text-sm font-bold shadow-lg transition duration-300 hover:scale-105 md:px-10 md:text-base"
                  style={{
                    backgroundColor: slide.primary.bg,
                    color: slide.primary.text,
                    borderColor: slide.primary.border,
                  }}
                >
                  Browse Designs
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* SUBTLE SWIPE HINT */}
      <div className="pointer-events-none absolute bottom-9 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 text-xs text-white/70 md:text-sm font-bold md:font-bold">
        <span>Swipe</span>
        <span className="text-base">↔</span>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={goToPrevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white/55 transition duration-300 hover:text-white/85 md:flex"
      >
        <FaChevronLeft className="text-lg" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={goToNextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white/55 transition duration-300 hover:text-white/85 md:flex"
      >
        <FaChevronRight className="text-lg" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition ${
              index === currentSlide ? 'scale-110 bg-white' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;