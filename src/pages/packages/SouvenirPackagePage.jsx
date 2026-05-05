import SouvenirPackageTemplate from './SouvenirPackageTemplate'
import packagesData from '../../data/packagesData'

function SouvenirPackagePage() {
  return (
    <SouvenirPackageTemplate
      title="Customize Your Souvenir Order"
      subtitle="Choose your souvenir quantity or select a package that fits your event and budget."
      packages={packagesData.souvenir}
    />
  )
}

export default SouvenirPackagePage