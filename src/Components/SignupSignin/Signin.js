import React from "react";
import "../../scss/signinSignup/signin.scss";
import google from "../../images/Google.png";
import facebook from "../../images/social-facebook.png";

const Signin = () => {
  return (
    <div className="signin-section">
      <div className="container">
        <h3 className="text-center">SING IN TO BUY YOUR TICKET</h3>
        <div className="form-control-section">
          <form class="row g-3 text-center">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                id="email"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div class="col-md-12">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="forget">
              <a href="#">Forget Password?</a>
            </div>
            <div class="col-md-12">
              <button class="btn signin-btn" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="social-media-sign">
          <div className="row">
            <div class="col-md-6">
              <div className="common-signin-btn">
                <img src={google} alt="" />
                <button type="submit">Sign In with Google</button>
              </div>
            </div>
            <div class="col-md-6">
              <div className="common-signin-btn">
                <img src={facebook} alt="" />
                <button type="submit">Sign In with Facebook</button>
              </div>
            </div>
            <p>
              Do you have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
