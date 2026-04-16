import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Cart from './pages/Cart'
import { useCart } from './context/CartContext'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceWeddingSubPage from './pages/services/ServiceWeddingSubPage'
import ServiceBaptismalSubPage from './pages/services/ServiceBaptismalSubPage'
import ServiceBirthdaySubPage from './pages/services/ServiceBirthdaySubPage'
import ServiceSouvenirSubPage from './pages/services/ServiceSouvenirSubPage'

import PackagesPage from './pages/PackagesPage'
import GalleryPage from './pages/GalleryPage'

import WeddingPackagePage from './pages/packages/WeddingPackagePage'
import BirthdayPackagePage from './pages/packages/BirthdayPackagePage'
import BaptismalPackagePage from './pages/packages/BaptismalPackagePage'
import SouvenirPackagePage from './pages/packages/SouvenirPackagePage'
import ServicePrintingSuppliesSubPage from './pages/services/ServicePrintingSuppliesSubPage'

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
        <Route path="/services/wedding" element={<ServiceWeddingSubPage />} />
        <Route path="/services/baptismal" element={<ServiceBaptismalSubPage />} />
        <Route path="/services/birthday" element={<ServiceBirthdaySubPage />} />
        <Route path="/services/souvenir" element={<ServiceSouvenirSubPage />} />
        <Route path="/services/printingsupplies" element={<ServicePrintingSuppliesSubPage />} />

        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/wedding" element={<WeddingPackagePage />} />
        <Route path="/packages/birthday" element={<BirthdayPackagePage />} />
        <Route path="/packages/baptismal" element={<BaptismalPackagePage />} />
        <Route path="/packages/souvenir" element={<SouvenirPackagePage />} />

        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App