import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'

function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12 bg-white min-h-screen">
      <BackButton /> 
      <h1 className="text-3xl font-bold mb-6 mt-6">Our Services</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service1.jpg"
            alt="Service 1"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Custom Invitations
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              High-quality print invitations for weddings, birthdays, and events.
            </p>
            <Link to="/services/wedding-invitations">Wedding Invitations</Link>
          </div>
        </div>

        {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service2.jpg"
            alt="Service 2"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Birthday Invitation 
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Customized souvenirs for parties and corporate events.
            </p>
            <Link to="/services/baptismal-invitations">Birthday Invitations</Link>
          </div>
        </div>

         {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service2.jpg"
            alt="Service 2"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Baptismal Invitation 
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Customized souvenirs for parties and corporate events.
            </p>
            <Link to="/services/baptismal-invitations">Baptismal Invitations</Link>
          </div>
        </div>

         {/* Item */}
        <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="/images/service3.jpg"
            alt="Service 3"
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h2 className="font-semibold text-sm md:text-base">
              Souvenirs
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Customized souvenirs for parties and corporate events.
            </p>
            <Link to="/services/souvenirs">Souvenirs</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServicesPage