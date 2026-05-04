// src/data/insertDesignsData.jsx

import { GiThirdEye } from 'react-icons/gi'

// DONALD DUCK TRADITIONAL INSERT DESIGNS
import donaldduckTraditionalFront from "../../assets/img/insert-designs-img/baptismal/traditional-1-donaldduck-front.png";
import donaldduckTraditionalInside from "../../assets/img/insert-designs-img/baptismal/traditional-1-donaldduck-inside.png";

//MICKEY MOUSE TRADITIONAL INSERT DESIGNS
import mickeymouseTraditionalFront from "../../assets/img/insert-designs-img/baptismal/traditional-2-mickey-front.png";
import mickeymouseTraditionalInside from "../../assets/img/insert-designs-img/baptismal/traditional-2-mickey-inside.png";
import mickeymouseTraditionalThird from "../../assets/img/insert-designs-img/baptismal/traditional-2-mickey-third.png";
import mickeymouseTraditionalLast from "../../assets/img/insert-designs-img/baptismal/traditional-2-mickey-last.png";



// 👉 (Optional: add inside/back images later)

const baptismalInsertDesignsData = [
   {
  id: 'baptismal-1',
  category: 'baptismal',
  designSlugs: ['traditional'],
  motif: 'donaldduck',
  layout: 'regular',
  title: 'Donald Duck Inserts Set',
  desc: 'Cute Donald Duck themed insert set for baptismal celebrations.',
  pageOrder: [
    { key: 'front', label: 'Front' },
    { key: 'inside', label: 'Inside' },
  ],
  pages: {
    front: donaldduckTraditionalFront,
    inside: donaldduckTraditionalInside,
  },
  cover: donaldduckTraditionalFront,
  isActive: true,
},
{
  id: 'baptismal-2',
  category: 'baptismal',
  designSlugs: ['traditional'],
  motif: 'mickey',
  layout: 'regular',
  title: 'Mickey Mouse Inserts Set',
  desc: 'Cute Mickey Mouse themed insert set for baptismal celebrations.',
  pageOrder: [
    { key: 'front', label: 'Front' },
    { key: 'inside', label: 'Inside' },
    { key: 'third', label: 'Third' },
    { key: 'back', label: 'Back' },
  ],
  pages: {
    front: mickeymouseTraditionalFront,
    inside: mickeymouseTraditionalInside,
    third: mickeymouseTraditionalThird,
    back: mickeymouseTraditionalLast,
  },
  cover: mickeymouseTraditionalFront,
  isActive: true,
},
]

export default baptismalInsertDesignsData