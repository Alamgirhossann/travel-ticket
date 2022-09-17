import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, UserContext } from "../App";
import { GetAllSeats, GetSingleBus, updatePendingSeats } from "../Functions";

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

function SvgComponent(props) {
  var { color = -1, width = "100%", height = "100%", seatID } = props;
  var fill = "#AFADAD"; // Purchased

  if (color == 0)
    // Male
    fill = "#5641B6";
  else if (color == 1) fill = "#FB8549"; // Female
  else if (color == 2) fill = "black"; // Not selected

  return (
    <div className="d-flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.997 511.997"
        fill={fill}
        width={width}
        height={height}
      >
        <path d="M339.605 198.072c-2.458-10.47-10.377-18.654-20.668-21.359-10.726-2.816-28.928-6.187-54.844-6.187-3.046 0-5.009.06-5.393.077l-2.372.094-2.884-.094c-.384-.017-2.389-.077-5.564-.077-25.907 0-44.117 3.371-54.835 6.187-10.3 2.705-18.219 10.889-20.676 21.35l-25.003 106.291c-1.186 4.992-1.399 9.916-.657 14.635.427 2.714.896 5.308 1.391 7.774 2.91 14.473 16.572 24.021 31.087 22.502v-25.003c0-4.719 3.814-8.533 8.533-8.533s8.533 3.814 8.533 8.533v22.212a410.018 410.018 0 0117.067-2.415V315.73a8.525 8.525 0 018.533-8.533 8.525 8.525 0 018.533 8.533v26.684a353.082 353.082 0 0117.067-.853v-34.364a8.525 8.525 0 018.533-8.533 8.525 8.525 0 018.533 8.533v34.364a354.43 354.43 0 0117.067.853V315.73c0-4.719 3.814-8.533 8.533-8.533s8.533 3.814 8.533 8.533v28.331a407.524 407.524 0 0117.067 2.406v-22.204c0-4.719 3.814-8.533 8.533-8.533s8.533 3.814 8.533 8.533v25.003c14.49 1.51 28.177-8.03 31.095-22.502.486-2.458.956-5.043 1.391-7.757.742-4.727.512-9.66-.657-14.652l-25.009-106.283z" />
        <path d="M432.707 329.643c2.125-13.508 1.57-27.281-1.638-40.926l-30.396-129.118c-9.54-30.635-43.708-45.005-76.416-51.686v-22.58h24.004a27.399 27.399 0 0022.511-11.793 27.364 27.364 0 003.123-25.19l-11.469-30.592C358.441 7.134 348.142 0 336.801 0H175.18c-11.341 0-21.641 7.134-25.634 17.766l-11.469 30.575a27.381 27.381 0 003.132 25.199 27.382 27.382 0 0022.502 11.793h24.013v22.665c-32.802 6.767-66.97 21.282-76.578 52.173L80.903 288.717c-3.209 13.645-3.755 27.418-1.621 40.934 9.873 62.558 36.267 97.015 74.308 97.015h1.502l1.408-.512c.452-.162 46.285-16.555 99.49-16.555 53.197 0 99.029 16.393 99.49 16.555l1.408.512h1.502c38.042.001 64.435-34.457 74.317-97.023zM204.79 85.333h102.4v19.712c-26.684-3.593-48.99-2.731-50.816-2.637-2.159-.111-24.721-.973-51.584 2.688V85.333zm177.34 236.34a205.34 205.34 0 01-1.519 8.457c-4.335 21.572-23.458 36.514-44.8 36.514-2.978 0-6.007-.299-9.045-.905-24.397-4.872-48.205-7.339-70.775-7.339s-46.379 2.466-70.767 7.339c-24.781 4.984-48.922-11.034-53.862-35.627a194.228 194.228 0 01-1.502-8.456c-1.092-6.912-.794-14.054.888-21.214l25.011-106.283c3.908-16.631 16.529-29.636 32.947-33.946 11.682-3.081 31.445-6.75 59.179-6.75 3.541 0 5.777.077 6.246.094l2.219.094 1.587-.094c.282-.017 2.551-.094 6.161-.094 27.733 0 47.488 3.669 59.187 6.75 16.401 4.309 29.03 17.314 32.939 33.954l25.011 106.274c1.68 7.16 1.979 14.302.895 21.232z" />
        <path d="M74.744 379.962c-6.187 2.278-12.493 5.658-17.877 10.761-9.429 8.917-14.208 21.009-14.191 36.42.034.819 5.623 80.205 102.383 84.642v-68.582c-21.982-2.424-51.789-15.446-70.315-63.241zM255.989 426.664c-49.681 0-93.278 15.394-93.705 15.548l-.162.06v69.726h187.733v-69.734l-.171-.06c-.418-.146-44.014-15.54-93.695-15.54zM455.114 390.723c-5.393-5.103-11.699-8.491-17.877-10.761-18.534 47.795-48.333 60.817-70.315 63.241v68.582c96.751-4.437 102.34-83.831 102.4-85.12 0-14.933-4.787-27.025-14.208-35.942z" />
      </svg>
      <div>{seatID}</div>
    </div>
  );
}

function BusDetailCar(props) {
  var { Bus } = props;
  return (
    <div>
      {/* Bus Detail */}
      <div
        style={
          // globalShadowBox,
          {
            shadowColor: "#B4B4B4",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 13,
            marginTop: "80px",
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "90%",
            padding: "5px",
            // backgroundColor: GlobalBackgroundColors.ternaryColor,
          }
        }
      >
        <p
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          {Bus.Price}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3px",
          }}
        >
          <p
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              fontSize: "20px",
            }}
          >
            {Bus.Arrival}
          </p>
          {
            //   <Image
            //   style={{ width: 50, height: 40 }}
            //   source={require("../../assets/Images/BusTicketLogo.png")}
            // />
          }
          <p
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              fontSize: "20px",
            }}
          >
            {Bus.Destination}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <p style={{ fontSize: "10px" }}>{Bus.DepartureTime}</p>
          <p style={{ fontSize: "10px" }}>{Bus.ArrivalTime}</p>
        </div>
      </div>
      {/* Seats */}
    </div>
  );
}

function SeatInfo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "5px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "30px", height: "30px" }}>
          {<SvgComponent color={0}></SvgComponent>}
        </div>
        <p style={{ marginLeft: "10px" }}>Male</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "30px", height: "30px" }}>
          {<SvgComponent color={1}></SvgComponent>}
        </div>
        <p style={{ marginLeft: "10px" }}>Female</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "30px", height: "30px" }}>
          {<SvgComponent color={-1}></SvgComponent>}
        </div>
        <p style={{ marginLeft: "10px" }}>Booked</p>
      </div>
    </div>
  );
}

function FullSeat(props) {
  // Initial Daa
  var { color, seatsHandler, seatID } = props;
  // Seat Color
  var [seatColor, seatColorChange] = useState(color);
  console.log(color, seatID);
  // Disable color or not
  var disable = false;
  if (color === -1) disable = true;

  function pressHandler() {
    seatsHandler(seatColor, seatID, seatColorChange);
  }
  return (
    <button
      disabled={disable}
      onClick={() => pressHandler()}
      style={
        disable
          ? {
              backgroundColor: "red",
              width: "50px",
              height: "50px",
              marginBottom: "10px",
            }
          : {
              backgroundColor: "white",
              width: "50px",
              height: "50px",
              marginBottom: "10px",
            }
        // { width: "40px", height: "40px", marginBottom: "10px" }
      }
    >
      {<SvgComponent color={seatColor} seatID={seatID}></SvgComponent>}
    </button>
  );
}

const BookingDetail = () => {
  const { date, booking, seatNum, user, bus, ticket } = useContext(UserContext);
  const [busVal] = bus;
  const [person] = user;
  const { id } = useParams();
  const [ ticketVal, setTicketVal] = ticket;
  console.log( busVal, person, ticketVal);
  let Navigate = useNavigate();
  var [Error, setError] = useState("");
  var selectedData = [];
  var [selectedBus, setSelectedBus] = useState(busVal);
  // var BusSeatData = Bus;
  var [Booked, setBooked] = useState([]);
  /*==================== Created Data =============================================*/
  console.log(selectedBus.TotalSeat, selectedBus, selectedData, Booked);

  useEffect(() => {
    var tempraryBusSchedule = [];
    const BusScheduleNode = db.ref().child("BusSchedule"); // Getting the city reference
    BusScheduleNode.once("value")
      .then((datasnap) => {
        tempraryBusSchedule = datasnap.val();
        console.log(tempraryBusSchedule, busVal, person.email);
      })
      .then((readCountTxn) => {
        // When the propmise to get the city is made
        var single = GetSingleBus(busVal, tempraryBusSchedule, person.email);
        var tempBooked = GetAllSeats(single);
        setSelectedBus(single);
        setBooked(tempBooked);
        console.log("Woooo =>", single, tempBooked);
      });
  }, []);

  var tempBusSchedule = [];
  console.log(tempBusSchedule);

  function bookSeat() {
    if (selectedData.length === 0) {
      setError("Please select the seats");
      return;
    }

    setError("");
    const CitiesNode = db
      .ref()
      .child("BusSchedule/" + selectedBus.FireBaseIndex + "/Pending"); // Getting the Busschedule
    CitiesNode.once("value")
      .then((datasnap) => {
        tempBusSchedule = datasnap.val();
      })
      .then((readCountTxn) => {
        // updating
        var temp = updatePendingSeats(
          tempBusSchedule,
          person.email,
          selectedData
        );
        var { userIndex, seats } = temp;
        console.log("userIndex", userIndex);
        var NewBookedNode = null;

        if (userIndex == -1) {
          NewBookedNode = db
            .ref()
            .child("BusSchedule/" + selectedBus.FireBaseIndex + "/Pending");
          NewBookedNode.set(seats).then((readCountTxn) => {
            // setPromise(true);
            selectedBus.pendingIndex = seats.length - 1;
            setTicketVal({...ticket, Bus: selectedBus, selectedData, person})
            Navigate("/TicketDetail");
          });
        } else {
          NewBookedNode = db
            .ref()
            .child(
              "BusSchedule/" +
                selectedBus.FireBaseIndex +
                "/Pending/" +
                userIndex +
                "/seats"
            );
          NewBookedNode.set([...seats]).then((readCountTxn) => {
            // setPromise(true);
            setTicketVal({...ticket, Bus: selectedBus, selectedData, person})
            Navigate("/TicketDetail");
          });
        }
      });
  }

  var seatsHandler = (seatColor, seatID, seatColorChange) => {
    var found = false;
    selectedData = selectedData.filter((item) => {
      console.log(item)
      if (item.seatID === seatID) {
        found = true;
        if (seatColor === 2) {
          //If seat color is black
          item.Gender = 0;
          seatColorChange(0);
          return item;
        } else if (seatColor === 0) {
          item.Gender = 1;
          seatColorChange(1);
          return item;
        } else if (seatColor === 1) {
          seatColorChange(2);
        }
      } else {
        return item;
      }
    });

    if (found === false) {
      selectedData.push({ seatID, Gender: 0 });
      seatColorChange(0);
    }
  };

  var BusSeatDataComponent = [];

  for (var i = 1; i <= selectedBus.TotalSeat; i++) {
    var marginRight = 0;
    var newLine = false;
    if ((i - 1) % 4 === 0) {
      BusSeatDataComponent.push(<div style={{ width: "100%" }}></div>);
      newLine = true;
    }
    if ((i + 1) % 2 === 0 && newLine === false) {
      BusSeatDataComponent.push(<div style={{ flex: 1 }}></div>);
    }
    if (Booked.includes(i)) {
      BusSeatDataComponent.push(
        <div className="">
          <div className="d-flex">
            <FullSeat color={-1} seatsHandler={seatsHandler} seatID={i} />
          </div>
        </div>
      );
    } else {
      BusSeatDataComponent.push(
        <div className="">
          <div className="d-flex">
            <FullSeat color={2} seatsHandler={seatsHandler} seatID={i} />
          </div>
        </div>
      );
    }
    newLine = false;
  }

  return (
    <div
      style={{
        flex: 1,marginTop:"100px"
      }}
    >
      {busVal.length === 0 ?( 
        <p>No data <Link to='/home'>Back to Search</Link> </p>
      ):(<div>
        <div
          style={{
            backgroundColor: GlobalBackgroundColors.primaryColor,
            flex: 1,
          }}
        >
          {<BusDetailCar Bus={selectedBus}></BusDetailCar>}
          {/* Seats Goes Here */}
          <div
            style={
              // globalShadowBox,
              {
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "20px",
                // flex: 1,
                backgroundColor: GlobalBackgroundColors.ternaryColor,
              }
            }
          >
            {<SeatInfo />}
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              {Error}
            </p>

            {/* Seats*/}
            <div>
              <div style={{}}>{BusSeatDataComponent}</div>
            </div>

            {/* Butons */}
            <div style={{ marginBottom: "10px" }}>
              <button
                onClick={() => bookSeat()}
                style={
                  // primaryButton,
                  { marginLeft: "auto", marginRight: "auto", backgroundColor:"black" }
                }
              >
                <p
                  style={{
                    textAlign: "center",
                    color: GlobalBackgroundTextColors.secondaryColor,
                  }}
                >
                  Book Now
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default BookingDetail;
