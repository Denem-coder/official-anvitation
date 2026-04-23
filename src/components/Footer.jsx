import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

function Footer() {
  return (
    <footer className="relative mt-20 bg-white">
      <div className="relative max-w-7xl mx-auto px-6 py-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-orange-600">ANvitation</h2>

            <p className="mt-4 text-sm text-gray-600 leading-6 max-w-sm">
              Your Partner In All Occasions
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Explore
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/designs" className="group flex items-center gap-2">
                  <span className="h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-4" />
                  <span className="text-gray-700 group-hover:text-orange-500 transition">
                    Designs
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/packages" className="group flex items-center gap-2">
                  <span className="h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-4" />
                  <span className="text-gray-700 group-hover:text-orange-500 transition">
                    Packages
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/gallery" className="group flex items-center gap-2">
                  <span className="h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-4" />
                  <span className="text-gray-700 group-hover:text-orange-500 transition">
                    Our Works
                  </span>
                </Link>
              </li>

              <li>
                <HashLink smooth to="/#faqs" className="group flex items-center gap-2">
                  <span className="h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-4"></span>
                  <span className="text-gray-700 group-hover:text-orange-500 transition">
                    FAQs
                  </span>
                </HashLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Need Help?
            </h3>

            <p className="mt-4 text-sm text-gray-600">
              Not sure what to choose? Message us and we’ll guide you.
            </p>

            <a
              href="https://m.me/ANv8e"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-xl"
            >
              Message Us
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col items-center gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ANvitation. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <HashLink smooth to="/#contact" className="hover:text-orange-500 transition">
              Contact
            </HashLink>

            <HashLink smooth to="/#faqs" className="hover:text-orange-500 transition">
              FAQs
            </HashLink>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>Built by</span>

            <a
              href="https://www.facebook.com/aldrindiazofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 font-medium text-gray-500 transition hover:text-orange-500"
            >
              <span className="relative">
                Aldrin
                <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 px-3 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                Web Developer • Designer
              </span>

              <span className="absolute inset-0 rounded-full bg-orange-500/10 blur-md opacity-0 transition group-hover:opacity-100"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer