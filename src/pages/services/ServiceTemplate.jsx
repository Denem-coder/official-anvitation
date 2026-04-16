import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { useCart } from '../../context/CartContext'

function ServiceTemplate({
  badge,
  title,
  subtitle,
  features = [],
  designs = [],
  packageLink,
  primaryCtaText = 'View Packages',
  inquiryText = 'Need Help?',
  inquiryLink = '/#contact',
}) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { addToCart } = useCart()

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    if (!selectedItem) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()

      if (!selectedItem.images || selectedItem.images.length <= 1) return

      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedItem, activeImageIndex])

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedItem])

  const openModal = (item) => {
    setSelectedItem(item)
    setActiveImageIndex(0)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setActiveImageIndex(0)
  }

  const nextImage = () => {
    if (!selectedItem?.images?.length) return
    setActiveImageIndex((prev) => (prev + 1) % selectedItem.images.length)
  }

  const prevImage = () => {
    if (!selectedItem?.images?.length) return
    setActiveImageIndex((prev) =>
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    )
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current

    if (Math.abs(distance) < 50) return

    if (distance > 0) {
      nextImage()
    } else {
      prevImage()
    }
  }

  const imageList =
    selectedItem?.images?.length > 0
      ? selectedItem.images
      : selectedItem
      ? [selectedItem.cover || selectedItem.img]
      : []

  const currentImage = imageList[activeImageIndex] || ''

  const handleAddToCart = () => {
    if (!selectedItem) return

    addToCart({
      type: 'design',
      category: badge,
      title: selectedItem.title,
      designSlug: selectedItem.slug,
      image: selectedItem.cover || selectedItem.images?.[0] || selectedItem.img,
      description: selectedItem.desc,
    })

    closeModal()
  }

  const buyNowLink = selectedItem?.slug
    ? `${packageLink}?design=${encodeURIComponent(selectedItem.slug)}`
    : packageLink

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>

        <section className="mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            {badge}
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {designs.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300"
              >
                <button
                  type="button"
                  onClick={() => openModal(item)}
                  className="block w-full text-left"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.cover || item.images?.[0] || item.img}
                      alt={item.title}
                      className="w-full h-72 object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </p>

                    <span className="mt-3 inline-flex rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
                      View Details
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Why Choose Our {badge}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500 font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-medium leading-6">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Interested in this service?
          </h3>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Message us and we’ll help you choose the best option for your event,
            style, and budget.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {packageLink && (
              <Link
                to={packageLink}
                className="rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                {primaryCtaText}
              </Link>
            )}

            <Link
              to={inquiryLink}
              className="rounded-full border border-orange-300 bg-white px-7 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
            >
              {inquiryText}
            </Link>
          </div>
        </section>

        {selectedItem && (
          <div
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-6 sm:px-6 md:px-10"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-5xl rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-y-auto">
                <div className="bg-gray-50 p-4 sm:p-5 lg:p-6">
                  <div
                    className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-sm"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img
                      src={currentImage}
                      alt={selectedItem.title}
                      className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[520px] select-none"
                      draggable="false"
                    />

                    {imageList.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                          aria-label="Next image"
                        >
                          ›
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
                          {imageList.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveImageIndex(index)}
                              className={`h-2.5 w-2.5 rounded-full transition ${
                                activeImageIndex === index
                                  ? 'bg-white'
                                  : 'bg-white/50'
                              }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {imageList.length > 1 && (
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {imageList.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`overflow-hidden rounded-2xl border-2 transition ${
                            activeImageIndex === index
                              ? 'border-orange-500'
                              : 'border-transparent hover:border-orange-200'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${selectedItem.title} thumbnail ${index + 1}`}
                            className="h-20 w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                    Design Details
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {selectedItem.title}
                  </h2>

                  <p className="mt-4 text-gray-600 leading-7">
                    {selectedItem.desc}
                  </p>

                  {selectedItem.details?.length > 0 && (
                    <div className="mt-6 rounded-2xl bg-orange-50 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                        What makes it special
                      </h3>

                      <ul className="mt-4 space-y-3 text-sm text-gray-700">
                        {selectedItem.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm">
                              ✔
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      onClick={handleAddToCart}
                      className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={buyNowLink}
                      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                    >
                      Buy Now
                    </Link>

                    <Link
                      to={inquiryLink}
                      className="inline-flex items-center justify-center rounded-full border border-orange-300 bg-white px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
                    >
                      {inquiryText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceTemplate