import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

import wedding from '../assets/img/designs-img/design-1.png'
import baptismal from '../assets/img/designs-img/design-2.png'
import birthday from '../assets/img/designs-img/design-3.png'
import souvenirs from '../assets/img/designs-img/design-4.png'

function DesignsPage() {
  const designs = [
    {
      title: "Wedding",
      desc: "Elegant and timeless designs crafted for your special day.",
      img: wedding,
      strt: "Starts at ₱60 per set",
      link: "/designs/wedding",
    },
    {
      title: "Birthday",
      desc: "Fun, creative, and personalized invitations, perfect for all ages.",
      img: birthday,
      strt: "Starts at ₱56 per set",
      link: "/designs/birthday",
    },
    {
      title: "Baptismal",
      desc: "Soft and meaningful designs perfect for sacred celebrations.",
      img: baptismal,
      strt: "Starts at ₱50 per set",
      link: "/designs/baptismal",
    },
    {
      title: "Souvenirs",
      desc: "Memorable keepsakes your guests will truly appreciate.",
      img: souvenirs,
      strt: "Starts at ₱100 per set",
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
                <h2 className=" text-gray-900 text-[14px] md:text-base text-center md:text-start font-bold">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-600 mt-1 flex-grow hidden md:block">
                  {item.desc}
                </p>

                <p className="text-sm text-orange-600 mt-1 flex-grow font-bold">
                  {item.strt}
                </p>

                {/* CTA */}
                <Link
                  to={item.link}
                  className="mt-3 text-center bg-orange-500 text-white px-3 py-2 rounded-2xl text-sm font-semibold hover:bg-orange-600 transition"
                >
                  View Designs
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