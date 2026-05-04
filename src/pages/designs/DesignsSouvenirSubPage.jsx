import DesignsTemplate from './DesignsTemplate'
import designsData from '../../data/designsData'

function DesignsSouvenirSubPage() {
  return (
    <DesignsTemplate
      badge="Souvenirs"
      title="Choose Your Souvenir"      subtitle="Browse our souvenir designs and find the perfect keepsake for your special celebration"
      packageLink="/packages/souvenir"
      designs={designsData.souvenir}
    />
  )
}

export default DesignsSouvenirSubPage