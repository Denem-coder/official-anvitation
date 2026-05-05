function Contact() {
  const pageId = '61563452485945'

  const message = encodeURIComponent(
    'Hi! I’m interested in ordering invitations/souvenirs. Can you assist me?'
  )

  const messengerLink = `https://m.me/${pageId}?text=${message}`

  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold mb-6 tracking-[0.10em]">
        Contact Us
      </h2>

      <p className="mb-4">
        Message us for orders and inquiries
      </p>

      <a
        href={messengerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
      >
        Chat on Messenger
      </a>
    </section>
  )
}

export default Contact