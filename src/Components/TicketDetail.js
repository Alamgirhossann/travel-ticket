import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, UserContext } from "../App";
import Payment from "./Payment";

function TicketDetail() {
  const { ticket } = useContext(UserContext);
  const [ticketVal] = ticket;
  const [Bus, setBus] = useState(ticketVal.Bus);
  const Navigate = useNavigate();
  console.log("ticketval",ticketVal, Bus);
  /*============================= Data passed ====================================================== */
  var { selectedData = false, person = false } = ticketVal;

  var tempBusPending = [];
  var tempBusBooked = [];

  useEffect(() => {
    if (selectedData != false) {
      // If we are coming from seat selection
      if (Bus.Pending != null) {
        Bus.Pending.map((Pending) => {
          if (Pending.email == person.email) {
            tempBusPending = Pending.seats;
          }
        });
      }

      if (Bus.Booked != null) {
        Bus.Booked.map((Pending) => {
          if (Pending.email == person.email) {
            tempBusBooked = Pending.seats;
          }
        });
      }
      tempBusPending = selectedData.concat(tempBusPending);

      var tempBus = { ...Bus };
      tempBus.Pending = tempBusPending;
      tempBus.Booked = tempBusBooked;
      setBus(tempBus);
    }
    console.log("Bus=>", Bus);
  }, []);
  const p = {}
  console.log(p)
  /*============================= Modfying data because of different screen ======================== */

  /*============================= My Data created ================================================== */
  var [promise, setPromise] = useState(true);

  var GenderDetail = ["Male", "Female"];
  var amount = Bus.Price;
  var totalTicket = Bus.Pending.length;
  var totalamount = amount * totalTicket;

  // Modal Data
  let [isAccountVisible, setAccountVisible] = useState(false);
  let [accountNumber, setAccountNumber] = useState();
  console.log(accountNumber);
  const [error, setError] = useState("");
  // Functions
  const AccountModalOkHandler = () => {
    if (accountNumber.length != 11) {
      setError("Enter 11 digit number");
      return;
    }

    // Geting new Booked seats
    setPromise(false);
    var newBookedSeats = [];
    var updateNode = null;
    var tempraryBusSchedule = [];
    console.log(Bus);

    if (Bus.bookedIndex == -1) {
      // Means there is no booking for the user so we have to gett all the booking and then insert the booking o user as well
      newBookedSeats = [{ email: person.email, seats: [...Bus.Pending] }];

      Node = db.ref().child("BusSchedule/" + Bus.FireBaseIndex); // Getting the city reference
      Node.once("value")
        .then((datasnap) => {
          tempraryBusSchedule = datasnap.val();
        })
        .then((readCountTxn) => {
          // When the propmise to get the city is made
          if (tempraryBusSchedule.Booked != null)
            tempraryBusSchedule.Booked = [
              ...tempraryBusSchedule.Booked,
              { email: person.email, seats: Bus.Pending },
            ];
          else
            tempraryBusSchedule.Booked = [
              { email: person.email, seats: Bus.Pending },
            ];

          console.log(tempraryBusSchedule.Booked);

          Node = db.ref().child("BusSchedule/" + Bus.FireBaseIndex + "/Booked");
          Node.set([...tempraryBusSchedule.Booked]).then((readCountTxn) => {
            Node = db
              .ref()
              .child(
                "BusSchedule/" +
                  Bus.FireBaseIndex +
                  "/Pending/" +
                  Bus.pendingIndex
              );
            Node.set([]).then((readCountTxn) => {
              // setPromise(true);
              // setAccountVisible(false);
              // setPurchasedDoneVisible(true);
              console.log("payment successfull");
              // Navigate('/welcome')
            });
          });
        });
    } else {
      updateNode = db
        .ref()
        .child(
          "BusSchedule/" +
            Bus.FireBaseIndex +
            "/Booked/" +
            Bus.bookedIndex +
            "/seats"
        );
      updateNode.set([...Bus.Pending, ...Bus.Booked]).then((readCountTxn) => {
        updateNode = db
          .ref()
          .child(
            "BusSchedule/" + Bus.FireBaseIndex + "/Pending/" + Bus.pendingIndex
          );
        updateNode.set([]).then((readCountTxn) => {
          // setPromise(true);
          // setAccountVisible(false);
          // setPurchasedDoneVisible(true);
          console.log("payment successful");
          // Navigate('/welcome')
        });
      });
    }
  };

  // const AccountCancelHandler = () => {
  //   setAccountVisible(false);
  // };

  let [isPurchasedDoneVisible, setPurchasedDoneVisible] = useState(false);
  const PurchaseDoneHandler = () => {
    setPurchasedDoneVisible(false);
    // navigation.navigate("HomeScreen");
  };
  /*============================= My Data created ================================================== */

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
  const globalShadowBox = {
    shadowColor: "#B4B4B4",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  };

  return (
    <div
      style={{
        backgroundColor: GlobalBackgroundColors.primaryColor,
        flex: 1,
        marginTop: "100px",
      }}
    >
      {ticketVal.l === undefined ? (
        <p>
          No data <Link to="/home">Back to Search</Link>
        </p>
      ) : (
        <div style={{ flex: 1 }}>
          {/* Models */}
          <div
          // style={{
          //   display: isAccountVisible ? "flex" : "none",
          //   width: "100%",
          // }}
          >
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Make Payment
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div style={{ width: "100%", marginTop: "100px" }}>
                      <div
                        style={{
                          width: "100%",
                          flex: 1,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          padding: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                            flex: 1,
                            padding: "10px",
                            // backgroundColor: GlobalBackgroundColors.secondaryColor,
                            marginLeft: "auto",
                            marginRight: "auto",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              height: "15px",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <p style={{ color: "red", fontSize: "20px" }}>
                              {error}
                            </p>
                          </div>
                          <input
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              setAccountNumber(e.target.value);
                            }}
                            value={accountNumber}
                            placeholder="account number"
                            autoFocus
                            // onFocus={() => setFocusStyle({ outline: "none" })}
                          />
                          <button onClick={AccountModalOkHandler}>Ok</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: isPurchasedDoneVisible ? "flex" : "none" }}>
            {
              //   <PurchasedDoneModel
              //       isVisible={isPurchasedDoneVisible}
              //       PurchaseDoneHandler={PurchaseDoneHandler}
              //     />
            }
          </div>

          {/* Tickets */}
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
                  backgroundColor: GlobalBackgroundColors.secondaryColor,
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
                    flexDirection: "row",
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
                    flexDirection: "row",
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Name</p>
                  <p style={{ fontSize: "20px" }}>Date</p>
                </div>
                <div
                  style={{
                    flexDirection: "row",
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <p style={{ fontSize: "15px" }}>SeatNo</p>
                  <p style={{ fontSize: "15px" }}>Gender</p>
                </div>
                <div>
                  {Bus.Pending.map((item) => {
                    return (
                      <div
                        key={item.id}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 5,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "10px",
                            color: GlobalBackgroundTextColors.textBoxColor,
                          }}
                        >
                          {item.seatID}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            color: GlobalBackgroundTextColors.textBoxColor,
                          }}
                        >
                          {GenderDetail[item.Gender]}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Total Amount</p>
                  <p style={{ fontSize: "20px" }}>{totalamount}</p>
                </div>
                {/* Just a line*/}
              </div>

              {/* Buttons */}
              <div style={{ flexDirection: "row", justifyContent: "center" }}>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Purches Ticket
                </button>
                <button
                  // style={{backgroundColor:"black", height:"50px"}}
                  onClick={() => Navigate("/home")}
                >
                  Go to home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default TicketDetail;

// import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import { UserContext } from '../App';

// const TicketDetail = () => {
//     const { ticket } = useContext(UserContext);
//     const [ticketVal] = ticket;
//     console.log(ticketVal)
//     return (
//         <div style={{marginTop:"10px"}}>
//             ticket Detail
//         </div>
//     );
// };

// export default TicketDetail;
