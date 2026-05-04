// src/data/insertDesignsData.jsx

import cardholderCover from "../../assets/img/insert-designs-img/souvenir/souvenir-cardholder.png";
import refmagnetAcrylicCover from "../../assets/img/insert-designs-img/souvenir/souvenir-refmagnet-acrylic.png";
import refmagnetFacecutCover from "../../assets/img/insert-designs-img/souvenir/souvenir-refmagnet-facecut.png";

const souvenirInsertDesignsData = [
  {
    id: 'souvenir-acrylic-refmagnet',
    category: 'souvenir',
    designSlugs: ['acrylic-refmagnet'],
    motif: 'black',
    layout: 'single',
    title: 'Acrylic Ref Magnet Design',
    desc: 'A glossy acrylic ref magnet layout made for elegant and memorable souvenirs.',

    pageOrder: [
      { key: 'front', label: 'Preview' },
    ],

    pages: {
      front: refmagnetAcrylicCover,
    },

    cover: refmagnetAcrylicCover,
    isActive: true,
  },

  {
    id: 'souvenir-cardholder',
    category: 'souvenir',
    designSlugs: ['cardholder'],
    motif: 'brown',
    layout: 'single',
    title: 'Card Holder Souvenir Design',
    desc: 'A practical card holder souvenir layout with a clean and personalized event design.',

    pageOrder: [
      { key: 'front', label: 'Preview' },
    ],

    pages: {
      front: cardholderCover,
    },

    cover: cardholderCover,
    isActive: true,
  },

  {
    id: 'souvenir-facecut-refmagnet',
    category: 'souvenir',
    designSlugs: ['facecut-refmagnet'],
    motif: 'blue',
    layout: 'single',
    title: 'Face-Cut Ref Magnet Design',
    desc: 'A fun personalized face-cut ref magnet layout perfect for birthdays, baptismals, and special events.',

    pageOrder: [
      { key: 'front', label: 'Preview' },
    ],

    pages: {
      front: refmagnetFacecutCover,
    },

    cover: refmagnetFacecutCover,
    isActive: true,
  },
]

export default souvenirInsertDesignsData