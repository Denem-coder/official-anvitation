import PackageTemplate from './PackageTemplate'
import designData from '../../data/designData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function BaptismalPackagePage() {
  return (
    <PackageTemplate
      badge="Baptismal Packages"
      title="Choose Your Design"
      subtitle="Choose individual items or select a package that best fits your event and budget."
      designsCatalog={designData.baptismal}
      products={productsData.baptismal}
      packages={packagesData.baptismal}
      category="baptismal"
    />
  )
}

export default BaptismalPackagePage