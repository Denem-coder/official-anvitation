import PackageTemplate from './PackageTemplate'
import designData from '../../data/designData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function BirthdayPackagePage() {
  return (
    <PackageTemplate
      badge="Birthday Packages"
      title="Choose the Right Birthday Package"
      subtitle="Pick the package that fits your selected invitation design and celebration needs."
      designsCatalog={designData.birthday}
      products={productsData.birthday}
      packages={packagesData.birthday}
      category="birthday"
    />
  )
}

export default BirthdayPackagePage