import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./Components/Home/Home";
import Cancel from "./Components/ManageBooking/Cancel";
import ChangeDate from "./Components/ManageBooking/ChangeDate";
import ShowTicket from "./Components/ManageBooking/ShowTicket";
import SmsEmail from "./Components/ManageBooking/SmsEmail";
import Navbar from "./Components/Home/Navbar";
import Footer from "./Components/Home/Footer";
import Help from "./Components/Help";
import Signin from "./Components/SignupSignin/Signin";
import Signup from "./Components/SignupSignin/Signup";
import Ryde from "./Components/Ryde/Ryde";
import OperatorDetail from "./Components/Home/OperatorDetail";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/changeDate" element={<ChangeDate />} />
        <Route path="/showTicket" element={<ShowTicket />} />
        <Route path="/smsEmail" element={<SmsEmail />} />
        <Route path="/help" element={<Help />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ryde" element={<Ryde />} />
        <Route path="/operator-detail" element={<OperatorDetail />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
