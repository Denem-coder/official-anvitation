import { useState } from 'react'
import { createOrder } from '../firebase/orders'
import { useCart } from '../context/CartContext'

export default function CheckoutForm() {
  const [loading, setLoading] = useState(false)

  const { clearCart } = useCart()

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    facebook: '',
    foundUs: '',
    eventDate: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const cartItems =
        JSON.parse(localStorage.getItem('cart')) || []

      let orderSummary = ''

      cartItems.forEach((item, index) => {
        orderSummary += `
${index + 1}. ${item.name || item.title}
Quantity: ${item.quantity}
Price: ₱${Number(item.price || 0).toLocaleString()}
------------------------
`
      })

      // SAVE TO FIRESTORE / ADMIN DASHBOARD
      const result = await createOrder({
        ...formData,
        items: cartItems,
        status: 'Pending',
      })

      if (!result.success) {
        alert('Failed to save order.')
        setLoading(false)
        return
      }

      // MESSAGE FOR MESSENGER
      const message = `
NEW ORDER - ANVITATION

ORDER NUMBER
------------------------
${result.orderNumber}

ORDER SUMMARY
------------------------
${orderSummary}

Please review my order details. Thank you!
`

      // COPY TO CLIPBOARD
      await navigator.clipboard.writeText(message)

      // SHOW POPUP INSTRUCTION
      alert(
        'Order submitted successfully!\n\nOrder summary has been copied.\n\nPlease paste the message in Messenger and send it to continue.'
      )

      // DETECT DEVICE
      const isMobile = /iPhone|iPad|iPod|Android/i.test(
        navigator.userAgent
      )

      // OPEN MESSENGER
      const messengerURL = isMobile
        ? 'https://www.m.me/61563452485945'
        : 'https://www.facebook.com/messages/t/61563452485945'

      window.open(messengerURL, '_blank')

      // CLEAR CART
      clearCart()

      // REDIRECT TO SUCCESS PAGE
      setTimeout(() => {
        window.location.href = `/order-success?order=${result.orderNumber}`
      }, 1500)

    } catch (error) {
      console.log(error)

      alert('Something went wrong while submitting your order.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Order
          </h1>

          <p className="mt-2 text-gray-600">
            Please fill out your information to continue your order.
          </p>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>

          {/* CUSTOMER INFORMATION */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Customer Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                name="customerName"
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="rounded-xl border p-3 outline-none focus:border-orange-500"
                required
              />

              <input
                name="phone"
                onChange={handleChange}
                type="text"
                placeholder="Mobile Number"
                className="rounded-xl border p-3 outline-none focus:border-orange-500"
                required
              />

              <input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="rounded-xl border p-3 outline-none focus:border-orange-500"
              />

              <input
                name="facebook"
                onChange={handleChange}
                type="text"
                placeholder="Facebook Name (Optional)"
                className="rounded-xl border p-3 outline-none focus:border-orange-500"
              />

            </div>
          </section>

          {/* EVENT DATE */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Event Information
            </h2>

            <input
              name="eventDate"
              onChange={handleChange}
              type="date"
              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
              required
            />
          </section>

          {/* HOW DID YOU FIND US */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              How Did You Find Us?
            </h2>

            <select
              name="foundUs"
              onChange={handleChange}
              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
            >
              <option value="">Select an option</option>
              <option>Facebook Page</option>
              <option>Facebook Ads</option>
              <option>TikTok</option>
              <option>Instagram</option>
              <option>Google Search</option>
              <option>Friend Referral</option>
              <option>Existing Customer</option>
              <option>Other</option>
            </select>
          </section>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-70"
          >
            {loading ? 'Submitting Order...' : 'Continue to Messenger'}
          </button>

        </form>
      </div>
    </div>
  )
}