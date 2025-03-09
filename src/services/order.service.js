import api from "./api";
const API_URL = "/order";

const getAllOrders = async () => {
  return await api.get(`${API_URL}`);
};

const getOrderById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const deleteOrder = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const updateOrderStatus = async (id, status) => {
  return await api.put(`${API_URL}/${id}`, { delivery_status: status });
};



// Export Service
const OrderService = {
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
  
};
export default OrderService;