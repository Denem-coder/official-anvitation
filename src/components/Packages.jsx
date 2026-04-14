import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'

import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import service1 from '../assets/img/services-img/service-1.png'
import service2 from '../assets/img/services-img/service-2.png'
import service3 from '../assets/img/services-img/service-3.png'
import bgimg from '../assets/img/hero-img/bg-img.png'


const packages = [
  {
    img: service1,
    title: 'Package A',
    desc: 'Paddle fan invitation with 5R rectangular pull-out envelope',
  },
  {
    img: service2,
    title: 'Package B',
    desc: 'Fun and creative styles',
  },
  {
    img: service3,
    title: 'Package C',
    desc: 'Memorable keepsakes',
  },
]

function Packages() {
  const { addToCart } = useCart()

  return (
    <section
      id="packages"
      className="min-h-screen flex flex-col items-center justify-center text-center p-6 pt-20 bg-gradient-to-b from-white to-orange-50"
    >
      <h2 className="text-2xl font-bold mb-8 text-orange-600">
        Our Packages
      </h2>

      <div className="w-full max-w-7xl px-2 md:px-4">
        <Swiper
          spaceBetween={24}
          slidesPerView={1.15}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1.25 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {packages.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="bg-gray-100 rounded-xl shadow-lg h-full flex flex-col overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 flex-grow">
                    {item.desc}
                  </p>

                  <button
                      onClick={() => addToCart(item)}
                      className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:scale-105 transition"
                    >
                      Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link
        to="/packages"
        className="font-bold bg-white text-orange-600 border border-orange-700 px-10 py-3 mt-10 rounded-full shadow-2xl hover:scale-110 transition hover:bg-orange-400 hover:text-white"
      >
        See All Packages
      </Link>
    </section>
  )
}

export default Packages