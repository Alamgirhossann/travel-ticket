import React from "react";
import "../../scss/home/header.scss";

const Header = () => {
  return (
    <div className="header-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <form class="row g-3 needs-validation" novalidate>
              <div class="col-md-10">
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  placeholder="Form"
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
              <div class="col-md-10">
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom02"
                  placeholder="To"
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>

              <div class="col-md-10 select">
                <select
                  style={{ border: "1px solid #FF735C", opacity: ".7" }}
                  class="form-select"
                  id="validationDefault04"
                  required
                >
                  <option className='text-dark' selected disabled value="">
                    Choose Vehicle
                  </option>
                  <option>Car</option>
                  <option>Tempo</option>
                  <option>Bus</option>
                  <option>Truck</option>
                  <option>Airoplan</option>
                </select>
              </div>

              <div class="col-md-10">
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom05"
                  placeholder="Date"
                  required
                />
                <div class="invalid-feedback">Please provide a valid zip.</div>
              </div>
              <div class="col-md-10">
                <button class="btn search-btn" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
