import React, { useContext, useState, useEffect } from "react";

import { GetPending, FilterBusSchedule } from "../../Functions";
// Importing icons
import { db, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

// Ticket Component
function Ticket(props) {
  var { Bus, selectedData, person, deleteData } = props;
  
  let Navigate = useNavigate();
  var GenderDetail = ["Male", "Female"];
  console.log(Bus);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     deleteData(Bus)
  //   }, 40000);
  //   return () => clearTimeout(timer)
  // }, [40000]);

  const checkPurches = () => {
    let bookDuplicate = [];
    let Node = db.ref().child("BusSchedule/" + Bus.FireBaseIndex); // Getting the city reference
    Node.once("value")
      .then((datasnap) => {
        bookDuplicate = datasnap.val();
      })
      .then((readCountTxn) => {
        let bookedId = [];
        let pendingId = [];
        if (bookDuplicate.Booked) {
          bookDuplicate.Booked.map((item) => {
            console.log(item);
            item.seats.map((items) => {
              console.log(typeof items.seatID, items.seatID);
              bookedId.push(items.seatID);
            });
          });
        }
        if (bookDuplicate.Pending) {
          bookDuplicate.Pending.map((item) => {
            console.log(item);
            item.seats.map((items) => {
              console.log(typeof items.seatID, items.seatID);
              pendingId.push(items.seatID);
            });
          });
        }
        if (bookedId.length !== 0) {
          var duplicate = bookedId.filter(function (val) {
            return pendingId.indexOf(val) !== -1;
          });
          if (duplicate.length !== 0) {
            let NewPendingNode = db
              .ref()
              .child(
                "BusSchedule/" +
                  Bus.FireBaseIndex +
                  "/Pending/" +
                  Bus.pendingIndex
              );
            NewPendingNode.set([]).then((readCountTxn) => {});
            alert("purches fail from booked");
            Navigate("/home");
          }else {
            const uniq = pendingId
              .map((name) => {
                return {
                  count: 1,
                  name: name,
                };
              })
              .reduce((result, b) => {
                result[b.name] = (result[b.name] || 0) + b.count;
  
                return result;
              }, {});
            const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
  
            console.log(duplicates);
            if (duplicates.length !== 0) {
              let NewPendingNode = db
                .ref()
                .child(
                  "BusSchedule/" +
                    Bus.FireBaseIndex +
                    "/Pending/" +
                    Bus.pendingIndex
                );
              NewPendingNode.set([]).then((readCountTxn) => {});
              alert("purches fail, from pending");
              Navigate("/home");
            } else {
              Navigate("/ticketDetail", {
                state: { BusInfo: Bus, selectedData: selectedData },
              });
            }
          }
          console.log(duplicate);
        } 
        console.log(bookDuplicate, pendingId, bookedId.length);
      });
  };

  

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
            backgroundColor: "#566573",
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
              display: "flex",
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
              display: "flex",
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
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "20px" }}>Name</p>
            <p style={{ fontSize: "20px" }}>Date</p>
          </div>
          <div
            style={{
              display: "flex",
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
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          ></div>
          <div className="d-flex">
            <p>SeatNo: </p>
            {Bus.Pending.map((item) => {
              return (
                <div key={item.id}>
                  <div>
                    {item.seatID} {GenderDetail[item.Gender]},
                  </div>
                </div>
              );
            })}
          </div>
          <p>Bus No: {Bus.BusID}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p style={{ fontSize: "20px" }}>Total Amount</p>
            <p style={{ fontSize: "20px" }}>{Bus.Price * Bus.Pending.length}</p>
          </div>
          {/* Just a line*/}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={checkPurches}>Purches Now</button>
          <button onClick={() => deleteData(Bus)}>delete</button>
        </div>
      </div>
    </div>
  );
}

function PendingTicket() {
  /*===== getting passed=======================================================*/
  const { user, ticket } = useContext(UserContext);
  const [ticketVal, setTicketVal] = ticket;
  const [person] = user;
  var [reload, changeReload] = useState(false);
  
  /*===================================================getting passed data=====*/

  /*===== Created Data =======================================================*/
  var [promised, setpromised] = useState(false);
  var [pendingBookingBus1, setpendingBooking] = useState([]);
  console.log(typeof ticketVal, ticketVal, person.email,pendingBookingBus1);
  /*===== Created Data =======================================================*/

  /*===== Getting Data from database ======================================== */

  var scheduleBuses = [];
  useEffect(() => {
    // Getting Schedule Data
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
        setpendingBooking(duppendingBookingBus);
        // const book = duppendingBookingBus.flat(Infinity);
        // setTicketVal(duppendingBookingBus)
      });
  }, [reload]);
  /*============================================== Getting Data from database===== */

  /*======================= Function to handle booked button ====================== */
  

  function deleteBooking(Bus) {
    console.log("Deleting", Bus);

    var NewPendingNode = db
      .ref()
      .child(
        "BusSchedule/" + Bus.FireBaseIndex + "/Pending/" + Bus.pendingIndex
      );
    NewPendingNode.set([]).then((readCountTxn) => {
      changeReload(!reload);
    });
  }

  /*======================= Function to handle booked button ====================== */

  return (
    <div style={{ flex: 1, marginTop: "100px" }}>
      <div>
        <h2 className="text-center">Pending Tickets</h2>
        <div>
          {pendingBookingBus1.length !== 0 ? (
            pendingBookingBus1.map((item) => {
              return (
                <Ticket
                  key={item.id}
                  Bus={item}
                  selectedData={item.Pending}
                  person={person}
                  deleteData={deleteBooking}
                />
              );
            })
          ) : (
            <p>No Pending Ticket Found</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default PendingTicket;
