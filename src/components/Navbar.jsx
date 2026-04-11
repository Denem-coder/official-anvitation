import { useState, useEffect } from 'react';
import logo from '../assets/img/navbar-img/anvitation-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowNavbar(true);
      } else if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['hero', 'services', 'packages', 'gallery', 'reviews', 'faqs', 'contact'];

    const handleScroll = () => {
      let current = '';

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 120;
          if (window.scrollY >= top) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinkClass = (section) =>
    `relative font-semibold tracking-wide transition-all duration-300
     hover:text-orange-500
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
     after:bg-orange-500 after:transition-all after:duration-300
     ${activeSection === section
        ? 'text-orange-500 after:w-full'
        : 'text-gray-800 after:w-0 hover:after:w-full'
      }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-5 py-3">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            <img src={logo} alt="Anvitation Logo" className="h-11 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <HashLink smooth to="/#hero" className={navLinkClass('hero')}>Home</HashLink>
            <HashLink smooth to="/#services" className={navLinkClass('services')}>Services</HashLink>
            <HashLink smooth to="/#packages" className={navLinkClass('packages')}>Packages</HashLink>
            <HashLink smooth to="/#gallery" className={navLinkClass('gallery')}>Our Works</HashLink>
            <HashLink smooth to="/#reviews" className={navLinkClass('reviews')}>Reviews</HashLink>
            <HashLink smooth to="/#faqs" className={navLinkClass('faqs')}>FAQs</HashLink>
            <HashLink smooth to="/#contact" className={navLinkClass('contact')}>Contact</HashLink>

            {/* Desktop Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center rounded-full p-2 text-gray-800 transition-all duration-300 hover:bg-orange-50 hover:text-orange-500"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L6.75 11.25m-1.644-5.977h13.239c.75 0 1.29.72 1.08 1.439l-1.2 4.5a1.125 1.125 0 0 1-1.08.811H6.75m0 0a2.25 2.25 0 1 0 0 4.5h10.5m-10.5 0a2.25 2.25 0 1 1 0 4.5m10.5-4.5a2.25 2.25 0 1 0 0 4.5"
                />
              </svg>

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow-md">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center rounded-full p-2 text-gray-800 transition-all duration-300 hover:bg-orange-50 hover:text-orange-500"
              aria-label="Cart"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L6.75 11.25m-1.644-5.977h13.239c.75 0 1.29.72 1.08 1.439l-1.2 4.5a1.125 1.125 0 0 1-1.08.811H6.75m0 0a2.25 2.25 0 1 0 0 4.5h10.5m-10.5 0a2.25 2.25 0 1 1 0 4.5m10.5-4.5a2.25 2.25 0 1 0 0 4.5"
                />
              </svg>

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow-md">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="flex items-center justify-center rounded-full p-2 text-gray-800 transition-all duration-300 hover:bg-orange-50 hover:text-orange-500"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="rounded-3xl border border-white/50 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] px-4 py-4">
            
            <div className="flex flex-col gap-2">
              <HashLink
                smooth
                to="/#hero"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Home
              </HashLink>

              <HashLink
                smooth
                to="/#services"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Services
              </HashLink>

              <HashLink
                smooth
                to="/#packages"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Packages
              </HashLink>

              <HashLink
                smooth
                to="/#gallery"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Our Works
              </HashLink>

              <HashLink
                smooth
                to="/#reviews"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Reviews
              </HashLink>

              <HashLink
                smooth
                to="/#faqs"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                FAQs
              </HashLink>

              <div className="my-2 h-px bg-gray-200" />

              <HashLink
                smooth
                to="/#contact"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl bg-orange-500 px-4 py-3 text-center font-semibold text-white shadow-md transition hover:bg-orange-600"
              >
                Contact Us
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;