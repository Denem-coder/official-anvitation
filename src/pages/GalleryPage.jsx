import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

import wedding1 from '../assets/img/gallery-img/wedding-invitation-1.png';
import wedding2 from '../assets/img/gallery-img/wedding-invitation-2.png';
import wedding3 from '../assets/img/gallery-img/wedding-invitation-3.png';
import wedding5 from '../assets/img/gallery-img/wedding-invitation-5.png';
import wedding6 from '../assets/img/gallery-img/wedding-invitation-6.png';
import wedding7 from '../assets/img/gallery-img/wedding-invitation-7.png';
import wedding8 from '../assets/img/gallery-img/wedding-invitation-8.png';
import wedding9 from '../assets/img/gallery-img/wedding-invitation-9.png';
import wedding10 from '../assets/img/gallery-img/wedding-invitation-10.png';
import birthday1 from '../assets/img/gallery-img/birthday-invitation-1.png';
import birthday2 from '../assets/img/gallery-img/birthday-invitation-2.png';
import baptismal1 from '../assets/img/gallery-img/baptismal-invitation-1.png';
import baptismal2 from '../assets/img/gallery-img/baptismal-invitation-2.png';
import baptismal3 from '../assets/img/gallery-img/baptismal-invitation-3.png';
import souvenir1 from '../assets/img/gallery-img/souvenir-1.png';
import souvenir2 from '../assets/img/gallery-img/souvenir-2.png';
import souvenir3 from '../assets/img/gallery-img/souvenir-3.png';

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    { id: 1, src: wedding1, title: 'Blue Passport Invitation', category: 'Wedding' },
    { id: 2, src: wedding2, title: 'Black Flap Invitation', category: 'Wedding' },
    { id: 3, src: wedding3, title: 'White Fan Invitation', category: 'Wedding' },
    { id: 4, src: wedding5, title: 'Sage Green Traditional Invitation', category: 'Wedding' },
    { id: 5, src: wedding6, title: 'Sage Green Trifold Invitation', category: 'Wedding' },
    { id: 6, src: wedding7, title: 'Blue Glittery Pull-out Invitation', category: 'Wedding' },
    { id: 7, src: wedding8, title: 'Blue Traditional Invitation', category: 'Wedding' },
    { id: 8, src: wedding9, title: 'Rustic Pull-out Invitation', category: 'Wedding' },
    { id: 9, src: wedding10, title: 'Rustic Pull-out Invitation', category: 'Wedding' },
    { id: 10, src: birthday1, title: 'Birthday Invitation 1', category: 'Birthday' },
    { id: 11, src: birthday2, title: 'Birthday Invitation 2', category: 'Birthday' },
    { id: 12, src: baptismal1, title: 'Baptismal Invitation 1', category: 'Baptismal' },
    { id: 13, src: baptismal2, title: 'Baptismal Invitation 2', category: 'Baptisma2' },
    { id: 14, src: baptismal3, title: 'Baptismal Invitation 3', category: 'Baptismal' },
  ];

  const categories = ['All', 'Wedding', 'Birthday', 'Baptismal', 'Souvenirs'];

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
        <BackButton />

        {/* Header */}
        <div className="text-center mt-6 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Gallery
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Browse some of our invitation and souvenir designs. Find the style
            that matches your event and get inspired for your own order.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeCategory === category
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-400 hover:text-orange-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <span className="inline-block text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full mb-2">
                  {item.category}
                </span>
                <h2 className="text-sm md:text-base font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Click to preview</p>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-900">
            Found a style you like?
          </h3>
          <p className="text-gray-600 mt-2">
            Send us your preferred design peg and we’ll help customize it for your event.
          </p>
          <Link
            to="/#contact"
            className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-orange-600 transition"
          >
            Inquire Now
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain bg-white"
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-500 font-semibold">
                  {selectedImage.category}
                </p>
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedImage.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;