import React from "react";
import Images from "../../Assets/Images";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useCustomRefForm from "../../hook/useCustomRefForm";
import { setLocalUserData } from "../Constant/Constant.js";
import Input from "../../Common/Input.js";

const Signup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useCustomRefForm({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSignup = async (inputData) => {
    await axios
      .post(`${process.env.REACT_APP_API}user/register`, inputData)
      .then((response) => {
        toast.success(response.data.message);
        setLocalUserData(response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Internal Server Error");
      });
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-between items-center">
      <div className="w-[40.4%] max-h-[100vh] bg-[#097FFE] flex flex-col justify-center items-center">
        <img src={Images.main} alt="logo" />
      </div>
      <div className="w-[60%] h-[100%] flex flex-col justify-center items-center">
        <div className="border-2 rounded-xl border-gray-500 p-4 mr-4">
          <img src={Images.small_Logo} alt="bigOh_logo" />
        </div>

        <div className="mt-4 flex flex-col justify-center items-center w-[60%]">
          <h1 className="text-5xl font-sans">Welcome!</h1>
          <p className="mt-3 text-gray-600 text-center">
            Join BigOhTech and be a part of a community that develops
            enterprise-grade software products and helps companies achieve their
            business goals.
          </p>

          <form className="w-full h-full" onSubmit={handleSubmit(handleSignup)}>
            <div className="form flex flex-col justify-center items-center mt-11 w-full h-full">
              {/* <input
                type="text"
                placeholder="Name"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 items-center px-2"
                {...register("username", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
               */}
              <Input
                type="text"
                placeholder="Name"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 items-center px-2"
                error={errors.username ? errors.username : ""}
                {...register("username", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 mt-4 px-2"
                {...register("email", {
                  defaultValidation: "email",
                })}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 mt-4 px-2"
                {...register("phone", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 10,
                    message: "Phone Number must be exactly 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone Number must be exactly 10 digits",
                  },
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Phone Number must be exactly 10 digits",
                  },
                })}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}

              <input
                type="password"
                placeholder="Password"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 mt-4 px-2"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                    message: "Password must be alphanumeric",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}

              <button
                type="submit"
                className="w-[50%] h-10 bg-blue-600 text-white rounded-xl mt-5 mb-10"
              >
                Sign Up
              </button>
              <p className="text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
