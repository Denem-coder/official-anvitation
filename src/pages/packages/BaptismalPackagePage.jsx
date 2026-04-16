import PackageTemplate from './PackageTemplate'

import sample1 from '../../assets/img/gallery-img/baptismal-invitation-1.png'

function BaptismalPackagePage() {
  return (
    <PackageTemplate
      badge="Baptismal Packages"
      title="Choose the Right Baptismal Package"
      subtitle="Pick the package that fits your selected invitation design and celebration needs."
      designsCatalog={[
        {
          slug: 'classic-baptismal',
          img: sample1,
          title: 'Classic Baptismal Invitation',
          desc: 'A soft and elegant invitation design perfect for meaningful baptismal celebrations.',
        },
        {
          slug: 'minimal-baptismal',
          img: sample1,
          title: 'Minimal Baptismal Theme',
          desc: 'A simple and refined invitation style with a calm and modern presentation.',
        },
        {
          slug: 'cute-baptismal',
          img: sample1,
          title: 'Cute Baptismal Invitation',
          desc: 'A child-friendly invitation design that feels warm, cheerful, and welcoming.',
        },
        {
          slug: 'elegant-baptismal',
          img: sample1,
          title: 'Elegant Baptismal Set',
          desc: 'A graceful baptismal invitation concept ideal for memorable family events.',
        },
      ]}
      packages={[
        {
          name: 'Basic',
          price: '₱1,300',
          subtitle: 'For simple celebrations',
          highlight: false,
          features: [
            '25 invitations',
            'Standard paper',
            'Free layout editing',
            'Envelope included',
          ],
        },
        {
          name: 'Standard',
          price: '₱2,700',
          subtitle: 'Most chosen package',
          highlight: true,
          features: [
            '50 invitations',
            'Premium paper',
            'Free layout editing',
            'Envelope included',
          ],
        },
        {
          name: 'Premium',
          price: '₱4,200',
          subtitle: 'For elegant events',
          highlight: false,
          features: [
            '80 invitations',
            'Premium textured paper',
            'Free layout editing',
            'Elegant envelope',
          ],
        },
      ]}
    />
  )
}

export default BaptismalPackagePage