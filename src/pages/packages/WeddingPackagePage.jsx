import PackageTemplate from './PackageTemplate'
import galleryData from '../../data/galleryData'
import packagesData from '../../data/packagesData'

function WeddingPackagePage() {
  return (
    <PackageTemplate
      badge="Wedding Packages"
      title="Choose the Right Wedding Package"
      subtitle="Pick the package that fits your selected invitation design and celebration needs."
      designsCatalog={galleryData.wedding}
      packages={packagesData.wedding}
      category="wedding"
    />
  )
}

export default WeddingPackagePage