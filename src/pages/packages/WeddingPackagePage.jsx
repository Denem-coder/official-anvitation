import PackageTemplate from './PackageTemplate'
import designsData from '../../data/designsData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function WeddingPackagePage() {
  return (
    <PackageTemplate
      category="Wedding"
      title="Customize Your Order"
      subtitle="Choose individual items or select a package that best fits your event and budget."
      designsCatalog={designsData.wedding}
      products={productsData.wedding}
      packages={packagesData.wedding}
    />
  )
}

export default WeddingPackagePage