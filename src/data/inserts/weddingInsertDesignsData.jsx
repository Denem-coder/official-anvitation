// src/data/insertDesignsData.jsx

import { GiThirdEye } from 'react-icons/gi'
import orangeInsert1Front from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-1-front.png";
import orangeInsert2Front from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-2-front.png";
import orangeInsert3Front from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-3-front.png";
import orangeInsert4Front from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-4-front.png";
import orangeInsert5Front from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-5-front.png";
import orangeInsert5Inside from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-5-inside.png";
import orangeInsert5Third from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-5-third.png";
import orangeInsert5Last from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-5-last.png";
import orangeInsert6Front from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-6-front.png";
import orangeInsert6Inside from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-6-inside.png";
import orangeInsert6Third from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-6-third.png";
import orangeInsert6Last from "../../assets/img/insert-designs-img/wedding/pc/orange-insert-6-last.png";


// 👉 (Optional: add inside/back images later)

const weddingInsertDesignsData = [
  {
    id: 'wedding-orange-set-1',
    category: 'wedding',
    designSlug: 'all',
    motif: 'Orange',
    title: 'Orange Inserts Set 1',
    desc: 'Elegant orange-themed insert set for wedding invitations.',

    pages: {
      front: orangeInsert1Front,
      inside: null,
      third: null,
      back: null,
    },

    // used in grid preview
    cover: orangeInsert1Front,

    colors: ['Orange'],
    isActive: true,
  },

  {
    id: 'wedding-orange-set-2',
    category: 'wedding',
    designSlug: 'all',
    motif: 'Orange',
    title: 'Orange Inserts Set 2',
    desc: 'Modern orange insert layout for weddings.',

    pages: {
      front: orangeInsert2Front,
      inside: null,
      third: null,
      back: null,
    },

    cover: orangeInsert2Front,
    colors: ['Orange'],
    isActive: true,
  },

  {
    id: 'wedding-orange-set-3',
    category: 'wedding',
    designSlug: 'all',
    motif: 'Orange',
    title: 'Orange Inserts Set 3',
    desc: 'Clean and minimal orange insert design.',

    pages: {
      front: orangeInsert3Front,
      inside: null,
      third: null,
      back: null,
    },

    cover: orangeInsert3Front,
    colors: ['Orange'],
    isActive: true,
  },

  {
    id: 'wedding-orange-set-4',
    category: 'wedding',
    designSlug: 'all',
    motif: 'Orange',
    title: 'Orange Inserts Set 4',
    desc: 'Elegant orange insert with structured layout.',

    pages: {
      front: orangeInsert4Front,
      inside: null,
      third: null,
      back: null,
    },

    cover: orangeInsert4Front,
    colors: ['Orange'],
    isActive: true,
  },

  {
    id: 'wedding-orange-set-5',
    category: 'wedding',
    designSlug: 'all',
    motif: 'Orange',
    title: 'Orange Inserts Set 5',
    desc: 'Stylish orange insert with modern spacing.',

    pages: {
      front: orangeInsert5Front,
      inside: orangeInsert5Inside,
      third: orangeInsert5Third,
      back: orangeInsert5Last,
      },
      
    cover: orangeInsert5Front,
    colors: ['Orange'],
    isActive: true,
    
  },

  {
    id: 'wedding-orange-set-6',
    category: 'wedding',
    designSlug: 'all',
    motif: 'Orange',
    title: 'Orange Inserts Set 6',
    desc: 'Premium orange insert design for elegant weddings.',

    pages: {
      front: orangeInsert6Front,
      inside: orangeInsert6Inside,
      third: orangeInsert6Third,
      back: orangeInsert6Last,
    },

    cover: orangeInsert6Front,
    colors: ['Orange'],
    isActive: true,
  },
]

export default weddingInsertDesignsData