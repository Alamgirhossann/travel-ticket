import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import { db, UserContext } from "../App";

const SearchResult = () => {
  const { booking, date, bus } = useContext(UserContext);
  const [dateValue] = date;
  const [bookingVal] = booking;
  const [busVal, setBusVal] = bus;
  let Navigate = useNavigate();
  console.log(dateValue, bookingVal);

  const singleBus = (id)=>{
    
      const dbRef = db.ref();
      dbRef
        .child("BusSchedule")
        .child(id -1)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const busInfo = snapshot.val();
            console.log(snapshot.val());
            setBusVal(busInfo);
            Navigate('/bookingDetail',{replace:true})
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  return (
    <div style={{ padding: "100px" }}>
      <h4>Booking Information</h4>
      {bookingVal === null ? (
        <p>Data Not Found <Link to="/home">Back to Search</Link></p>
      ) : (
        bookingVal.map((item, i) => {
          console.log(item.BusID);
          return (
            <div key={i}>
              <p>Date: {item.Date}</p>
              <p>From: {item.Arrival}</p>
              <p>To: {item.Destination}</p>
              <p>Departure: {item.DepartureTime}</p>
              <p>BusType: {item.BusStandard}</p>
              <p>Price: {item.Price}</p>
              <p>Route: {item.BusID}</p>
              <p>id: {item.id}</p>
              <button onClick={()=>singleBus(item.id)}>Detail</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchResult;
