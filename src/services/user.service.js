import api from "./api";
const API_URL = "/user";
const signJwt = async (email) => {
    return await api.post(`${API_URL}/sign`, { email }); // เปลี่ยนเป็น "/user/sign"
  };
const addUser = async (email) => {
  return await api.post(`${API_URL}/`, { email });
};
const getAllUsers = async () => {
  return await api.get(`${API_URL}/`);
};
const updateUser = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};
const deleteUser = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};
const makeUser = async (email) => {
  return await api.patch(`${API_URL}/admin/${email}`);
};
const makeAdmin = async (email) => {
  return await api.patch(`${API_URL}/user/${email}`);
};
const getRoleByEmail = async (email) => {
  return await api.get(`${API_URL}/role/${email}`);
};
const UserService = {
  signJwt,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  makeUser,
  makeAdmin,
  getRoleByEmail,
};
export default UserService;
