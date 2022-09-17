import bkash from "../images/bkash.png";
import Rocket from "../images/rocket.png";
import nagad from "../images/nagad.png";
import "../scss/manageBooking/cancel.scss";
import React, { useState, useContext } from "react";
import { db, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const Payment = (props) => {
  const [loading, setLoading] = useState(false);
  const { user, ticket } = useContext(UserContext);
  const [person] = user;
  const [ticketVal] = ticket;
  const [Bus] = useState(ticketVal.Bus);
  let Navigate = useNavigate();
  const [error, setError] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  console.log(error, accountNumber, Bus)

    


    return (
      <div 
        style={{ width: "100%", marginTop:"100px" }}
      >
        <div
          style={{
            width: "100%",
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: '10px',
          }}
        >
          <div
            style={{
              width: "80%",
              flex: 1,
              padding: '10px',
              // backgroundColor: GlobalBackgroundColors.secondaryColor,
              marginLeft: "auto",
              marginRight: "auto",
              alignItems: "center",
            }}
          >
            <div style={{ height: '15px', alignItems: "center", marginBottom:"10px" }}>
              <p style={{ color: "red", fontSize:"20px" }}>{error}</p>
            </div>
            <input
              style={{ width: "100%" }}
              onChange={(e) => {
                setAccountNumber(e.target.value)
              }}
              value={accountNumber}
              placeholder="account number"
              // onFocus={() => setFocusStyle({ outline: "none" })}
            />
            <button
              // onClick={AccountModalOkHandler}
            >Ok</button>
            <button title="Cancel" 
            // onClick={() => AccountCancelHandler}
             >Cancel</button>
          </div>
        </div>
      </div>
  );
};

export default Payment;
