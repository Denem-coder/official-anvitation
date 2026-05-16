import { useSearchParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderNumber = params.get('order')

  const [copied, setCopied] = useState(false)

  const [order, setOrder] = useState(null)

  const copyOrderNumber = async () => {
    await navigator.clipboard.writeText(orderNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openMessenger = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const url = isMobile
      ? 'https://www.m.me/61563452485945'
      : 'https://www.facebook.com/messages/t/61563452485945'

    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50 flex items-center justify-center p-6 mt-20">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-orange-500 p-6 text-center text-white">
          <div className="text-5xl">✅</div>

          <h1 className="text-2xl font-bold mt-2">
            Order Successful
          </h1>

          <p className="text-orange-100 mt-1">
            Your order has been saved successfully
          </p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          {/* ORDER NUMBER */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Your Order Number
            </p>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-gray-800">
                {orderNumber}
              </span>

              <button
                onClick={copyOrderNumber}
                className="text-sm px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* STATUS CARD */}
          <div className="rounded-2xl border bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              Current Status
            </p>

            <p className="mt-1 font-semibold text-orange-600">
              {order?.status || 'Pending Confirmation'}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {order?.status === 'Pending Confirmation' && 'We will review your order shortly'}
              {order?.status === 'Confirmed' && 'Your order has been confirmed'}
              {order?.status === 'In Production' && 'We are now preparing your order'}
              {order?.status === 'Ready for Pickup' && 'Your order is ready for pickup'}
              {order?.status === 'Out for Delivery' && 'Your order is on the way'}
              {!order?.status && 'We will review your order shortly'}
            </p>
          </div>

          {/* NEXT STEPS */}
          <div className="space-y-2 text-sm text-gray-600">
            <p>✔ Your order has been received</p>
            <p>✔ Our team will review your details</p>
            <p>✔ We will contact you for confirmation & downpayment</p>
            <p>✔ Production will start after confirmation</p>
          </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-3 pt-2">

          <button
            onClick={openMessenger}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Continue on Messenger
          </button>

          <Link
            to={`/track-order?order=${orderNumber}`}
            className="block text-center w-full border border-orange-500 text-orange-600 py-3 rounded-xl hover:bg-orange-50 transition font-semibold"
          >
            Track Your Order
          </Link>

          <Link
            to="/"
            className="block text-center w-full border py-3 rounded-xl hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>

        </div>

          {/* FOOTER NOTE */}
          <p className="text-xs text-center text-gray-400 pt-2">
            Please save your order number for tracking and inquiries
          </p>

        </div>
      </div>
    </div>
  )
}