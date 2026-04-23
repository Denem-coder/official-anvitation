import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import BackButton from '../../components/BackButton'
import { useCart } from '../../context/CartContext'

function PackageTemplate({
  category,
  title,
  subtitle,
  designsCatalog = [],
  products = [],
  addOns = [],
  packages = [],
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const { cart, addToCart, updateCartItem } = useCart()

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  const designSlug = params.get('design')
  const selectedColor = params.get('color')
  const qtyParam = params.get('qty')
  const addOnsParam = params.get('addons')
  const editItemId = params.get('editItemId')
  const selectedInsertId = params.get('insert')

  const selectedDesign =
    designsCatalog.find((item) => item.slug === designSlug) || null

  const selectedProduct = products[0] || null

  const [orderMode, setOrderMode] = useState('product')
  const [quantity, setQuantity] = useState(1)
  const [addOnQuantities, setAddOnQuantities] = useState({})
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [toast, setToast] = useState({
    show: false,
    message: '',
  })
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const browseDesignsLink = useMemo(() => {
    const baseLink =
      location.pathname.replace('/packages/', '/designs/') || '/designs'
    const nextParams = new URLSearchParams()

    if (editItemId) {
      nextParams.set('editItemId', editItemId)
    }

    return nextParams.toString()
      ? `${baseLink}?${nextParams.toString()}`
      : baseLink
  }, [location.pathname, editItemId])

  useEffect(() => {
    if (!toast.show) return

    const timer = setTimeout(() => {
      setToast({ show: false, message: '' })
    }, 2200)

    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowHelpModal(false)
        setPreviewImage(null)
      }
    }

    if (showHelpModal || previewImage) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showHelpModal, previewImage])

  useEffect(() => {
    const parsedQty = Math.max(1, parseInt(qtyParam || '1', 10) || 1)
    setQuantity(parsedQty)

    if (!addOnsParam) {
      setAddOnQuantities({})
      return
    }

    const parsedAddOns = {}

    addOnsParam.split(',').forEach((pair) => {
      const [id, rawQty] = pair.split(':')
      const parsedAddOnQty = Math.max(0, parseInt(rawQty || '0', 10) || 0)

      if (id && parsedAddOnQty > 0) {
        parsedAddOns[id] = parsedAddOnQty
      }
    })

    setAddOnQuantities(parsedAddOns)
  }, [qtyParam, addOnsParam])

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

  const getAddOnQuantity = (id) => {
    return Math.max(0, Number(addOnQuantities[id]) || 0)
  }

  const decreaseAddOnQuantity = (id) => {
    setAddOnQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (Number(prev[id]) || 0) - 1),
    }))
  }

  const increaseAddOnQuantity = (id) => {
    setAddOnQuantities((prev) => ({
      ...prev,
      [id]: (Number(prev[id]) || 0) + 1,
    }))
  }

  const handleAddOnQuantityChange = (id, value) => {
    const qty = parseInt(value, 10)
    setAddOnQuantities((prev) => ({
      ...prev,
      [id]: Number.isNaN(qty) ? 0 : Math.max(0, qty),
    }))
  }

  const clearAllAddOns = () => {
    setAddOnQuantities({})
  }

  const selectedAddOns = addOns
    .map((addOn) => {
      const qty = Math.max(0, Number(addOnQuantities[addOn.id]) || 0)

      if (qty < 1) return null

      return {
        id: addOn.id,
        name: addOn.name,
        price: Number(addOn.price),
        quantity: qty,
        unit: addOn.unit || 'pc',
        description: addOn.description || addOn.subtitle || '',
        image: addOn.image || null,
        subtotal: Number(addOn.price) * qty,
      }
    })
    .filter(Boolean)

  const addOnsTotal = selectedAddOns.reduce(
    (total, item) => total + item.subtotal,
    0
  )

  const safeQuantity = Math.max(1, Number(quantity) || 1)

  const mainProductTotal =
    orderMode === 'product' && selectedProduct
      ? Number(selectedProduct.price || 0) * safeQuantity
      : 0

  const packageTotal =
    orderMode === 'package' ? Number(selectedPackage?.price || 0) : 0

  const currentBuilderTotal = mainProductTotal + packageTotal + addOnsTotal

  const cartSubtotal = cart.reduce((total, item) => {
    return total + (Number(item.price) || 0) * (Number(item.quantity) || 1)
  }, 0)

  const overallDisplayedTotal = editItemId
    ? currentBuilderTotal
    : cartSubtotal + currentBuilderTotal

  const selectedAddOnsSummary = addOns.filter(
    (item) => getAddOnQuantity(item.id) > 0
  )

  const hasSelectedAddOns = selectedAddOnsSummary.length > 0

  const canAddToCart =
    selectedDesign &&
    ((orderMode === 'product' && selectedProduct) ||
      (orderMode === 'package' && selectedPackage))

  const choosePackage = (pkg) => {
    setSelectedPackage((prev) => (prev?.id === pkg.id ? null : pkg))
  }

  const handleAddToCart = () => {
    if (!selectedDesign || !canAddToCart) return

    const cartItem = {
      id:
        editItemId ||
        `${selectedDesign.slug}-${selectedColor || 'default'}-${orderMode}-${Date.now()}`,
      type: orderMode === 'package' ? 'package-order' : 'product-order',
      category,
      title:
        orderMode === 'package'
          ? `${selectedDesign.title} - ${selectedPackage.name}`
          : `${selectedDesign.title} - ${selectedProduct.name}`,
      desc:
        orderMode === 'package'
          ? selectedPackage?.subtitle || ''
          : selectedProduct?.description || selectedProduct?.subtitle || '',
      price: currentBuilderTotal,
      basePrice:
        orderMode === 'package'
          ? Number(selectedPackage?.price || 0)
          : Number(selectedProduct?.price || 0),
      quantity: orderMode === 'package' ? 1 : safeQuantity,
      unit: selectedProduct?.unit || 'set',
      designTitle: selectedDesign.title,
      designSlug: selectedDesign.slug,
      selectedColor: selectedColor || '',
      selectedInsertId: selectedInsertId || '',
      image:
        selectedDesign.cover ||
        selectedDesign.images?.[0] ||
        selectedDesign.img ||
        null,

      orderMode,

      productName: orderMode === 'product' ? selectedProduct?.name || '' : '',
      productId: orderMode === 'product' ? selectedProduct?.id || '' : '',
      mainProductTotal,

      selectedPackage:
        orderMode === 'package' && selectedPackage
          ? {
              id: selectedPackage.id,
              name: selectedPackage.name,
              title: selectedPackage.title,
              subtitle: selectedPackage.subtitle,
              price: Number(selectedPackage.price),
              features: selectedPackage.features || [],
            }
          : null,
      packageName: orderMode === 'package' ? selectedPackage?.name || '' : '',
      packageTotal,

      selectedAddOns,
      addOnsTotal,
    }

    if (editItemId) {
      updateCartItem(editItemId, cartItem)
      navigate('/cart')
      return
    }

    addToCart(cartItem)

    if (orderMode === 'package') {
      showToast(
        `${selectedPackage.name}${
          selectedAddOns.length > 0
            ? ` with ${selectedAddOns.length} extra${
                selectedAddOns.length > 1 ? 's' : ''
              }`
            : ''
        } added to cart`
      )
    } else {
      showToast(
        `${safeQuantity} ${selectedProduct.unit || 'set'} of ${selectedProduct.name}${
          selectedAddOns.length > 0
            ? ` with ${selectedAddOns.length} extra${
                selectedAddOns.length > 1 ? 's' : ''
              }`
            : ''
        } added to cart`
      )
    }
  }

  const isMobileDevice =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  const messengerLink = isMobileDevice
    ? 'https://m.me/ANv8e?text=Hi%20I%20need%20help%20choosing%20a%20design'
    : 'https://www.facebook.com/messages/t/ANv8e'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-28 md:pb-16">
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

      {previewImage && (
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70 px-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-gray-700 shadow-lg"
              aria-label="Close preview"
            >
              ×
            </button>

            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className="max-h-[80vh] w-full rounded-[1.5rem] bg-white object-contain"
            />
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
              We can help you choose the right design, quantity, extras, or package
              based on your event and budget.
            </p>

            <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-left">
              <p className="text-sm font-semibold text-gray-900">
                We can assist you with:
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Choosing the best design for your event theme</li>
                <li>• Picking the right motif or color</li>
                <li>• Recommending the best order option for your budget</li>
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 items-start">
            <div className="min-w-0">
              <div className="mb-8 rounded-[2rem] border border-orange-100 bg-white p-4 md:p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[180px_1fr] xl:items-start">
                  <div>
                    <img
                      src={
                        selectedDesign.cover ||
                        selectedDesign.images?.[0] ||
                        selectedDesign.img
                      }
                      alt={selectedDesign.title}
                      className="h-44 w-full rounded-2xl object-cover"
                    />
                  </div>

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

                    {selectedInsertId && (
                      <p className="mt-2 text-sm text-gray-700">
                        Selected insert:{' '}
                        <span className="font-semibold text-orange-500">
                          {selectedInsertId}
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
                </div>
              </div>

              <div className="mb-8 rounded-[2rem] border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                    Step 1
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    Choose How You Want to Order
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Pick one option so your order stays clear and easy to understand.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setOrderMode('product')}
                    className={`rounded-[1.5rem] border p-5 text-left transition ${
                      orderMode === 'product'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    <p className="text-lg font-bold text-gray-900">Build My Own</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Choose your quantity and add only the extras you need.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderMode('package')}
                    className={`rounded-[1.5rem] border p-5 text-left transition ${
                      orderMode === 'package'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    <p className="text-lg font-bold text-gray-900">Package Deal</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Choose a ready-made bundle for a faster and easier order.
                    </p>
                  </button>
                </div>
              </div>

              {orderMode === 'product' && selectedProduct && (
                <div className="mb-8 rounded-[2rem] border border-orange-100 bg-white p-4 md:p-6 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                        Step 2
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900">
                        Build Your Own Order
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Set your quantity, then add optional extras below.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-orange-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Price Per {selectedProduct.unit || 'Set'}
                      </p>
                      <p className="mt-1 text-xl font-bold text-orange-500">
                        ₱{Number(selectedProduct.price).toLocaleString()}
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
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="h-10 w-20 rounded-lg border border-gray-300 bg-white px-2 text-center text-sm text-gray-700 outline-none transition focus:border-orange-400"
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

              {orderMode === 'package' && packages.length > 0 && (
                <div className="mb-8 overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className="flex flex-col items-center justify-center border-b border-gray-200 bg-gradient-to-b from-orange-50 to-white p-8 text-center lg:border-b-0 lg:border-r">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                        Step 2
                      </p>

                      <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
                        Choose a Package
                      </h2>

                      <p className="mt-4 text-sm leading-7 text-gray-600">
                        Pick one ready-made bundle that fits your event and budget.
                      </p>
                    </div>

                    {packages.map((pkg) => {
                      const isSelectedPackage = selectedPackage?.id === pkg.id

                      return (
                        <div
                          key={pkg.id}
                          className={`relative p-8 ${
                            pkg.id !== packages[packages.length - 1]?.id
                              ? 'border-b border-gray-200 lg:border-b-0 lg:border-r'
                              : ''
                          } ${
                            isSelectedPackage
                              ? 'bg-orange-100/70'
                              : pkg.highlight
                              ? 'bg-orange-50/70'
                              : 'bg-white'
                          }`}
                        >
                          {pkg.highlight && !isSelectedPackage && (
                            <span className="absolute right-6 top-6 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                              Popular
                            </span>
                          )}

                          {isSelectedPackage && (
                            <span className="absolute right-6 top-6 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                              Selected
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
                              type="button"
                              onClick={() => choosePackage(pkg)}
                              className={`mt-5 inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                                isSelectedPackage
                                  ? 'bg-gray-900 text-white hover:bg-black'
                                  : pkg.highlight
                                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                                  : 'bg-gray-900 text-white hover:bg-black'
                              }`}
                            >
                              {isSelectedPackage ? 'Selected' : 'Choose Package'}
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
                      )
                    })}
                  </div>
                </div>
              )}

              {addOns.length > 0 && (
                <div className="mb-8 overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-sm">
                  <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white px-4 py-5 md:px-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                          Step 3
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-gray-900">
                          Optional Extras
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm text-gray-600">
                          Add extra items only if you want to include them in this order.
                        </p>
                      </div>

                      {hasSelectedAddOns && (
                        <button
                          type="button"
                          onClick={clearAllAddOns}
                          className="hidden rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 sm:inline-flex"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto px-4 py-6 md:px-6">
                    <div className="flex gap-4 pb-2">
                      {addOns.map((addOn) => {
                        const addOnQty = getAddOnQuantity(addOn.id)
                        const addOnImage =
                          addOn.image ||
                          selectedDesign.cover ||
                          selectedDesign.images?.[0] ||
                          selectedDesign.img

                        return (
                          <div
                            key={addOn.id}
                            className="flex w-[220px] min-w-[220px] flex-shrink-0 flex-col rounded-[1.25rem] border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewImage({
                                  src: addOnImage,
                                  alt: addOn.name,
                                })
                              }
                              className="group block overflow-hidden rounded-xl"
                            >
                              <img
                                src={addOnImage}
                                alt={addOn.name}
                                className="h-28 w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                              />
                            </button>

                            <div className="mt-3">
                              <p className="line-clamp-1 text-base font-bold text-gray-900">
                                {addOn.name}
                              </p>

                              <p className="mt-1 text-lg font-bold text-orange-500">
                                ₱{Number(addOn.price).toLocaleString()}
                                <span className="ml-1 text-xs font-medium text-gray-500">
                                  / {addOn.unit || 'pc'}
                                </span>
                              </p>

                              <button
                                type="button"
                                onClick={() =>
                                  setPreviewImage({
                                    src: addOnImage,
                                    alt: addOn.name,
                                  })
                                }
                                className="mt-1 text-xs font-medium text-orange-500 hover:text-orange-600"
                              >
                                View larger preview
                              </button>
                            </div>

                            <div className="mt-3 flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => decreaseAddOnQuantity(addOn.id)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-base font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                              >
                                −
                              </button>

                              <input
                                type="number"
                                min="0"
                                value={addOnQty}
                                onChange={(e) =>
                                  handleAddOnQuantityChange(addOn.id, e.target.value)
                                }
                                className="h-9 w-14 rounded-lg border border-gray-300 bg-white px-2 text-center text-sm text-gray-700 outline-none transition focus:border-orange-400"
                              />

                              <button
                                type="button"
                                onClick={() => increaseAddOnQuantity(addOn.id)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-base font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                              >
                                +
                              </button>
                            </div>

                            <div className="mt-3 rounded-xl bg-orange-50 px-3 py-2 text-center">
                              <p className="text-xs text-gray-500">Selected</p>
                              <p className="text-sm font-semibold text-orange-500">
                                {addOnQty > 0
                                  ? `₱${(Number(addOn.price) * addOnQty).toLocaleString()}`
                                  : 'Not added'}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
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

            <aside className="hidden lg:block self-start sticky top-32">
              <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50 p-4 shadow-sm">
                <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50 p-4 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                    Order Summary
                  </p>

                  <p className="mt-3 text-2xl font-bold text-orange-500">
                    ₱{overallDisplayedTotal.toLocaleString()}
                  </p>

                  <div className="mt-4 rounded-xl bg-white/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Current Selection
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Order Type:</span>{' '}
                        {orderMode === 'product' ? 'Build My Own' : 'Package Deal'}
                      </p>

                      {orderMode === 'product' && selectedProduct && (
                        <>
                          <p>
                            <span className="font-medium">Product:</span>{' '}
                            {selectedProduct.name}
                          </p>
                          <p>
                            <span className="font-medium">Quantity:</span> {quantity}
                          </p>
                          <p>
                            <span className="font-medium">Product Total:</span> ₱
                            {mainProductTotal.toLocaleString()}
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

                      {hasSelectedAddOns && (
                        <p>
                          <span className="font-medium">Extras:</span> ₱
                          {addOnsTotal.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>
                      Current selection:{' '}
                      <span className="font-semibold text-gray-900">
                        ₱{currentBuilderTotal.toLocaleString()}
                      </span>
                    </p>

                    {!editItemId && cartSubtotal > 0 && (
                      <p>
                        Already in cart:{' '}
                        <span className="font-semibold text-gray-900">
                          ₱{cartSubtotal.toLocaleString()}
                        </span>
                      </p>
                    )}

                    <p className="text-base">
                      Overall total:{' '}
                      <span className="font-bold text-orange-500">
                        ₱{overallDisplayedTotal.toLocaleString()}
                      </span>
                    </p>
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
                    {editItemId ? 'Update Cart' : 'Add to Cart'}
                  </button>

                  {!canAddToCart && (
                    <p className="mt-2 text-center text-xs text-gray-500">
                      Complete your selection first.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* <div className="mt-12 text-center lg:hidden">
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="inline-block rounded-full border border-orange-300 bg-white px-7 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
          >
            Need Help Choosing?
          </button>
        </div> */}
      </div>

      {selectedDesign && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500">
                {editItemId ? 'Updating Order' : 'Overall Total'}
              </p>

              <p className="truncate text-lg font-bold text-gray-900">
                ₱{overallDisplayedTotal.toLocaleString()}
              </p>

              <p className="text-xs text-gray-500">
                {orderMode === 'product'
                  ? `Build My Own • Qty: ${quantity}`
                  : selectedPackage
                  ? 'Package Deal • Package selected'
                  : 'Package Deal'}
                {hasSelectedAddOns
                  ? ` • ${selectedAddOnsSummary.length} extra${
                      selectedAddOnsSummary.length > 1 ? 's' : ''
                    }`
                  : ''}
              </p>
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
              {editItemId ? 'Update Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PackageTemplate