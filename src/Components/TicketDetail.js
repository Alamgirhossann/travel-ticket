import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db, UserContext } from "../App";

function TicketDetail() {
  const { ticket, user } = useContext(UserContext);
  const [ticketVal] = ticket;
  const [person = false] = user;
  const { state } = useLocation();
  const [Bus, setBus] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const Navigate = useNavigate();

  console.log(person, typeof Bus, Bus);
  /*============================= Data passed ====================================================== */

  useEffect(() => {
    if (state !== null) {
      setSelectedData(state.selectedData);
      setBus(state.BusInfo);
    } else {
      Navigate("/home");
    }
  }, []);
  
  let tempBusPending = [];
  let tempBusBooked = [];

  useEffect(() => {
    if (selectedData != null) {
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

      let tempBus = { ...Bus };
      tempBus.Pending = tempBusPending;
      tempBus.Booked = tempBusBooked;
      setBus(tempBus);
    }
    console.log("Bus=>", Bus);
  }, []);

  /*============================= Modfying data because of different screen ======================== */

  /*============================= My Data created ================================================== */
  const [promise, setPromise] = useState(false);
  const GenderDetail = ["Male", "Female"];
  // var amount = Bus.Price;
  // var totalTicket = Bus.Pending.length;
  // var totalamount = amount * totalTicket;
  let [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const [payError, setPayError] = useState("");

  // Functions

  const AccountModalOkHandler = () => {
    
    if (accountNumber.length !== 11) {
      setError("Enter 11 digit number");
      return;
    } else {
      setError("");
    }
    console.log("button is clicked");
    // Geting new Booked seats
    // setPromise(false);
    var newBookedSeats = [];
    var updateNode = null;
    var tempraryBusSchedule = [];

    if (Bus.bookedIndex === -1) {
      //   // Means there is no booking for the user so we have to gett all the booking and then insert the booking o user as well
      newBookedSeats = [{ email: person.email, seats: [...Bus.Pending] }];

      let Node = db.ref().child("BusSchedule/" + Bus.FireBaseIndex); // Getting the city reference
      Node.once("value")
        .then((datasnap) => {
          tempraryBusSchedule = datasnap.val();
          console.log(tempraryBusSchedule);
        })
        .then((readCountTxn) => {
          // When the propmise to get the city is made
          if (tempraryBusSchedule.Booked != null) {
            tempraryBusSchedule.Booked = [
              ...tempraryBusSchedule.Booked,
              { email: person.email, seats: Bus.Pending },
            ];
          } else {
            tempraryBusSchedule.Booked = [
              { email: person.email, seats: Bus.Pending },
            ];
          }

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
              setPromise(true);
              // setAccountVisible(false);
              // setPurchasedDoneVisible(true);
              console.log("first payment successfull");
              setPaymentSuccess(" first Payment Successful");
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
          setPromise(true);
          // setAccountVisible(false);
          // setPurchasedDoneVisible(true);
          console.log("second payment successful");
          setPaymentSuccess(" second Payment Successful");
        });
      });
    }
    console.log("purches success");
       
  };

  const modalClose = () => {
    if (promise) {
      Navigate("/welcome");
    } else {
      setPayError("pay First");
    }
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

  return (
    <div
      style={{
        // backgroundColor: GlobalBackgroundColors.primaryColor,
        flex: 1,
        marginTop: "100px",
      }}
    >
      {Bus === null || selectedData === null ? (
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
                        <p>{payError}</p>
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

                            <p>{paymentSuccess}</p>
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
                    {promise ? (
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => modalClose()}
                      >
                        Proceed
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tickets */}
          <h2 className="text-center">Confirm Purches</h2>
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
                  <p style={{ fontSize: "20px" }}>
                    {Bus.Price * Bus.Pending.length}
                  </p>
                </div>
                {/* Just a line*/}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "center" }}>
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
