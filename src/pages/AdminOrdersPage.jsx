import { useEffect, useState } from 'react'
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from '../firebase/orders'

function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const data = await getOrders()

    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatus(orderId, status)

    fetchOrders()
  }

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this order?'
    )

    if (!confirmDelete) return

    const success = await deleteOrder(orderId)

    if (success) {
      fetchOrders()
    } else {
      alert('Failed to delete order.')
    }
  }

  if (loading) {
    return (
      <div className="p-6 mt-20">
        Loading orders...
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 mt-20">
        Admin Orders
      </h1>

      <div className="space-y-4">

        {orders.length === 0 && (
          <div className="rounded-xl border p-6 text-center text-gray-500">
            No orders found.
          </div>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              {/* ORDER DETAILS */}
              <div className="space-y-2">

                <h2 className="text-2xl font-bold text-orange-500">
                  {order.orderNumber}
                </h2>

                <p>
                  <span className="font-semibold">
                    Customer:
                  </span>{' '}
                  {order.customerName}
                </p>

                <p>
                  <span className="font-semibold">
                    Phone:
                  </span>{' '}
                  {order.phone}
                </p>

                <p>
                  <span className="font-semibold">
                    Event Date:
                  </span>{' '}
                  {order.eventDate}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>

                  <span className="ml-2 font-bold text-orange-500">
                    {order.status}
                  </span>
                </p>

                {/* ORDER ITEMS */}
                <div className="mt-4">
                  <p className="mb-2 font-semibold">
                    Order Items:
                  </p>

                  <div className="space-y-2">

                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-gray-50 p-3"
                      >
                        <p className="font-medium">
                          {item.name || item.title}
                        </p>

                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-sm text-gray-600">
                          Price: ₱
                          {Number(
                            item.price || 0
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3 min-w-[220px]">

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Designing</option>
                  <option>Printing</option>
                  <option>Ready for Pickup</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

                <button
                  onClick={() => handleDelete(order.id)}
                  className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
                >
                  Delete Order
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default AdminOrdersPage