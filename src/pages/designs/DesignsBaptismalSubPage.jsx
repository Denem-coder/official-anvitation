import DesignsTemplate from './DesignsTemplate'
import designsData from '../../data/designsData'

import sample1 from '../../assets/img/gallery-img/wedding-invitation-1.png'
import sample2 from '../../assets/img/gallery-img/wedding-invitation-2.png'
import sample3 from '../../assets/img/gallery-img/wedding-invitation-3.png'
import sample4 from '../../assets/img/gallery-img/birthday-invitation-2.png'

function DesignsBaptismalSubPage() {
  return (
    <DesignsTemplate
      badge="Baptismal Invitations"
      title="Choose Your Invitation"
      subtitle="Browse our baptismal invitation designs and find the perfect one for your celebration"
      packageLink="/packages/baptismal"
      designs={designsData.baptismal}
    />
  )
}

export default DesignsBaptismalSubPage