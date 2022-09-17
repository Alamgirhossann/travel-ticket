import React from "react";
import "../../scss/manageBooking/smsEmail.scss";

const SmsEmail = () => {
  return (
    <div className="sms-email-section">
      <div className="container">
        <h3 className="text-center">SMS AND EMAIL TICKET</h3>
        <p className="text-center">
          Verify your details, and EMAIL / SMS your tickets
        </p>
        <div className="sms-email-form-control">
          <form className="row g-3 text-center">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                id="validationDefault01"
                placeholder="Enter Your Ticket No"
                required
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                id="validationDefault02"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="col-md-2">
              <button className="btn sms-btn" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SmsEmail;
