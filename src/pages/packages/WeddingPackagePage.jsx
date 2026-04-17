import PackageTemplate from './PackageTemplate'
import designData from '../../data/designData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function WeddingPackagePage() {
  return (
    <PackageTemplate
      category="Wedding"
      title="Build Your Wedding Invitation Order"
      subtitle="Order by product or choose a package that fits your event and budget."
      designsCatalog={designData.wedding}
      products={productsData.wedding}
      packages={packagesData.wedding}
    />
  )
}

export default WeddingPackagePage