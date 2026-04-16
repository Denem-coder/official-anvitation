import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { useCart } from '../../context/CartContext'

function PackageTemplate({
  badge,
  title,
  subtitle,
  designsCatalog = [],
  packages = [],
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const params = new URLSearchParams(location.search)
  const designSlug = params.get('design')

  const selectedDesign =
    designsCatalog.find((item) => item.slug === designSlug) || null

  const choosePackage = (pkg) => {
    const cartItem = {
      id: selectedDesign
        ? `${selectedDesign.slug}-${pkg.id}`
        : pkg.id,
      type: 'package',
      category: badge,
      title: selectedDesign
        ? `${selectedDesign.title} - ${pkg.name}`
        : pkg.title,
      desc: pkg.subtitle,
      price: pkg.price,
      quantity: 1,
      packageName: pkg.name,
      packageTitle: pkg.title,
      packageFeatures: pkg.features,
      designTitle: selectedDesign?.title || null,
      designSlug: selectedDesign?.slug || null,
      image:
        selectedDesign?.cover ||
        selectedDesign?.images?.[0] ||
        selectedDesign?.img ||
        null,
    }

    addToCart(cartItem)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-4 pt-28 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mt-6 mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            {badge}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">{subtitle}</p>
        </div>

        {selectedDesign && (
          <div className="mb-10 rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-center">
              <img
                src={
                  selectedDesign.cover ||
                  selectedDesign.images?.[0] ||
                  selectedDesign.img
                }
                alt={selectedDesign.title}
                className="h-44 w-full rounded-2xl object-cover"
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                  Selected Design
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {selectedDesign.title}
                </h2>
                <p className="mt-3 text-gray-600">{selectedDesign.desc}</p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="border-b border-gray-200 bg-gradient-to-b from-orange-50 to-white p-8 lg:border-b-0 lg:border-r">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Package Plans
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
                Choose your
                <br />
                package
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Pick the package that best fits your design, event style, and budget.
              </p>

              <div className="mt-8 space-y-4 text-sm text-gray-700">
                <div className="border-b border-gray-200 pb-3">Inclusions</div>
                <div className="border-b border-gray-200 pb-3">Print quality</div>
                <div className="border-b border-gray-200 pb-3">Customization</div>
                <div className="border-b border-gray-200 pb-3">Best use</div>
              </div>
            </div>

            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-8 ${
                  pkg.id !== packages[packages.length - 1]?.id
                    ? 'border-b border-gray-200 lg:border-b-0 lg:border-r'
                    : ''
                } ${pkg.highlight ? 'bg-orange-50/70' : 'bg-white'}`}
              >
                {pkg.highlight && (
                  <span className="absolute right-6 top-6 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Popular
                  </span>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    ₱{pkg.price.toLocaleString()}
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-gray-800">{pkg.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{pkg.subtitle}</p>

                  <button
                    onClick={() => choosePackage(pkg)}
                    className={`mt-6 inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                      pkg.highlight
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-900 text-white hover:bg-black'
                    }`}
                  >
                    Choose This Package
                  </button>
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
          <Link
            to="/#contact"
            className="inline-block rounded-full border border-orange-300 bg-white px-7 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
          >
            Need Help Choosing?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PackageTemplate