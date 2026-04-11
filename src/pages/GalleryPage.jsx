import heroimg from '../assets/img/hero-img/hero-img.png';

function GalleryPage() {
  return (
     <section
          id="hero"
          className="min-h-screen flex flex-col items-center text-center p-6 mt-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroimg})` }}
        >
    <div className="max-w-6xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img src="/src/assets/img/gallery-img/wedding-invitation-1.png" alt="Wedding Invitation 1" className="rounded shadow border border-orange-700" /> 
        <img src="/src/assets/img/gallery-img/wedding-invitation-2.png" alt="Wedding Invitation 2" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-3.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-4.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-5.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-6.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-7.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-8.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-9.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        <img src="/src/assets/img/gallery-img/wedding-invitation-10.png" alt="Wedding Invitation 3" className="rounded shadow border border-orange-700" />
        {/* Add more project images */}
      </div>
    </div>
    </section>
  )
}

export default GalleryPage