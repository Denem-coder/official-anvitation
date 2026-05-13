import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function OrderSuccessPage() {
  const [params] = useSearchParams()

  const orderNumber = params.get('order')

  return (
    <div className="max-w-2xl mx-auto p-6 text-center mt-20">

      <div className="rounded-3xl border bg-white p-10 shadow-lg">

        <div className="mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Thank You!
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Your order has been submitted successfully.
        </p>

        <div className="rounded-2xl border bg-gray-50 p-6 mb-8">
          <p className="text-gray-500 text-sm">
            Order Number
          </p>

          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            {orderNumber || 'Processing...'}
          </h2>
        </div>

        <div className="rounded-2xl bg-orange-50 p-5 mb-8 text-left">
          <h3 className="font-semibold text-orange-600 mb-2">
            Important
          </h3>

          <p className="text-sm text-gray-700">
            Please save your order number. You can use it to
            track the status of your order anytime.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-center">

          <Link
            to="/track-order"
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Track Order
          </Link>

          <Link
            to="/"
            className="rounded-xl border px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  )
}

export default OrderSuccessPage