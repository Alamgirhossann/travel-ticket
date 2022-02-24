import React from "react";
import share from '../../images/share.jpg';
import gps from '../../images/gps.jpg';
import clean from '../../images/clean.jpg';

const LooksPartners = () => {
  return (
    <div className="looks-partner my-5">
      <div className="container">
          <h4 className='mb-4 text-left'><strong>Look for partners to get</strong></h4>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="look-partner-card">
              <img src={share} class="card-img-top" alt="..." />
            </div>
          </div>
          <div class="col">
            <div class="look-partner-card">
              <img src={gps} class="card-img-top" alt="..." />
            </div>
          </div>
          <div class="col">
            <div class="look-partner-card">
              <img src={clean} class="card-img-top" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LooksPartners;
