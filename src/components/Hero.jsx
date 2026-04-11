import { Link } from 'react-router-dom';

import heroimg from '../assets/img/hero-img/hero-img.png';

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center p-6 pt-28 mt-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroimg})` }}
    >
      <div>
        <h1 className="text-5xl font-bold text-white mb-4 animate-float">
          <span>Looking for a perfect invitation</span>
          <p className="mt-1 mb-1">and souvenirs for your upcoming event?</p>
        </h1>

        <p className="text-2xl text-white mb-6">
          We offer a wide range of invitation styles and souvenirs for weddings, birthdays, and all special occasions.
        </p>

        <div className='flex flex-col items-center'>
        <Link
          to="/gallery"
          className="bg-orange-500 text-white font-bold px-10 py-3 rounded-full shadow-lg hover:scale-110 transform transition duration-300 mb-3"
        >
          Browse Designs
        </Link>

        <Link
          to="/packages"
          className="bg-white border border-orange-500 text-orange-500 font-bold px-10 py-3 rounded-full shadow-lg hover:scale-110 transform transition duration-300"
        >
          View Packages
        </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;