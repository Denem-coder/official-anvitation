import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    secondary: { bg: '#ffffff', text: '#f97316', border: '#f97316' },
  },
  blue: {
    primary: { bg: '#3b82f6', text: '#ffffff', border: '#3b82f6' },
    secondary: { bg: '#ffffff', text: '#3b82f6', border: '#3b82f6' },
  },
  dark: {
    primary: { bg: '#111827', text: '#ffffff', border: '#111827' },
    secondary: { bg: 'transparent', text: '#111827', border: '#111827' },
  },
};

/* =========================
   SLIDES
========================= */
const slides = [
  {
    image: hero1,
    mobileImage: hero1Mobile,
    primaryBtnText: 'Browse Designs',
    primaryBtnLink: '/services',
    secondaryBtnText: 'View Packages',
    secondaryBtnLink: '/packages',
    ...buttonThemes.orange,
  },
  {
    image: hero2,
    mobileImage: hero2Mobile,
    primaryBtnText: 'See Our Works',
    primaryBtnLink: '/gallery',
    secondaryBtnText: 'View Designs',
    secondaryBtnLink: '/services',
    ...buttonThemes.blue,
  },
  {
    image: hero3,
    mobileImage: hero3Mobile,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/services',
    secondaryBtnText: 'View Packages',
    secondaryBtnLink: '/packages',
    ...buttonThemes.blue,
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const minSwipeDistance = 50;

  /* AUTO SLIDE */
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

  /* SWIPE HANDLERS */
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
                ? 'opacity-100 translate-y-0 z-20'
                : 'opacity-0 translate-y-2 z-10'
            }`}
          >
            {/* DESKTOP IMAGE */}
            <img
              src={slide.image}
              alt={`Hero ${index + 1}`}
              className="hidden md:block h-full w-full object-cover object-left"
              draggable="false"
            />

            {/* MOBILE IMAGE */}
            <img
              src={slide.mobileImage}
              alt={`Hero ${index + 1} mobile`}
              className="block md:hidden h-full w-full object-cover"
              draggable="false"
            />

            {/* BUTTONS */}
            <div
              className={`absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2
              md:left-16 md:top-auto md:bottom-16 md:translate-x-0 md:translate-y-0
              transition-all duration-700 ${
                isActive
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3">

                {/* PRIMARY BUTTON */}
                <Link
                  to={slide.primaryBtnLink}
                  className="font-bold px-6 py-3 md:px-8 rounded-full shadow-lg border hover:scale-105 transition duration-300 text-center text-sm md:text-base"
                  style={{
                    backgroundColor: slide.primary.bg,
                    color: slide.primary.text,
                    borderColor: slide.primary.border,
                  }}
                >
                  {slide.primaryBtnText}
                </Link>

                {/* SECONDARY BUTTON */}
                {slide.secondaryBtnText && (
                  <Link
                    to={slide.secondaryBtnLink}
                    className="font-bold px-6 py-3 md:px-8 rounded-full shadow-lg border hover:scale-105 transition duration-300 text-center text-sm md:text-base"
                    style={{
                      backgroundColor: slide.secondary.bg,
                      color: slide.secondary.text,
                      borderColor: slide.secondary.border,
                    }}
                  >
                    {slide.secondaryBtnText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* LEFT ARROW */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-3 md:left-4 top-1/2 z-40 -translate-y-1/2
        w-12 h-12 md:w-14 md:h-14
        flex items-center justify-center
        rounded-full text-black text-3xl
        hover:bg-black/50 transition"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={goToNextSlide}
        className="absolute right-3 md:right-4 top-1/2 z-40 -translate-y-1/2 
        w-12 h-12 md:w-14 md:h-14
        flex items-center justify-center
        rounded-full px-3 py-2 md:px-4 text-black text-3xl 
        hover:bg-black/50 transition"
      >
        ›
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;