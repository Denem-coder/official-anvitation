import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

import refMagnet from '../assets/img/designs-img/souvenir/souvenir-2-refmagnet-acrylic.png'
import cardHolder from '../assets/img/designs-img/souvenir/souvenir-1-cardholder.png'
import glassCupCover from '../assets/img/souvenirs-img/souvenir-3-glasscup.png'
import glassCupInside from '../assets/img/souvenirs-img/souvenir-3-glasscup-inside.png'
import keychain from '../assets/img/souvenirs-img/souvenir-4-keychain.png'

function SouvenirsPage() {
  const souvenirs = [
    {
        title: 'Ref Magnet',
        desc: 'Personalized keepsakes perfect for birthdays, weddings, and baptismal events.',
        img: refMagnet,
        strt: 'Starts at ₱100 per set',
        avail: '3 Designs Available',
        link: '/souvenirs/designs?category=ref-magnets',
    },
    {
        title: 'Card Holder',
        desc: 'Simple and useful souvenirs your guests can keep and use.',
        img: cardHolder,
        strt: 'Starts at ₱100 per set',
        avail: 'More designs coming soon',
        link: '/souvenirs/designs?category=card-holder',
    },
    {
        title: 'Glass Cup with Sip',
        desc: 'Simple and useful souvenirs your guests can keep and use.',
        img: glassCupCover,
        strt: 'Starts at ₱100 per set',
        avail: 'More designs coming soon',
        link: '/souvenirs/designs?category=glass-cup',
    },
    {
        title: 'Keychain',
        desc: 'Small but memory-filled keychain your guests can keep.',
        img: keychain,
        strt: 'Starts at ₱15 per set',
        avail: 'More designs coming soon',
        link: '/souvenirs/designs?category=keychain',
    },
    ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="mx-auto max-w-7xl">
        <BackButton />

        {/* HERO */}
        <div className="mt-6 mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Our Souvenirs
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Memorable keepsakes crafted to match your celebration and leave a lasting impression on your guests.
          </p>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
            Perfect for weddings, birthdays, baptisms, and debuts.
          </p>
        </div>

        {/* SOUVENIRS GRID */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {souvenirs.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group block overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-md"
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col p-3">
                <h2 className="text-left text-[14px] font-bold text-gray-900 md:text-base">
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
                  View Souvenirs →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Want matching souvenirs for your event?
          </h3>

          <p className="mt-2 text-gray-600">
            Message us and we’ll help you choose the best souvenir style for your celebration.
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

export default SouvenirsPage