import DesignsTemplate from './DesignsTemplate'
import designsData from '../../data/designsData'

import sample1 from '../../assets/img/gallery-img/wedding-invitation-1.png'
import sample2 from '../../assets/img/gallery-img/wedding-invitation-2.png'
import sample3 from '../../assets/img/gallery-img/wedding-invitation-3.png'
import sample4 from '../../assets/img/gallery-img/birthday-invitation-2.png'

function DesignsWeddingSubPage() {
  return (
    <DesignsTemplate
      badge="Wedding Invitations"
      title="Choose Your Invitation"
      subtitle="Browse our wedding designs and choose your perfect match"
      packageLink="/packages/wedding"
      designs={designsData.wedding} // ✅ USE CENTRAL DATA
    />
  )
}

export default DesignsWeddingSubPage