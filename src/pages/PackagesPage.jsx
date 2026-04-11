import BackButton from '../components/BackButton'

function PackagesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-20">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6 text-center">Our Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <img src="/images/project1.jpg" alt="Project 1" className="rounded shadow" />
        <img src="/images/project2.jpg" alt="Project 2" className="rounded shadow" />
        <img src="/images/project3.jpg" alt="Project 3" className="rounded shadow" />
        {/* Add more project images */}
      </div>
    </div>
  )
}

export default PackagesPage