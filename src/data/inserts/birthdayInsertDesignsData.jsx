// src/data/insertDesignsData.jsx

import { GiThirdEye } from 'react-icons/gi'

//MICKEY MOUSE TRADITIONAL INSERT DESIGNS
import mickeyTraditionalFront from "../../assets/img/insert-designs-img/birthday/mickey-insert-front.png";
import mickeyTraditionalInside from "../../assets/img/insert-designs-img/birthday/mickey-insert-inside.png";
import mickeyTraditionalThird from "../../assets/img/insert-designs-img/birthday/mickey-insert-third.png";
import mickeyTraditionalBack from "../../assets/img/insert-designs-img/birthday/mickey-insert-back.png";

import onepieceTraditionalCover from "../../assets/img/insert-designs-img/birthday/traditional-2-onepiece-cover.png";
import onepieceTraditionalFront from "../../assets/img/insert-designs-img/birthday/onepiece-insert-1-front.png";

import babybossTraditionalCover from "../../assets/img/insert-designs-img/birthday/traditional-3-babyboss-cover.png";
import babybossTraditionalFront from "../../assets/img/insert-designs-img/birthday/babyboss-insert-1-front.png";

import astronautTraditionalCover from "../../assets/img/insert-designs-img/birthday/traditional-4-astronaut-cover.png";
import astronautTraditionalFront from "../../assets/img/insert-designs-img/birthday/astronaut-insert-1-front.png";

import robloxTraditionalCover from "../../assets/img/insert-designs-img/birthday/traditional-5-roblox-cover.png";
import robloxTraditionalFront from "../../assets/img/insert-designs-img/birthday/roblox-insert-1-front.png";

// 👉 (Optional: add inside/back images later)

const birthdayInsertDesignsData = [
   {
  id: 'traditional-mickey-insert',
  category: 'birthday',
  designSlugs: ['traditional'],
  motif: 'mickey',
  layout: 'regular',
  title: 'Mickey Mouse Inserts',
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
  id: 'traditional-onepiece-insert',
  category: 'birthday',
  designSlugs: ['traditional'],
  motif: 'onepiece',
  layout: 'regular',
  title: 'One Piece Inserts',
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

  cover: onepieceTraditionalFront,
  isActive: true,
},
{
  id: 'traditional-babyboss-insert',
  category: 'birthday',
  designSlugs: ['traditional'],
  motif: 'babyboss',
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
    front: babybossTraditionalFront,
    inside: null,
    third: null,
    back: null,
  },

  cover: babybossTraditionalFront,
  isActive: true,
},
{
  id: 'traditional-astronaut-insert',
  category: 'birthday',
  designSlugs: ['traditional'],
  motif: 'astronaut',
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
    front: astronautTraditionalFront,
    inside: null,
    third: null,
    back: null,
  },

  cover: astronautTraditionalFront,
  isActive: true,
},
{
  id: 'traditional-roblox-insert',
  category: 'birthday',
  designSlugs: ['traditional'],
  motif: 'roblox',
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
    front: robloxTraditionalFront,
    inside: null,
    third: null,
    back: null,
  },

  cover: robloxTraditionalFront,
  isActive: true,
}
]

export default birthdayInsertDesignsData