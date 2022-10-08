import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../App";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState("");
  let Navigate = useLocation();

  const resetPassword = () => {
    setLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then((res) => {
        setLoading(false);
        setSent("Please check your email");
        Navigate('/signin')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="form-control-section" style={{ marginTop: "100px" }}>
      <form className="row g-3 text-center">
        <div className="col-md-12">
          <p>{sent}</p>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
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
              disabled={!email}
              onClick={resetPassword}
              className="btn signin-btn"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
