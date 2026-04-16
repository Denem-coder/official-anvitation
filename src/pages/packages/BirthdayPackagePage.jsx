import PackageTemplate from './PackageTemplate'

import sample1 from '../../assets/img/gallery-img/birthday-invitation-1.png'

function BirthdayPackagePage() {
  return (
    <PackageTemplate
      badge="Birthday Packages"
      title="Choose the Right Birthday Package"
      subtitle="Select the package that best fits your chosen design and celebration."
      designsCatalog={[
        {
          slug: 'playful-birthday',
          img: sample1,
          title: 'Playful Birthday Invitation',
          desc: 'A fun and colorful invitation design perfect for lively birthday celebrations.',
        },
        {
          slug: 'minimal-birthday',
          img: sample1,
          title: 'Minimal Birthday Invitation',
          desc: 'A simple and stylish birthday invitation for modern celebrations.',
        },
        {
          slug: 'cute-party-birthday',
          img: sample1,
          title: 'Cute Party Invitation',
          desc: 'A cheerful design made for fun birthday celebrations and memorable events.',
        },
        {
          slug: 'elegant-birthday',
          img: sample1,
          title: 'Elegant Birthday Invitation',
          desc: 'A classy invitation style ideal for debuts, milestone birthdays, and formal celebrations.',
        },
      ]}
      packages={[
        {
          name: 'Basic',
          price: '₱1,200',
          subtitle: 'For simple parties',
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
          price: '₱2,500',
          subtitle: 'Most popular birthday package',
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
          price: '₱4,000',
          subtitle: 'For bigger celebrations',
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

export default BirthdayPackagePage