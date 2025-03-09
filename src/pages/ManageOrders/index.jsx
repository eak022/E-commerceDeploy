import { useEffect, useState } from "react";
import OrderService from "../../services/order.service";
import Swal from "sweetalert2";
import { RiDeleteBack2Fill } from "react-icons/ri";
import OrderDetailsModal from "../../components/OrderDetailsModal"; // Import the new modal component

const Index = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await OrderService.getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await OrderService.deleteOrder(orderId);
                    setOrders((prevOrders) =>
                        prevOrders.filter((order) => order._id !== orderId)
                    );
                    Swal.fire("Deleted!", "The order has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting order:", error);
                    Swal.fire("Error!", "Failed to delete the order.", "error");
                }
            }
        });
    };

    const handleStatusChange = async (orderId, newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Change order status to "${newStatus}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await OrderService.updateOrderStatus(orderId, newStatus);
                    setOrders((prevOrders) =>
                        prevOrders.map((order) =>
                            order._id === orderId
                                ? { ...order, delivery_status: newStatus }
                                : order
                        )
                    );
                    Swal.fire("Updated!", "Order status updated.", "success");
                } catch (error) {
                    console.error("Error updating status:", error);
                    Swal.fire("Error!", "Failed to update status.", "error");
                }
            }
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Orders</h2>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-red text-white">
                            <th className="p-3 border">OrderId</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Total</th>
                            <th className="p-3 border">Payment Status</th>
                            <th className="p-3 border">Delivery Status</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-3">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="text-center">
                                    <td className="p-3 border">
                                        {order._id.slice(0, 3)} ... {order._id.slice(-3)}
                                    </td>
                                    <td className="p-3 border">{order.email}</td>
                                    <td className="p-3 border">
                                        {order.total.toLocaleString()} THB
                                    </td>
                                    <td className="p-3 border">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${order.payment_status === "paid"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                }`}
                                        >
                                            {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                                        </span>
                                    </td>
                                    <td className="p-3 border">
                                        <select
                                            className="bg-white border border-green-500 p-2 rounded"
                                            value={order.delivery_status}
                                            onChange={(e) =>
                                                handleStatusChange(order._id, e.target.value)
                                            }
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-3 border flex justify-center space-x-2">
                                        <OrderDetailsModal order={order} /> {/* Using the new modal component */}
                                        <button
                                            className="bg-orange-600 text-white p-2 rounded-full"
                                            title="Delete Order"
                                            onClick={() => handleDeleteOrder(order._id)}
                                        >
                                            <RiDeleteBack2Fill  size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
