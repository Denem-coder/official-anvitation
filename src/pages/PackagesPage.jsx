import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

import weddingImg from '../assets/img/packages-img/wedding-package-img.png'
import birthdayImg from '../assets/img/packages-img/birthday-package-img.png'
import baptismalImg from '../assets/img/packages-img/baptismal-package-img.png'
import souvenirImg from '../assets/img/packages-img/souvenir-package-img.png'

function PackagesPage() {
  const packages = [
    {
      title: 'Wedding Packages',
      desc: 'Complete invitation and souvenir bundles for your big day.',
      img: weddingImg,
      link: '/packages/wedding',
    },
    {
      title: 'Birthday Packages',
      desc: 'Fun and affordable sets perfect for birthday celebrations.',
      img: birthdayImg,
      link: '/packages/birthday',
    },
    {
      title: 'Baptismal Packages',
      desc: 'Thoughtfully designed bundles for meaningful occasions.',
      img: baptismalImg,
      link: '/packages/baptismal',
    },
    {
      title: 'Souvenir Packages',
      desc: 'Memorable keepsakes bundled for your special events.',
      img: souvenirImg,
      link: '/packages/souvenir',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <BackButton />

        <div className="text-center mt-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Packages
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Choose from our curated packages designed to make your event planning
            easier, more beautiful, and more memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
            >
                <Link
                  key={item.title}
                  to={item.link}
                  className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {item.desc}
                    </p>

                    <span className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-orange-600">
                      View Package →
                    </span>
                  </div>
                </Link>
             
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Need help choosing the right package?
          </h3>
          <p className="text-gray-600 mt-2">
            Message us and we’ll help you pick the best option for your event and
            budget.
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

export default PackagesPage