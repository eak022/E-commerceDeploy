import React from "react";
import { useNavigate } from "react-router-dom"; // ใช้สำหรับการนำทางระหว่างหน้า

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to the dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card for Add Product */}
        <div className="card bg-base-100 shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white" >Add a New Product</h2>
          <p className="text-sm text-gray-600 mb-4 text-white">
            Add products to your inventory for customers to view.
          </p>
          <button
            className="btn btn-info w-full text-white"
            onClick={() => navigate("/dashboard/add-product")}
          >
            Add Product
          </button>
        </div>
        {/* Card for Manage Items  */}
        <div className="card bg-base-100 shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white">Manage Items</h2>
          <p className="text-sm text-gray-600 mb-4 text-white">
            View, edit, or delete products in your store.
          </p>
          <button
            className="btn btn btn-success w-full text-white"
            onClick={() => navigate("/dashboard/manage-items")}
          >
            Manage Items
          </button>
        </div>

        {/* Card for Manage Users */}
        <div className="card bg-base-100 shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white">Manage Users</h2>
          <p className="text-sm text-gray-600 mb-4 text-white">
            Handle user accounts and permissions.
          </p>
          <button
            className="btn btn-secondary text-white w-full"
            onClick={() => navigate("/dashboard/manage-users")}
          >
            Manage Users
          </button>
        </div>

        {/* Card for Manage Orders */}
        <div className="card bg-base-100 text-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white">Manage Orders</h2>
          <p className="text-sm text-gray-600 mb-4 text-white">
            Keep track of customer orders and their status.
          </p>
          <button
            className="btn btn-primary text-white w-full"
            onClick={() => navigate("/dashboard/manage-orders")}
          >
            Manage Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
