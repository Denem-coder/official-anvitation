import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Cart from './pages/Cart'
import { useCart } from './context/CartContext'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceWeddingSubPage from './pages/subpages/ServiceWeddingSubPage'
import ServiceBaptismalSubPage from './pages/subpages/ServiceBaptismalSubPage'
import ServiceBirthdaySubPage from './pages/subpages/ServiceBirthdaySubPage'
import ServiceSouvenirSubPage from './pages/subpages/ServiceSouvenirSubPage'
import PackagesPage from './pages/PackagesPage'
import GalleryPage from './pages/GalleryPage'

function App() {
  const { showToast } = useCart()

  return (
    <>
      <Navbar />

      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          Added to cart
        </div>
      )}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/wedding-invitations" element={<ServiceWeddingSubPage />} />
        <Route path="/services/baptismal-invitations" element={<ServiceBaptismalSubPage />} />
        <Route path="/services/birthday-invitations" element={<ServiceBirthdaySubPage />} />
        <Route path="/services/souvenirs" element={<ServiceSouvenirSubPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App