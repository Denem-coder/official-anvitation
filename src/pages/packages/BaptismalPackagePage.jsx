import PackageTemplate from './PackageTemplate'
import designData from '../../data/designData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function BaptismalPackagePage() {
  return (
    <PackageTemplate
      badge="Baptismal Packages"
      title="Choose the Right Baptismal Package"
      subtitle="Pick the package that fits your selected invitation design and celebration needs."
      designsCatalog={designData.baptismal}
      products={productsData.baptismal}
      packages={packagesData.baptismal}
      category="baptismal"
    />
  )
}

export default BaptismalPackagePage