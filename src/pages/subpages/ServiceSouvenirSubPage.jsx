import { Link } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function ServiceSouvenirSubPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
    <BackButton />
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service1.jpg"
            alt="Souvenir 1"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Glass Cup with Sip
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              High-quality print invitations for weddings, birthdays, and events.
            </p>
          </div>
        </div>

        {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service2.jpg"
            alt="Souvenir 2"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Ref Magnet
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Customized souvenirs for parties and corporate events.
            </p>
          </div>
        </div>

         {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service2.jpg"
            alt="Souvenir 3"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Acrylic Ref Magnet
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Customized souvenirs for parties and corporate events.
            </p>
          </div>
        </div>

         {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service3.jpg"
            alt="Souvenir 4"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Leather Keychain
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Customized souvenirs for parties and corporate events.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServiceSouvenirSubPage