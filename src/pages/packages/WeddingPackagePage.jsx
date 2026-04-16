import PackageTemplate from './PackageTemplate'

import sample1 from '../../assets/img/gallery-img/wedding-invitation-1.png'
import sample2 from '../../assets/img/gallery-img/wedding-invitation-2.png'
import sample3 from '../../assets/img/gallery-img/wedding-invitation-3.png'
import sample4 from '../../assets/img/gallery-img/wedding-invitation-4.png'

function WeddingPackagePage() {
  return (
    <PackageTemplate
      badge="Wedding Packages"
      title="Find the Right Package for Your Big Day"
      subtitle="Choose the package that fits your selected design, event style, and budget."
      designsCatalog={[
        {
          slug: 'floral-wedding',
          img: sample1,
          title: 'Floral Wedding Invitation',
          desc: 'An elegant floral-themed wedding invitation perfect for romantic and garden-inspired weddings.',
        },
        {
          slug: 'minimalist-wedding',
          img: sample2,
          title: 'Minimalist Wedding Invitation',
          desc: 'A clean and modern wedding invitation for couples who prefer a timeless minimalist style.',
        },
        {
          slug: 'rustic-wedding',
          img: sample3,
          title: 'Rustic Wedding Invitation',
          desc: 'A warm and charming invitation style that fits rustic, boho, and outdoor weddings.',
        },
        {
          slug: 'classic-wedding',
          img: sample4,
          title: 'Classic Wedding Invitation',
          desc: 'A timeless invitation design with a formal and refined look for elegant wedding celebrations.',
        },
      ]}
      packages={[
        {
          name: 'Basic',
          price: '₱1,500',
          subtitle: 'For simple celebrations',
          highlight: false,
          features: [
            '30 invitations',
            'Standard paper',
            'Free layout editing',
            'Envelope included',
          ],
        },
        {
          name: 'Standard',
          price: '₱3,000',
          subtitle: 'Most popular choice',
          highlight: true,
          features: [
            '60 invitations',
            'Premium paper',
            'Free layout editing',
            'Envelope included',
          ],
        },
        {
          name: 'Premium',
          price: '₱5,000',
          subtitle: 'For elegant events',
          highlight: false,
          features: [
            '100 invitations',
            'Premium textured paper',
            'Free layout editing',
            'Elegant envelope',
          ],
        },
      ]}
    />
  )
}

export default WeddingPackagePage