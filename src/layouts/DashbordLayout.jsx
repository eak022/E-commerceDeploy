import React from "react";
import { Link } from "react-router";
import {
  FaBox,
  FaHome,
  FaUser,
  FaShoppingCart,
  FaList,
  FaHeadset,
} from "react-icons/fa";
import { Outlet } from "react-router";
import { MdDashboard,MdSupervisorAccount } from "react-icons/md";
const DashboardLayout = () => {
  const isAdmin = true;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col p-6">
        {/* Toggle Button (For Small Screens) */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open Menu
        </label>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="mt-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      {isAdmin ? (
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu w-80 min-h-full p-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#bdbdbd] to-100%">

            {/* Admin Profile */}
            <div className="flex items-center pb-4 border-b">
              <Link to="/dashboard" className="flex items-center">
                <MdSupervisorAccount className="w-16 h-16 rounded-full mr-4 text-purple-600" />
                <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                  Admin
                </span>
              </Link>
            </div>

            {/* Sidebar Menu */}
            <li>
              <Link to="/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-orders">
                <FaBox /> Manage Orders
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-product">
                <FaShoppingCart /> Add Product
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaList /> Manage Items
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-users">
                <FaUser /> All Users
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/shop">
                <FaShoppingCart /> Product
              </Link>
            </li>
            <li>
              <Link to="/order-tracking">
                <FaList /> Order Tracking
              </Link>
            </li>
            <li>
              <Link to="/support">
                <FaHeadset /> Customer Support
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="p-6 text-red-500 text-center">You are not an admin</div>
      )}
    </div>
  );
};

export default DashboardLayout;