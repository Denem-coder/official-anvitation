// src/data/insertDesignsData.jsx

import { GiThirdEye } from 'react-icons/gi'

//MICKEY MOUSE TRADITIONAL INSERT DESIGNS
import mickeyTraditionalFront from "../../assets/img/insert-designs-img/birthday/mickey-insert-front.png";
import mickeyTraditionalInside from "../../assets/img/insert-designs-img/birthday/mickey-insert-inside.png";
import mickeyTraditionalThird from "../../assets/img/insert-designs-img/birthday/mickey-insert-third.png";
import mickeyTraditionalBack from "../../assets/img/insert-designs-img/birthday/mickey-insert-back.png";

import onepieceTraditionalCover from "../../assets/img/insert-designs-img/birthday/traditional-2-onepiece-cover.png";
import onepieceTraditionalFront from "../../assets/img/insert-designs-img/birthday/onepiece-insert-1-front.png";

// 👉 (Optional: add inside/back images later)

const birthdayInsertDesignsData = [
   {
  id: 'traditional-mickey-insert-1',
  category: 'birthday',
  designSlugs: ['traditional'],
  motif: 'mickey',
  layout: 'regular',
  title: 'Traditional Mickey Mouse Insert Set 1',
  desc: 'Fun Mickey Mouse-themed insert set perfect for birthday celebrations.',

  pageOrder: [
    { key: 'front', label: 'Front' },
    { key: 'inside', label: 'Inside' },
    { key: 'third', label: 'Third' },
    { key: 'back', label: 'Back' },
  ],

  pages: {
    front: mickeyTraditionalFront,
    inside: mickeyTraditionalInside,
    third: mickeyTraditionalThird,
    back: mickeyTraditionalBack,
  },

  cover: mickeyTraditionalFront,
  isActive: true,
},
{
  id: 'traditional-onepiece-insert-1',
  category: 'birthday',
  designSlugs: ['traditional'],
  motif: 'onepiece',
  layout: 'regular',
  title: 'Traditional One Piece Insert Set 1',
  desc: 'Fun Mickey Mouse-themed insert set perfect for birthday celebrations.',

  pageOrder: [
    { key: 'front', label: 'Front' },
    { key: 'inside', label: 'Inside' },
    { key: 'third', label: 'Third' },
    { key: 'back', label: 'Back' },
  ],

  pages: {
    front: onepieceTraditionalFront,
    inside: null,
    third: null,
    back: null,
  },

  cover: onepieceTraditionalCover,
  isActive: true,
}
]

export default birthdayInsertDesignsData