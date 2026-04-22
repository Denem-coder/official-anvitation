import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: "Xutchille Muyargas",
    rating: 5,
    comment: "Thank you ANvitation for being accommodating and updating me all the time. Sooo many designs to choose from and was very understanding in terms of their client's preferences. Will definitely avail again of their service. Even pahabol edits were also accommodated plus I got a freebie! Yay! Thank you thank you for helping me prepare for my most special day. ",
  },
  {
    id: 2,
    name: "Jonalyn Erguiza",
    rating: 5,
    comment: "Thank you for the high-quality crafts of yours! 😍 Highly recommended! Napaka accommodating sa mga suggestions namin ☺️ Very satisfied clients here! 🙋💯⭐",
  },
  {
    id: 3,
    name: "Trisha Mae Ramos ",
    rating: 5,
    comment: "Highly recommended 💯💯 Very responsive! Sobrang ganda and quality ng ref magnet na pinagawa namin. Very affordable and super bilis din nagawa.",
  },
  {
    id: 4,
    name: "Karen Lou Lim",
    rating: 5,
    comment: "Highly recommended, 10 stars ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️ Availed their service for monogram layouting and I super like the output. Super patient nila with everything - from answering questions before booking, brainstorming designs, and doing multiple edits (even the smallest ones game sila i-edit para ma-perfect) just to satisfy the client. They even gave us different versions of the final logo. Fast turnaround time + super affordable rates pa.",
  },
  {
    id: 5,
    name: "Gem Macasieb",
    rating: 5,
    comment: "thank you so much sa ginawa nio po na tarpaulin, ref magnet at sa invitation para sa 7th Birthday ng anak ko. I am very happy and satisfied . Ang bilis ng gawa at ang ganda ng mga layout .. thank you thank you ❤️❤️❤️❤️❤️🫰🫰🫰",
  },
];

function Reviews() {
  return (
    <section
      id="reviews"
      className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center text-center p-6"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 tracking-[0.10em]">
          What Our Clients Say
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 mb-4 italic">
                "{review.comment}"
              </p>

              <h4 className="font-semibold text-gray-800">
                - {review.name}
              </h4>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.facebook.com/ANv8e/reviews/?id=61563452485945&sk=reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 inline-block"
          >
            See All Reviews
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;