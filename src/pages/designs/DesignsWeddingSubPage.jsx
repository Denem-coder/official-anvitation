import DesignsTemplate from './DesignsTemplate'
import designData from '../../data/designData'

import sample1 from '../../assets/img/gallery-img/wedding-invitation-1.png'
import sample2 from '../../assets/img/gallery-img/wedding-invitation-2.png'
import sample3 from '../../assets/img/gallery-img/wedding-invitation-3.png'
import sample4 from '../../assets/img/gallery-img/birthday-invitation-2.png'

function DesignsWeddingSubPage() {
  return (
    <DesignsTemplate
      badge="Wedding Invitations"
      title="Choose Your Design"
      subtitle="Browse our wedding designs and choose your perfect match"
      packageLink="/packages/wedding"
      designs={designData.wedding} // ✅ USE CENTRAL DATA
    />
  )
}

export default DesignsWeddingSubPage