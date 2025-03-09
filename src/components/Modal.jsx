import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import SocialLogin from "./SocialLogin";

const Modal = ({ name }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);

    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
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
    <div>
      <dialog id={name} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action mt-0 flex flex-col justify-center items-center">
            <h3 className="font-bold text-lg">Please Login</h3>
            <form method="card-body " onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <div className="form-control">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                </label>
              </div>
              <div className="form-control">
                {" "}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    type="password"
                    className="input input-bordered"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                </label>
                <label className="label">
                  <a className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Login"}
                  className="btn bg-red ml-1 text-white"
                />
              </div>
              <p className="text-center my-2">
                Don&apos;t have an account?
                <a href="/signup" className="underline text-md ml-1">
                  Sign Up Now
                </a>
              </p>
            </form>
            <SocialLogin />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;