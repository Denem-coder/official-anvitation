import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import { useCart } from './context/CartContext'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import AdminOrdersPage from './pages/AdminOrdersPage'
import TrackOrdersPage from './pages/TrackOrdersPage'

import HomePage from './pages/HomePage'
import DesignsPage from './pages/DesignsPage'
import DesignsWeddingSubPage from './pages/designs/DesignsWeddingSubPage'
import DesignsBirthdaySubPage from './pages/designs/DesignsBirthdaySubPage'
import DesignsDebutSubPage from './pages/designs/DesignsDebutSubPage'
import DesignsBaptismalSubPage from './pages/designs/DesignsBaptismalSubPage'

import SouvenirsPage from './pages/SouvenirsPage'
import SouvenirsSubPage from './pages/souvenirs/SouvenirsSubPage'

import PackagesPage from './pages/PackagesPage'
import GalleryPage from './pages/GalleryPage'

import WeddingPackagePage from './pages/packages/WeddingPackagePage'
import BirthdayPackagePage from './pages/packages/BirthdayPackagePage'
import DebutPackagePage from './pages/packages/DebutPackagePage'
import BaptismalPackagePage from './pages/packages/BaptismalPackagePage'
import SouvenirPackagePage from './pages/packages/SouvenirPackagePage'
import DesignsPrintingSuppliesSubPage from './pages/designs/DesignsPrintingSuppliesSubPage'

function App() {
  const { showToast } = useCart()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          Added to cart
        </div>
      )}

      <ScrollToTop />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/designs" element={<DesignsPage />} />
          <Route path="/designs/wedding" element={<DesignsWeddingSubPage />} />
          <Route path="/designs/birthday" element={<DesignsBirthdaySubPage />} />
          <Route path="/designs/debut" element={<DesignsDebutSubPage />} />
          <Route path="/designs/baptismal" element={<DesignsBaptismalSubPage />} />
          <Route path="/designs/printingsupplies" element={<DesignsPrintingSuppliesSubPage />} />

          <Route path="/souvenirs" element={<SouvenirsPage />} />
          <Route path="/souvenirs/designs" element={<SouvenirsSubPage />} />

          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/wedding" element={<WeddingPackagePage />} />
          <Route path="/packages/birthday" element={<BirthdayPackagePage />} />
          <Route path="/packages/debut" element={<DebutPackagePage />} />
          <Route path="/packages/baptismal" element={<BaptismalPackagePage />} />
          <Route path="/packages/souvenir" element={<SouvenirPackagePage />} />

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/track-order" element={<TrackOrdersPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App