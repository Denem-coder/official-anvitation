import additionalcard from '../assets/img/addons-img/addons-additional-card.png'
import rsvpcard from '../assets/img/addons-img/addons-rsvp-card.png'
import vowcard from '../assets/img/addons-img/addons-vow-card.png'
import waxseal from '../assets/img/addons-img/addons-wax-seal.png'
import waxsealflower from '../assets/img/addons-img/addons-wax-seal-flower.png'

const addOnsData = {
  wedding: [
    {
      id: 'additional-card',
      name: 'Additional Card',
      price: 8,
      unit: 'pc',
      image: additionalcard,
      description:
        'Add an extra insert card for directions, reminders, gift notes, or other wedding details.',
    },
    {
      id: 'rsvp-card',
      name: 'RSVP Card',
      price: 4,
      unit: 'pc',
      image: rsvpcard,
      description:
        'A dedicated RSVP card where guests can confirm their attendance and response details.',
    },
    {
      id: 'vow-card',
      name: 'Vow Card',
      price: 18,
      unit: 'set',
      image: vowcard,
      description:
        'Elegant vow cards for the bride and groom, perfect for writing heartfelt promises.',
    },
    {
      id: 'wax-seal',
      name: 'Wax Seal',
      price: 30,
      unit: 'pc',
      image: waxseal,
      description:
        'Classic wax seal accent that adds a luxurious and timeless finish to your invitations.',
    },
    {
      id: 'wax-seal-with-flower',
      name: 'Wax Seal with Flower',
      price: 40,
      unit: 'pc',
      image: waxsealflower,
      description:
        'Premium wax seal with dried flower detail for a romantic and sophisticated touch.',
    },
  ],

  birthday: [],
  baptismal: [],
  souvenirs: [],
}

export default addOnsData