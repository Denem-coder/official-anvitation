import PackageTemplate from './PackageTemplate'
import galleryData from '../../data/galleryData'
import packagesData from '../../data/packagesData'

function BaptismalPackagePage() {
  return (
    <PackageTemplate
      badge="Baptismal Packages"
      title="Choose the Right Baptismal Package"
      subtitle="Pick the package that fits your selected invitation design and celebration needs."
      designsCatalog={galleryData.baptismal}
      packages={packagesData.baptismal}
      category="baptismal"
    />
  )
}

export default BaptismalPackagePage