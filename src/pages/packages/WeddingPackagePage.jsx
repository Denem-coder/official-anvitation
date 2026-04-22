import PackageTemplate from './PackageTemplate'
import designsData from '../../data/designsData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'
import addOnsData from '../../data/addOnsData'

function WeddingPackagePage() {
  return (
    <PackageTemplate
      badge="Wedding Packages"
      title="Find the Right Package for Your Big Day"
      subtitle="Choose the package that fits your selected design, event style, and budget."
      designsCatalog={designsData.wedding}
      products={productsData.wedding}
      addOns={addOnsData.wedding}
      packages={packagesData.wedding}
      category="wedding"
    />
  )
}

export default WeddingPackagePage