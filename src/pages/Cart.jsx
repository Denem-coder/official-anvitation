import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cart,
    totalItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  const cartSubtotal = cart.reduce(
    (total, item) => total + (Number(item.price) || 0) * item.quantity,
    0
  )

  const handleMessengerCheckout = () => {
    if (cart.length === 0) return

    const orderList = cart
      .map((item, index) => {
        const itemPrice = Number(item.price) || 0
        const itemSubtotal = itemPrice * item.quantity

        return `${index + 1}. ${item.title}
Quantity: ${item.quantity}
Price: ₱${itemPrice.toLocaleString()}
Subtotal: ₱${itemSubtotal.toLocaleString()}`
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
    <div className="min-h-screen bg-orange-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => {
                const itemPrice = Number(item.price) || 0
                const itemSubtotal = itemPrice * item.quantity

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md p-5 flex gap-4"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    )}

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>

                      {item.desc && (
                        <p className="text-gray-600 mb-2 text-sm">{item.desc}</p>
                      )}

                      <div className="space-y-1 mb-4">
                        <p className="text-gray-700 text-sm">
                          Price:{' '}
                          <span className="font-semibold text-orange-500">
                            ₱{itemPrice.toLocaleString()}
                          </span>
                        </p>

                        <p className="text-gray-700 text-sm">
                          Subtotal:{' '}
                          <span className="font-semibold text-orange-600">
                            ₱{itemSubtotal.toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 font-bold hover:bg-orange-200 transition"
                          >
                            -
                          </button>

                          <span className="font-semibold text-lg min-w-[30px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 font-medium hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md p-5 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Total Items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>

              <div className="flex justify-between text-xl font-bold text-orange-600 border-t pt-3">
                <span>Cart Total</span>
                <span>₱{cartSubtotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-6 mb-4 text-center">
              You’ll be redirected to Messenger.
              <br />
              Just click <span className="font-semibold text-orange-500">Send</span> to confirm your order.
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleMessengerCheckout}
                className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold w-full shadow-lg hover:scale-105 hover:bg-orange-600 transition"
              >
                Checkout via Messenger
              </button>

              <button
                onClick={clearCart}
                className="bg-white border border-orange-500 text-orange-500 px-6 py-3 rounded-full font-semibold w-full hover:bg-orange-50 transition"
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