import React from "react";
import "../scss/help.scss";
import rant from "../images/helpDesk1.jpg";

const Help = () => {
  return (
    <div className="help-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="text-section">
              <p className='text-center fw-bold mt-5'>Non- Booking related issues</p>
              <div className="content-section">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        New bus booking help issue
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        Ryde helps you rent a vehicle from the best operators in
                        your city.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        COVID-19 travel advisory
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        We ask you a few simple questions regarding your trip.
                        We work with the best operators in your city to get you
                        detailed quotations so that you get the best deal.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Safety+ feature
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        We are currently operational in many cities such as
                        Bangalore, Mumbai, Pune, Chennai, Hyderabad, Delhi,
                        Ahmedabad, Madurai, Mysore, Visakhapatnam, Surat,
                        Vadodara, Vijayawada, Coimbatore, Goa, Pondicherry,
                        Erode, Ooty, Udaipur, Jaipur, Guwahati, Trichy, Kolkata,
                        and many more.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingfour">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Technical Issues
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingfour"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        You can write to us at ryde@redbus.in. Alternatively,
                        you can request a call back by clicking on the 'Request
                        a Callback' button on any of the quotes you've received.
                        One of our customer service executives will reach out to
                        you.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFive">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        Offers
                      </button>
                    </h2>
                    <div
                      id="collapseFive"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        You can confirm your reservation by paying a small
                        booking fee, typically up to to 25% of the base fare.
                        The balance can be paid directly to us through online
                        modes till two days before the start of the journey or
                        to the operator in cash at the time of boarding.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 text-center">
            <h1>Travel.com Help</h1>
            <figure className="d-flex justify-content-center">
              <img src={rant} alt="" />
            </figure>
            <h2>24/7 Customer Support</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
