import { useState, useEffect, useRef } from 'react';
import logo from '../assets/img/navbar-img/anvitation-logo.png';

import serviceWedding from '../assets/img/services-img/service-1.png';
import serviceBirthday from '../assets/img/services-img/service-2.png';
import serviceSouvenirs from '../assets/img/services-img/service-3.png';
import serviceBaptismal from '../assets/img/services-img/service-2.png';

import work1 from '../assets/img/gallery-img/wedding-invitation-8.png';
import work2 from '../assets/img/gallery-img/birthday-invitation-1.png';
import work3 from '../assets/img/gallery-img/baptismal-invitation-1.png';
import work4 from '../assets/img/gallery-img/souvenir-3.png';

import package1 from '../assets/img/services-img/service-1.png';
import package2 from '../assets/img/services-img/service-2.png';
import package3 from '../assets/img/services-img/service-3.png';
import package4 from '../assets/img/services-img/service-1.png';

import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const closeTimeout = useRef(null);

  const location = useLocation();
  const { cart } = useCart();

  const servicesMenu = [
    {
      label: 'Wedding Invitations',
      desc: 'Elegant and timeless wedding designs',
      to: '/services/wedding-invitations',
      img: serviceWedding,
    },
    {
      label: 'Birthday Invitations',
      desc: 'Fun and creative birthday invitation styles',
      to: '/services/birthday-invitations',
      img: serviceBirthday,
    },
    {
      label: 'Baptismal Invitations',
      desc: 'Soft and meaningful baptismal themes',
      to: '/services/baptismal-invitations',
      img: serviceBaptismal,
    },
    {
      label: 'Souvenirs',
      desc: 'Memorable keepsakes for your guests',
      to: '/services/souvenirs',
      img: serviceSouvenirs,
    },
  ];

  const packagesMenu = [
    {
      label: 'Wedding Packages',
      desc: 'Curated bundles for your big day',
      to: '/packages/wedding',
      img: package1,
    },
    {
      label: 'Birthday Packages',
      desc: 'Affordable party-ready invitation sets',
      to: '/packages/birthday',
      img: package2,
    },
    {
      label: 'Baptismal Packages',
      desc: 'Thoughtfully designed baptismal bundles',
      to: '/packages/baptismal',
      img: package3,
    },
    {
      label: 'Souvenir Packages',
      desc: 'Bundled keepsakes for special events',
      to: '/packages/souvenirs',
      img: package4,
    },
  ];

  const worksMenu = [
    {
      label: 'Wedding Samples',
      to: '/gallery',
      img: work1,
    },
    {
      label: 'Birthday Samples',
      to: '/gallery',
      img: work2,
    },
    {
      label: 'Baptismal Samples',
      to: '/gallery',
      img: work3,
    },
    {
      label: 'Souvenir Samples',
      to: '/gallery',
      img: work4,
    },
  ];

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

  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMenuEnter = (menuName) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
  };

  const navLinkClass = (section, path = null) => {
    const isActive =
      (path && location.pathname === path) || activeSection === section;

    return `relative font-semibold tracking-wide transition-all duration-300
      hover:text-orange-500
      after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
      after:bg-orange-500 after:transition-all after:duration-300
      ${
        isActive
          ? 'text-orange-500 after:w-full'
          : 'text-gray-800 after:w-0 hover:after:w-full'
      }`;
  };

  const desktopTriggerClass =
    "relative font-semibold tracking-wide text-gray-800 transition-all duration-300 hover:text-orange-500 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer";

  const toggleMobileDropdown = (menu) => {
    setMobileDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setMobileDropdown(null);
    setActiveMenu(null);
  };

  const MegaMenuCard = ({ item, compact = false, onClick }) => (
    <Link
      to={item.to}
      onClick={onClick}
      className="group block rounded-2xl p-2 transition hover:bg-orange-50"
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={item.img}
          alt={item.label}
          className={`w-full object-cover transition duration-300 group-hover:scale-105 ${
            compact ? 'h-24' : 'h-40'
          }`}
        />
      </div>

      <div className="mt-3">
        <p className="font-semibold text-gray-800 transition group-hover:text-orange-500">
          {item.label}
        </p>
        {'desc' in item && item.desc && (
          <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
        )}
      </div>
    </Link>
  );

  const DropdownSeeAllButton = ({ to }) => (
    <div className="mt-6 flex justify-center border-t border-gray-200 pt-5">
      <Link
        to={to}
        onClick={closeAllMenus}
        className="inline-flex items-center rounded-full bg-orange-500 px-6 py-2.5 font-semibold text-white transition hover:bg-orange-600"
      >
        See All
      </Link>
    </div>
  );

  const MobileSeeAllButton = ({ to }) => (
    <div className="mt-4 px-2">
      <Link
        to={to}
        onClick={closeAllMenus}
        className="block w-full rounded-full bg-orange-500 px-4 py-2.5 text-center font-semibold text-white transition hover:bg-orange-600"
      >
        See All
      </Link>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <div className="relative flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
            onClick={closeAllMenus}
          >
            <img src={logo} alt="Anvitation Logo" className="h-11 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <HashLink smooth to="/#hero" className={navLinkClass('hero', '/')}>
              Home
            </HashLink>

            {/* Services */}
            <div
              className="static"
              onMouseEnter={() => handleMenuEnter('services')}
              onMouseLeave={handleMenuLeave}
            >
              <div className={desktopTriggerClass}>Services</div>

              <div
                className={`absolute left-0 top-full mt-5 z-50 w-full pt-0 transition-all duration-200 ${
                  activeMenu === 'services'
                    ? 'visible opacity-100'
                    : 'invisible opacity-0 pointer-events-none'
                }`}
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="rounded-b-3xl rounded-t-none border border-white/40 border-t-0 bg-white/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                    <div className="mb-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                        Services
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">
                        Explore our categories
                      </h3>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {servicesMenu.map((item) => (
                        <MegaMenuCard key={item.label} item={item} onClick={closeAllMenus} />
                      ))}
                    </div>

                    <DropdownSeeAllButton to="/services" />
                  </div>
                </div>
              </div>
            </div>

            {/* Packages */}
            <div
              className="static"
              onMouseEnter={() => handleMenuEnter('packages')}
              onMouseLeave={handleMenuLeave}
            >
              <div className={desktopTriggerClass}>Packages</div>

              <div
                className={`absolute left-0 top-full mt-5 z-50 w-full pt-0 transition-all duration-200 ${
                  activeMenu === 'packages'
                    ? 'visible opacity-100'
                    : 'invisible opacity-0 pointer-events-none'
                }`}
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="rounded-b-3xl rounded-t-none border border-white/40 border-t-0 bg-white/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                    <div className="mb-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                        Packages
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">
                        Choose a bundle that fits your event
                      </h3>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {packagesMenu.map((item) => (
                        <MegaMenuCard key={item.label} item={item} onClick={closeAllMenus} />
                      ))}
                    </div>

                    <DropdownSeeAllButton to="/packages" />
                  </div>
                </div>
              </div>
            </div>

            {/* Our Works */}
            <div
              className="static"
              onMouseEnter={() => handleMenuEnter('works')}
              onMouseLeave={handleMenuLeave}
            >
              <div className={desktopTriggerClass}>Our Works</div>

              <div
                className={`absolute left-0 top-full mt-5 z-50 w-full pt-0 transition-all duration-200 ${
                  activeMenu === 'works'
                    ? 'visible opacity-100'
                    : 'invisible opacity-0 pointer-events-none'
                }`}
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="rounded-b-3xl rounded-t-none border border-white/40 border-t-0 bg-white/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                    <div className="mb-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                        Our Works
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">
                        Browse sample products
                      </h3>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {worksMenu.map((item) => (
                        <MegaMenuCard key={item.label} item={item} onClick={closeAllMenus} />
                      ))}
                    </div>

                    <DropdownSeeAllButton to="/gallery" />
                  </div>
                </div>
              </div>
            </div>

            <HashLink smooth to="/#reviews" className={navLinkClass('reviews')}>
              Reviews
            </HashLink>

            <HashLink smooth to="/#faqs" className={navLinkClass('faqs')}>
              FAQs
            </HashLink>

            <HashLink smooth to="/#contact" className={navLinkClass('contact')}>
              Contact
            </HashLink>

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

          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className="relative flex items-center justify-center rounded-full p-2 text-gray-800 transition-all duration-300 hover:bg-orange-50 hover:text-orange-500"
              aria-label="Cart"
              onClick={closeAllMenus}
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

        <div
          className={`md:hidden overflow-y-auto transition-all duration-300 ${
            isOpen ? 'max-h-[80vh] opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="rounded-3xl border border-white/50 bg-white/95 px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              <HashLink
                smooth
                to="/#hero"
                onClick={closeAllMenus}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Home
              </HashLink>

              {/* Mobile Services */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileDropdown('services')}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  <span>Services</span>
                  <span className={`transition ${mobileDropdown === 'services' ? 'rotate-180' : ''}`}>
                    ⌄
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === 'services' ? 'max-h-[650px] pt-2' : 'max-h-0'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {servicesMenu.map((item) => (
                      <MegaMenuCard key={item.label} item={item} compact onClick={closeAllMenus} />
                    ))}
                  </div>

                  <MobileSeeAllButton to="/services" />
                </div>
              </div>

              {/* Mobile Packages */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileDropdown('packages')}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  <span>Packages</span>
                  <span className={`transition ${mobileDropdown === 'packages' ? 'rotate-180' : ''}`}>
                    ⌄
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === 'packages' ? 'max-h-[650px] pt-2' : 'max-h-0'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {packagesMenu.map((item) => (
                      <MegaMenuCard key={item.label} item={item} compact onClick={closeAllMenus} />
                    ))}
                  </div>

                  <MobileSeeAllButton to="/package" />
                </div>
              </div>

              {/* Mobile Works */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileDropdown('works')}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  <span>Our Works</span>
                  <span className={`transition ${mobileDropdown === 'works' ? 'rotate-180' : ''}`}>
                    ⌄
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === 'works' ? 'max-h-[650px] pt-2' : 'max-h-0'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {worksMenu.map((item) => (
                      <MegaMenuCard key={item.label} item={item} compact onClick={closeAllMenus} />
                    ))}
                  </div>

                  <MobileSeeAllButton to="/gallery" />
                </div>
              </div>

              <HashLink
                smooth
                to="/#reviews"
                onClick={closeAllMenus}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Reviews
              </HashLink>

              <HashLink
                smooth
                to="/#faqs"
                onClick={closeAllMenus}
                className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-orange-50 hover:text-orange-500"
              >
                FAQs
              </HashLink>

              <div className="my-2 h-px bg-gray-200" />

              <HashLink
                smooth
                to="/#contact"
                onClick={closeAllMenus}
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