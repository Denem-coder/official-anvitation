// src/data/insertDesignsData.jsx

import { GiThirdEye } from 'react-icons/gi'

//MICKEY MOUSE TRADITIONAL INSERT DESIGNS
import mickeyTraditionalFront from "../../assets/img/insert-designs-img/birthday/mickey-insert-front.png";
import mickeyTraditionalInside from "../../assets/img/insert-designs-img/birthday/mickey-insert-inside.png";
import mickeyTraditionalThird from "../../assets/img/insert-designs-img/birthday/mickey-insert-third.png";
import mickeyTraditionalBack from "../../assets/img/insert-designs-img/birthday/mickey-insert-back.png";

import onepieceTraditionalCover from "../../assets/img/insert-designs-img/birthday/traditional-2-onepiece-cover.png";
import onepieceTraditionalFront from "../../assets/img/insert-designs-img/birthday/onepiece-insert-1-front.png";

import scrollgold1cover from "../../assets/img/insert-designs-img/debut/scroll-1-gold-cover.png";
import scrollgold1front from "../../assets/img/insert-designs-img/debut/scroll-gold-1-front.png";

// 👉 (Optional: add inside/back images later)

const debutInsertDesignsData = [
   {
  id: 'scroll-insert-1',
  category: 'debut',
  designSlugs: ['scroll'],
  motif: 'yellow',
  layout: 'regular',
  title: 'Scroll Insert Template 1',
  desc: 'Elegant scroll insert set perfect for debut celebrations.',

  pageOrder: [
    { key: 'front', label: 'Front' },
    { key: 'inside', label: 'Inside' },
    { key: 'third', label: 'Third' },
    { key: 'back', label: 'Back' },
  ],

  pages: {
    front: scrollgold1front,
    inside: null,
    third: null,
    back: null,
  },

  cover: scrollgold1front,
  isActive: true,
},
]

export default debutInsertDesignsData