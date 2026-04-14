import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'


import { Link } from 'react-router-dom'

import wedding from '../assets/img/services-img/service-1.png'
import baptismal from '../assets/img/services-img/service-2.png'
import birthday from '../assets/img/services-img/service-3.png'
import souvenirs from '../assets/img/services-img/service-3.png'
import BackButton from '../components/BackButton'


const categories = [
  {
    img: wedding,
    title: 'Wedding',
    link: '/services/wedding-invitations',
  },
  {
    img: baptismal,
    title: 'Baptismal',
    link: '/services/baptismal-invitations',
  },
  {
    img: birthday,
    title: 'Birthday',
    link: '/services/birthday-invitations',
  },
  {
    img: souvenirs,
    title: 'Souvenirs',
    link: '/services/souvenirs',
  },
]

function Services() {
  return (
    <section
      id="services"
      className="bg-gradient-to-b from-orange-100 to-white flex flex-col items-center justify-center text-center p-6 pt-20"
    >
      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-10 text-orange-600">
        Explore Categories
      </h2>

      {/* SWIPER */}
      <div className="w-full max-w-6xl">
        <Swiper
          spaceBetween={12}
          slidesPerView={2.3} // 👈 mobile: shows ~2.5 cards
          grabCursor={true}
          loop={false}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link to={category.link}>
                
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-md group">
                  
                  {/* IMAGE */}
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/70 to-transparent">
                    
                    <h3 className="text-white text-sm md:text-lg font-semibold">
                      {category.title}
                    </h3>

                  </div>

                </div>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* VIEW ALL BUTTON */}
      <Link
        to="/services"
        className="font-bold bg-white text-orange-600 border border-orange-700 px-10 py-3 mt-10 rounded-full shadow-xl hover:scale-105 transition hover:bg-orange-500 hover:text-white"
      >
        View All
      </Link>
    </section>
  )
}

export default Services