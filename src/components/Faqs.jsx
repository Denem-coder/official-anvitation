import { useState } from "react";

function Faqs() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Choose your design, select a package or quantity, then add it to your cart. Proceed to checkout and fill out your order details. Once submitted, your order will be recorded in our system and you can track its status anytime.",
    },
    {
      question: "Do you provide layout/design?",
      answer:
        "Yes! We provide free pre-made layout templates when you avail of our printing services. If you prefer a unique design, we also offer customized layouts for an additional fee.",
    },
    {
      question: "How long is the production time?",
      answer:
        "Usually 3–5 days depending on quantity. Rush orders are also available depending on schedule and workload.",
    },
    {
      question: "Do you accept rush orders?",
      answer:
        "Yes, we accept rush orders depending on availability. Additional fees may apply for priority processing.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Yes! We offer nationwide shipping through trusted courier services. Delivery fees may vary based on your location, and we also offer free pickup at our shop in 42 Telbang, Bayambang, Pangasinan.",
    },
    {
      question: "What are your payment methods?",
      answer:
        "We accept GCash, Maya, or bank transfer. Payment instructions will be provided after order submission or during confirmation.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes. After placing your order, you will receive an order number which you can use on our Track Order page to see real-time updates on your order status.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="p-6 bg-white scroll-mt-50 pt-20 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600 tracking-[0.10em]">
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