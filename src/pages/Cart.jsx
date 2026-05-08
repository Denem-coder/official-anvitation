import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cart,
    totalItems,
    increaseQuantity,
    decreaseQuantity,
    increaseAddOnQuantity,
    decreaseAddOnQuantity,
    removeAddOn,
    removeFromCart,
    clearCart,
  } = useCart()

  const getItemLineTotal = (item) => {
    const addOnsTotal = (item.selectedAddOns || []).reduce(
      (total, addOn) =>
        total +
        (Number(addOn.price) || 0) * (Number(addOn.quantity) || 0),
      0
    )

    if (item.orderMode === 'package') {
      return Number(item.packageTotal || item.unitPrice || item.price || 0) + addOnsTotal
    }

    return (
      (Number(item.unitPrice) || 0) * (Number(item.quantity) || 1) +
      addOnsTotal
    )
  }

  const cartSubtotal = cart.reduce(
    (total, item) => total + getItemLineTotal(item),
    0
  )

  const buildEditOrderLink = (item) => {
    const basePath = `/packages/${item.category || 'wedding'}`
    const params = new URLSearchParams()

    if (item.designSlug) params.set('design', item.designSlug)
    if (item.selectedColor) params.set('color', item.selectedColor)
    if (item.quantity) params.set('qty', String(item.quantity))
    if (item.selectedInsertId) params.set('insert', item.selectedInsertId)
    if (item.orderMode !== 'package' && item.unitPrice) {
      params.set('price', String(item.unitPrice))
    }

    if (item.selectedAddOns?.length > 0) {
      const encodedAddOns = item.selectedAddOns
        .filter((addOn) => Number(addOn.quantity) > 0)
        .map((addOn) => `${addOn.id}:${addOn.quantity}`)
        .join(',')

      if (encodedAddOns) params.set('addons', encodedAddOns)
    }

    params.set('editItemId', item.id)

    return `${basePath}?${params.toString()}`
  }

  const handleMessengerCheckout = () => {
    if (cart.length === 0) return

    const orderList = cart
      .map((item, index) => {
        const itemLineTotal = getItemLineTotal(item)

        const orderTypeText =
          item.orderMode === 'package'
            ? `Package: ${item.packageName || item.selectedPackage?.name || 'Package Order'}`
            : `Product: ${item.productName || 'Build My Own'}`

        const addOnsText =
          item.selectedAddOns?.length > 0
            ? `\nAdd-ons:\n${item.selectedAddOns
                .map((addOn) => `- ${addOn.name} x${addOn.quantity}`)
                .join('\n')}`
            : ''

        return `${index + 1}. ${item.title}
${item.selectedColor ? `Motif/Color: ${item.selectedColor}\n` : ''}${orderTypeText}
Quantity: ${item.quantity}${addOnsText}
Total: ₱${itemLineTotal.toLocaleString()}`
      })
      .join('\n\n')

    const message = encodeURIComponent(
      `Hello! I would like to place an order:\n\n${orderList}\n\nTotal Items: ${totalItems}\nCart Total: ₱${cartSubtotal.toLocaleString()}\n\nPlease send me the details. Thank you!`
    )

    window.open(
      `https://www.facebook.com/messages/t/61563452485945?text=${message}`,
      '_blank'
    )
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 pt-28 pb-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="rounded-[2rem] bg-white px-6 py-12 text-center shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              Cart
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-600">
              Looks like you haven’t added any item yet. Browse our products and choose
              the one that fits your event.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/designs"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Start Ordering
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-orange-300 bg-white px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => {
                const itemLineTotal = getItemLineTotal(item)
                const orderTypeText =
                  item.orderMode === 'package'
                    ? item.packageName || item.selectedPackage?.name || 'Package Order'
                    : item.productName || 'Build My Own'

                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-md sm:flex-row"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-28 w-full flex-shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>

                          {item.selectedColor && (
                            <p className="mt-1 text-sm text-gray-700">
                              Motif/Color:{' '}
                              <span className="font-semibold text-orange-500">
                                {item.selectedColor}
                              </span>
                            </p>
                          )}

                          <p className="mt-1 text-sm text-gray-700">
                            {item.orderMode === 'package' ? 'Package' : 'Product'}:{' '}
                            <span className="font-semibold text-orange-500">
                              {orderTypeText}
                            </span>
                          </p>

                          {item.orderMode !== 'package' && (
                            <p className="mt-1 text-sm text-gray-700">
                              Quantity:{' '}
                              <span className="font-semibold text-orange-500">
                                {item.quantity}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className="rounded-xl bg-orange-50 px-4 py-3 text-left md:text-right">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Total
                          </p>
                          <p className="text-xl font-bold text-orange-600">
                            ₱{itemLineTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {item.selectedAddOns?.length > 0 && (
                        <div className="mt-4 rounded-xl bg-orange-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                            Add-ons
                          </p>

                          <div className="mt-2 space-y-2">
                            {item.selectedAddOns.map((addOn) => {
                              const addOnQty = Number(addOn.quantity) || 0

                              return (
                                <div
                                  key={addOn.id}
                                  className="flex flex-col gap-2 rounded-lg bg-white p-2 sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">
                                      {addOn.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Qty: {addOnQty}
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() =>
                                          decreaseAddOnQuantity(item.id, addOn.id)
                                        }
                                        className="h-8 w-8 rounded-full bg-orange-100 font-bold text-orange-600 transition hover:bg-orange-200"
                                      >
                                        -
                                      </button>

                                      <span className="min-w-[24px] text-center text-sm font-semibold">
                                        {addOnQty}
                                      </span>

                                      <button
                                        onClick={() =>
                                          increaseAddOnQuantity(item.id, addOn.id)
                                        }
                                        className="h-8 w-8 rounded-full bg-orange-500 font-bold text-white transition hover:bg-orange-600"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <button
                                      onClick={() => removeAddOn(item.id, addOn.id)}
                                      className="text-xs font-medium text-red-500 hover:underline"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        {item.orderMode !== 'package' ? (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="h-9 w-9 rounded-full bg-orange-100 font-bold text-orange-600 transition hover:bg-orange-200"
                            >
                              -
                            </button>

                            <span className="min-w-[30px] text-center text-lg font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="h-9 w-9 rounded-full bg-orange-500 font-bold text-white transition hover:bg-orange-600"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-gray-500">
                            Package quantity is fixed.
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={buildEditOrderLink(item)}
                            className="rounded-full border border-orange-500 bg-white px-4 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-50"
                          >
                            Edit Order
                          </Link>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow-md">
              <div className="flex justify-between text-xl font-bold text-orange-600">
                <span>Total</span>
                <span>₱{cartSubtotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="mb-4 mt-6 text-center text-sm text-gray-600">
              You’ll be redirected to Messenger.
              <br />
              Just click{' '}
              <span className="font-semibold text-orange-500">Send</span>{' '}
              to confirm your order.
            </p>

            <div className="mt-6 flex flex-col gap-4 md:flex-row">
              <button
                onClick={handleMessengerCheckout}
                className="w-full rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-orange-600"
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full rounded-full border border-orange-500 bg-white px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart