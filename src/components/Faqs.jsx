import { useState } from "react";

function Faqs() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply message us on Messenger, send your details, choose a design, and we will guide you through the process.",
    },
    {
      question: "Do you provide layout/design?",
      answer:
        "Yes! We provide free pre-made layout templates when you avail of our printing services. If you prefer a unique design, we also offer customized layouts for an additional fee.",
    },
    {
      question: "How long is the production time?",
      answer:
        "Usually 3–5 days depending on quantity. Rush orders are also available.",
    },
    {
      question: "Do you accept rush orders?",
      answer:
        "Yes, we accept rush orders depending on availability. Additional fees may apply.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Yes! We offer nationwide shipping through trusted courier services. Delivery fees may vary based on your location, but we provide free delivery within downtown Bayambang only.",
    },
    {
      question: "What are your payment methods?",
      answer:
        "We accept GCash, Maya, bank transfer, and cash payments.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="p-6 bg-white scroll-mt-50 pt-20 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl shadow-md p-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <span className="text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faqs;