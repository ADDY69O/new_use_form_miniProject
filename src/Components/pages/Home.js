import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center w-[100vw] my-auto bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-blue-600 mb-4">
        Welcome to BigOhTech!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        We're excited to have you on board. Explore our platform and start your
        journey with us.
      </p>

      <p className="mt-4">
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmN5NzhzY3YwNHowOWpkZmhzaWl0eWd4MGdveWt6cHY4dHMwcWdpayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hr4Ljjyj0L9RYlihLr/giphy.gif"></img>
      </p>
    </div>
  );
};

export default Home;
