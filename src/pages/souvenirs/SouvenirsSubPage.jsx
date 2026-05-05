import { useLocation } from 'react-router-dom'
import SouvenirsTemplate from './SouvenirsTemplate'
import souvenirsData from '../../data/souvenirsData'

function SouvenirsSubPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const category = params.get('category')

  const filteredProducts = category
    ? souvenirsData.filter((item) => item.category === category)
    : souvenirsData

  return (
    <SouvenirsTemplate
      title="Choose Your Souvenir"
      subtitle="Browse our souvenir designs and find the perfect keepsake for your celebration."
      products={filteredProducts}
      showBackButton
    />
  )
}

export default SouvenirsSubPage