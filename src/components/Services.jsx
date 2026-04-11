import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css/bundle'

import { Link } from 'react-router-dom'

import service1 from '../assets/img/services-img/service-1.png'
import service2 from '../assets/img/services-img/service-2.png'
import service3 from '../assets/img/services-img/service-3.png'

const services = [
  {
    img: service1,
    title: 'Wedding Invitations',
    desc: 'Luxury and elegant designs',
    link: '/services/wedding-invitations',
  },
  {
    img: service2,
    title: 'Birthday Invitations',
    desc: 'Fun and creative styles',
    link: '/services/birthday-invitations',
  },
  {
    img: service3,
    title: 'Souvenirs',
    desc: 'Memorable keepsakes',
    link: '/services/souvenirs',
  },
]

function Services() {
  return (
    <section
      id="services"
      className="bg-gradient-to-b from-orange-100 to-white flex flex-col items-center justify-center text-center p-6 pt-20"
    >
      <h2 className="text-3xl font-bold mb-10 text-orange-600">
        Our Services
      </h2>

      <div className="w-full max-w-6xl">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={false}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-xl rounded-2xl bg-gray-100 overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-56 object-cover"
                  />

                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mb-4">{service.desc}</p>

                  <Link
                    to={service.link}
                    className="mt-auto inline-block bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                  >
                    View Samples
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link
        to="/services"
        className="font-bold bg-white text-orange-600 border border-orange-700 px-10 py-3 mt-10 rounded-full shadow-2xl hover:scale-110 transition hover:bg-orange-400 hover:text-white"
      >
        View All
      </Link>
    </section>
  )
}

export default Services