import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const handleMessengerCheckout = () => {
    if (cart.length === 0) return

    const orderList = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.title} - Quantity: ${item.quantity}`
      )
      .join('\n')

    const message = encodeURIComponent(
      `Hello! I would like to place an order:\n\n${orderList}\n\nTotal Items: ${totalItems}\n\nPlease send me the details. Thank you!`
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
              {cart.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl shadow-md p-5"
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.title)}
                        className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 font-bold hover:bg-orange-200"
                      >
                        -
                      </button>

                      <span className="font-semibold text-lg min-w-[30px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.title)}
                        className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.title)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right font-semibold text-lg">
              Total Items: {totalItems}
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