import PackageTemplate from './PackageTemplate'
import designsData from '../../data/designsData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function SouvenirPackagePage() {
  return (
    <PackageTemplate
      badge="Souvenir Packages"
      title="Customize Your Order"
      subtitle="Choose individual items or select a package that best fits your event and budget."
      designsCatalog={designsData.souvenir}
      products={productsData.souvenir}
      packages={packagesData.souvenir}
      category="souvenir"
    />
  )
}

export default SouvenirPackagePage