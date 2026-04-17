import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

function PackagesPage() {
  const packages = [
    {
      title: 'Wedding Packages',
      desc: 'Complete invitation and souvenir bundles for your big day.',
      img: '/images/project1.jpg',
      link: '/packages/wedding',
    },
    {
      title: 'Birthday Packages',
      desc: 'Fun and affordable sets perfect for birthday celebrations.',
      img: '/images/project2.jpg',
      link: '/packages/birthday',
    },
    {
      title: 'Baptismal Packages',
      desc: 'Thoughtfully designed bundles for meaningful occasions.',
      img: '/images/project3.jpg',
      link: '/packages/baptismal',
    },
    {
      title: 'Souvenir Packages',
      desc: 'Memorable keepsakes bundled for your special events.',
      img: '/images/project4.jpg',
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
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  {item.desc}
                </p>

                <Link
                  to={item.link}
                  className="mt-5 inline-block text-center bg-orange-500 text-white px-4 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  View Packages
                </Link>
              </div>
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