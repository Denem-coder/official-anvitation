import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function SouvenirsTemplate({
  title,
  subtitle,
  products = [],
  showBackButton = false,
}) {
  const navigate = useNavigate()

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedDesign, setSelectedDesign] = useState(null)

  const openModal = (product) => {
    setSelectedProduct(product)
    setSelectedImage(product.image)
    setSelectedColor(product.colors?.[0] || '')
    setSelectedDesign(null)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setSelectedImage(null)
    setSelectedColor('')
    setSelectedDesign(null)
  }

  const handleNextOrderDetails = () => {
    if (!selectedProduct) return

    const needsDesign = selectedProduct.designs?.length > 0

    if (needsDesign && !selectedDesign) return

    const params = new URLSearchParams({
      souvenir: selectedProduct.id,
    })

    if (selectedDesign?.id) {
      params.set('design', selectedDesign.id)
    }

    if (selectedColor) {
      params.set('color', selectedColor)
    }

    navigate(`/packages/souvenir?${params.toString()}`)
  }

  const needsDesign = selectedProduct?.designs?.length > 0
  const canProceed = selectedProduct && (!needsDesign || selectedDesign)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="mx-auto max-w-7xl">
        {showBackButton && (
          <div className="mb-6">
            <BackButton />
          </div>
        )}

        {/* HERO */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => openModal(item)}
                className="block w-full text-left"
              >
                {item.bestSeller && (
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white shadow">
                    Best Seller
                  </span>
                )}

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                    {item.description}
                  </p>

                  <p className="mt-2 text-sm font-bold text-orange-600">
                    ₱{item.price} / {item.unit}
                  </p>

                  {item.minQty && (
                    <p className="mt-1 text-[10px] text-gray-400">
                      Minimum: {item.minQty} pcs
                    </p>
                  )}

                  <div className="mt-3 w-full rounded-xl bg-orange-500 py-2 text-center text-sm font-semibold text-white transition group-hover:bg-orange-600">
                    View Details
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Need help choosing?
          </h3>

          <p className="mt-2 text-gray-600">
            Message us and we’ll recommend the best souvenirs for your event.
          </p>
        </div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-orange-50 hover:text-orange-500"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="overflow-y-auto p-4 pb-28 md:p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* LEFT IMAGE */}
                <div>
                  <div className="overflow-hidden rounded-2xl bg-orange-50">
                    <img
                      src={selectedImage || selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-72 w-full object-cover md:h-[420px]"
                    />
                  </div>

                  {selectedProduct.gallery?.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {selectedProduct.gallery.map((img, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setSelectedImage(img)}
                          className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition ${
                            selectedImage === img
                              ? 'border-orange-500 ring-2 ring-orange-200'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${selectedProduct.name} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT CONTENT */}
                <div>
                  {selectedProduct.bestSeller && (
                    <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                      Best Seller
                    </span>
                  )}

                  <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {selectedProduct.description}
                  </p>

                  <p className="mt-4 text-xl font-bold text-orange-600">
                    ₱{selectedProduct.price} / {selectedProduct.unit}
                  </p>

                  {selectedProduct.minQty && (
                    <p className="mt-1 text-sm text-gray-500">
                      Minimum order: {selectedProduct.minQty} pcs
                    </p>
                  )}

                  {/* COLORS */}
                  {selectedProduct.colors?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900">
                        Choose motif / color
                      </h4>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color) => (
                          <button
                            type="button"
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              selectedColor === color
                                ? 'border-orange-500 bg-orange-500 text-white'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DESIGNS */}
                  {selectedProduct.designs?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900">
                        Choose souvenir design
                      </h4>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {selectedProduct.designs.map((design) => (
                          <button
                            type="button"
                            key={design.id}
                            onClick={() => {
                              setSelectedDesign(design)
                              setSelectedImage(design.image)
                            }}
                            className={`rounded-xl border bg-white p-2 text-left transition ${
                              selectedDesign?.id === design.id
                                ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-100'
                                : 'border-gray-100 hover:border-orange-300 hover:bg-orange-50'
                            }`}
                          >
                            <img
                              src={design.image}
                              alt={design.name}
                              className="h-24 w-full rounded-lg object-cover"
                            />

                            <p className="mt-2 text-xs font-semibold text-gray-900">
                              {design.name}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BOTTOM BUTTON */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 p-4 backdrop-blur">
              <button
                type="button"
                onClick={handleNextOrderDetails}
                disabled={!canProceed}
                className={`w-full rounded-2xl px-5 py-3 font-bold shadow-md transition ${
                  canProceed
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'cursor-not-allowed bg-gray-200 text-gray-500'
                }`}
              >
                {needsDesign && !selectedDesign
                  ? 'Choose a Design First'
                  : 'Next: Order Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SouvenirsTemplate