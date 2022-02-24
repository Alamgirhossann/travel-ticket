import React from "react";
import mobileLogo from "../../images/account.png";
import "../../scss/home/award.scss";

const Awards = () => {
  return (
    <div className="award-section" data-aos="fade-up" data-aos-duration="1500">
      <div className="container">
        <h2>AWARDS & RECOGNITION</h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="award-card">
              <div className="d-flex justify-content-center pt-3">
                <img src={mobileLogo} class="card-img-top" alt="..." />
              </div>
              <div class="card-body">
                <h5 class="card-title">SUPERIOR CUSTOMER SERVICE</h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="award-card">
              <div className="d-flex justify-content-center pt-3">
                <img src={mobileLogo} class="card-img-top" alt="..." />
              </div>
              <div class="card-body">
                <h5 class="card-title">LOWEST PRICES</h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="award-card">
              <div className="d-flex justify-content-center pt-3">
                <img src={mobileLogo} class="card-img-top" alt="..." />
              </div>
              <div class="card-body">
                <h5 class="card-title">UNMATCHED BENEFITS</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;
