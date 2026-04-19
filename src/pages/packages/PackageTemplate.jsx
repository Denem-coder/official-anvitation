import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import { useCart } from '../../context/CartContext'

function PackageTemplate({
  category,
  title,
  subtitle,
  designsCatalog = [],
  products = [],
  packages = [],
}) {
  const location = useLocation()
  const { addToCart } = useCart()

  const params = new URLSearchParams(location.search)
  const designSlug = params.get('design')
  const selectedColor = params.get('color')

  const selectedDesign =
    designsCatalog.find((item) => item.slug === designSlug) || null

  const selectedProduct = products[0] || null

  const [quantity, setQuantity] = useState(1)
  const [toast, setToast] = useState({
    show: false,
    message: '',
  })
  const [showHelpModal, setShowHelpModal] = useState(false)

  const browseDesignsLink =
    location.pathname.replace('/packages/', '/designs/') || '/designs'

  useEffect(() => {
    if (!toast.show) return

    const timer = setTimeout(() => {
      setToast({ show: false, message: '' })
    }, 2200)

    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!showHelpModal) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowHelpModal(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showHelpModal])

  const showToast = (message) => {
    setToast({
      show: true,
      message,
    })
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, Number(prev) - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => Number(prev) + 1)
  }

  const handleQuantityChange = (value) => {
    const qty = parseInt(value, 10)
    setQuantity(Number.isNaN(qty) ? 1 : Math.max(1, qty))
  }

  const choosePackage = (pkg) => {
    if (!selectedDesign) return

    const cartItem = {
      id: `${selectedDesign.slug}-${selectedColor || 'default'}-${pkg.id}-${Date.now()}`,
      type: 'package',
      category,
      title: `${selectedDesign.title} - ${pkg.name}`,
      desc: pkg.subtitle,
      price: Number(pkg.price),
      quantity: 1,
      packageName: pkg.name,
      packageTitle: pkg.title,
      packageFeatures: pkg.features,
      designTitle: selectedDesign.title,
      designSlug: selectedDesign.slug,
      selectedColor: selectedColor || '',
      image:
        selectedDesign.cover ||
        selectedDesign.images?.[0] ||
        selectedDesign.img ||
        null,
    }

    addToCart(cartItem)
    showToast(`${pkg.name} added to cart`)
  }

  const addSingleProduct = () => {
    if (!selectedDesign || !selectedProduct) return

    const safeQuantity = Math.max(1, Number(quantity) || 1)

    const cartItem = {
      id: `${selectedDesign.slug}-${selectedColor || 'default'}-${selectedProduct.id}-${Date.now()}`,
      type: 'product',
      category,
      title: `${selectedDesign.title} - ${selectedProduct.name}`,
      desc: selectedProduct.description || selectedProduct.subtitle || '',
      price: Number(selectedProduct.price),
      quantity: safeQuantity,
      productName: selectedProduct.name,
      productId: selectedProduct.id,
      unit: selectedProduct.unit || 'set',
      designTitle: selectedDesign.title,
      designSlug: selectedDesign.slug,
      selectedColor: selectedColor || '',
      image:
        selectedDesign.cover ||
        selectedDesign.images?.[0] ||
        selectedDesign.img ||
        null,
    }

    addToCart(cartItem)
    showToast(`${safeQuantity} ${selectedProduct.unit || 'set'} of ${selectedProduct.name} added to cart`)
  }

  const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  const messengerLink = isMobileDevice
    ? 'https://m.me/ANv8e?text=Hi%20I%20need%20help%20choosing%20a%20design'
    : 'https://www.facebook.com/messages/t/ANv8e'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      {toast.show && (
        <div className="fixed left-1/2 top-24 z-[9999] -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
              ✓
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {showHelpModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
              aria-label="Close modal"
            >
              ×
            </button>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              Need Help?
            </p>

            <h3 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              Not sure which option fits your event?
            </h3>

            <p className="mt-4 text-gray-600">
              We can help you choose the right design, motif, quantity, or package
              based on your event and budget.
            </p>

            <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-left">
              <p className="text-sm font-semibold text-gray-900">
                We can assist you with:
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Choosing the best design for your event theme</li>
                <li>• Picking the right motif or color</li>
                <li>• Recommending the best package for your budget</li>
                <li>• Answering customization and order questions</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={messengerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                onClick={() => setShowHelpModal(false)}
              >
                Message Us on Messenger
              </a>

              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mb-12 mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            {category}
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">{subtitle}</p>
        </div>

        {!selectedDesign && (
          <div className="mb-10 rounded-[2rem] border border-orange-200 bg-orange-50 p-6 text-center shadow-sm">
            <p className="text-lg font-semibold text-orange-600">
              Pick a design first before ordering.
            </p>

            <p className="mt-2 text-sm text-gray-600">
              This helps us know exactly which invitation style you want for your
              order.
            </p>

            <Link
              to={browseDesignsLink}
              className="mt-5 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Designs
            </Link>
          </div>
        )}

        {selectedDesign && (
          <div className="mb-10 rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[180px_1fr_340px] xl:items-center">
              <img
                src={
                  selectedDesign.cover ||
                  selectedDesign.images?.[0] ||
                  selectedDesign.img
                }
                alt={selectedDesign.title}
                className="h-44 w-full rounded-2xl object-cover"
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                  Selected Design
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {selectedDesign.title}
                </h2>

                <p className="mt-3 text-gray-600">{selectedDesign.desc}</p>

                {selectedColor && (
                  <p className="mt-3 text-sm text-gray-700">
                    Chosen motif:{' '}
                    <span className="font-semibold text-orange-500">
                      {selectedColor}
                    </span>
                  </p>
                )}

                <div className="mt-5">
                  <Link
                    to={browseDesignsLink}
                    className="inline-block rounded-full border border-orange-300 bg-white px-5 py-2.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
                  >
                    Change Design
                  </Link>
                </div>
              </div>

              {selectedProduct && (
                <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                    Order This Design
                  </p>

                  <p className="mt-3 text-2xl font-bold text-orange-500">
                    ₱{Number(selectedProduct.price).toLocaleString()}
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      / {selectedProduct.unit || 'set'}
                    </span>
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-lg font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="h-10 w-16 rounded-lg border border-gray-300 bg-white px-2 text-center text-sm text-gray-700 outline-none transition focus:border-orange-400"
                    />

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-lg font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                    >
                      +
                    </button>

                    <button
                      onClick={addSingleProduct}
                      className="ml-auto rounded-full bg-orange-500 p-2.5 w-28 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {packages.length > 0 && (
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-4">
              <div className="border-b border-gray-200 bg-gradient-to-b from-orange-50 to-white p-8 lg:border-b-0 lg:border-r flex flex-col items-center justify-center md:flex md:flex-col md:justify-left md:align-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Optional Packages
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
                  Package Options
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600 text-center hidden md:block">
                  These are optional bundled sets in case you want a package
                  instead of ordering per product.
                </p>
              </div>

              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative p-8 ${
                    pkg.id !== packages[packages.length - 1]?.id
                      ? 'border-b border-gray-200 lg:border-b-0 lg:border-r'
                      : ''
                  } ${pkg.highlight ? 'bg-orange-50/70' : 'bg-white'}`}
                >
                  {pkg.highlight && (
                    <span className="absolute right-6 top-6 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      ₱{Number(pkg.price).toLocaleString()}
                    </h3>
                    <p className="mt-2 text-lg font-semibold text-gray-800">
                      {pkg.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{pkg.subtitle}</p>

                    <button
                      onClick={() => choosePackage(pkg)}
                      className={`mt-5 inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                        pkg.highlight
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-900 text-white hover:bg-black'
                      }`}
                    >
                      Add Package to Cart
                    </button>
                  </div>

                  <div className="mt-8 space-y-4 text-center text-sm text-gray-700">
                    {pkg.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex min-h-[52px] items-center justify-center border-b border-gray-200 pb-3"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-green-500">✔</span>
                          <span>{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="inline-block rounded-full border border-orange-300 bg-white px-7 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
          >
            Need Help Choosing?
          </button>
        </div>
      </div>
    </div>
  )
}

export default PackageTemplate