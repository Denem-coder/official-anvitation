import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

import wedding from '../assets/img/services-img/service-1.png'
import baptismal from '../assets/img/services-img/service-2.png'
import birthday from '../assets/img/services-img/service-3.png'
import souvenirs from '../assets/img/services-img/service-4.png'
import printingSupplies from '../assets/img/services-img/service-5.png'

function ServicesPage() {
  const services = [
    {
      title: "Wedding Invitations",
      desc: "Elegant and timeless designs crafted for your special day.",
      img: wedding,
      link: "/services/wedding-invitations",
    },
    {
      title: "Birthday Invitations",
      desc: "Fun, creative, and personalized invitations for all ages.",
      img: birthday,
      link: "/services/birthday-invitations",
    },
    {
      title: "Baptismal Invitations",
      desc: "Soft and meaningful designs perfect for sacred celebrations.",
      img: baptismal,
      link: "/services/baptismal-invitations",
    },
    {
      title: "Souvenirs",
      desc: "Memorable keepsakes your guests will truly appreciate.",
      img: souvenirs,
      link: "/services/souvenirs",
    },
    {
      title: "Printing Supplies",
      desc: "Essential papers, inks, and materials for all your printing needs.",
      img: printingSupplies,
      link: "/services/printing-supplies",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <BackButton />

        {/* HERO */}
        <div className="text-center mt-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Services
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Premium invitations and souvenirs designed to make your events unforgettable.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  {item.desc}
                </p>

                {/* CTA */}
                <Link
                  to={item.link}
                  className="mt-4 inline-block text-center bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  View Designs
                </Link>
              </div>
            </div>
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

export default ServicesPage