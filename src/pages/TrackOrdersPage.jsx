import { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function TrackOrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    "Pending",
    "Confirmed",
    "Designing",
    "Printing",
    "Ready for Pickup",
    "Completed",
  ];

  const getStepIndex = (status) => {
    const map = {
      Pending: 0,
      Confirmed: 1,
      Designing: 2,
      Printing: 3,
      "Ready for Pickup": 4,
      Completed: 5,
    };

    return map[status] ?? 0;
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setOrder(null);

    if (!orderId.trim()) {
      setError("Please enter your order number.");
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("orderNumber", "==", orderId.trim())
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];

        setOrder({
          id: docSnap.id,
          ...docSnap.data(),
        });

        setError("");
      } else {
        setOrder(null);
        setError(
          "We couldn't find your order. Please check your order number."
        );
      }

      setLoading(false);
    });

    // optional: store unsubscribe if you want cleanup later
    return unsubscribe;
  };

  const currentStep = order ? getStepIndex(order.status) : -1;

  const isCancelled = order?.status === "Cancelled";

  return (
    <div className="min-h-screen bg-gray-50 mt-20">

      {/* HERO */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold">
            Track Your Order
          </h1>

          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Stay updated on your invitation order from confirmation up to completion.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <div className="bg-white/20 px-5 py-3 rounded-full text-sm">
              📦 Real-time Status
            </div>

            <div className="bg-white/20 px-5 py-3 rounded-full text-sm">
              🎨 Design Progress
            </div>

            <div className="bg-white/20 px-5 py-3 rounded-full text-sm">
              🚚 Pickup Updates
            </div>

          </div>

        </div>

      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-8">

        {/* SEARCH CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold">
            Enter Your Order Number
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Example: <span className="font-semibold">ANV-1778643709867</span>
          </p>

          <form
            onSubmit={handleTrackOrder}
            className="flex flex-col md:flex-row gap-3"
          >

            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order Number"
              className="flex-1 rounded-xl border p-4 outline-none focus:border-orange-500"
            />

            <button
              className="bg-orange-500 text-white p-5 rounded-3xl font-semibold hover:bg-orange-600 transition"
            >
              Track Order
            </button>

          </form>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl p-8 mt-8 text-center shadow">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">
              Searching for your order...
            </p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 mt-8">
            <p className="font-semibold text-red-600">{error}</p>
          </div>
        )}

        {/* ORDER */}
        {order && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

            <div className="flex flex-col md:flex-row justify-between gap-5">

              <div>
                <h2 className="text-3xl font-bold">
                  {order.orderNumber}
                </h2>

                <p className="text-gray-500 mt-1">
                  Customer: {order.customerName}
                </p>

                <p className="text-gray-500">
                  Event: {order.eventDate}
                </p>
              </div>

              <span
                className={`p-3 flex justify-center items-center rounded-2xl font-semibold ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {order.status}
              </span>

            </div>

            {/* STATUS FLOW */}
            {!isCancelled && (
              <div className="mt-10 space-y-3">
                {steps.map((step, index) => {
                  const done = index <= currentStep;

                  return (
                    <div key={index} className="flex items-center gap-3">

                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                          done ? "bg-orange-500 text-white" : "bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <p className={done ? "text-black" : "text-gray-400"}>
                        {step}
                      </p>

                    </div>
                  );
                })}
              </div>
            )}

            {isCancelled && (
              <div className="mt-8 p-5 rounded-2xl bg-red-100 text-red-600 text-center font-semibold">
                ❌ This order has been cancelled.
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default TrackOrdersPage;