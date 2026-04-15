import { Link } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function SouvenirPackagePage() {
  const packages = [
    {
      name: 'Basic',
      price: '₱999',
      subtitle: 'Simple and affordable giveaways',
      highlight: false,
      features: [
        'Basic souvenir set',
        'Standard materials',
        'Custom label option',
        'Neat packaging',
        '1 design revision',
      ],
    },
    {
      name: 'Standard',
      price: '₱2,200',
      subtitle: 'Most chosen souvenir package',
      highlight: true,
      features: [
        'Premium souvenir set',
        'Better materials',
        'Custom label option',
        'Attractive packaging',
        '2 design revisions',
      ],
    },
    {
      name: 'Premium',
      price: '₱3,800',
      subtitle: 'Elegant keepsakes for special events',
      highlight: false,
      features: [
        'Elegant souvenir bundle',
        'Premium materials',
        'Custom design option',
        'Premium packaging',
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
            Souvenir Packages
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            Memorable Souvenir Packages
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose from beautifully prepared souvenir packages that your guests
            will surely appreciate and remember.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="border-b border-gray-200 bg-gradient-to-b from-orange-50 to-white p-8 lg:border-b-0 lg:border-r">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Package Plans
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
                Choose your
                <br />
                souvenir package
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Compare our souvenir package options and choose the best fit for
                your event. Each package is prepared with quality and care.
              </p>

              <div className="mt-8 space-y-4 text-sm text-gray-700">
                <div className="border-b border-gray-200 pb-3">Souvenir quantity</div>
                <div className="border-b border-gray-200 pb-3">Material quality</div>
                <div className="border-b border-gray-200 pb-3">Custom label option</div>
                <div className="border-b border-gray-200 pb-3">Packaging inclusion</div>
                <div className="border-b border-gray-200 pb-3">Design revisions</div>
              </div>
            </div>

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
                    Inquire Now
                  </Link>
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
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need a customized souvenir package? We can adjust the design,
            materials, and inclusions to match your event.
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

export default SouvenirPackagePage