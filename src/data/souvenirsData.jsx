import cardholder from '../assets/img/souvenirs-img/souvenir-1-cardholder.png'
import acrylicRefmagnet from '../assets/img/souvenirs-img/souvenir-2-refmagnet-acrylic.png'
import facecutRefmagnet from '../assets/img/souvenirs-img/souvenir-2-refmagnet-facecut.png'
import atmRefmagnet from '../assets/img/souvenirs-img/souvenir-2-refmagnet-atmsized.png'
import glassCupCover from '../assets/img/souvenirs-img/souvenir-3-glasscup.png'
import glassCupInside from '../assets/img/souvenirs-img/souvenir-3-glasscup-inside.png'
import keychain from '../assets/img/souvenirs-img/souvenir-4-keychain.png'

const souvenirsData = [
  {
    id: 'acrylic-refmagnet',
    category: 'ref-magnets',
    name: 'Acrylic Ref Magnet',
    price: 8,
    unit: 'pc',
    minQty: 10,
    bestSeller: true,
    image: acrylicRefmagnet,
    description: 'Clear acrylic magnet with vibrant photo print.',
    colors: ['Black'],
    designs: [
      {
        id: 'acrylic-refmagnet-standard',
        name: 'Standard Acrylic Design',
        image: acrylicRefmagnet,
      },
    ],
    gallery: [acrylicRefmagnet],
  },
  {
    id: 'facecut-refmagnet',
    category: 'ref-magnets',
    name: 'Facecut Ref Magnet',
    price: 10,
    unit: 'pc',
    minQty: 10,
    image: facecutRefmagnet,
    description: 'Custom face-cut magnet with unique shape.',
    colors: ['Blue'],
    designs: [
      {
        id: 'facecut-refmagnet-standard',
        name: 'Standard Facecut Design',
        image: facecutRefmagnet,
      },
    ],
    gallery: [facecutRefmagnet],
  },
  {
    id: 'atm-refmagnet',
    category: 'ref-magnets',
    name: 'ATM Size Ref Magnet',
    price: 12,
    unit: 'pc',
    minQty: 10,
    image: atmRefmagnet,
    description: 'Compact ATM-sized ref magnet souvenir.',
    colors: ['Rustic Orange'],
    designs: [
      {
        id: 'atm-refmagnet-standard',
        name: 'Standard ATM Size Design',
        image: atmRefmagnet,
      },
    ],
    gallery: [atmRefmagnet],
  },
  {
    id: 'card-holder',
    category: 'card-holder',
    name: 'Card Holder',
    price: 15,
    unit: 'pc',
    minQty: 10,
    image: cardholder,
    description: 'Simple and useful personalized card holder souvenir.',
    colors: ['Brown'],
    designs: [
      {
        id: 'card-holder-standard',
        name: 'Standard Card Holder Design',
        image: cardholder,
      },
    ],
    gallery: [cardholder],
  },
  {
    id: 'glass-cup',
    category: 'glass-cup',
    name: 'Glass Cup',
    price: 35,
    unit: 'pc',
    minQty: 10,
    image: glassCupCover,
    description: 'Elegant personalized glass cup souvenir.',
    colors: ['Clear', 'Frosted'],
    designs: [
      {
        id: 'glass-cup-cover',
        name: 'Glass Cup',
        image: glassCupCover,
      },
    //   {
    //     id: 'glass-cup-inside',
    //     name: 'Inside View',
    //     image: glassCupInside,
    //   },
    ],
    gallery: [glassCupCover, glassCupInside],
  },
  {
    id: 'keychain',
    category: 'keychain',
    name: 'Keychain',
    price: 15,
    unit: 'pc',
    minQty: 20,
    image: keychain,
    description: 'Personalized keychain souvenir.',
    colors: ['Gold', 'Silver', 'Black'],
    designs: [
      {
        id: 'keychain-standard',
        name: 'Standard Keychain Design',
        image: keychain,
      },
    ],
    gallery: [keychain],
  },
]

export default souvenirsData