import React from "react";
import Logo from "../../Assets/work.webp";
import LogoSmall from "../../Assets/bigoh-logo-1.webp";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useCustomForm from "../../hook/useCustomForm";

// Validation function
const validateForm = (input) => {
  const errors = {};
  if (!input.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Email address is invalid";
  }
  if (!input.password) {
    errors.password = "Password is required ";
  }
  if (
    !(
      input.password.length >= 8 &&
      /[a-zA-Z]/.test(input.password) &&
      /\d/.test(input.password)
    )
  ) {
    errors.password =
      "Password should be at least 8 characters long and alphanumeric";
  }

  return errors;
};

const Login = () => {
  const { input, register, handleSubmit, errors } = useCustomForm(
    { email: "", password: "" },
    validateForm
  );

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}user/login`,
        data
      );
      console.log(response);
      toast.success(response.data.message);
      localStorage.setItem("userInfo", response.data.token);
      window.location.href = "/home";
    } catch (error) {
      toast.error(error.response.data.message || "Internal Server Error");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-between items-center">
      <div className="w-[40.4%] max-h-[100vh] bg-[#097FFE] flex flex-col justify-center items-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="w-[60%] h-[100%] flex flex-col justify-center items-center">
        <div className="border-2 rounded-xl border-gray-500 p-4 mr-4">
          <img src={LogoSmall} alt="bigOh_logo" />
        </div>

        <div className="mt-4 flex flex-col justify-center items-center w-[60%]">
          <h1 className="text-5xl font-sans">Hello Again!</h1>
          <p className="mt-3 text-gray-600 text-center">
            BigOhTech develops enterprise-grade cutting-edge software products
            and helps companies achieve their business goals by offering
            top-notch IT talent.
          </p>

          <form className="w-full h-full" onSubmit={handleSubmit(handleLogin)}>
            <div className="form flex flex-col justify-center items-center mt-11 w-full h-full">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={input.email}
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 px-2"
                onChange={register}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 mt-4 px-2"
                onChange={register}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}

              <button
                type="submit"
                className="w-[50%] h-10 bg-blue-600 text-white rounded-xl mt-5 mb-10"
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
