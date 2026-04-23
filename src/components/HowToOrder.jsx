import {
  FaRegImages,
  FaRegClipboard,
  FaShoppingCart,
  FaFacebookMessenger,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function HowToOrder() {
  const steps = [
    {
      id: 'STEP 1',
      icon: <FaRegImages className="text-2xl" />,
      title: 'Browse Designs',
      desc: 'Explore our invitation designs and choose the style that fits your event best.',
    },
    {
      id: 'STEP 2',
      icon: <FaRegClipboard className="text-2xl" />,
      title: 'Customize Your Order',
      desc: 'Pick your motif, insert design, quantity, and optional add-ons. You can also choose a package if it fits better.',
    },
    {
      id: 'STEP 3',
      icon: <FaShoppingCart className="text-2xl" />,
      title: 'Review and Add to Cart',
      desc: 'Check your selected design and order details, then save everything to your cart.',
    },
    {
      id: 'STEP 4',
      icon: <FaFacebookMessenger className="text-2xl" />,
      title: 'Checkout via Messenger',
      desc: 'Click checkout and send the pre-filled message on Messenger so we can confirm your order details.',
    },
  ]

  return (
    <section
      id="howtoorder"
      className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/60 to-white px-6 py-20 md:py-24"
    >
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            How to Order
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            Order in 4 Easy Steps
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
            We made the ordering process simple so you can choose your design,
            customize it, and send your order without hassle.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-1/2 top-10 hidden h-[2px] w-[78%] -translate-x-1/2 bg-gradient-to-r from-orange-100 via-orange-300 to-orange-100 xl:block" />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group relative overflow-hidden rounded-[2rem] border border-orange-100/80 bg-white/90 p-6 text-left shadow-[0_15px_50px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(249,115,22,0.16)]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-100/50 blur-2xl transition duration-300 group-hover:bg-orange-200/70" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-200">
                      {step.icon}
                    </div>

                    <span className="text-sm font-bold tracking-[0.2em] text-orange-500">
                      {step.id}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/designs"
              className="font-bold bg-white text-orange-600 border border-orange-700 px-10 py-3 mt-10 rounded-full shadow-xl hover:scale-105 transition hover:bg-orange-500 hover:text-white"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowToOrder