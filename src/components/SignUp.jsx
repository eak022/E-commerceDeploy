import React, { useContext, useState } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/Authcontext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service";

const SignUp = () => {
  const { createUser, signUpWithGoogle, signUpWithGithub, signUpWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log("User signed up:", user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Signup failed:", error.message);
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.message,
        });
      });
  };
  const googleSignUp = () => {
    signUpWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };
  const githubSignUp = () => {
    signUpWithGithub()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Github Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Github Login failed:", error.message);
        Swal.fire({
          icon: "error",
          title: "Github Login Failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  const facebookSignUp = () => {
    signUpWithFacebook()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Facebook Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Facebook Login failed:", error.message);
        Swal.fire({
          icon: "error",
          title: "Facebook Login Failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-red w-full text-white">Sign Up</button>
          </div>
        </form>

        <div className="text-center space-x-3 mt-6">
          <p className="mb-4 text-gray-600">Or sign up with</p>
          <button className="btn btn-ghost btn-circle hover:bg-red-500 hover:text-white">
            <FaGoogle className="size-5" onClick={googleSignUp} />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red-500 hover:text-white">
            <FaGithub className="size-5" onClick={githubSignUp} />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red-500 hover:text-white">
            <FaFacebook className="size-5" onClick={facebookSignUp} />
          </button>
        </div>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In Now!
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
