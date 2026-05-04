import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BackButton from '../components/BackButton'

import wedding1 from '../assets/img/gallery-img/wedding-invitation-1.png'
import wedding2 from '../assets/img/gallery-img/wedding-invitation-2.png'
import wedding3 from '../assets/img/gallery-img/wedding-invitation-3.png'
import wedding5 from '../assets/img/gallery-img/wedding-invitation-5.png'
import wedding6 from '../assets/img/gallery-img/wedding-invitation-6.png'
import wedding7 from '../assets/img/gallery-img/wedding-invitation-7.png'
import wedding8 from '../assets/img/gallery-img/wedding-invitation-8.png'
import wedding9 from '../assets/img/gallery-img/wedding-invitation-9.png'
import wedding10 from '../assets/img/gallery-img/wedding-invitation-10.png'

import birthday1 from '../assets/img/gallery-img/birthday-invitation-1.png'
import birthday2 from '../assets/img/gallery-img/birthday-invitation-2.png'

import baptismal1 from '../assets/img/gallery-img/baptismal-invitation-1.png'
import baptismal2 from '../assets/img/gallery-img/baptismal-invitation-2.png'
import baptismal3 from '../assets/img/gallery-img/baptismal-invitation-3.png'

import souvenir1 from '../assets/img/gallery-img/souvenir-1.png'
import souvenir2 from '../assets/img/gallery-img/souvenir-2.png'
import souvenir3 from '../assets/img/gallery-img/souvenir-3.png'

import debut1 from '../assets/img/gallery-img/scroll-invitation-1.jpg'

function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const activeCategory = searchParams.get('category') || 'all'

  const galleryItems = [
    {
      id: 1,
      src: wedding1,
      images: [wedding1],
      title: 'Blue Passport-esque Invitation',
      category: 'wedding',
    },
    {
      id: 2,
      src: wedding2,
      images: [wedding2],
      title: 'Elegant Black Flap Invitation',
      category: 'wedding',
    },
    {
      id: 3,
      src: wedding3,
      images: [wedding3],
      title: 'Blue and White Fan Invitation',
      category: 'wedding',
    },
    {
      id: 4,
      src: wedding5,
      images: [wedding5],
      title: 'Sage Green Traditional Invitation',
      category: 'wedding',
    },
    {
      id: 5,
      src: wedding6,
      images: [wedding6],
      title: 'Sage Green Trifold Invitation',
      category: 'wedding',
    },
    {
      id: 6,
      src: wedding7,
      images: [wedding7],
      title: 'Blue Glittery Pull-out Invitation',
      category: 'wedding',
    },
    {
      id: 7,
      src: wedding8,
      images: [wedding8],
      title: 'Blue Traditional Invitation',
      category: 'wedding',
    },
    {
      id: 8,
      src: wedding9,
      images: [wedding9],
      title: 'Rustic Pull-out Invitation',
      category: 'wedding',
    },
    {
      id: 9,
      src: wedding10,
      images: [wedding10],
      title: 'Rustic Pull-out Invitation',
      category: 'wedding',
    },

    {
      id: 10,
      src: birthday1,
      images: [birthday1],
      title: 'Birthday Invitation 1',
      category: 'birthday',
    },
    {
      id: 11,
      src: birthday2,
      images: [birthday2],
      title: 'Birthday Invitation 2',
      category: 'birthday',
    },

    {
      id: 12,
      src: baptismal1,
      images: [baptismal1],
      title: 'Baptismal Invitation 1',
      category: 'baptismal',
    },
    {
      id: 13,
      src: baptismal2,
      images: [baptismal2],
      title: 'Baptismal Invitation 2',
      category: 'baptismal',
    },
    {
      id: 14,
      src: baptismal3,
      images: [baptismal3],
      title: 'Baptismal Invitation 3',
      category: 'baptismal',
    },

    {
      id: 15,
      src: souvenir1,
      images: [souvenir1],
      title: 'Souvenir Sample 1',
      category: 'souvenir',
    },
    {
      id: 16,
      src: souvenir2,
      images: [souvenir2],
      title: 'Souvenir Sample 2',
      category: 'souvenir',
    },
    {
      id: 17,
      src: souvenir3,
      images: [souvenir3],
      title: 'Souvenir Sample 3',
      category: 'souvenir',
    },

    {
      id: 18,
      src: debut1,
      images: [debut1],
      title: 'Gold and Blue Scroll Invitation',
      category: 'debut',
    },
  ]

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'debut', label: 'Debut' },
    { value: 'baptismal', label: 'Baptismal' },
    { value: 'souvenir', label: 'Souvenirs' },
  ]

  const getCategoryLabel = (value) => {
    return categories.find((item) => item.value === value)?.label || value
  }

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSearchParams({})
      return
    }

    setSearchParams({ category })
  }

  const openProjectModal = (item) => {
    setSelectedProject(item)
    setActiveImageIndex(0)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
    setActiveImageIndex(0)
  }

  const selectedImages = selectedProject?.images?.length
    ? selectedProject.images
    : selectedProject
      ? [selectedProject.src]
      : []

  const activeImage = selectedImages[activeImageIndex]

  const nextImage = () => {
    if (!selectedImages.length) return
    setActiveImageIndex((prev) => (prev + 1) % selectedImages.length)
  }

  const prevImage = () => {
    if (!selectedImages.length) return
    setActiveImageIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    )
  }

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16">
        <BackButton />

        <div className="mt-6 mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Our Gallery
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Browse some of our invitation and souvenir designs. Find the style
            that matches your event and get inspired for your own order.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategoryChange(category.value)}
              className={`rounded-full px-5 py-2 font-medium transition ${
                activeCategory === category.value
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'border border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">
              No gallery items available for this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openProjectModal(item)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm transition duration-300 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {item.images?.length > 1 && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {item.images.length} Photos
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <span className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-500">
                    {getCategoryLabel(item.category)}
                  </span>

                  <h2 className="text-sm font-semibold text-gray-800 md:text-base">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">View more photos</p>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Found a style you like?
          </h3>

          <p className="mt-2 text-gray-600">
            Send us your preferred design peg and we’ll help customize it for your event.
          </p>

          <Link
            to="/#contact"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600"
          >
            Inquire Now
          </Link>
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4"
          onClick={closeProjectModal}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeProjectModal}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="grid max-h-[90vh] grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_340px]">
              <div className="relative flex items-center justify-center bg-gray-100 p-4">
                <img
                  src={activeImage}
                  alt={selectedProject.title}
                  className="max-h-[75vh] w-full rounded-2xl bg-white object-contain"
                />

                {selectedImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                      aria-label="Previous image"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 md:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                  {getCategoryLabel(selectedProject.category)}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {selectedProject.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Photo {activeImageIndex + 1} of {selectedImages.length}
                </p>

                {selectedImages.length > 1 && (
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {selectedImages.map((img, index) => (
                      <button
                        key={`${selectedProject.id}-thumb-${index}`}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`overflow-hidden rounded-xl border-2 transition ${
                          activeImageIndex === index
                            ? 'border-orange-500'
                            : 'border-transparent hover:border-orange-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${selectedProject.title} thumbnail ${index + 1}`}
                          className="h-24 w-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-orange-50 p-4">
                  <p className="text-sm text-gray-700">
                    Like this project? Message us and we can help customize a
                    similar style for your event.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeProjectModal}
                  className="mt-5 w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage