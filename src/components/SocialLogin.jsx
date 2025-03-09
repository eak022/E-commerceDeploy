import React, { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service";

const SocialLogin = () => {
  const { signUpWithGoogle, signUpWithGithub, signUpWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const googleSignUp = () => {
    signUpWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        //Sign up to loacl backend
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Google Sign Up Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("login").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const githubSignUp = () => {
    let user;
    signUpWithGithub()
      .then(async (result) => {
        user = result.user;
        console.log(user);
        //Sign up to loacl backend
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "GitHub Sign Up Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("login").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const facebookSignUp = () => {
    let user;
    signUpWithFacebook()
      .then(async (result) => {
        user = result.user;
        console.log(user);
        //Sign up to loacl backend
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Facebook Sign Up Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("login").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-center space-x-3 mb-5">
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaGoogle className="w-6 h-6" onClick={googleSignUp} />
      </button>
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaGithub className="w-6 h-6" onClick={githubSignUp} />
      </button>
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaFacebook className="w-6 h-6" onClick={facebookSignUp} />
      </button>
    </div>
  );
};

export default SocialLogin;