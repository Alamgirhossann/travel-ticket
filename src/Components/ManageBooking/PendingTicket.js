import React, { useContext, useEffect, useState } from "react";
import { db, UserContext } from "../../App";
import { GetBooked, FilterBusSchedule, GetPending } from "../../Functions";

// Ticket Component
function Ticket(props) {
  var { Bus, selectedData, person } = props;
  console.log(selectedData);
  return (
    <div
      style={
        {
          // backgroundColor: GlobalBackgroundColors.ternaryColor,
          padding: '6px',
          borderRadius: '5px',
          marginBottom: '10px',
          marginTop: '10px',
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
        }
      }
    >
      {/* Ticket Header */}
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: '5px',
          paddingBottom: '5px',
        }}
      >
        {
          // <TicketIcon />
      }
        <p>{person.email}</p>
      </div>

      {/* Route detail */}
      <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '15px' }}>
        {/* Title */}
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <p>Date</p>
          <p>Time</p>
        </div>
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <p style={{ fontSize: '10px'}}>
            {Bus.Day}, {Bus.Date}
          </p>
          <p style={{ fontSize: '10px'}}>
            {Bus.DepartureTime}
          </p>
        </div>
      </div>
      <div>
        <p>Seat No: </p>
        {selectedData.map((item) => {
          return (
            <div
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <p>{item.seatID}</p>
            </div>
          );
        })}
      </div>
      <p>Bus No: {Bus.BusID}</p>
      <div>
      </div>

      {/* Total Price */}
      <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '15px' }}>
        {/* Title */}
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <p>Price</p>
          <p style={{ fontSize: '10px',  }}>
            {selectedData.length * Bus.Price}
          </p>
        </div>
      </div>

      {/* Burtton */}
      <button
        style={{backgroundColor:"black"}}
        // onPress={() =>
        //   navigation.navigate("RefundTicketScreen", {
        //     Bus,
        //     person,
        //     selectedData,
        //   })
        // }
      >
        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: '15px',
            marginBottom: '10px',
          }}
        >
          Confirm Purches
        </p>
      </button>
    </div>
  );
}

function PendingTicket() {
  const {user} = useContext(UserContext);
  const [person] = user;
  // const [promised, setpromised] = useState(false);
  const [purchasedTicket1, setPurchasedTicket] = useState([]);
  console.log(purchasedTicket1);
 
  useEffect(() => {
    var scheduleBuses = [];
    const BusNode = db.ref().child("BusSchedule");
    BusNode.once("value")
      .then((datasnap) => {
        scheduleBuses = datasnap.val();
      })
      .then((readCountTxn) => {
        var duppendingBookingBus = [];
        // Getting pending related data
        duppendingBookingBus = FilterBusSchedule(scheduleBuses, person.email);
        duppendingBookingBus = GetPending(duppendingBookingBus);
        setPurchasedTicket(duppendingBookingBus);
        // setpromised(true);
      });
  }, []);
 

  return (
    <div style={{ flex: 1, marginTop:"100px" }}>
      
        <div>
        {
          purchasedTicket1.length === 0 ? (
            <p>No Pending Ticket Found</p>
          ):(
            
            purchasedTicket1.map((item)=>{
              return(
                <Ticket
                key= {item.id}
                Bus={item}
                selectedData={item.Pending}
                person={person}
              />
              )
            })
             )
        }
          
          
        </div>
     </div>
  );
}
export default PendingTicket;
