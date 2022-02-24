import React, { useEffect } from "react";
import mobileLogo from "../../images/mobile1.jpg";
import "../../scss/home/convenience.scss";

const Convenience = () => {
  
  return (
    <div className="convenience-section" data-aos="fade-up" data-aos-duration="1000">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
          <figure>
              <img className='' src={mobileLogo} alt="" />
            </figure>
          </div>
          <div className="col-lg-6">
          <div className="convenience-text">
              <h2>CONVENIENCE ON-THE-GO.</h2>
              <p>Enjoy the following exclusive features on the redBus app</p>
              <p>
                Last Minute Booking - In a hurry to book a bus at the last
                minute? Choose the bus passing from your nearest boarding point
                and book in a few easy steps.
              </p>
              <p>
                Boarding Point Navigation - Never lose your way while travelling
                to your boarding point!
              </p>
              <p>
                Comprehensive Ticket Details- Everything that you need to make
                the travel hassle free - rest stop details, boarding point
                images, chat with co-passengers, wake-up alarm and much more!
              </p>
              <p>
                Enter your mobile number below to download the redBus mobile
                app.
              </p>
            </div>
            <form class="row g-3">
              <div class="col-md-3">
                <select id="inputState" class="form-select">
                  <option selected>91</option>
                  <option>...</option>
                </select>
              </div>
              <div class="col-md-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputZip"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div class="col-12">
                <button type="submit" class="btn sms-btn">
                  SMS ME THE LINK
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convenience;
