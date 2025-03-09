import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleToggleRole = async (email, currentRole) => {
    try {
      if (currentRole === "user") {
        await UserService.makeAdmin(email);
      } else {
        await UserService.makeUser(email);
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email
            ? { ...user, role: currentRole === "user" ? "admin" : "user" }
            : user
        )
      );

      Swal.fire({
        icon: "success",
        title: `Role updated successfully!`,
        text: `${email} is now a ${currentRole === "user" ? "Admin" : "User"}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
      <table className="table-auto w-full min-w-screen-md border border-gray-300 border-collapse shadow-md">
          <thead>
            <tr className="bg-red text-white text-sm">
              <th className="p-4 border text-center">#</th>
              <th className="p-4 border text-center">Email</th>
              <th className="p-4 border text-center">Role</th>
              <th className="p-4 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="text-sm text-center border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 border">{user.email}</td>
                  <td className="p-4 border">
                    <label className="flex items-center justify-center cursor-pointer">
                      <span className="mr-2 font-semibold">
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={user.role === "admin"}
                        onChange={() => handleToggleRole(user.email, user.role)}
                      />
                    </label>
                  </td>
                  <td className="p-4 border">
                    <button
                      className="bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      &#x1F5D1;
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button className="bg-gray-400 text-white px-3 py-1 mr-4 rounded disabled:opacity-50 ">
            Prev
          </button>
          <span>Page 1 of 2</span>
          <button className="bg-red text-white px-3 py-1 ml-4 rounded hover:bg-red-900">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
