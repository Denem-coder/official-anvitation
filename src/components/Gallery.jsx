function Gallery() {
  return (
    <section id="gallery" className="bg-orange-50  min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-4xl font-bold mb-8 text-orange-600">Our Works</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <p>Design Sample 1</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p>Design Sample 2</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p>Design Sample 3</p>
        </div>
      </div>
       <a
          href="https://www.facebook.com/messages/t/61563452485945"
          target="_blank"
          className="font-bold bg-white text-orange-600 border border-orange-700 px-10 py-3 mt-10 rounded-full shadow-2xl hover:scale-110 transform transition duration-300 hover:bg-orange-400 hover:text-white"
        >
          Check Our Works
        </a>
    </section>
  )
}

export default Gallery