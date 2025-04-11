import Profile from "./Profile";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
// import UserIcon from "./icons/UserIcon";
import Modal from "./Modal";
import useCart from "../hooks/useCart";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const { user, getUser } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const userInfo = getUser();

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li tabIndex={0}>
        <details>
          <summary>Category</summary>
          <ul>
            <li><a href="/shop">All</a></li>
            <li><a href="/shop?category=clothing">Clothing</a></li>
            <li><a href="/shop?category=accessoires">Accessoires</a></li>
            <li><a href="/shop?category=gadgets">Gadgets</a></li>
            <li><a href="/shop?category=swag">Swag</a></li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul>
            <li><a href="">Order online</a></li>
            <li><a href="">Order Tracking</a></li>
          </ul>
        </details>
      </li>
      <li><a href="">Promotions</a></li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-md">
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl flex items-center">
          <img src="/bg.png" alt="" className="mr-2 h-8" />
          SE Souvenir Shop
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            {userInfo?.userInfo?.role === "admin" && (
              <a href="/dashboard" className="btn bg-purple-600 text-white rounded-full px-5 flex items-center gap-2 mr-2">
                <MdDashboard className="w-5 h-5" /> Dashboard
              </a>
            )}
            <Profile />
          </>
        ) : (
          <button className="btn bg-red text-white rounded-full px-5 flex items-center gap-2" onClick={() => document.getElementById("login").showModal()}>
            <FaUserCircle className="w-6 h-6" /> Login
          </button>
        )}
      </div>
      <Modal name="login" />
    </div>
  );
};

export default Navbar;
