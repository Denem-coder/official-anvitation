import PackageTemplate from './PackageTemplate'
import designData from '../../data/designData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function SouvenirPackagePage() {
  return (
    <PackageTemplate
      badge="Souvenir Packages"
      title="Choose the Right Souvenir Package"
      subtitle="Pick the package that fits your selected souvenir design and celebration needs."
      designsCatalog={designData.souvenir}
      products={productsData.souvenir}
      packages={packagesData.souvenir}
      category="souvenir"
    />
  )
}

export default SouvenirPackagePage