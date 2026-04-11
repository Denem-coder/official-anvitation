function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white  min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

      <p className="mb-4">Message us for orders and inquiries</p>

      <a
        href="https://www.facebook.com/messages/t/61563452485945"
        target="_blank"
        className="bg-blue-500 text-white px-6 py-3 rounded-full"
      >
        Chat on Messenger
      </a>
    </section>
  )
}

export default Contact