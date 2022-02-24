import React from "react";
import "../../scss/home/growing.scss";

const Growing = () => {
  return (
    <div className="growing-section" data-aos="fade-up" data-aos-duration="1500">
      <div className="container">
        <h2>THE NUMBERS ARE GROWING!</h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="growing-card">
              <div class="card-body">
                <h6 class="card-title">CUSTOMERS</h6>
                <h2>36 M</h2>
                <p class="card-text">
                  redBus is trusted by over 36 million happy customers globally
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="growing-card">
              <div class="card-body">
                <h6 class="card-title">OPERATORS</h6>
                <h2>3500</h2>
                <p class="card-text">
                  network of over 3500 bus operators worldwide
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="growing-card">
              <div class="card-body">
                <h6 class="card-title">BUS TICKETS</h6>
                <h2>220+ M</h2>
                <p class="card-text">
                  Over 220 million trips booked using redBus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Growing;
