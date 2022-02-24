import React from "react";
import "../../scss/signinSignup/signup.scss";
import google from "../../images/Google.png";
import facebook from "../../images/social-facebook.png";

const Signup = () => {
  return (
    <div className="signup-section">
      <div className="container">
        <h3 className="text-center">SIGN UP FOR ACCESS YOUR BOOKING</h3>
        <div className="form-control-section">
          <form class="row g-3">
            <div class="col-md-6">
              <label for="validationDefault01" class="form-label">
                First name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationDefault01"
                placeholder="First name"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="validationDefault02" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationDefault02"
                placeholder="Last name"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="validationDefaultUsername" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                id="validationDefaultUsername"
                placeholder="Username"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="validationDefault03" class="form-label">
                Email
              </label>
              <input
                type="text"
                class="form-control"
                id="validationDefault03"
                placeholder="Email"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="validationDefault04" class="form-label">
                Password
              </label>
              <input
                type="text"
                class="form-control"
                id="validationDefault05"
                placeholder="Password"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="validationDefault05" class="form-label">
                Confirm Password
              </label>
              <input
                type="text"
                class="form-control"
                id="validationDefault05"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div class="col-12">
              <button class="btn signup-btn" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="social-media-sign">
          <div className="row">
            <div class="col-md-6">
              <div className="common-signin-btn">
                <img src={google} alt="" />
                <button type="submit">Sign Up with Google</button>
              </div>
            </div>
            <div class="col-md-6">
              <div className="common-signin-btn">
                <img src={facebook} alt="" />
                <button type="submit">Sign Up with Facebook</button>
              </div>
            </div>
            <p>
              Do you have an account? <a href="/signin">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
