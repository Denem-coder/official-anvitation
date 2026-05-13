import { useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

function TrackOrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ YOUR REAL ORDER FLOW
  const steps = [
    "Pending",
    "Confirmed",
    "Designing",
    "Printing",
    "Ready for Pickup",
    "Completed",
  ];

  // ✅ STATUS MAPPING (MATCHES YOUR SYSTEM)
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

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      if (!orderId.trim()) {
        setError("Please enter your Order Number.");
        setLoading(false);
        return;
      }

      // ✅ MATCH YOUR FIRESTORE FIELD
      const q = query(
        collection(db, "orders"),
        where("orderNumber", "==", orderId.trim())
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];

        setOrder({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        setError("We couldn’t find your order. Please check your Order Number.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching your order.");
    }

    setLoading(false);
  };

  const isCancelled = order?.status === "Cancelled";
  const currentStep = order ? getStepIndex(order.status) : -1;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
      <p className="text-gray-500 mb-6">
        Enter your Order Number (e.g. ANV-1778643709867)
      </p>

      {/* SEARCH */}
      <form
        onSubmit={handleTrackOrder}
        className="flex gap-2 bg-gray-100 p-3 rounded-lg"
      >
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order Number"
          className="flex-1 p-2 border rounded bg-white"
        />

        <button className="bg-orange-500 text-white px-5 rounded">
          Track
        </button>
      </form>

      {/* LOADING */}
      {loading && (
        <p className="mt-4 text-gray-500">Searching order...</p>
      )}

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-red-500 font-medium">{error}</p>
      )}

      {/* ORDER CARD */}
      {order && (
        <div className="mt-8 border rounded-xl p-5 shadow-sm bg-white">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">
              Order #{order.orderNumber}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

          {/* CANCELLED STATE */}
          {isCancelled ? (
            <div className="mt-6 p-4 bg-red-100 text-red-600 rounded-lg font-semibold text-center">
              ❌ This order has been cancelled
            </div>
          ) : (
            <>
              {/* PROGRESS TRACKER */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Order Progress</h3>

                <div className="flex justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200" />

                  {steps.map((step, index) => {
                    const done = index <= currentStep;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center w-1/5 z-10"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            done
                              ? "bg-orange-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <p className="text-xs mt-2 text-center">
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* DETAILS */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">

            <div>
              <p className="font-semibold">Customer</p>
              <p>{order.customerName}</p>
            </div>

            <div>
              <p className="font-semibold">Phone</p>
              <p>{order.phone}</p>
            </div>

            <div>
              <p className="font-semibold">Payment</p>
              <p>{order.paymentMethod}</p>
            </div>

            <div>
              <p className="font-semibold">Downpayment</p>
              <p>₱{order.downpayment}</p>
            </div>

            <div>
              <p className="font-semibold">Event Date</p>
              <p>{order.eventDate}</p>
            </div>

            <div>
              <p className="font-semibold">Delivery</p>
              <p>{order.deliveryMethod}</p>
            </div>

          </div>

          {/* ITEMS */}
          {order.items?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Items</h3>

              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b py-1 text-sm"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>₱{item.lineTotal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTES */}
          {order.notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
              <strong>Notes:</strong> {order.notes}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default TrackOrdersPage;