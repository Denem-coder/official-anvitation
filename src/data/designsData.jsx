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

import flappeach from '../assets/img/designs-img/wedding/flap-1-peach-cover.png'
import flapsagegreen from '../assets/img/designs-img/wedding/flap-2-sagegreen-cover.png'

// BIRTHDAY
import mickeymousetheme from '../assets/img/designs-img/birthday/traditional-1-mickey-cover.png'
import onepiecetheme from '../assets/img/designs-img/birthday/traditional-2-onepiece-cover.png'
import babybosstheme from '../assets/img/designs-img/birthday/traditional-3-babyboss-cover.png'
import astronauttheme from '../assets/img/designs-img/birthday/traditional-4-astronaut-cover.png'
import robloxtheme from '../assets/img/designs-img/birthday/traditional-5-roblox-cover.png'

// DEBUT
import scrollgold1cover from '../assets/img/designs-img/debut/scroll-1-gold-cover.png'

// BAPTISMAL
import donaldduckcover from '../assets/img/designs-img/baptismal/traditional-1-donaldduck-cover.png'
import mickeymousecover from '../assets/img/designs-img/baptismal/traditional-2-mickey-cover.png'

const designsData = {
  wedding: [
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
      isBestSeller: true,
      sold: null,
      micro: "Includes pull-out envelope + inserts",
      tags: ['pull-out'],
      colors: ['Blue', 'Red', 'Green', 'Orange', 'Black', 'Gold'],
      inclusions: [
        'Elegant Pull-out Envelope',
        '3-4 Insert Cards',
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
        price: 120,
        isBestSeller: false,
        sold: null,
        micro: "Includes passport + boardpass",
        tags: ['passport'],
        colors: ['Blue', 'Pink', 'Lavender', 'Red'],
        inclusions: [
          'Passport Booklet Invitation',
          'Boarding Pass RSVP Card',
        ],
      },

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
      isBestSeller: false,
      sold: null,
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
        '3–4 Printed Insert Cards',
        'Custom Monogram Sticker Seal',
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
        isBestSeller: false,
        sold: null,
        micro: "Includes customized cover + fan insert with ribbon",
        tags: ['fan'],
        colors: ['Blue', 'Pink', 'Beige', 'White'],
        inclusions: [
          'Elegant Fan Envelope',
          'Double-Sided Fan Invitation',
        ],
      },
      {
        slug: 'flap',
        category: 'wedding',
        cover: flapsagegreen,
        images: [flapsagegreen, flappeach],
        colorImages: {
          // Blue: [flapsagegreen],
          // Red: [flapsagegreen],
          Pink: [flappeach],
          Green: [flapsagegreen],  
          // Orange: [flapsagegreen],
          // Black: [flapsagegreen],  
          // Yellow: [flapsagegreen]
        },
        title: 'Flap Invitation',
        desc: 'A stylish flap-style wedding invitation with an elegant cover and insert card, perfect for a clean and modern look.',
        price: 60,
        isBestSeller: false,
        sold: null,
        micro: 'Includes customized flap cover, printed insert card, and ribbon accent',
        tags: ['flap'],
        colors: [
          // { value: 'blue', label: 'Blue' },
          // { value: 'red', label: 'Red' },
          { value: 'pink', label: 'Pink / Peach' },
          { value: 'green', label: 'Green / Sage Green' },
          // { value: 'orange', label: 'Orange' },
          // { value: 'black', label: 'Black' },
          // { value: 'yellow', label: 'Yellow / Gold' },
        ],
        inclusions: [
          'Customized Flap Cover',
          'Printed Invitation Insert',
          'Ribbon Accent',
        ],
      },
  ],

  birthday: [
     {
    slug: 'traditional',
    category: 'birthday',
    cover: mickeymousetheme,
    images: [mickeymousetheme],
    colorImages: {
      mickey: [mickeymousetheme],
      onepiece: [onepiecetheme],
      babyboss: [babybosstheme],
      astronaut: [astronauttheme],
      roblox: [robloxtheme],
    },
    title: 'Traditional Invitation',
    desc: 'Fun and colorful birthday invitation perfect for themed celebrations.',
    price: 70,
    isBestSeller: true,
    sold: null,
    micro: 'Includes themed envelope + insert cards',
    tags: ['traditional'],
    colors: [
      { value: 'mickey', label: 'Mickey Mouse' },
      { value: 'onepiece', label: 'One Piece' },
      { value: 'babyboss', label: 'Baby Boss' },
      { value: 'astronaut', label: 'Astronaut' },
      { value: 'roblox', label: 'Roblox' },
    ],
    inclusions: [
      'Themed Invitation Card',
      'Matching Envelope',
      'Printed Insert Card',
    ],
  },
    // {
    //   slug: 'pull-out',
    //   category: 'birthday',
    //   cover: traditionalorange,
    //   images: [traditionalorange],
    //   colorImages: {
    //     Blue: [traditionalorange],
    //     Yellow: [traditionalorange],
    //     White: [traditionalorange],
    //   },
    //   title: 'Pull-out Invitation',
    //   desc: 'Modern pull-out baptismal invitation.',
    //   price: 60,
    //   tags: ['pull-out'],
    //   colors: ['Blue', 'Yellow', 'White'],
    //   inclusions: [],
    // },
  ],

  debut: [
      {
    slug: 'scroll',
    category: 'debut',
    cover: scrollgold1cover,
    images: [scrollgold1cover],
    colorImages: {
      Yellow: [scrollgold1cover],
    },
    title: 'Scroll Invitation',
    desc: 'Elegant debut invitation with a luxurious scroll-inspired design.',
    price: 120,
    isBestSeller: false,
    sold: null,
    micro: 'Includes scroll layout + premium envelope',
    tags: ['scroll'],
    colors: [
      { value: 'yellow', label: 'Yellow / Gold' },
    ],
    inclusions: [
      'Premium Scroll Invitation',
      'Elegant Envelope',
      'Printed Insert Details',
    ],
  },
  ],

  baptismal: [
     {
    slug: 'traditional',
    category: 'baptismal',
    cover: donaldduckcover,
    images: [donaldduckcover],
    colorImages: {
      donaldduck: [donaldduckcover],
      mickey: [mickeymousecover],
    },
    title: 'Traditional Invitation',
    desc: 'Cute and charming baptismal invitation designed for memorable celebrations.',
    price: 70,
    isBestSeller: false,
    sold: null,
    micro: 'Includes themed envelope + insert cards',
    tags: ['traditional'],
    colors: [
      { value: 'donaldduck', label: 'Donald Duck' },
      { value: 'mickey', label: 'Mickey Mouse' },
    ],
    inclusions: [
      'Themed Invitation Card',
      'Matching Envelope',
      'Printed Insert Card',
    ],
  },

    // {
    //   slug: 'pull-out',
    //   category: 'baptismal',
    //   cover: traditionalorange,
    //   images: [traditionalorange],
    //   colorImages: {
    //     Blue: [traditionalorange],
    //     Purple: [traditionalorange],
    //     Orange: [traditionalorange],
    //   },
    //   title: 'Pull-out Invitation',
    //   desc: 'Creative pull-out birthday invitation.',
    //   price: 60,
    //   tags: ['pull-out'],
    //   colors: ['Blue', 'Purple', 'Orange'],
    //   inclusions: [],
    // },
  ],
}

export default designsData