import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Home from "./Components/pages/Home";
import LoginwithCustom from "./Components/pages/LoginwCustomHook";
import SignupwithCustom from "./Components/pages/SignupwCustomRefHook";

import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/custom" element={<LoginwithCustom />} />
        <Route path="/custom/signup" element={<SignupwithCustom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
