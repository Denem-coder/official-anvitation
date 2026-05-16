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
    fulfillment: '',
    recipientName: '',
    recipientPhone: '',
    address: '',
    landmark: '',
    eventDate: '',
    foundUs: '',
    notes: '',
    agreement: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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

      // CLEAR CART
      clearCart()

      // DIRECT REDIRECT TO SUCCESS PAGE
      window.location.href = `/order-success?order=${result.orderNumber}`

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
                required
              />

              <input
                name="facebook"
                onChange={handleChange}
                type="text"
                placeholder="Facebook Name"
                className="rounded-xl border p-3 outline-none focus:border-orange-500"
                required
              />

            </div>
          </section>

          {/* EVENT INFORMATION */}
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

          {/* ORDER FULFILLMENT */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Order Fulfillment
            </h2>

            <div className="space-y-4">

              <select
                name="fulfillment"
                onChange={handleChange}
                value={formData.fulfillment}
                className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
                required
              >
                <option value="">
                  Select Fulfillment Method
                </option>

                <option value="Pickup">
                  Pickup
                </option>

                <option value="Delivery">
                  Delivery
                </option>
              </select>

              {/* PICKUP ADDRESS */}
              {formData.fulfillment === 'Pickup' && (
                <div className="rounded-2xl border bg-gray-50 p-4">
                  <p className="font-medium text-gray-800">
                    Pickup Location
                  </p>

                  <p className="mt-1 text-gray-600">
                    42 Telbang, Bayambang, Pangasinan
                  </p>

                  <p className="mt-2 text-sm text-orange-600">
                    Please coordinate with us first before visiting for pickup.
                  </p>
                </div>
              )}

              {/* DELIVERY FIELDS */}
              {formData.fulfillment === 'Delivery' && (
                <div className="grid gap-4 md:grid-cols-2">

                  <input
                    name="recipientName"
                    onChange={handleChange}
                    type="text"
                    placeholder="Recipient Name"
                    className="rounded-xl border p-3 outline-none focus:border-orange-500"
                    required
                  />

                  <input
                    name="recipientPhone"
                    onChange={handleChange}
                    type="text"
                    placeholder="Recipient Contact Number"
                    className="rounded-xl border p-3 outline-none focus:border-orange-500"
                    required
                  />

                  <input
                    name="address"
                    onChange={handleChange}
                    type="text"
                    placeholder="Complete Delivery Address"
                    className="rounded-xl border p-3 outline-none focus:border-orange-500 md:col-span-2"
                    required
                  />

                  <input
                    name="landmark"
                    onChange={handleChange}
                    type="text"
                    placeholder="Landmark"
                    className="rounded-xl border p-3 outline-none focus:border-orange-500 md:col-span-2"
                    required
                  />

                </div>
              )}

            </div>
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
              required
            >
              <option value="">
                Select an option
              </option>

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

          {/* ADDITIONAL NOTES */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Additional Notes
            </h2>

            <textarea
              name="notes"
              onChange={handleChange}
              rows="4"
              placeholder="Enter additional instructions (optional)"
              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
            />
          </section>

          {/* AGREEMENT */}
          <section className="rounded-2xl border bg-orange-50 p-5">

            <label className="flex items-start gap-3 cursor-pointer">

              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
                className="mt-1 h-5 w-5"
              />

              <span className="text-sm text-gray-700">
                I understand that production begins only after
                downpayment confirmation.
              </span>

            </label>

          </section>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-70"
          >
            {loading ? 'Submitting Order...' : 'Submit Order'}
          </button>

        </form>
      </div>
    </div>
  )
}