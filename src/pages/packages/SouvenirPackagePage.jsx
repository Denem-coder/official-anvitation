import PackageTemplate from './PackageTemplate'

import sample1 from '../../assets/img/gallery-img/souvenir-3.png'

function SouvenirPackagePage() {
  return (
    <PackageTemplate
      badge="Souvenir Packages"
      title="Choose the Right Souvenir Package"
      subtitle="Pick the souvenir package that matches your selected style and event needs."
      designsCatalog={[
        {
          slug: 'custom-event-souvenir',
          img: sample1,
          title: 'Customized Event Souvenir',
          desc: 'A memorable keepsake designed for special celebrations and heartfelt guest giveaways.',
        },
        {
          slug: 'elegant-souvenir-set',
          img: sample1,
          title: 'Elegant Souvenir Set',
          desc: 'A souvenir concept prepared for classy and beautifully styled event presentations.',
        },
        {
          slug: 'practical-giveaway',
          img: sample1,
          title: 'Practical Giveaway Design',
          desc: 'A practical and visually pleasing souvenir option that guests can appreciate and use.',
        },
        {
          slug: 'theme-matched-souvenir',
          img: sample1,
          title: 'Theme-Matched Souvenir',
          desc: 'A souvenir style designed to complement your event motif and overall celebration setup.',
        },
      ]}
      packages={[
        {
          name: 'Basic',
          price: '₱999',
          subtitle: 'Simple and affordable',
          highlight: false,
          features: [
            'Basic souvenir set',
            'Standard materials',
            'Custom label option',
            'Neat packaging',
          ],
        },
        {
          name: 'Standard',
          price: '₱2,200',
          subtitle: 'Most chosen souvenir package',
          highlight: true,
          features: [
            'Premium souvenir set',
            'Better materials',
            'Custom label option',
            'Attractive packaging',
          ],
        },
        {
          name: 'Premium',
          price: '₱3,800',
          subtitle: 'Elegant keepsakes',
          highlight: false,
          features: [
            'Elegant souvenir bundle',
            'Premium materials',
            'Custom design option',
            'Premium packaging',
          ],
        },
      ]}
    />
  )
}

export default SouvenirPackagePage