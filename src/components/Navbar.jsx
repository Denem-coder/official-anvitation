import { useState, useEffect, useRef } from 'react';
import logo from '../assets/img/navbar-img/anvitation-logo.png';

import weddingDesigns from '../assets/img/designs-img/design-1.png';
import birthdayDesigns from '../assets/img/designs-img/design-2.png';
import souvenirDesigns from '../assets/img/designs-img/design-3.png';
import baptismalDesigns from '../assets/img/designs-img/design-2.png';

import work1 from '../assets/img/gallery-img/wedding-invitation-1.png';
import work2 from '../assets/img/gallery-img/wedding-invitation-2.png';
import work3 from '../assets/img/gallery-img/wedding-invitation-3.png';
import work4 from '../assets/img/gallery-img/birthday-invitation-2.png';

import package1 from '../assets/img/designs-img/design-1.png';
import package2 from '../assets/img/designs-img/design-2.png';
import package3 from '../assets/img/designs-img/design-3.png';
import package4 from '../assets/img/designs-img/design-1.png';

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

  const closeTimeoutRef = useRef(null);

  const location = useLocation();
  const { cart } = useCart();

  const designsMenu = [
    {
      label: 'Wedding Invitations',
      desc: 'Elegant and timeless wedding designs',
      to: '/designs/wedding',
      img: weddingDesigns,
    },
    {
      label: 'Birthday Invitations',
      desc: 'Fun and creative birthday invitation styles',
      to: '/designs/birthday',
      img: birthdayDesigns,
    },
    {
      label: 'Baptismal Invitations',
      desc: 'Soft and meaningful baptismal themes',
      to: '/designs/baptismal',
      img: baptismalDesigns,
    },
    {
      label: 'Souvenirs',
      desc: 'Memorable keepsakes for your guests',
      to: '/designs/souvenir',
      img: souvenirDesigns,
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
      to: '/packages/souvenir',
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
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['hero', 'howtoorder', 'designs', 'packages', 'gallery', 'reviews', 'faqs', 'contact'];

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
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
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

  const handleMenuEnter = (menu) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  const navLinkClass = (section = null, path = null) => {
    const isHomePage = location.pathname === '/';

    const isActive =
      (path && path !== '/' && location.pathname.startsWith(path)) ||
      (path === '/' && location.pathname === '/' && (!section || activeSection === section)) ||
      (isHomePage && !path && section && activeSection === section);

    return `group relative inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold tracking-wide
      transition-all duration-300 ease-out
      before:absolute before:inset-0 before:rounded-full before:bg-orange-50 before:opacity-0 before:scale-75
      before:transition-all before:duration-300 before:ease-out
      after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2.5px] after:-translate-x-1/2 after:rounded-full
      after:bg-orange-500 after:transition-all after:duration-300 after:ease-out
      ${
        isActive
          ? 'text-orange-500 before:opacity-100 before:scale-100 after:w-8'
          : 'text-gray-800 after:w-0 hover:text-orange-500 hover:-translate-y-[1px] hover:before:opacity-100 hover:before:scale-100 hover:after:w-8'
      }`;
  };

  const desktopMenuTriggerClass = (path) => {
    const isActive = location.pathname.startsWith(path);

    return `group relative inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold tracking-wide
      transition-all duration-300 ease-out
      before:absolute before:inset-0 before:rounded-full before:bg-orange-50 before:opacity-0 before:scale-75
      before:transition-all before:duration-300 before:ease-out
      after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2.5px] after:-translate-x-1/2 after:rounded-full
      after:bg-orange-500 after:transition-all after:duration-300 after:ease-out
      ${
        isActive
          ? 'text-orange-500 before:opacity-100 before:scale-100 after:w-8'
          : 'text-gray-800 after:w-0 hover:text-orange-500 hover:-translate-y-[1px] hover:before:opacity-100 hover:before:scale-100 hover:after:w-8'
      }`;
  };

  const mobileLinkClass = (section = null, path = null, isPrimary = false) => {
    const isHomePage = location.pathname === '/';

    const isActive =
      (path && path !== '/' && location.pathname.startsWith(path)) ||
      (path === '/' && location.pathname === '/' && (!section || activeSection === section)) ||
      (isHomePage && !path && section && activeSection === section);

    if (isPrimary) {
      return 'w-full rounded-2xl px-4 py-3 text-center font-semibold bg-orange-500 text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg';
    }

    return `w-full rounded-2xl px-4 py-3 text-left font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-orange-50 text-orange-500 shadow-sm'
        : 'text-gray-800 hover:bg-orange-50 hover:text-orange-500 hover:translate-x-1'
    }`;
  };

  const toggleMobileDropdown = (menu) => {
    setMobileDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setMobileDropdown(null);
    setActiveMenu(null);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
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

  const DropdownSeeAllButton = ({ to, onClick }) => (
    <div className="mt-6 flex justify-center border-t border-gray-200 pt-5">
      <Link
        to={to}
        onClick={onClick}
        className="inline-flex items-center rounded-full bg-orange-500 px-6 py-2.5 font-semibold text-white transition hover:bg-orange-600"
      >
        See All
      </Link>
    </div>
  );

  const getMegaMenuContent = () => {
    if (activeMenu === 'designs') {
      return {
        eyebrow: 'Designs',
        title: 'Explore our categories',
        items: designsMenu,
        seeAllTo: '/designs',
      };
    }

    if (activeMenu === 'packages') {
      return {
        eyebrow: 'Packages',
        title: 'Choose a bundle that fits your event',
        items: packagesMenu,
        seeAllTo: '/packages',
      };
    }

    if (activeMenu === 'works') {
      return {
        eyebrow: 'Our Works',
        title: 'Browse sample products',
        items: worksMenu,
        seeAllTo: '/gallery',
      };
    }

    return null;
  };

  const megaMenuContent = getMegaMenuContent();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 relative"
        onMouseLeave={handleMenuLeave}
      >
        <div className="relative flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
            onClick={closeAllMenus}
          >
            <img src={logo} alt="Anvitation Logo" className="h-11 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative" onMouseEnter={() => handleMenuEnter('designs')}>
              <Link
                to="/designs"
                className={desktopMenuTriggerClass('/designs')}
                onClick={closeAllMenus}
              >
                <span className="relative z-10">Designs</span>
              </Link>
            </div>

            <div className="relative" onMouseEnter={() => handleMenuEnter('packages')}>
              <Link
                to="/packages"
                className={desktopMenuTriggerClass('/packages')}
                onClick={closeAllMenus}
              >
                <span className="relative z-10">Packages</span>
              </Link>
            </div>

            <div className="relative" onMouseEnter={() => handleMenuEnter('works')}>
              <Link
                to="/gallery"
                className={desktopMenuTriggerClass('/gallery')}
                onClick={closeAllMenus}
              >
                <span className="relative z-10">Our Works</span>
              </Link>
            </div>

            <HashLink smooth to="/#reviews" className={navLinkClass('reviews')} onClick={closeAllMenus}>
              <span className="relative z-10">Reviews</span>
            </HashLink>

            <HashLink smooth to="/#howtoorder" className={navLinkClass('howtoorder')} onClick={closeAllMenus}>
              <span className="relative z-10">How to Order?</span>
            </HashLink>

            <Link
              to="/cart"
              className={`relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300 ease-out ${
                location.pathname.startsWith('/cart')
                  ? 'bg-orange-50 text-orange-500 shadow-sm'
                  : 'text-gray-800 hover:bg-white/80 hover:text-orange-500 hover:shadow-md hover:-translate-y-[1px]'
              }`}
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
              className={`relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300 ease-out ${
                location.pathname.startsWith('/cart')
                  ? 'bg-orange-50 text-orange-500 shadow-sm'
                  : 'text-gray-800 hover:bg-white/80 hover:text-orange-500 hover:shadow-md hover:-translate-y-[1px]'
              }`}
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
              className="flex items-center justify-center rounded-full p-2.5 text-gray-800 transition-all duration-300 ease-out hover:bg-white/80 hover:text-orange-500 hover:shadow-md hover:-translate-y-[1px]"
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
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={handleMenuLeave}
          className={`hidden md:block absolute left-1/2 top-full z-50 mt-5 w-full max-w-[1000px] -translate-x-1/2 px-2 transition-all duration-200 ${
            megaMenuContent
              ? 'visible opacity-100 translate-y-0 pointer-events-auto'
              : 'invisible opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="rounded-3xl border border-white/50 bg-white/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            {megaMenuContent && (
              <>
                <div className="mb-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                    {megaMenuContent.eyebrow}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-gray-900">
                    {megaMenuContent.title}
                  </h3>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {megaMenuContent.items.map((item) => (
                    <MegaMenuCard key={item.label} item={item} onClick={closeAllMenus} />
                  ))}
                </div>

                <DropdownSeeAllButton
                  to={megaMenuContent.seeAllTo}
                  onClick={closeAllMenus}
                />
              </>
            )}
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen
              ? 'max-h-[calc(100vh-90px)] overflow-y-auto opacity-100 mt-3'
              : 'max-h-0 overflow-hidden opacity-0'
          }`}
        >
          <div className="rounded-3xl border border-white/50 bg-white/95 px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/designs"
                    onClick={closeAllMenus}
                    className={`flex-1 rounded-2xl px-4 py-3 text-left font-semibold transition-all duration-300 ${
                      location.pathname.startsWith('/designs')
                        ? 'bg-orange-50 text-orange-500 shadow-sm'
                        : 'text-gray-800 hover:bg-orange-50 hover:text-orange-500 hover:translate-x-1'
                    }`}
                  >
                    Designs
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleMobileDropdown('designs')}
                    className={`flex h-[48px] w-[48px] items-center justify-center rounded-2xl transition-all duration-300 ${
                      location.pathname.startsWith('/designs') || mobileDropdown === 'designs'
                        ? 'bg-orange-50 text-orange-500 shadow-sm'
                        : 'text-gray-800 hover:bg-orange-50 hover:text-orange-500 hover:translate-x-1'
                    }`}
                    aria-label="Toggle Designs menu"
                  >
                    <span className={`transition ${mobileDropdown === 'designs' ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === 'designs' ? 'max-h-[500px] pt-2' : 'max-h-0'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {designsMenu.map((item) => (
                      <MegaMenuCard
                        key={item.label}
                        item={item}
                        compact
                        onClick={closeAllMenus}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/packages"
                    onClick={closeAllMenus}
                    className={`flex-1 rounded-2xl px-4 py-3 text-left font-semibold transition-all duration-300 ${
                      location.pathname.startsWith('/packages')
                        ? 'bg-orange-50 text-orange-500 shadow-sm'
                        : 'text-gray-800 hover:bg-orange-50 hover:text-orange-500 hover:translate-x-1'
                    }`}
                  >
                    Packages
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleMobileDropdown('packages')}
                    className={`flex h-[48px] w-[48px] items-center justify-center rounded-2xl transition-all duration-300 ${
                      location.pathname.startsWith('/packages') || mobileDropdown === 'packages'
                        ? 'bg-orange-50 text-orange-500 shadow-sm'
                        : 'text-gray-800 hover:bg-orange-50 hover:text-orange-500 hover:translate-x-1'
                    }`}
                    aria-label="Toggle Packages menu"
                  >
                    <span className={`transition ${mobileDropdown === 'packages' ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === 'packages' ? 'max-h-[500px] pt-2' : 'max-h-0'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {packagesMenu.map((item) => (
                      <MegaMenuCard
                        key={item.label}
                        item={item}
                        compact
                        onClick={closeAllMenus}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/gallery"
                    onClick={closeAllMenus}
                    className={`flex-1 rounded-2xl px-4 py-3 text-left font-semibold transition-all duration-300 ${
                      location.pathname.startsWith('/gallery')
                        ? 'bg-orange-50 text-orange-500 shadow-sm'
                        : 'text-gray-800 hover:bg-orange-50 hover:text-orange-500 hover:translate-x-1'
                    }`}
                  >
                    Our Works
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleMobileDropdown('works')}
                    className={`flex h-[48px] w-[48px] items-center justify-center rounded-2xl transition-all duration-300 ${
                      location.pathname.startsWith('/gallery') || mobileDropdown === 'works'
                        ? 'bg-orange-50 text-orange-500 shadow-sm'
                        : 'text-gray-800 hover:bg-orange-50 hover:text-orange-500 hover:translate-x-1'
                    }`}
                    aria-label="Toggle Our Works menu"
                  >
                    <span className={`transition ${mobileDropdown === 'works' ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === 'works' ? 'max-h-[500px] pt-2' : 'max-h-0'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {worksMenu.map((item) => (
                      <MegaMenuCard
                        key={item.label}
                        item={item}
                        compact
                        onClick={closeAllMenus}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <HashLink
                smooth
                to="/#reviews"
                onClick={closeAllMenus}
                className={mobileLinkClass('reviews')}
              >
                Reviews
              </HashLink>

              <HashLink
                smooth
                to="/#faqs"
                onClick={closeAllMenus}
                className={mobileLinkClass('faqs')}
              >
                How to Order
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;