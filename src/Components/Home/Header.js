import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../../App";
import "../../scss/home/header.scss";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FilterBusSchedule, GetDate, GetPending } from "../../Functions";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Header = () => {
  const { booking, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    from: "",
    to: "",
    dateVal: "",
  });
  const [city, setcity] = useState([]);
  const [date, setDate] = useState([]);
  const [busList, setBusList] = useState([]);
  const [userVal, setUserVal] = user;
  const [bookingVal, setBookingVal] = booking;
  const [error, setError] = useState("");
  let Navigate = useNavigate();

  console.log(state.dateVal, state.from.name, state.to.name, bookingVal, state, typeof(date));

  useEffect(() => {
    const citiesData = db.ref("CityName");
    citiesData.on("value", (snapshot) => {
      const cityData = snapshot.val();
      setcity(cityData);
    });
  }, []);
  useEffect(() => {
    const dateData = db.ref("BusSchedule");
    dateData.on("value", (snapshot) => {
      const dates = snapshot.val();
      setDate(dates);
    });
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   console.log(string, results);
  // };

  // const handleOnHover = (result) => {
  //   // the item hovered
  //   console.log(result);
  // };

  const handleOnSelect = (item) => {
    setState({ ...state, from: item });
    console.log(item);
  };
  const handleOnSelect2 = (item) => {
    setState({ ...state, to: item });
    console.log(item);
  };

  // const handleOnFocus = () => {
  //   console.log("Focused");
  // };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div>
        <span key={item.id} style={{ display: "block", textAlign: "left" }}>
          {item.name}
        </span>
      </div>
    );
  };

  let currentDate = state.dateVal || "DEFAULT";

  const search = (e) => {
    e.preventDefault();
    if (state.from.name && state.to.name && state.dateVal) {
      const citiesData = db.ref("BusSchedule");
      citiesData.once("value", (snapshot) => {
        const data = snapshot.val();
        const buses = [];
        console.log(buses, data);
      
        data.filter((ele) => {
          if (
            ele.Arrival === state.from.name &&
            ele.Destination === state.to.name &&
            ele.Date === state.dateVal
          ) {
            buses.push(ele);
            setBookingVal(buses);
            Navigate("/searchResult");
            console.log(ele);
          } else {
            Navigate("/searchResult");
          }
        });
        // setDateValue(data);
        console.log(data);
      });
    } else {
      setError("Please Fill All Fields");
    }
  };

  const style = {
    height: "100px",
  };

  return (
    <div className="header-section">
      <div className="container">
        <p className="text-danger">{error}</p>
        <div className="row">
          <div className="col-lg-5">
            <form className="row g-3 needs-validation">
              <div className="col-md-12" style={{ zIndex: 4 }}>
                <ReactSearchAutocomplete
                  type="text"
                  // className="form-control"
                  // id="validationCustom01"
                  // style={style}
                  placeholder="From"
                  // name="from"
                  required
                  // value={state.from}
                  // onChange={handleChange}
                  items={city}
                  // onSearch={handleOnSearch}
                  // onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  // onFocus={handleOnFocus}
                  autoFocus
                  formatResult={formatResult}
                />
              </div>
              <div className="col-md-12" style={{ zIndex: 2 }}>
                <ReactSearchAutocomplete
                  type="text"
                  // style={style}
                  // className="form-control"
                  // id="validationCustom01"
                  placeholder="To"
                  // name="to"
                  required
                  // value={state.to}
                  // onChange={handleChange}
                  items={city}
                  // onSearch={handleOnSearch}
                  // onHover={handleOnHover}
                  onSelect={handleOnSelect2}
                  // onFocus={handleOnFocus}
                  formatResult={formatResult}
                />
              </div>
              <div className="col-md-12" style={{ zIndex: 1 }}>
                <select
                  aria-label="Default select example"
                  value={currentDate}
                  onChange={handleChange}
                  name="dateVal"
                  style={{
                    width: "100%",
                    height: "45px",
                    borderRadius: "40px",
                    padding: "0px 15px",
                    border: "none",
                    outline: "none",
                    paddingRight:"20px",
                  }}
                >
                  <option style={{width:"50px",}} value="DEFAULT" disabled>
                    Select Date
                  </option>
                  {Array.from(new Set(date.map((j) => j.Date))).map(
                    (date, i) => (
                     <option value={`${date}`}>{date}</option>
                    )
                  )}
                </select>
              </div>

              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="spinner-border text-dark " role="status">
                    <span className="visually-hidden ">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <button
                    onClick={search}
                    className="btn search-btn"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
