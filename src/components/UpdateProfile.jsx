import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(displayName, photoURL)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "โปรไฟล์อัปเดตสำเร็จ!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/ProfileUser");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-lg">
        <div className="card-body">
          <h3 className="text-lg font-bold text-center">อัปเดตโปรไฟล์</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">ชื่อผู้ใช้</span>
              </label>
              <input
                type="text"
                placeholder="ชื่อผู้ใช้"
                className="input input-bordered w-full"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">URL รูปภาพ</span>
              </label>
              <input
                type="text"
                placeholder="URL รูปภาพ"
                className="input input-bordered w-full"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-red text-white w-full">
                อัปเดตโปรไฟล์
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
