import React from "react";
import Logo from "../../Assets/work.webp";
import LogoSmall from "../../Assets/bigoh-logo-1.webp";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useCustomRefForm from "../../hook/useCustomRefForm";

const Signup = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Name is required";
    } else if (values.username.length < 2) {
      errors.username = "Name must be at least 2 characters";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!(values.email.includes("@") && values.email.includes("."))) {
      errors.email = "Invalid email address";
    }

    if (!values.phone) {
      errors.phone = "Phone Number is required";
    } else if (values.phone.length !== 10 || isNaN(values.phone)) {
      errors.phone = "Phone Number must be exactly 10 digits";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(values.password)) {
      errors.password = "Password must be alphanumeric";
    }

    return errors;
  };

  const { register, handleSubmit, errors } = useCustomRefForm(
    { username: "", email: "", phone: "", password: "" },
    validate
  );

  const handleSignup = async (inputData) => {
    await axios
      .post(`${process.env.REACT_APP_API}user/register`, inputData)
      .then((response) => {
        toast.success(response.data.message);
        localStorage.setItem("userInfo", response.data.token);
        window.location.href = "/home";
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Internal Server Error");
      });
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
          <h1 className="text-5xl font-sans">Welcome!</h1>
          <p className="mt-3 text-gray-600 text-center">
            Join BigOhTech and be a part of a community that develops
            enterprise-grade software products and helps companies achieve their
            business goals.
          </p>

          <form className="w-full h-full" onSubmit={handleSubmit(handleSignup)}>
            <div className="form flex flex-col justify-center items-center mt-11 w-full h-full">
              <input
                type="text"
                placeholder="Name"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 items-center px-2"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 mt-4 px-2"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 mt-4 px-2"
                {...register("phone")}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}

              <input
                type="password"
                placeholder="Password"
                className="w-[50%] h-10 border-2 border-gray-500 rounded-xl focus:outline-none focus:border-blue-500 mt-4 px-2"
                {...register("password")}
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
