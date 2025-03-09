import React from "react";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-10 w-full flex flex-col items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Mission Section */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo.png" alt="Logo" className="h-12 mb-4" />
          <p className="text-sm">
            Our Mission: To Merge Fashion with Functionality in the World of
            Software Engineering!
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Main Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-4">MAIN MENU</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Offers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Reservation
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:example@email.com" className="hover:underline">
                test@email.com
              </a>
            </li>
            <li>
              <a href="tel:+66958248966" className="hover:underline">
                +0000000000
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Social media
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center w-full">
        <p className="text-sm">Copyright &copy; 2024 - All rights reserved</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaYoutube className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaFacebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
