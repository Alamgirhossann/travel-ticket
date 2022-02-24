import React from "react";
import "../../scss/manageBooking/showTicket.scss";

const ShowTicket = () => {
  return (
    <div className="show-ticket-section">
      <div className="container">
        <h3 className="text-center">PRINT TICKET</h3>
        <p className="text-center">
          Verify your details, and Print your tickets
        </p>
        <div className="show-ticket-form-control">
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
              <button class="btn show-ticket-btn" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShowTicket;
