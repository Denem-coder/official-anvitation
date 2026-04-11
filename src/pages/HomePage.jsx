import Hero from '../components/Hero'
import Services from '../components/Services'
import Packages from '../components/Packages'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import Faqs from '../components/Faqs'
import Contact from '../components/Contact'

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Packages />
      <Gallery />
      <Reviews />
      <Faqs />
      <Contact />
    </>
  )
}

export default HomePage