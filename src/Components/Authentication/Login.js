import React from "react";
import Images from "../../Assets/Images";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { setLocalUserData } from "../Constant/Constant";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}user/login`,
        data
      );
      console.log(response);
      toast.success(response.data.message);
      setLocalUserData(response.data.token);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message || "internal Server Error");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-between items-center ">
      <div className="w-[40.4%] max-h-[100vh] bg-[#097FFE] flex flex-col justify-center items-center ">
        <img src={Images.main} alt="main-image" />
      </div>
      <div className="w-[60%] h-[100%] flex flex-col justify-center items-center ">
        <div
          className="border-2 rounded-xl border-gray-500 p-4 mr-4
              "
        >
          <img src={Images.small_Logo} alt="bigOh_logo" />
        </div>

        <div className="mt-4 flex flex-col justify-center items-center w-[60%] ">
          <h1 className="text-5xl font-sans "> Hello Again !</h1>
          <p className="mt-3  text-gray-600 text-center">
            BigOhTech develops enterprise-grade cutting edge software products
            and help companies achieve their business goals by offering
            top-notch IT talent.
          </p>

          <form className="w-full h-full" onSubmit={handleSubmit(handleLogin)}>
            <div className="form flex flex-col justify-center items-center mt-11 w-full h-full ">
              <input
                type="text"
                placeholder="Email"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl
                focus:outline-none focus:border-blue-500 items-center px-2"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                className=" w-[50%] h-10 border-2 border-gray-500 rounded-xl
                focus:outline-none focus:border-blue-500 mt-4 px-2"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="w-[50%] h-10 bg-blue-600 text-white rounded-xl mt-5 mb-10 "
              >
                Login
              </button>
              <p className="text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
