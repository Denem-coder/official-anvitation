import PackageTemplate from './PackageTemplate'
import designsData from '../../data/designsData'
import packagesData from '../../data/packagesData'
import productsData from '../../data/productsData'

function DebutPackagePage() {
  return (
    <PackageTemplate
      badge="Birthday Packages"
      title="Choose Your Design"
      subtitle="Choose individual items or select a package that best fits your event and budget."
      designsCatalog={designsData.debut}
      products={productsData.debut}
      packages={packagesData.debut}
      category="debut"
    />
  )
}

export default DebutPackagePage