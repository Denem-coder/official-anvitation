import ServiceTemplate from '../services/ServiceTemplate'
import sample1 from '../../assets/img/gallery-img/souvenir-3.png'

function ServiceSouvenirSubPage() {
  return (
    <ServiceTemplate
      badge="Souvenirs"
      title="Memorable Souvenirs for Every Celebration"
      subtitle="Browse souvenir ideas that are thoughtful, stylish, and perfect for giving guests something to remember."
      packageLink="/package/souvenirs"
      inquiryLink="/#contact"
      inquiryText="Need Help?"
      designs={[
        {
          slug: 'custom-event-souvenir',
          img: sample1,
          title: 'Customized Event Souvenir',
          desc: 'A memorable keepsake designed for special celebrations and heartfelt guest giveaways.',
          details: [
            'Customizable to match your event theme',
            'Suitable for weddings, birthdays, and baptisms',
            'Neat and presentable design',
            'Great as a memorable token for guests',
          ],
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

export default ServiceSouvenirSubPage