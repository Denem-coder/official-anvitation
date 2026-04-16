import ServiceTemplate from '../services/ServiceTemplate'
import sample1 from '../../assets/img/gallery-img/birthday-invitation-1.png'

function ServiceBirthdaySubPage() {
  return (
    <ServiceTemplate
      badge="Birthday Invitations"
      title="Fun Invitations for Every Birthday Celebration"
      subtitle="Explore birthday invitation styles that are playful, personalized, and perfect for memorable celebrations."
      packageLink="/package/birthday"
      inquiryLink="/#contact"
      inquiryText="Need Help?"
      designs={[
        {
          slug: 'playful-birthday',
          img: sample1,
          title: 'Playful Birthday Invitation',
          desc: 'A fun and colorful invitation design perfect for lively birthday celebrations.',
          details: [
            'Bright and fun layout',
            'Suitable for kids and themed parties',
            'Customizable colors and wording',
            'Printed with vibrant quality',
          ],
        },
      ]}
      features={[
        'Fun and creative birthday themes',
        'Custom designs for kids and adults',
        'Bright, stylish, and personalized layouts',
        'High-quality prints for memorable celebrations',
      ]}
    />
  )
}

export default ServiceBirthdaySubPage