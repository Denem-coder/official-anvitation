import ServiceTemplate from './ServiceTemplate'
import designData from '../../data/designData'

import sample1 from '../../assets/img/gallery-img/wedding-invitation-1.png'
import sample2 from '../../assets/img/gallery-img/wedding-invitation-2.png'
import sample3 from '../../assets/img/gallery-img/wedding-invitation-3.png'
import sample4 from '../../assets/img/gallery-img/wedding-invitation-4.png'

function ServiceWeddingSubPage() {
  return (
    <ServiceTemplate
      badge="Wedding Invitations"
      title="Elegant Invitations for Your Special Day"
      subtitle="Browse some of our wedding invitation designs..."
      packageLink="/packages/wedding"
      designs={designData.wedding} // ✅ USE CENTRAL DATA
    />
  )
}

export default ServiceWeddingSubPage