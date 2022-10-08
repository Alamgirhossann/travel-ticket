import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./Components/Home/Home";
import Cancel from "./Components/ManageBooking/Cancel";
import ChangeDate from "./Components/ManageBooking/ChangeDate";
import Navbar from "./Components/Home/Navbar";
import Footer from "./Components/Home/Footer";
import Help from "./Components/Help";
import Signin from "./Components/SignupSignin/Signin";
import Signup from "./Components/SignupSignin/Signup";
import Ryde from "./Components/Ryde/Ryde";
import OperatorDetail from "./Components/Home/OperatorDetail";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useState } from "react";
import { createContext } from "react";
import SearchResult from "./Components/SearchResult";
import Payment from "./Components/Payment";
import Welcome from "./Components/Welcome";
import BookingDetail from "./Components/BookingDetail";
import BookingSeats from './Components/BookingDetail';
import TicketDetail from './Components/TicketDetail';
import Ticket from './Components//ManageBooking/ShowTicket';
import PendingTicket from './Components/ManageBooking/PendingTicket';
import ResetPassword from "./Components/SignupSignin/ResetPassword";
import { FilterBusSchedule, GetPending } from "./Functions";

const firebaseConfig = {
  apiKey: "AIzaSyAzmJ1KzIDeeAWv-HhmJb8pcDfpPUxtzZk",
  authDomain: "travel-com-8173c.firebaseapp.com",
  projectId: "travel-com-8173c",
  storageBucket: "travel-com-8173c.appspot.com",
  messagingSenderId: "932297182107",
  appId: "1:932297182107:web:9a6169dae9bc831174af3e",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);
export const db = firebase.database();

export const UserContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [booking, setBooking] = useState(null);
  const [bookingDetail, setBookingDetail] = useState({});
  const [date, setDate] = useState([]);
  const [seatNum, setSeatNum] = useState([]);
  const [bus, setBus]=useState([])
  const [ticket, setTicket] = useState({})
  const [paddingBooking, setPendingBooking] = useState([])
  console.log(user.email, booking, seatNum, ticket, "pending", paddingBooking);
  
  useEffect(() => {
    const authSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // const currentUser = getUser(user)
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubscribe;
  }, []);

  // useEffect(()=>{
  //   // setInterval(() => {
  //    var scheduleBuses = [];
  //   const BusNode = db.ref().child("BusSchedule");
  //   BusNode.once("value")
  //     .then((datasnap) => {
  //       scheduleBuses = datasnap.val();
  //     })
  //     .then((readCountTxn) => {
  //       var duppendingBookingBus = [];
  //       console.log(scheduleBuses,duppendingBookingBus);
  //       // Getting pending related data
  //       duppendingBookingBus = FilterBusSchedule(scheduleBuses, 'testman3@mail.com');
  //       duppendingBookingBus = GetPending(duppendingBookingBus);
  //       duppendingBookingBus.map((item)=>{
  //         setPendingBooking(item);
  //         console.log(item);
  //       })
        
  //     });
  //   // }, 40000);
  // },[])

  // function deleteBooking(Bus) {
  //   console.log("Deleting", Bus);

  //   var NewPendingNode = db
  //     .ref()
  //     .child(
  //       "BusSchedule/" + Bus.FireBaseIndex + "/Pending/" + Bus.pendingIndex
  //     );
  //   NewPendingNode.set([]).then((readCountTxn) => {
  //     console.log("success");
  //   });
  // }

  // setInterval(() => {
  //     deleteBooking(paddingBooking)
  //   }, 60000);
   
    
  
  

  

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-dark " role="status">
          <span className="visually-hidden ">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user: [user, setUser],
        booking: [booking, setBooking],
        bookingDetail: [bookingDetail, setBookingDetail],
        date: [date, setDate],
        seatNum: [seatNum, setSeatNum],
        bus: [bus, setBus],
        ticket: [ticket, setTicket]
      }}
    >
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Signin />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/resetPassword" element={<ResetPassword />}></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/changeDate" element={<ChangeDate />} />
              <Route path="/ryde" element={<Ryde />} />
              <Route path="/searchResult" element={<SearchResult />} />
              <Route path="/operator-detail" element={<OperatorDetail />} />
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/welcome" element={<Welcome />}></Route>
              <Route path="/bookSeat" element={<BookingSeats />}></Route>
              <Route path="/bookingDetail" element={<BookingDetail />}></Route>
              <Route path="/ticketDetail" element={<TicketDetail />}></Route>
              <Route path="/bookedTicket" element={<Ticket />}></Route>
              <Route path="/pendingTicket" element={<PendingTicket />}></Route>
              
            </>
          )}

          <Route path="/help" element={<Help />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
