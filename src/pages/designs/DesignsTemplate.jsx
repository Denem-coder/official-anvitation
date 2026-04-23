import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../../components/BackButton'

import weddingInsertDesignsData from '../../data/inserts/weddingInsertDesignsData'

const insertDesignsData = [...weddingInsertDesignsData]

function DesignsTemplate({
  badge,
  title,
  subtitle,
  designs = [],
  packageLink,
  primaryCtaText = 'View Packages',
  inquiryText = 'Need Help?',
}) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [showHelpModal, setShowHelpModal] = useState(false)

  const [selectedInsert, setSelectedInsert] = useState(null)

  const [showInsertPreviewModal, setShowInsertPreviewModal] = useState(false)
  const [previewInsert, setPreviewInsert] = useState(null)
  const [activeInsertPageIndex, setActiveInsertPageIndex] = useState(0)

  const [insertScrollProgress, setInsertScrollProgress] = useState(0)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const insertTouchStartX = useRef(0)
  const insertTouchEndX = useRef(0)

  const sliderRef = useRef(null)
  const insertCardRefs = useRef({})
  const insertSectionRef = useRef(null)
  const insertThumbsRef = useRef(null)

  const message = encodeURIComponent('Hi I need help choosing a design')
  const isMobileDevice =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  const messengerLink = isMobileDevice
    ? `https://m.me/ANv8e?text=${message}`
    : 'https://www.facebook.com/messages/t/ANv8e'

  const normalizeColorValue = (color) => {
    if (!color) return ''
    if (typeof color === 'string') return color.trim().toLowerCase()
    if (typeof color === 'object' && color.value) {
      return String(color.value).trim().toLowerCase()
    }
    return ''
  }

  const getColorLabel = (color) => {
    if (!color) return ''
    if (typeof color === 'string') return color
    if (typeof color === 'object' && color.label) return color.label
    if (typeof color === 'object' && color.value) return color.value
    return ''
  }

  const normalizedColors = useMemo(() => {
    if (!selectedItem?.colors?.length) return []

    return selectedItem.colors
      .map((color) => ({
        value: normalizeColorValue(color),
        label: getColorLabel(color),
      }))
      .filter((color) => color.value && color.label)
  }, [selectedItem])

  const selectedColorObj = useMemo(() => {
    return normalizedColors.find((color) => color.value === selectedColor) || null
  }, [normalizedColors, selectedColor])

  const normalizedColorImages = useMemo(() => {
    if (!selectedItem?.colorImages) return {}

    return Object.entries(selectedItem.colorImages).reduce((acc, [key, value]) => {
      acc[String(key).trim().toLowerCase()] = value
      return acc
    }, {})
  }, [selectedItem])

  const imageList = useMemo(() => {
    if (!selectedItem) return []

    if (
      selectedColor &&
      normalizedColorImages &&
      normalizedColorImages[selectedColor]?.length > 0
    ) {
      return normalizedColorImages[selectedColor]
    }

    if (selectedItem.images?.length > 0) {
      return selectedItem.images
    }

    return [selectedItem.cover || selectedItem.img].filter(Boolean)
  }, [selectedItem, selectedColor, normalizedColorImages])

  const currentImage = imageList[activeImageIndex] || ''

  const filteredInsertDesigns = useMemo(() => {
    return insertDesignsData.filter((item) => {
      if (!selectedItem || !selectedColor) return false

      const matchesCategory =
        item.category?.toLowerCase() === selectedItem.category?.toLowerCase()

      const matchesDesign =
        item.designSlug === 'all' || item.designSlug === selectedItem.slug

      const matchesMotif =
        item.motif?.toLowerCase() === selectedColor

      return matchesCategory && matchesDesign && matchesMotif && item.isActive
    })
  }, [selectedItem, selectedColor])

  const insertPageEntries = useMemo(() => {
    if (!previewInsert?.pages) return []

    const orderedPages = [
      { key: 'front', label: 'Front', src: previewInsert.pages.front },
      { key: 'inside', label: 'Inside', src: previewInsert.pages.inside },
      { key: 'third', label: 'Third', src: previewInsert.pages.third },
      { key: 'back', label: 'Back', src: previewInsert.pages.back },
    ]

    return orderedPages.filter((page) => Boolean(page.src))
  }, [previewInsert])

  const currentInsertPage = insertPageEntries[activeInsertPageIndex]?.src || ''

  const finalBuyLink =
    selectedItem?.slug && selectedColor && selectedInsert
      ? `${packageLink}?design=${encodeURIComponent(
          selectedItem.slug
        )}&color=${encodeURIComponent(
          selectedColor
        )}&insert=${encodeURIComponent(selectedInsert.id)}`
      : '#'

  const updateInsertScrollProgress = () => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    const maxScroll = scrollWidth - clientWidth

    if (maxScroll <= 0) {
      setInsertScrollProgress(0)
      return
    }

    setInsertScrollProgress(scrollLeft / maxScroll)
  }

  useEffect(() => {
    document.body.style.overflow =
      selectedItem || showHelpModal || showInsertPreviewModal ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedItem, showHelpModal, showInsertPreviewModal])

  useEffect(() => {
    setActiveImageIndex(0)
    setSelectedInsert(null)
  }, [selectedColor])

  useEffect(() => {
    if (!selectedColor || !insertSectionRef.current) return

    const timer = setTimeout(() => {
      insertSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 150)

    return () => clearTimeout(timer)
  }, [selectedColor])

  useEffect(() => {
    if (!selectedInsert || !sliderRef.current) return
    const card = insertCardRefs.current[selectedInsert.id]
    if (!card) return

    card.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [selectedInsert])

  useEffect(() => {
    if (!showInsertPreviewModal || !insertThumbsRef.current) return
    const activeThumb = insertThumbsRef.current.querySelector(
      `[data-insert-thumb="${activeInsertPageIndex}"]`
    )
    activeThumb?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeInsertPageIndex, showInsertPreviewModal])

  useEffect(() => {
    if (!selectedItem && !showHelpModal && !showInsertPreviewModal) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showInsertPreviewModal) {
          closeInsertPreview()
          return
        }
        if (showHelpModal) {
          setShowHelpModal(false)
          return
        }
        if (selectedItem) {
          closeModal()
        }
      }

      if (showInsertPreviewModal) {
        if (e.key === 'ArrowRight') nextInsertPage()
        if (e.key === 'ArrowLeft') prevInsertPage()
        return
      }

      if (!imageList.length || imageList.length <= 1) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedItem, showHelpModal, showInsertPreviewModal, imageList, activeInsertPageIndex])

  useEffect(() => {
    const handleResize = () => updateInsertScrollProgress()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      updateInsertScrollProgress()
    }, 100)

    return () => clearTimeout(timer)
  }, [filteredInsertDesigns, selectedColor, selectedItem])

  const openModal = (item) => {
    setSelectedItem(item)
    setActiveImageIndex(0)
    setSelectedColor('')
    setSelectedInsert(null)
    setPreviewInsert(null)
    setActiveInsertPageIndex(0)
    setShowInsertPreviewModal(false)
    setInsertScrollProgress(0)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setActiveImageIndex(0)
    setSelectedColor('')
    setSelectedInsert(null)
    setPreviewInsert(null)
    setActiveInsertPageIndex(0)
    setShowInsertPreviewModal(false)
    setInsertScrollProgress(0)
  }

  const nextImage = () => {
    if (!imageList.length) return
    setActiveImageIndex((prev) => (prev + 1) % imageList.length)
  }

  const prevImage = () => {
    if (!imageList.length) return
    setActiveImageIndex((prev) =>
      prev === 0 ? imageList.length - 1 : prev - 1
    )
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const distance = touchStartX.current - touchEndX.current
    if (Math.abs(distance) < 50) return
    if (distance > 0) nextImage()
    else prevImage()
  }

  const openInsertPreview = (item) => {
    setPreviewInsert(item)
    setActiveInsertPageIndex(0)
    setShowInsertPreviewModal(true)
  }

  const closeInsertPreview = () => {
    setPreviewInsert(null)
    setActiveInsertPageIndex(0)
    setShowInsertPreviewModal(false)
  }

  const nextInsertPage = () => {
    if (!insertPageEntries.length) return
    setActiveInsertPageIndex((prev) => (prev + 1) % insertPageEntries.length)
  }

  const prevInsertPage = () => {
    if (!insertPageEntries.length) return
    setActiveInsertPageIndex((prev) =>
      prev === 0 ? insertPageEntries.length - 1 : prev - 1
    )
  }

  const handleInsertTouchStart = (e) => {
    insertTouchStartX.current = e.changedTouches[0].clientX
  }

  const handleInsertTouchEnd = (e) => {
    insertTouchEndX.current = e.changedTouches[0].clientX
    const distance = insertTouchStartX.current - insertTouchEndX.current
    if (Math.abs(distance) < 50) return
    if (distance > 0) nextInsertPage()
    else prevInsertPage()
  }

  const handleSelectInsert = (item) => {
    setSelectedInsert(item)
  }

  const scrollInsertSlider = (direction) => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    })

    setTimeout(() => {
      updateInsertScrollProgress()
    }, 350)
  }

  const scrollInsertThumbs = (direction) => {
    if (!insertThumbsRef.current) return
    insertThumbsRef.current.scrollBy({
      left: direction === 'left' ? -220 : 220,
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-16">
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
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {designs.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md transition duration-300"
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
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-900 md:text-base">
                      {item.title}
                    </p>

                    {item.price && (
                      <p className="mt-2 text-xl font-bold text-orange-500">
                        ₱{Number(item.price).toLocaleString()}
                        <span className="ml-2 text-sm text-gray-500">/ set</span>
                      </p>
                    )}

                    <p className="text-[12px] font-normal italic text-gray-500 md:text-xs">
                      {item.micro}
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

        <section className="mt-16 rounded-[2rem] bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Interested in this service?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
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

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="rounded-full border border-orange-300 bg-white px-7 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
            >
              {inquiryText}
            </button>
          </div>
        </section>

        {showHelpModal && (
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm sm:px-6 md:px-10"
            onClick={() => setShowHelpModal(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowHelpModal(false)}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                aria-label="Close modal"
              >
                ✕
              </button>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Need Help?
              </p>
              <h3 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
                Need help choosing a design?
              </h3>
              <p className="mt-4 leading-7 text-gray-600">
                Message us on Messenger and we’ll help you choose the best design,
                motif, and option based on your event, style, and budget.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={messengerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowHelpModal(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Message Us on Messenger
                </a>

                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-orange-300 bg-white px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedItem && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm sm:px-6 md:px-10"
            onClick={closeModal}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-gray-50 p-4 sm:p-5 lg:p-6">
                    <div
                      className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-sm"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <img
                        src={currentImage}
                        alt={selectedItem.title}
                        className="h-[280px] w-full select-none object-cover sm:h-[360px] lg:h-[520px]"
                        draggable="false"
                      />

                      {imageList.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                            aria-label="Previous image"
                          >
                            ‹
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                            aria-label="Next image"
                          >
                            ›
                          </button>

                          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
                            {imageList.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setActiveImageIndex(index)}
                                className={`h-2.5 w-2.5 rounded-full transition ${
                                  activeImageIndex === index ? 'bg-white' : 'bg-white/50'
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
                              loading="lazy"
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

                    {selectedItem.price && (
                      <p className="mt-3 text-2xl font-bold text-orange-500">
                        ₱{Number(selectedItem.price).toLocaleString()}
                        <span className="ml-2 text-sm text-gray-500">/ set</span>
                      </p>
                    )}

                    <p className="mt-4 leading-7 text-gray-600">
                      {selectedItem.desc}
                    </p>

                    {selectedItem.inclusions?.length > 0 && (
                      <div className="mt-6 rounded-2xl bg-orange-50 p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                          Each Set Includes:
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-700">
                          {selectedItem.inclusions.map((detail, index) => (
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

                    {selectedItem.colors?.length > 0 && (
                      <div className="mt-6">
                        <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.20em] text-orange-500">
                          Pick Your Motif
                        </label>

                        <select
                          value={selectedColor}
                          onChange={(e) => {
                            setSelectedColor(e.target.value)
                            setSelectedInsert(null)
                          }}
                          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-orange-400"
                        >
                          <option value="">Select a motif</option>
                          {normalizedColors.map((color) => (
                            <option key={color.value} value={color.value}>
                              {color.label}
                            </option>
                          ))}
                        </select>

                        {!selectedColor && (
                          <p className="mt-2 text-sm text-orange-500">
                            Please choose a color first before proceeding.
                          </p>
                        )}

                        {selectedColorObj && (
                          <p className="mt-2 text-sm text-gray-600">
                            Selected motif:{' '}
                            <span className="font-semibold text-orange-500">
                              {selectedColorObj.label}
                            </span>
                          </p>
                        )}
                      </div>
                    )}

                    {selectedInsert && (
                      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                        <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                          Selected Insert
                        </p>
                        <p className="mt-2 text-sm text-gray-700">
                          {selectedInsert.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedColor && (
                  <div
                    ref={insertSectionRef}
                    className="mt-6 border-t border-gray-200 p-6 pt-6 opacity-0 animate-[fadeSlideIn_.5s_ease-out_forwards] sm:p-8 lg:p-10"
                  >
                    <style>
                      {`
                        @keyframes fadeSlideIn {
                          from { opacity: 0; transform: translateY(16px); }
                          to { opacity: 1; transform: translateY(0); }
                        }
                      `}
                    </style>

                    <div className="relative">
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="mb-2 block text-sm font-semibold uppercase tracking-[0.20em] text-orange-500">
                            Choose Insert Design
                          </p>

                          <p className="mt-2 text-gray-600">
                            Tap a card to select it. Use the button to view all insert
                            details.
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-500">
                          <span className="text-base">↔</span>
                          <span>Swipe to browse</span>
                        </div>
                      </div>

                      {filteredInsertDesigns.length === 0 ? (
                        <div className="mt-6 rounded-2xl bg-gray-50 p-6 text-center">
                          <p className="text-gray-600">
                            No insert designs available yet for this motif.
                          </p>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => scrollInsertSlider('left')}
                            className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500 lg:inline-flex"
                            aria-label="Scroll inserts left"
                          >
                            ‹
                          </button>

                          <button
                            type="button"
                            onClick={() => scrollInsertSlider('right')}
                            className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500 lg:inline-flex"
                            aria-label="Scroll inserts right"
                          >
                            ›
                          </button>

                          <div className="relative mt-4">
                            <div
                              ref={sliderRef}
                              onScroll={updateInsertScrollProgress}
                              className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                              style={{ scrollBehavior: 'smooth' }}
                            >
                              <div className="flex gap-4 px-1 snap-x snap-mandatory">
                                {filteredInsertDesigns.map((item) => {
                                  const isSelected = selectedInsert?.id === item.id

                                  return (
                                    <button
                                      key={item.id}
                                      type="button"
                                      ref={(el) => {
                                        insertCardRefs.current[item.id] = el
                                      }}
                                      onClick={() => handleSelectInsert(item)}
                                      className={`relative min-w-[260px] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border-2 bg-white text-left transition-all duration-300 sm:min-w-[300px] sm:max-w-[300px] ${
                                        isSelected
                                          ? 'border-orange-500 bg-orange-50'
                                          : 'border-gray-200 hover:border-orange-300'
                                      }`}
                                    >
                                      {isSelected && (
                                        <span className="absolute right-3 top-3 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                                          Selected
                                        </span>
                                      )}

                                      <img
                                        src={item.cover}
                                        alt={item.title}
                                        className="h-40 w-full object-cover"
                                        loading="lazy"
                                      />

                                      <div className="p-4">
                                        <h4 className="text-base font-semibold text-gray-900">
                                          {item.title}
                                        </h4>

                                        {item.desc && (
                                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                                            {item.desc}
                                          </p>
                                        )}

                                        <div className="mt-4 flex flex-col gap-2">
                                          <span
                                            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                              isSelected
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}
                                          >
                                            {isSelected
                                              ? 'Selected Design'
                                              : 'Tap card to select'}
                                          </span>

                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              openInsertPreview(item)
                                            }}
                                            className="inline-flex items-center justify-center rounded-full border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-50"
                                          >
                                            View Full Details
                                          </button>
                                        </div>
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            <div className="mt-4 flex justify-center">
                              <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
                                <div
                                  className="absolute top-0 h-1.5 rounded-full bg-orange-400 transition-all duration-200"
                                  style={{
                                    width: '40%',
                                    left: `${insertScrollProgress * 60}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      to={finalBuyLink}
                      onClick={(e) => {
                        if (!selectedInsert) e.preventDefault()
                      }}
                      className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition ${
                        selectedInsert
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'cursor-not-allowed bg-gray-200 text-gray-500'
                      }`}
                    >
                      {selectedInsert ? 'Next: Order Details' : 'Choose an Insert First'}
                    </Link>

                    <button
                      type="button"
                      onClick={() => setShowHelpModal(true)}
                      className="inline-flex items-center justify-center rounded-full border border-orange-300 bg-white px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
                    >
                      {inquiryText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showInsertPreviewModal && previewInsert && (
          <div
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm sm:px-6 md:px-10"
            onClick={closeInsertPreview}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeInsertPreview}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                aria-label="Close insert preview modal"
              >
                ✕
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
                  <div className="bg-gray-50 p-4 sm:p-5 lg:p-6">
                    <div
                      className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-sm"
                      onTouchStart={handleInsertTouchStart}
                      onTouchEnd={handleInsertTouchEnd}
                    >
                      <img
                        src={currentInsertPage || previewInsert.cover}
                        alt={`${previewInsert.title} - ${insertPageEntries[activeInsertPageIndex]?.label || 'Preview'}`}
                        className="h-[280px] w-full select-none object-cover sm:h-[360px] lg:h-[420px]"
                        draggable="false"
                      />

                      {insertPageEntries.length > 1 && (
                        <>
                          <button
                            onClick={prevInsertPage}
                            className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                            aria-label="Previous insert page"
                          >
                            ‹
                          </button>
                          <button
                            onClick={nextInsertPage}
                            className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
                            aria-label="Next insert page"
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>

                    {insertPageEntries.length > 0 && (
                      <div className="relative mt-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                            Swipe thumbnails
                          </p>
                          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-500">
                            <span className="text-sm">↔</span>
                            <span>Browse pages</span>
                          </div>
                        </div>

                        {insertPageEntries.length > 2 && (
                          <>
                            <button
                              type="button"
                              onClick={() => scrollInsertThumbs('left')}
                              className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500 md:inline-flex"
                              aria-label="Scroll insert thumbnails left"
                            >
                              ‹
                            </button>

                            <button
                              type="button"
                              onClick={() => scrollInsertThumbs('right')}
                              className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500 md:inline-flex"
                              aria-label="Scroll insert thumbnails right"
                            >
                              ›
                            </button>
                          </>
                        )}

                        <div
                          ref={insertThumbsRef}
                          className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                          style={{ scrollBehavior: 'smooth' }}
                        >
                          <div className="flex gap-3 px-1">
                            {insertPageEntries.map((page, index) => (
                              <button
                                key={page.key}
                                type="button"
                                data-insert-thumb={index}
                                onClick={() => setActiveInsertPageIndex(index)}
                                className={`min-w-[120px] overflow-hidden rounded-2xl border-2 bg-white text-left transition ${
                                  activeInsertPageIndex === index
                                    ? 'border-orange-500 shadow-md'
                                    : 'border-transparent hover:border-orange-200'
                                }`}
                              >
                                <img
                                  src={page.src}
                                  alt={`${previewInsert.title} - ${page.label}`}
                                  className="h-24 w-full object-cover"
                                  loading="lazy"
                                />
                                <div className="px-3 py-2">
                                  <p className="text-xs font-semibold text-gray-900">
                                    {page.label}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                      Insert Details
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {previewInsert.title}
                    </h3>

                    {previewInsert.desc && (
                      <p className="mt-4 leading-7 text-gray-600">
                        {previewInsert.desc}
                      </p>
                    )}

                    {insertPageEntries.length > 0 && (
                      <div className="mt-8 rounded-2xl bg-orange-50 p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                          Current Page
                        </h4>
                        <p className="mt-2 text-sm text-gray-700">
                          {insertPageEntries[activeInsertPageIndex]?.label || 'Preview'}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Swipe the big image or tap any thumbnail below it to change the preview.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedInsert(previewInsert)
                        setShowInsertPreviewModal(false)
                      }}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                    >
                      Select This Insert
                    </button>

                    <button
                      type="button"
                      onClick={closeInsertPreview}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-orange-300 bg-white px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
                    >
                      Back
                    </button>
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

export default DesignsTemplate