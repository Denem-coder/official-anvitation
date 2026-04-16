import ServiceTemplate from './ServiceTemplate'

import sample1 from '../../assets/img/gallery-img/wedding-invitation-1.png'
import sample2 from '../../assets/img/gallery-img/wedding-invitation-2.png'
import sample3 from '../../assets/img/gallery-img/wedding-invitation-3.png'
import sample4 from '../../assets/img/gallery-img/wedding-invitation-4.png'

function ServiceWeddingSubPage() {
  return (
    <ServiceTemplate
      badge="Wedding Invitations"
      title="Elegant Invitations for Your Special Day"
      subtitle="Browse some of our wedding invitation designs and choose the one that fits your celebration best."
      packageLink="/packages/wedding"
      inquiryLink="/#contact"
      inquiryText="Need Help?"
      designs={[
        {
          slug: 'floral-wedding',
          cover: sample1,
          images: [sample1, sample2, sample3, sample4],
          title: 'Floral Wedding Invitation',
          desc: 'An elegant floral-themed wedding invitation perfect for romantic and garden-inspired weddings.',
          details: [
            'Soft floral design',
            'Elegant layout and typography',
            'Ideal for classic and romantic themes',
            'Customizable wording and colors',
          ],
        },
        {
          slug: 'minimalist-wedding',
          cover: sample2,
          images: [sample2],
          title: 'Minimalist Wedding Invitation',
          desc: 'A clean and modern wedding invitation for couples who prefer a timeless minimalist style.',
          details: [
            'Modern and clean design',
            'Simple and classy layout',
            'Great for minimalist weddings',
            'Customizable details and text',
          ],
        },
        {
          slug: 'rustic-wedding',
          cover: sample3,
          images: [sample3],
          title: 'Rustic Wedding Invitation',
          desc: 'A warm and charming invitation style that fits rustic, boho, and outdoor weddings.',
          details: [
            'Rustic-inspired design',
            'Warm earthy tones',
            'Perfect for outdoor weddings',
            'Customizable theme colors',
          ],
        },
        {
          slug: 'classic-wedding',
          cover: sample4,
          images: [sample4],
          title: 'Classic Wedding Invitation',
          desc: 'A timeless invitation design with a formal and refined look for elegant wedding celebrations.',
          details: [
            'Classic and sophisticated style',
            'Clean formal presentation',
            'Suitable for elegant wedding themes',
            'Custom layout and text available',
          ],
        },
      ]}
      features={[
        'Elegant and timeless invitation styles',
        'Customizable layouts and wording',
        'High-quality printing and finishing',
        'Perfect for intimate or grand weddings',
      ]}
    />
  )
}

export default ServiceWeddingSubPage