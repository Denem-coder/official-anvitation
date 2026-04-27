import DesignsTemplate from '../designs/DesignsTemplate'
import designsData from '../../data/designsData'

import sample1 from '../../assets/img/gallery-img/wedding-invitation-1.png'
import sample2 from '../../assets/img/gallery-img/wedding-invitation-2.png'
import sample3 from '../../assets/img/gallery-img/wedding-invitation-3.png'
import sample4 from '../../assets/img/gallery-img/birthday-invitation-2.png'

function DesignsSouvenirSubPage() {
  return (
    <DesignsTemplate
      badge="Souvenir"
      title="Choose Your Design"
      subtitle="Browse our souvenir designs and choose your perfect match"
      packageLink="/packages/souvenir"
      inquiryLink="/#contact"
      inquiryText="Need Help?"
       designs={[
                    {
                      slug: 'traditional',
                      cover: sample1,
                      images: [sample1, sample2, sample3, sample4],
                      title: 'Traditional Invitation',
                      desc: 'A classic traditional invitation perfect for romantic and garden-inspired weddings.',
                      details: [
                        'Soft minimalist design',
                        'Elegant layout and typography',
                        'Ideal for classic and romantic themes',
                        'Customizable wording and colors',
                      ],
                      colors: ['blue', 'red', 'rustic', 'black'],
                    },
                    {
                      slug: 'pull-out',
                      cover: sample2,
                      images: [sample2],
                      title: 'Pull-out Invitation',
                      desc: 'A clean and modern wedding invitation for couples who prefer a non-conventional style of opening invitations.',
                      details: [
                        'Modern and clean design',
                        'Simple and classy layout',
                        'Great for minimalist weddings',
                        'Customizable details and text',
                      ],
                      colors: ['blue', 'red', 'rustic', 'black'],
                    },
                    {
                      slug: 'passport',
                      cover: sample3,
                      images: [sample3],
                      title: 'Passport Invitation',
                      desc: 'A warm and charming invitation style that suits couples who love to travel.',
                      details: [
                        'Philippine passport-inspired design',
                        'Warm earthy tones',
                        'Perfect for outdoor weddings',
                        'Customizable theme colors',
                      ],
                      colors: ['blue', 'red', 'rustic', 'black'],
                    },
                    {
                      slug: 'scroll',
                      cover: sample4,
                      images: [sample4],
                      title: 'Scroll Invitation',
                      desc: 'A timeless invitation design with a formal and refined look for elegant wedding celebrations.',
                      details: [
                        'Classic and sophisticated style',
                        'Clean formal presentation',
                        'Suitable for elegant wedding themes',
                        'Custom layout and text available',
                      ],
                      colors: ['blue', 'red', 'rustic', 'black'],
                    },
                    {
                      slug: 'flap',
                      cover: sample4,
                      images: [sample4], 
                      title: 'Flap Invitation',
                      desc: 'A timeless invitation design with a formal and refined look for elegant wedding celebrations.',
                      details: [
                        'Classic and sophisticated style',
                        'Clean formal presentation',
                        'Suitable for elegant wedding themes',
                        'Custom layout and text available',
                      ],
                      colors: ['blue', 'red', 'rustic', 'black'],
                    },
                  ]}
      features={[
        'Beautiful keepsakes for special events',
        'Customizable according to your theme',
        'Great for weddings, birthdays, and baptisms',
        'Practical and memorable gift options',
      ]}
    />
  )
}

export default DesignsSouvenirSubPage