import img1 from '../assets/img/designs-img/design-1.png'
import img2 from '../assets/img/designs-img/design-2.png'

const designData = {
  wedding: [
    {
      slug: 'traditional',
      cover: img1,
      images: [img1, img2],
      title: 'Traditional Invitation',
      desc: 'Elegant traditional invitation',
      price: 60,
      tags: ['traditional'],
      colors: ['Blue', 'Sage Green', 'Gold', 'Black'],
      inclusions: [
        'A simple baronial envelope',
        '4 inserts',
        'Ribbon and sticker seal',
      ],
    },
    {
      slug: 'pull-out',
      cover: img2,
      images: [img1, img2],
      title: 'Pull-out Invitation',
      desc: 'Elegant pull-out invitation',
      price: 55,
      tags: ['pull-out'],
      colors: ['Blue', 'Pink', 'Beige', 'White'],
    },
  ],

  baptismal: [
    {
      slug: 'traditional',
      title: 'Traditional Invitation',
      img: img1,
      tags: ['traditional'],
      colors: ['Blue', 'Pink', 'White'],
    },
    {
      slug: 'pull-out',
      title: 'Pull-out Invitation',
      img: img2,
      tags: ['pull-out'],
      colors: ['Blue', 'Yellow', 'White'],
    },
  ],

  birthday: [
    {
      slug: 'traditional',
      title: 'Traditional Invitation',
      img: img1,
      tags: ['traditional'],
      colors: ['Blue', 'Pink', 'Red', 'Yellow'],
    },
    {
      slug: 'pull-out',
      title: 'Pull-out Invitation',
      img: img2,
      tags: ['pull-out'],
      colors: ['Blue', 'Purple', 'Orange'],
    },
  ],

  souvenir: [
    {
      slug: 'traditional',
      title: 'Traditional Souvenir',
      img: img1,
      tags: ['traditional'],
      colors: ['Blue', 'Gold', 'White'],
    },
    {
      slug: 'pull-out',
      title: 'Pull-out Souvenir',
      img: img2,
      tags: ['pull-out'],
      colors: ['Blue', 'Pink', 'White'],
    },
  ],
}

export default designData