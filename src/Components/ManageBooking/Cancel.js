import React from "react";
import "../../scss/manageBooking/cancel.scss";

const Cancel = () => {
  return (
    <div className="cancel-section">
      <div className="container">
        <h3 className="text-center">Cancel your Ticket</h3>
        <div className="cancel-form-control">
          <form class="row g-3 text-center">
            <div class="col-md-5">
              <input
                type="text"
                class="form-control"
                id="validationDefault01"
                placeholder="Enter Your Ticket No"
                required
              />
            </div>
            <div class="col-md-5">
              <input
                type="text"
                class="form-control"
                id="validationDefault02"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div class="col-md-2">
              <button class="btn cancel-btn" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
