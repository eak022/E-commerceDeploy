import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ProfileUser = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/UpdateProfile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white transition-transform duration-300 hover:rotate-6"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-800">
            {user?.displayName || "Your Name"}
          </h3>
          <p className="mt-2 text-gray-600">ยินดีต้อนรับสู่โปรไฟล์ของคุณ</p>
          <button className="btn bg-red text-white" onClick={handleEditProfile}>
            {" "}
            แก้ไขโปรไฟล์{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
