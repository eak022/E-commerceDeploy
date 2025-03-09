import React, { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const user = useContext(AuthContext);

  React.useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleProfileUpdate = () => {
    if (user) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Update Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/UpdateProfile");
        })
        .catch((error) => {
          console.error("Error updating profile: ", error.message);
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: error.message,
          });
        });
    } else {
      console.log("No user is logged in");
      Swal.fire({
        icon: "error",
        title: "No User Logged In",
        text: "Please log in first.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProfileUpdate();
          }}
        >
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Profile Photo URL</span>
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter your profile photo URL"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-red w-full text-white">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
