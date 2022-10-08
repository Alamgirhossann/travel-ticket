import React, { useContext, useEffect, useState } from "react";
import { db, UserContext } from "../../App";
import { GetBooked, FilterBusSchedule } from "../../Functions";

// Ticket Component
function Ticket(props) {
  var { Bus, selectedData, person } = props;
  var GenderDetail = ["Male", "Female"];
  console.log(selectedData);

  const GlobalBackgroundColors = {
    primaryColor: "#5641B6", // Blue Color for background
    secondaryColor: "#FB8549", // Orange color for buttons and inner links
    ternaryColor: "#FFFFFF", // White Color
  };
  const GlobalBackgroundTextColors = {
    primaryColor: "#FFFFFF", // White color (used over blue one)
    secondaryColor: "#FFFFFF", // White color (over yellow)
    ternaryColor: "black", // black color (used with text box)
    textBoxColor: "#585858", // Text color
  };
  return (
    <div
            style={{
              width: "90%",
              flex: 1,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "10px",
              paddingBottom: "20px",
            }}
          >
          
            {/* Tickets detail container*/}
            <div
              style={{
                flex: 1,
                backgroundColor: GlobalBackgroundColors.ternaryColor,
                paddingBottom: "20px",
              }}
            >
              {/* Header */}
              <div
              
                style={{
                  backgroundColor: '#566573',
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {
                    //     <Image
                    //     style={{ width: 40, height: 40 }}
                    //     source={require("../../assets/Images/log.png")}
                    //   />
                    //   <Image
                    //     style={{ width: 40, height: 40 }}
                    //     source={require("../../assets/Images/BusLogo1.png")}
                    //   />
                  }
                </div>
                <div
                  style={{
                    display:"flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <p
                    style={{
                      color: GlobalBackgroundTextColors.secondaryColor,
                      fontWeight: "bold",
                    }}
                  >
                    {Bus.Arrival}
                  </p>
                  {
                    //     <Image
                    //     style={{ width: 50, height: 40 }}
                    //     source={require("../../assets/Images/BusTicketLogo.png")}
                    //   />
                  }
                  <p
                    style={{
                      color: GlobalBackgroundTextColors.secondaryColor,
                      fontWeight: "bold",
                    }}
                  >
                    {Bus.Destination}
                  </p>
                </div>
                <div
                  style={{
                    display:"flex",
                    justifyContent: "space-around",
                    marginTop: "5px",
                  }}
                >
                  <p
                    style={{
                      color: GlobalBackgroundTextColors.secondaryColor,
                      fontWeight: "bold",
                    }}
                  >
                    {Bus.DepartureTime}
                  </p>
                  <div
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: GlobalBackgroundColors.ternaryColor,
                        borderRadius: "10px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "100px",
                        height: "1px",
                        backgroundColor: GlobalBackgroundColors.ternaryColor,
                      }}
                    ></div>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: GlobalBackgroundColors.ternaryColor,
                        borderRadius: "10px",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      color: GlobalBackgroundTextColors.secondaryColor,
                      fontWeight: "bold",
                    }}
                  >
                    {Bus.ArrivalTime}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  backgroundColor: GlobalBackgroundColors.ternaryColor,
                  flex: 1,
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    display:"flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Name</p>
                  <p style={{ fontSize: "20px" }}>Date</p>
                </div>
                <div
                  style={{
                    display:"flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      color: GlobalBackgroundTextColors.textBoxColor,
                    }}
                  >
                    {person.email}
                  </p>
                  <p
                    style={{
                      fontSize: "10px",
                      color: GlobalBackgroundTextColors.textBoxColor,
                    }}
                  >
                    {Bus.Day}, {Bus.Date}
                  </p>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p style={{ fontSize: "20px" }}>Information</p>
                </div>
                <div
                  style={{
                    display:"flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  
                </div>
                <div className="d-flex">
                <p>SeatNo: </p>
                  {Bus.Booked.map((item) => {
                    return (
                      <div
                        key={item.id}
                      >
                       <div>{item.seatID} {GenderDetail[item.Gender]},</div>
                      </div>
                     );
                  })}
                </div>
                <p>Bus No: {Bus.BusID}</p>
                <div
                  style={{
                    display:"flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Total Amount</p>
                  <p style={{ fontSize: "20px" }}>
                    {Bus.Price * Bus.Booked.length}
                  </p>
                </div>
                {/* Just a line*/}
              </div>

              {/* Buttons */}
              <div style={{ display:"flex", justifyContent: "center" }}>
                
                <button
                  
                >
                  Print Ticket
                </button>
              </div>
            </div>
          </div>
  );
}

function BookingPending() {
  const { user } = useContext(UserContext);
  const [person] = user;
  /* ============================================================================Getting passed data===== */

  /*===== Vreated Data ================================================================================== */
  // const [promised, setpromised] = useState(false);
  const [purchasedTicket1, setPurchasedTicket] = useState([]);
  console.log(purchasedTicket1);
  /*===== Vreated Data ================================================================================== */

  /*===== Getting Data from database ======================================== */
  // var allPurchasedTicket = [];
  // useEffect(() => {
  //     // Getting Schedule Data
  //     const BusNode = rootReference.child("BusSchedule");
  //     BusNode.once("value").then(datasnap => {
  //         allPurchasedTicket = datasnap.val();
  //     }).then(readCountTxn => {
  //         var dupPurchasedTicket = [];
  //         dupPurchasedTicket =GetPurchaseTicket(allPurchasedTicket,person.PhoneNumber);
  //         // Getting pending related data
  //         setPurchasedTicket(dupPurchasedTicket);
  //         setpromised(true);
  //     });
  // }, []); // Use Effect Ends
  /*============================================== Getting Data from database===== */

  /*===== Getting Data from database ======================================== */

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
        duppendingBookingBus = GetBooked(duppendingBookingBus);
        setPurchasedTicket(duppendingBookingBus);
        // setpromised(true);
      });
  }, []);

  return (
    <div style={{ flex: 1, marginTop:"100px" }}>
    <h2 className="text-center">Booked Tickets</h2>
      <div>
        {purchasedTicket1.length === 0 ? (
          <p>No Booked Ticket Found</p>
        ) : (
          purchasedTicket1.map((item) => {
            return (
              <Ticket
                key={item.id}
                Bus={item}
                selectedData={item.Booked}
                person={person}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
export default BookingPending;
