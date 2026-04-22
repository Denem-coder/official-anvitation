import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import img1 from '../assets/img/gallery-img/wedding-invitation-1.png'
import img2 from '../assets/img/gallery-img/wedding-invitation-2.png'
import img3 from '../assets/img/gallery-img/wedding-invitation-3.png'
import img4 from '../assets/img/gallery-img/birthday-invitation-2.png'
import img5 from '../assets/img/gallery-img/wedding-invitation-5.png'
import img6 from '../assets/img/gallery-img/wedding-invitation-6.png'
import img7 from '../assets/img/gallery-img/wedding-invitation-7.png'
import img8 from '../assets/img/gallery-img/wedding-invitation-8.png'

import img9 from '../assets/img/gallery-img/wedding-invitation-9.png'
import img10 from '../assets/img/gallery-img/wedding-invitation-10.png'
import img11 from '../assets/img/gallery-img/baptismal-invitation-1.png'
import img12 from '../assets/img/gallery-img/baptismal-invitation-2.png'
import img13 from '../assets/img/gallery-img/baptismal-invitation-3.png'
import img14 from '../assets/img/gallery-img/souvenir-1.png'
import img15 from '../assets/img/gallery-img/souvenir-2.png'
import img16 from '../assets/img/gallery-img/souvenir-3.png'
import img17 from '../assets/img/gallery-img/birthday-invitation-1.png'

const topImages = [img1, img2, img3, img4, img5, img6, img7, img8]
const bottomImages = [img9, img10, img11, img12, img13, img14, img15, img16, img17]
const allImages = [...topImages, ...bottomImages]

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const topScroll = [...topImages, ...topImages, ...topImages]
  const bottomScroll = [...bottomImages, ...bottomImages, ...bottomImages]

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section id="gallery" className="bg-gradient-to-b from-orange-50 to-white py-20 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-orange-600 tracking-[0.10em]">Our Works</h2>
        <p className="text-black/50 mt-2">
          See our actual invitation outputs
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max gap-2 animate-scroll-right will-change-transform">
          {topScroll.map((img, index) => (
            <img
              key={`top-${index}`}
              src={img}
              alt={`Top ${index + 1}`}
              onClick={() => setSelectedIndex(allImages.indexOf(img))}
              className="h-40 md:h-56 flex-none rounded-xl object-cover cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden mt-2">
        <div className="flex w-max gap-2 animate-scroll-left will-change-transform">
          {bottomScroll.map((img, index) => (
            <img
              key={`bottom-${index}`}
              src={img}
              alt={`Bottom ${index + 1}`}
              onClick={() => setSelectedIndex(allImages.indexOf(img))}
              className="h-40 md:h-56 flex-none rounded-xl object-cover cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
            />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 text-white text-4xl z-10"
          >
            ×
          </button>

          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
            <Swiper initialSlide={selectedIndex} className="w-full">
              {allImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="max-h-[80vh] w-full mx-auto object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      <div className="mt-10 flex justify-center">
        <Link
          to="/gallery"
          className="font-bold bg-white text-orange-600 border border-orange-700 px-10 py-3 mt-10 rounded-full shadow-xl hover:scale-105 transition hover:bg-orange-500 hover:text-white"
        >
          View All
        </Link>
      </div>
    </section>
  )
}

export default Gallery