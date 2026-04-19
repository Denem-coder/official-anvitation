import DesignsTemplate from './DesignsTemplate'

import pm1 from '../../assets/img/designs-img/design-1.png'
import pm2 from '../../assets/img/designs-img/design-2.png'
import pm3 from '../../assets/img/designs-img/design-3.png'
import pm4 from '../../assets/img/designs-img/design-4.png'
import pm5 from '../../assets/img/designs-img/design-5.png'

function DesignsPrintingMaterialsSubPage() {
  const features = [
    'Affordable and reliable printing supplies',
    'Suitable for personal and business use',
    'Quality materials for clean print results',
    'Great for resellers and printing needs',
  ]

  const designs = [
    {
      title: 'Printing Paper Supply',
      desc: 'Reliable paper materials suitable for everyday printing needs and small business use.',
      images: [pm1, pm2, pm3],
      details: [
        'Suitable for personal and business needs',
        'Clean and reliable print support',
        'Available for inquiry',
        'Bulk requests may be accommodated',
      ],
    },
    {
      title: 'Printing Essentials',
      desc: 'Selected printing essentials for smoother workflow and more dependable output.',
      images: [pm1, pm4, pm5],
      details: [
        'Useful for recurring printing needs',
        'Simple and practical materials',
        'Suitable for small shops and projects',
        'Ask for pricing and availability',
      ],
    },
  ]

  return (
    <DesignsTemplate
      badge="Printing Materials"
      title="Choose Products"
      subtitle="Browse our printing supplies and choose what you want"
      features={features}
      designs={designs}
      packageLink={null}
      inquiryText="Ask for Available Items"
      inquiryLink="/#contact"
    />
  )
}

export default DesignsPrintingMaterialsSubPage