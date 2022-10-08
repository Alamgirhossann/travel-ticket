import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import { db, UserContext } from "../App";

const SearchResult = () => {
  const { booking, date, bus } = useContext(UserContext);
  const [dateValue] = date;
  const [bookingVal] = booking;
  const [search, setSearch] = useState(null)
  const [busVal, setBusVal] = bus;
  let Navigate = useNavigate();

  useEffect(()=>{
    if (bookingVal !== null) {
      setSearch(bookingVal)
    }else{
      setTimeout(() => {
        Navigate("/home")
      }, 5000);
    }
  },[])

  // console.log(dateValue, bookingVal);

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
          } 
        })
        .catch((error) => {
          console.error(error);
        });
  }

  return (
    <div style={{ padding: "100px" }}>
      <h4>Booking Information</h4>
      {search === null ? (
        <p>Data Not Found <Link to="/home">Back to Search</Link></p>
      ) : (
        // bookingVal.map((item, i) => {
        //   console.log(item.BusID);
          // return (
            <table class="table table-dark table-striped" id="table">
            <thead>
              <tr>
                <th scope="col">Journey Date</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">DeptTime</th>
                <th scope="col">Bus Type</th>
                <th scope="col">Price</th>
                <th scope="col">Bus No/Route</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {bookingVal.map((item, i) => {
                
                return (
                  <tr key={i}>
                    <td>{item.Date}</td>
                    <td>{item.Arrival}</td>
                    <td>{item.Destination}</td>
                    <td>{item.DepartureTime}</td>
                    <td>{item.BusStandard}</td>
                    <td>{item.Price}</td>
                    <td>{item.BusID}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={()=>singleBus(item.id)}>Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
            // <div key={i}>
            //   <p>Date: {item.Date}</p>
            //   <p>From: {item.Arrival}</p>
            //   <p>To: {item.Destination}</p>
            //   <p>Departure: {item.DepartureTime}</p>
            //   <p>BusType: {item.BusStandard}</p>
            //   <p>Price: {item.Price}</p>
            //   <p>Route: {item.BusID}</p>
            //   <p>id: {item.id}</p>
            //   <button onClick={()=>singleBus(item.id)}>Detail</button>
            // </div>
        //   );
        // })
      )}
    </div>
  );
};

export default SearchResult;
