import weddingImg from '../assets/img/services-img/service-1.png'
import baptismalImg from '../assets/img/services-img/service-2.png'
import birthdayImg from '../assets/img/services-img/service-3.png'
import souvenirsImg from '../assets/img/services-img/service-4.png'

const servicesData = [
  {
    id: 'wedding',
    title: 'Wedding Invitations',
    desc: 'Elegant and customized wedding invitation designs.',
    img: weddingImg,
    link: '/services/wedding',
  },
  {
    id: 'baptismal',
    title: 'Baptismal Invitations',
    desc: 'Soft and meaningful designs for baptismal celebrations.',
    img: baptismalImg,
    link: '/services/baptismal',
  },
  {
    id: 'birthday',
    title: 'Birthday Invitations',
    desc: 'Fun and creative invitation styles for all ages.',
    img: birthdayImg,
    link: '/services/birthday',
  },
  {
    id: 'souvenirs',
    title: 'Souvenirs',
    desc: 'Memorable keepsakes for your special events.',
    img: souvenirsImg,
    link: '/services/souvenir',
  },
]

export default servicesData