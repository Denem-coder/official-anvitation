import { Link } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function WeddingPackagePage() {
  const packages = [
    {
      name: 'Basic',
      price: '₱1,500',
      subtitle: 'For simple celebrations',
      highlight: false,
      features: [
        '30 invitations',
        'Standard paper',
        'Free layout editing',
        'Envelope included',
        '1 design revision',
      ],
    },
    {
      name: 'Standard',
      price: '₱3,000',
      subtitle: 'Most popular choice',
      highlight: true,
      features: [
        '60 invitations',
        'Premium paper',
        'Free layout editing',
        'Envelope included',
        '2 design revisions',
      ],
    },
    {
      name: 'Premium',
      price: '₱5,000',
      subtitle: 'For elegant events',
      highlight: false,
      features: [
        '100 invitations',
        'Premium textured paper',
        'Free layout editing',
        'Elegant envelope',
        '3 design revisions',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="mx-auto max-w-7xl">
        <BackButton />

        <div className="mt-6 mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Wedding Packages
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            Find the Right Package for Your Big Day
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Elegant invitation packages designed to match your style, budget, and
            celebration needs.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Left intro panel */}
            <div className="border-b border-gray-200 bg-gradient-to-b from-orange-50 to-white p-8 lg:border-b-0 lg:border-r">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Package Plans
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
                Choose your
                <br />
                wedding package
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Compare our package options and choose the one that best fits
                your event. All packages come with high-quality printing and
                carefully prepared layouts.
              </p>

              <div className="mt-8 space-y-4 text-sm text-gray-700">
                <div className="border-b border-gray-200 pb-3">Invitation quantity</div>
                <div className="border-b border-gray-200 pb-3">Paper quality</div>
                <div className="border-b border-gray-200 pb-3">Free layout editing</div>
                <div className="border-b border-gray-200 pb-3">Envelope inclusion</div>
                <div className="border-b border-gray-200 pb-3">Design revisions</div>
              </div>
            </div>

            {/* Package columns */}
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative p-8 ${
                  index !== packages.length - 1 ? 'border-b border-gray-200 lg:border-b-0 lg:border-r' : ''
                } ${pkg.highlight ? 'bg-orange-50/70' : 'bg-white'}`}
              >
                {pkg.highlight && (
                  <span className="absolute right-6 top-6 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Popular
                  </span>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{pkg.price}</h3>
                  <p className="mt-2 text-lg font-semibold text-gray-800">{pkg.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{pkg.subtitle}</p>

                  <Link
                    to="/#contact"
                    className={`mt-6 inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                      pkg.highlight
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-900 text-white hover:bg-black'
                    }`}
                  >
                    View Details
                  </Link>
                </div>

                <div className="mt-8 space-y-4 text-center text-sm text-gray-700">
                  {pkg.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex min-h-[52px] items-center justify-center border-b border-gray-200 pb-3"
                    >
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need a customized package? We can adjust quantities, materials, and
            inclusions based on your preference.
          </p>

          <Link
            to="/#contact"
            className="mt-6 inline-block rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WeddingPackagePage