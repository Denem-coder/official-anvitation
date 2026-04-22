import img1 from '../assets/img/designs-img/design-1.png'
import img2 from '../assets/img/designs-img/design-2.png'
import img3 from '../assets/img/designs-img/design-3.png'
import traditionalorange1 from '../assets/img/designs-img/design-1.png'
import pulloutblue1 from '../assets/img/designs-img/design-2.png'
import passportblue1 from '../assets/img/designs-img/design-3.png'
import passportlavender1 from '../assets/img/designs-img/passport-lavender-1.png'
import passportpink1 from '../assets/img/designs-img/passport-pink-1.png'
import passportred1 from '../assets/img/designs-img/passport-red-1.png'


const designsData = {
  wedding: [
    {
      slug: 'traditional',
      category: 'wedding',
      cover: traditionalorange1,
      images: [traditionalorange1],
      colorImages: {
        Blue: [traditionalorange1],
        Red: [traditionalorange1],
        Green: [traditionalorange1],  
        Orange: [traditionalorange1],
        Black: [traditionalorange1],  
      },
      title: 'Traditional Invitation',
      desc: 'Elegant traditional invitation.',
      price: 70,
      tags: ['traditional'],
      colors: ['Blue', 'Red', 'Green', 'Orange', 'Black'],
      inclusions: [
        '1 Envelope',
        '4 Inserts',
        'Sticker seal',
      ],
    },
    {
      slug: 'pull-out',
      category: 'wedding',
      cover: pulloutblue1,
      images: [pulloutblue1],
      colorImages: {
        Blue: [pulloutblue1],
        Pink: [pulloutblue1],
        Beige: [pulloutblue1],
        White: [pulloutblue1],
      },
      title: 'Pull-out Invitation',
      desc: 'Elegant pull-out invitation.',
      price: 70,
      tags: ['pull-out'],
      colors: ['Blue', 'Pink', 'Beige', 'White'],
      inclusions: [
        'Envelope included',
        'Insert cards included',
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
      tags: ['passport'],
      colors: ['Blue', 'Pink', 'Beige', 'White'],
      inclusions: [
        '1 Passport booklet invitation',
        '1 Boardpass for RSVP',
      ],
    },
  ],

  baptismal: [
    {
      slug: 'traditional',
      category: 'baptismal',
      cover: img1,
      images: [img1],
      colorImages: {
        Blue: [img1],
        Pink: [img1],
        White: [img1],
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
      cover: img2,
      images: [img2],
      colorImages: {
        Blue: [img2],
        Yellow: [img2],
        White: [img2],
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
      cover: img1,
      images: [img1],
      colorImages: {
        Blue: [img1],
        Pink: [img1],
        Red: [img1],
        Yellow: [img1],
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
      cover: img2,
      images: [img2],
      colorImages: {
        Blue: [img2],
        Purple: [img2],
        Orange: [img2],
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
      cover: img1,
      images: [img1],
      colorImages: {
        Blue: [img1],
        Gold: [img1],
        White: [img1],
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
      cover: img2,
      images: [img2],
      colorImages: {
        Blue: [img2],
        Pink: [img2],
        White: [img2],
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