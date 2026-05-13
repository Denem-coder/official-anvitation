import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { useCart } from '../../context/CartContext'
import souvenirsData from '../../data/souvenirsData'

function SouvenirPackageTemplate({ title, subtitle, packages = [] }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { cart, addToCart } = useCart()

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  const souvenirId = params.get('souvenir')
  const designId = params.get('design')
  const selectedColor = params.get('color')

  const selectedSouvenir =
    souvenirsData.find((item) => String(item.id) === String(souvenirId)) || null

  const selectedDesign =
    selectedSouvenir?.designs?.find(
      (d) => String(d.id) === String(designId)
    ) || null

  const selectedVariant = null

  const activePrice = Number(
    selectedVariant?.price ?? selectedSouvenir?.price ?? 0
  )

  const activeUnit = selectedVariant?.unit || selectedSouvenir?.unit || 'pc'

  const activeMinQty =
    selectedVariant?.minQty || selectedSouvenir?.minQty || 1

  const filteredPackages = useMemo(() => {
    if (!selectedVariant) return packages

    return packages.filter((pkg) => {
      if (!pkg.variantIds || pkg.variantIds.length === 0) return true

      return pkg.variantIds
        .map((id) => String(id).trim().toLowerCase())
        .includes(selectedVariant.id.toLowerCase())
    })
  }, [packages, selectedVariant])

  const [orderMode, setOrderMode] = useState('product')
  const [quantity, setQuantity] = useState(activeMinQty)
  const [selectedPackage, setSelectedPackage] = useState(null)

  const safeQuantity = Math.max(activeMinQty, Number(quantity) || activeMinQty)

  const productTotal =
    selectedSouvenir && orderMode === 'product'
      ? activePrice * safeQuantity
      : 0

  const packageTotal =
    selectedSouvenir && orderMode === 'package'
      ? Number(selectedPackage?.price || 0)
      : 0

  const currentTotal = productTotal + packageTotal

  const cartSubtotal = cart.reduce((total, item) => {
    return total + (Number(item.price) || 0) * (Number(item.quantity) || 1)
  }, 0)

  const overallTotal = cartSubtotal + currentTotal

  if (!selectedSouvenir) return

  if (activePrice <= 0) {
    console.warn('Invalid price detected')
    return
  }

  const canAddToCart =
    selectedSouvenir &&
    (orderMode === 'product' ||
      (orderMode === 'package' && selectedPackage))

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(activeMinQty, Number(prev) - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => Number(prev) + 1)
  }

  const handleQuantityChange = (value) => {
    const qty = parseInt(value, 10)
    setQuantity(Number.isNaN(qty) ? activeMinQty : Math.max(activeMinQty, qty))
  }

  const choosePackage = (pkg) => {
      setSelectedPackage((prev) => (prev?.id === pkg.id ? null : pkg))
    }

    const handleAddToCart = () => {
    if (!canAddToCart) return

    const displayName = selectedVariant?.name || selectedSouvenir.name
    const displayImage = selectedVariant?.image || selectedSouvenir.image

    const unitPrice =
      orderMode === 'package'
        ? Number(selectedPackage?.price || 0)
        : activePrice

    const quantity = orderMode === 'package' ? 1 : safeQuantity

    const cartItem = {
      id: `${selectedSouvenir.id}-${selectedVariant?.id || 'default'}-${
        selectedColor || 'default'
      }-${orderMode}-${Date.now()}`,

      type:
        orderMode === 'package'
          ? 'souvenir-package-order'
          : 'souvenir-product-order',

      category: 'souvenir',

      title:
        orderMode === 'package'
          ? `${displayName} - ${selectedPackage.name}`
          : displayName,

      desc:
        orderMode === 'package'
          ? selectedPackage.subtitle || ''
          : selectedVariant?.description ||
            selectedSouvenir.description ||
            '',

      unitPrice, // ✅ IMPORTANT FIX

      quantity,

      price: unitPrice * quantity, // ✅ THIS is what CartContext expects

      unit: activeUnit,
      image: displayImage,
      orderMode,

      souvenirId: selectedSouvenir.id,
      souvenirName: selectedSouvenir.name,

      selectedVariant: selectedVariant
        ? {
            id: selectedVariant.id,
            name: selectedVariant.name,
            image: selectedVariant.image,
            description: selectedVariant.description || '',
            price: activePrice,
            unit: activeUnit,
            minQty: activeMinQty,
          }
        : null,

      selectedColor: selectedColor || '',

      selectedPackage:
        orderMode === 'package' && selectedPackage
          ? {
              id: selectedPackage.id,
              name: selectedPackage.name,
              subtitle: selectedPackage.subtitle,
              price: Number(selectedPackage.price),
              features: selectedPackage.features || [],
            }
          : null,
    }

    addToCart(cartItem)
    navigate('/cart')

    console.log('CART ITEM:', cartItem)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-28 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mb-12 mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Souvenir
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {subtitle}
          </p>
        </div>

        {!selectedSouvenir && (
          <div className="mb-10 rounded-[2rem] border border-orange-200 bg-orange-50 p-6 text-center shadow-sm">
            <p className="text-lg font-semibold text-orange-600">
              Pick a souvenir first before ordering.
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Choose a souvenir item first so we can prepare your order details.
            </p>

            <Link
              to="/souvenirs/designs"
              className="mt-5 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Souvenirs
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            {selectedSouvenir && (
              <div className="mb-8 rounded-[2rem] border border-orange-100 bg-white p-4 shadow-sm md:p-6">
                <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                  <img
                    src={selectedVariant?.image || selectedSouvenir.image}
                    alt={selectedVariant?.name || selectedSouvenir.name}
                    className="h-44 w-full rounded-2xl object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                      Selected Souvenir
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                      {selectedVariant?.name || selectedSouvenir.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-700">
                      <span className="font-medium">Category:</span>{' '}
                      {selectedSouvenir.name}
                    </p>

                    {selectedDesign && (
                      <p className="mt-1 text-sm text-gray-700">
                        <span className="font-medium">Design:</span>{' '}
                        {selectedDesign.name}
                      </p>
                    )}

                    {selectedColor && (
                      <p className="mt-1 text-sm text-gray-700">
                        <span className="font-medium">Motif:</span>{' '}
                        {selectedColor}
                      </p>
                    )}

                    <p className="mt-3 text-gray-600">
                      {selectedVariant?.description ||
                        selectedSouvenir.description}
                    </p>

                    <p className="mt-3 font-bold text-orange-600">
                      ₱{activePrice.toLocaleString()} / {activeUnit}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Minimum order: {activeMinQty} pcs
                    </p>

                    <Link
                      to="/souvenirs/designs"
                      className="mt-5 inline-block rounded-full border border-orange-300 bg-white px-5 py-2.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
                    >
                      Change Souvenir
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8 rounded-[2rem] border border-gray-200 bg-white p-4 shadow-sm md:p-6">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Step 1
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  Choose How You Want to Order
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Order per piece or choose a ready-made souvenir package.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setOrderMode('product')
                    setSelectedPackage(null)
                  }}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    orderMode === 'product'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <p className="text-lg font-bold text-gray-900">
                    Build My Own
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Choose your own quantity based on your event needs.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOrderMode('package')
                    setSelectedPackage(null)
                  }}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    orderMode === 'package'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <p className="text-lg font-bold text-gray-900">
                    Package Deal
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Choose a ready-made bundle for easier ordering.
                  </p>
                </button>
              </div>
            </div>

            {orderMode === 'product' && selectedSouvenir && (
              <div className="mb-8 rounded-[2rem] border border-orange-100 bg-white p-4 shadow-sm md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                      Step 2
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      Set Quantity
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      Choose how many pieces you want to order.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-orange-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Price Per {activeUnit}
                    </p>

                    <p className="mt-1 text-xl font-bold text-orange-500">
                      ₱{activePrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-lg font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min={activeMinQty}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="h-10 w-24 rounded-lg border border-gray-300 px-2 text-center text-sm outline-none focus:border-orange-400"
                  />

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-lg font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {orderMode === 'package' && selectedSouvenir && (
              <div className="mb-8 overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white px-4 py-5 md:px-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                    Step 2
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    Choose a Package
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    Pick one souvenir package that fits your selected style.
                  </p>
                </div>

                {filteredPackages.length > 0 ? (
                  <div className="grid gap-4 p-4 md:grid-cols-3 md:p-6">
                    {filteredPackages.map((pkg) => {
                      const isSelected = selectedPackage?.id === pkg.id

                      return (
                        <button
                          type="button"
                          key={pkg.id}
                          onClick={() => choosePackage(pkg)}
                          className={`rounded-[1.5rem] border p-5 text-left transition ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 bg-white hover:border-orange-300'
                          }`}
                        >
                          <p className="text-2xl font-bold text-orange-500">
                            ₱{Number(pkg.price).toLocaleString()}
                          </p>

                          <h4 className="mt-2 text-lg font-bold text-gray-900">
                            {pkg.name}
                          </h4>

                          <p className="mt-1 text-sm text-gray-500">
                            {pkg.subtitle}
                          </p>

                          <div className="mt-4 space-y-2 text-sm text-gray-700">
                            {pkg.features?.map((feature, index) => (
                              <p key={index}>✔ {feature}</p>
                            ))}
                          </div>

                          <span
                            className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                              isSelected
                                ? 'bg-gray-900 text-white'
                                : 'bg-orange-500 text-white'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Choose Package'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="font-semibold text-orange-600">
                      No package available for this selected style yet.
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      You can still use Build My Own or choose another souvenir style.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="hidden self-start lg:sticky lg:top-32 lg:block">
            <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50 p-4 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Order Summary
              </p>

              <p className="mt-3 text-2xl font-bold text-orange-500">
                ₱{overallTotal.toLocaleString()}
              </p>

              <div className="mt-4 rounded-xl bg-white/80 p-3 text-sm text-gray-700">
                {!selectedSouvenir ? (
                  <p className="font-medium text-orange-500">
                    Choose a souvenir first.
                  </p>
                ) : (
                  <>
                    <p>
                      <span className="font-medium">Souvenir:</span>{' '}
                      {selectedSouvenir.name}
                    </p>

                    {selectedDesign && (
                      <p>
                        <span className="font-medium">Design:</span>{' '}
                        {selectedDesign.name}
                      </p>
                    )}

                    {selectedColor && (
                      <p>
                        <span className="font-medium">Motif:</span>{' '}
                        {selectedColor}
                      </p>
                    )}

                    <p>
                      <span className="font-medium">Order Type:</span>{' '}
                      {orderMode === 'product'
                        ? 'Build My Own'
                        : 'Package Deal'}
                    </p>

                    {orderMode === 'product' && (
                      <>
                        <p>
                          <span className="font-medium">Quantity:</span>{' '}
                          {safeQuantity}
                        </p>

                        <p>
                          <span className="font-medium">Current Total:</span> ₱
                          {productTotal.toLocaleString()}
                        </p>
                      </>
                    )}

                    {orderMode === 'package' && selectedPackage && (
                      <>
                        <p>
                          <span className="font-medium">Package:</span>{' '}
                          {selectedPackage.name}
                        </p>

                        <p>
                          <span className="font-medium">Package Total:</span> ₱
                          {packageTotal.toLocaleString()}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                  canAddToCart
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'cursor-not-allowed bg-gray-200 text-gray-500'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500">
              Overall Total
            </p>

            <p className="truncate text-lg font-bold text-gray-900">
              ₱{overallTotal.toLocaleString()}
            </p>

            {selectedSouvenir && (
              <p className="truncate text-xs text-gray-500">
                {selectedVariant?.name || selectedSouvenir.name}
                {selectedColor ? ` • ${selectedColor}` : ''}
                {orderMode === 'product'
                  ? ` • Qty: ${safeQuantity}`
                  : selectedPackage
                  ? ` • ${selectedPackage.name}`
                  : ' • Package Deal'}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className={`inline-flex shrink-0 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
              canAddToCart
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'cursor-not-allowed bg-gray-200 text-gray-500'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default SouvenirPackageTemplate