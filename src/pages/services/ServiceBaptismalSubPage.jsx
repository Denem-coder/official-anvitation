import ServiceTemplate from '../services/ServiceTemplate'
import sample1 from '../../assets/img/gallery-img/baptismal-invitation-1.png'

function ServiceBaptismalSubPage() {
  return (
    <ServiceTemplate
      badge="Baptismal Invitations"
      title="Meaningful Invitations for Baptismal Celebrations"
      subtitle="Browse elegant baptismal invitation styles prepared for warm and memorable family celebrations."
      packageLink="/package/baptismal"
      inquiryLink="/#contact"
      inquiryText="Need Help?"
      designs={[
        {
          slug: 'classic-baptismal',
          img: sample1,
          title: 'Classic Baptismal Invitation',
          desc: 'A soft and elegant invitation design perfect for meaningful baptismal celebrations.',
          details: [
            'Gentle and clean design',
            'Suitable for formal family gatherings',
            'Customizable wording',
            'Printed in high quality finish',
          ],
        },
      ]}
      features={[
        'Soft and elegant baptismal themes',
        'Meaningful and child-friendly styles',
        'Customizable wording and layout',
        'Quality prints for special family celebrations',
      ]}
    />
  )
}

export default ServiceBaptismalSubPage