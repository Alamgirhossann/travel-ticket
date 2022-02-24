import React from "react";
import "../../scss/home/routeOperator.scss";

const RoutesOperators = () => {
  return (
    <div
      className="routes-operator-section"
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <div className="container">
        <div className="route">
          <div className="row">
            <div className="col">
              <h4>Top Bus Routes</h4>
              <p>Kathmandu to Pokhara</p>
              <p>Pokhara to Kathmandu</p>
              <p>Hyderabad to Bangalore</p>
              <p>Dhaka to Chittgong</p>
            </div>
            <div className="col">
              <h4>Top Cities</h4>
              <p>Hyderabad</p>
              <p>Bangalore</p>
              <p>Kathmandu</p>
              <p>Pokhara</p>
              <p>Dhaka</p>
              <p>Chittgong</p>
            </div>
            <div className="col">
              <h4>Top RTC's</h4>
              <p>APSRTC</p>
              <p>MSRTC</p>
              <p>HRTC</p>
              <p>UPSRTC</p>
            </div>
            <div className="col">
              <h4>Tempo Traveller in Cities</h4>
              <p>Kathmandu to Pokhara</p>
              <p>Pokhara to Kathmandu</p>
              <p>Hyderabad to Bangalore</p>
              <p>Dhaka to Chittgong</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="operator">
          <h4>Top Operators</h4>
          <a href="/operator-detail">Annapurna</a> |
          <a href="/operator-detail"> Star Transport</a> |
          <a href="/operator-detail"> Vehicle Consult</a> |
          <a href="/operator-detail"> Himalayan Transport</a> |
        </div>
      </div>
    </div>
  );
};

export default RoutesOperators;
