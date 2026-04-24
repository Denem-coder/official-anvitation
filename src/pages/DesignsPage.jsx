import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

import wedding from '../assets/img/designs-img/design-1.png'
import baptismal from '../assets/img/designs-img/design-2.png'
import birthday from '../assets/img/designs-img/design-3.png'
import souvenirs from '../assets/img/designs-img/design-4.png'

function DesignsPage() {
  const designs = [
    {
      title: "Wedding Designs",
      desc: "Elegant Designs.",
      img: wedding,
      strt: "Starts at ₱60 per set",
      avail: "New Designs Coming Soon",
      link: "/designs/wedding",
    },
    {
      title: "Birthday Designs",
      desc: "Fun & colorful themes.",
      img: birthday,
      strt: "Starts at ₱56 per set",
      avail: "New Designs Coming Soon",
      link: "/designs/birthday",
    },
    {
      title: "Baptismal Designs",
      desc: "Soft & meaningful styles.",
      img: baptismal,
      strt: "Starts at ₱50 per set",
      avail: "New Designs Coming Soon",
      link: "/designs/baptismal",
    },
    {
      title: "Souvenir Designs",
      desc: "Memorable keepsakes.",
      img: souvenirs,
      strt: "Starts at ₱100 per set",
      avail: "New Designs Coming Soon",
      link: "/designs/souvenir",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <BackButton />

        {/* HERO */}
        <div className="text-center mt-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Designs
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Premium invitations and souvenirs designed to make your events unforgettable.
          </p>
        </div>

        {/* DESIGNS GRID */}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {designs.map((item, index) => (
            <Link  to={item.link}>
            <div
              key={index}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col border border-gray-100"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-grow">
                <h2 className=" text-gray-900 text-[14px] md:text-base text-left md:text-start font-bold">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-600 mt-1 flex-grow text-left">
                  {item.desc}
                </p>

                <p className="mt-1 text-[9px] text-gray-400">
                  {item.avail}
                </p>

                <p className="text-xs text-orange-600 mt-1 flex-grow font-bold text-left">
                  {item.strt}
                </p>

                {/* CTA */}
                <Link
                  to={item.link}
                  className="mt-3 text-center bg-orange-500 text-white px-3 py-2 rounded-2xl text-sm font-semibold hover:bg-orange-600 transition"
                >
                  View Designs →
                </Link>
              </div>
            </div>
            </Link>
          ))}
        </div>
        
        

        {/* CTA SECTION */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Not sure what to choose?
          </h3>
          <p className="text-gray-600 mt-2">
            Let us help you find the perfect design for your event.
          </p>

          <Link
            to="/#contact"
            className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DesignsPage