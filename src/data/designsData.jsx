import img1 from '../assets/img/designs-img/design-1.png'
import img2 from '../assets/img/designs-img/design-2.png'
import img3 from '../assets/img/designs-img/design-3.png'
import traditionalblue from '../assets/img/designs-img/traditional-blue.png'
import traditionalred from '../assets/img/designs-img/traditional-red.png'
import traditionalgreen from '../assets/img/designs-img/traditional-green.png'
import traditionalorange from '../assets/img/designs-img/traditional-orange.png'
import traditionalblack from '../assets/img/designs-img/traditional-black.png'
import traditionalgold from '../assets/img/designs-img/traditional-gold.png'

import pulloutblue1 from '../assets/img/designs-img/design-2.png'
import passportblue1 from '../assets/img/designs-img/design-3.png'
import passportlavender1 from '../assets/img/designs-img/passport-lavender-1.png'
import passportpink1 from '../assets/img/designs-img/passport-pink-1.png'
import passportred1 from '../assets/img/designs-img/passport-red-1.png'

import fanblue from '../assets/img/designs-img/fan-blue.png'


const designsData = {
  wedding: [
    {
      slug: 'traditional',
      category: 'wedding',
      cover: traditionalorange,
      images: [traditionalorange],
      colorImages: {
        Blue: [traditionalblue],
        Red: [traditionalred],
        Green: [traditionalgreen],  
        Orange: [traditionalorange],
        Black: [traditionalblack],  
        Yellow: [traditionalgold]
      },
      title: 'Traditional Invitation',
      desc: 'Elegant traditional invitation.',
      price: 65,
      micro: "Includes envelope + inserts + sticker seal",
      tags: ['traditional'],
      colors: [
        { value: 'blue', label: 'Blue' },
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'orange', label: 'Orange' },
        { value: 'black', label: 'Black' },
        { value: 'yellow', label: 'Yellow / Gold' },
],
      inclusions: [
        'Premium Envelope',
        '3–4 Printed Insert Pages',
        'Custom Monogram Sticker Seal',
      ],
    },
    {
      slug: 'pull-out',
      category: 'wedding',
      cover: pulloutblue1,
      images: [pulloutblue1],
      colorImages: {
        Blue: [pulloutblue1],
        Red: [pulloutblue1],
        Pink: [pulloutblue1],
        Orange: [pulloutblue1],
        Black: [pulloutblue1],
        Gold: [pulloutblue1],
      },
      title: 'Pull-out Invitation',
      desc: 'Elegant pull-out invitation.',
      price: 75,
      micro: "Includes pull-out envelope + inserts",
      tags: ['pull-out'],
      colors: ['Blue', 'Red', 'Green', 'Orange', 'Black', 'Gold'],
      inclusions: [
        'Elegant pull-out envelope included',
        '3-4 insert cards included',
      ],
    },
    {
        slug: 'passport',
        category: 'wedding',
        cover: passportblue1,
        images: [passportblue1],
        colorImages: {
          Blue: [passportblue1],
          Pink: [passportpink1],
          Lavender: [passportlavender1],
          Red: [passportred1],
        },
        title: 'Passport Invitation',
        desc: 'Elegant passport invitation.',
        price: 100,
        micro: "Includes passport + boardpass",
        tags: ['passport'],
        colors: ['Blue', 'Pink', 'Beige', 'White'],
        inclusions: [
          '1 Passport booklet invitation',
          '1 Boardpass for RSVP',
        ],
      },

      {
        slug: 'fan',
        category: 'wedding',
        cover: fanblue,
        images: [fanblue],
        colorImages: {
          Blue: [fanblue],
          Pink: [fanblue],
          Lavender: [fanblue],
          Red: [fanblue],
        },
        title: 'Fan Invitation',
        desc: 'Elegant fan invitation.',
        price: 55,
        micro: "Includes customized cover + fan insert with ribbon",
        tags: ['fan'],
        colors: ['Blue', 'Pink', 'Beige', 'White'],
        inclusions: [
          '1 fan envelope',
          '1 back-to-back fan',
        ],
      },
  ],

  baptismal: [
    {
      slug: 'traditional',
      category: 'baptismal',
      cover: traditionalorange,
      images: [traditionalorange],
      colorImages: {
        Blue: [traditionalblue],
        Red: [traditionalred],
        Black: [traditionalblack],
      },
      title: 'Traditional Invitation',
      desc: 'Elegant baptismal invitation.',
      price: 60,
      tags: ['traditional'],
      colors: ['Blue', 'Pink', 'White'],
      inclusions: [],
    },
    {
      slug: 'pull-out',
      category: 'baptismal',
      cover: traditionalorange,
      images: [traditionalorange],
      colorImages: {
        Blue: [traditionalorange],
        Yellow: [traditionalorange],
        White: [traditionalorange],
      },
      title: 'Pull-out Invitation',
      desc: 'Modern pull-out baptismal invitation.',
      price: 60,
      tags: ['pull-out'],
      colors: ['Blue', 'Yellow', 'White'],
      inclusions: [],
    },
  ],

  birthday: [
    {
      slug: 'traditional',
      category: 'birthday',
      cover: traditionalorange,
      images: [traditionalorange],
      colorImages: {
        Blue: [traditionalorange],
        Pink: [traditionalorange],
        Red: [traditionalorange],
        Yellow: [traditionalorange],
      },
      title: 'Traditional Invitation',
      desc: 'Fun traditional birthday invitation.',
      price: 60,
      tags: ['traditional'],
      colors: ['Blue', 'Pink', 'Red', 'Yellow'],
      inclusions: [],
    },
    {
      slug: 'pull-out',
      category: 'birthday',
      cover: traditionalorange,
      images: [traditionalorange],
      colorImages: {
        Blue: [traditionalorange],
        Purple: [traditionalorange],
        Orange: [traditionalorange],
      },
      title: 'Pull-out Invitation',
      desc: 'Creative pull-out birthday invitation.',
      price: 60,
      tags: ['pull-out'],
      colors: ['Blue', 'Purple', 'Orange'],
      inclusions: [],
    },
  ],

  souvenir: [
    {
      slug: 'traditional',
      category: 'souvenir',
      cover: traditionalorange,
      images: [traditionalorange],
      colorImages: {
        Blue: [traditionalorange],
        Gold: [traditionalorange],
        White: [traditionalorange],
      },
      title: 'Traditional Souvenir',
      desc: 'Elegant traditional souvenir.',
      price: 60,
      tags: ['traditional'],
      colors: ['Blue', 'Gold', 'White'],
      inclusions: [],
    },
    {
      slug: 'pull-out',
      category: 'souvenir',
      cover: traditionalorange,
      images: [traditionalorange],
      colorImages: {
        Blue: [traditionalorange],
        Pink: [traditionalorange],
        White: [traditionalorange],
      },
      title: 'Pull-out Souvenir',
      desc: 'Creative pull-out souvenir.',
      price: 60,
      tags: ['pull-out'],
      colors: ['Blue', 'Pink', 'White'],
      inclusions: [],
    },
  ],
}

export default designsData