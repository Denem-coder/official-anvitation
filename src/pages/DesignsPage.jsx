import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

import wedding from '../assets/img/designs-img/wedding/trifold-1-sagegreen-front.png';
import birthday from '../assets/img/designs-img/birthday/traditional-4-astronaut-cover.png';
import debut from '../assets/img/designs-img/debut/scroll-1-gold-cover.png';
import baptismal from '../assets/img/designs-img/baptismal/traditional-1-donaldduck-cover.png';
import souvenir from '../assets/img/designs-img/souvenir/souvenir-2-refmagnet-acrylic.png';

function DesignsPage() {
  const designs = [
    {
      title: 'Wedding Invitations',
      desc: 'Elegant Designs.',
      img: wedding,
      strt: 'Starts at ₱55 per set',
      avail: 'New Designs Coming Soon',
      link: '/designs/wedding',
    },
    {
      title: 'Birthday Invitations',
      desc: 'Fun & colorful themes.',
      img: birthday,
      strt: 'Starts at ₱70 per set',
      avail: 'New Designs Coming Soon',
      link: '/designs/birthday',
    },
    {
      title: 'Debut Invitations',
      desc: 'Fun & colorful themes.',
      img: debut,
      strt: 'Starts at ₱56 per set',
      avail: 'New Designs Coming Soon',
      link: '/designs/debut',
    },
    {
      title: 'Baptismal Invitations',
      desc: 'Soft & meaningful styles.',
      img: baptismal,
      strt: 'Starts at ₱50 per set',
      avail: 'New Designs Coming Soon',
      link: '/designs/baptismal',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <BackButton />

        {/* HERO */}
        <div className="mt-6 mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Our Invitations
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Premium invitations and souvenirs designed to make your events
            unforgettable.
          </p>
        </div>

        {/* DESIGNS GRID */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {designs.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group block overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-md"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col p-3">
                <h2 className="text-left text-[14px] font-bold text-gray-900 md:text-start md:text-base">
                  {item.title}
                </h2>

                <p className="mt-1 text-left text-xs text-gray-600">
                  {item.desc}
                </p>

                <p className="mt-1 text-[9px] text-gray-400">
                  {item.avail}
                </p>

                <p className="mt-2 text-left text-xs font-bold text-orange-600">
                  {item.strt}
                </p>

                <span className="mt-3 inline-flex items-center justify-center rounded-2xl bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-orange-600">
                  View Designs →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Not sure what to choose?
          </h3>

          <p className="mt-2 text-gray-600">
            Let us help you find the perfect design for your event.
          </p>

          <Link
            to="/#contact"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-md transition hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DesignsPage