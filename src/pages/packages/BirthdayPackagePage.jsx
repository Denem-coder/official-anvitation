import PackageTemplate from './PackageTemplate'
import designData from '../../data/designData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function BirthdayPackagePage() {
  return (
    <PackageTemplate
      badge="Birthday Packages"
      title="Choose Your Design"
      subtitle="Choose individual items or select a package that best fits your event and budget."
      designsCatalog={designData.birthday}
      products={productsData.birthday}
      packages={packagesData.birthday}
      category="birthday"
    />
  )
}

export default BirthdayPackagePage