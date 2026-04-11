import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: "Maria Santos",
    rating: 5,
    comment: "Super ganda ng invitations namin! Ang bilis pa ng transaction. Highly recommended!",
  },
  {
    id: 2,
    name: "John Cruz",
    rating: 5,
    comment: "Very accommodating and quality prints. Will definitely order again!",
  },
  {
    id: 3,
    name: "Angela Reyes",
    rating: 4,
    comment: "Affordable and beautiful designs. Thank you so much!",
  },
];

function Reviews() {
  return (
    <section id="reviews" className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Clients Say
        </h2>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              
              {/* Stars */}
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 mb-4 italic">
                "{review.comment}"
              </p>

              {/* Name */}
              <h4 className="font-semibold text-gray-800">
                - {review.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;