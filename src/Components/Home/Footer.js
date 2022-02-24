import React from "react";
import facebook from "../../images/social-facebook.png";
import twitter from "../../images/social-twitter.png";
import instagram from "../../images/social-instagram.png";
import Logo from "../../images/final-logo.png";
import linkedin from "../../images/social-linkedin.png";
import googlePlay from "../../images/google-play.png";
import appleStore from "../../images/app-store.png";
import "../../scss/home/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <figure>
              <img src={Logo} alt="" />
            </figure>
            <p>
              redBus is the world's largest online bus ticket booking service
              trusted by over 25 million happy customers globally. redBus offers
              bus ticket booking through its website,iOS and Android mobile apps
              for all major routes.
            </p>
            <div className="footer-icon">
              <a href="#">
                <img src={facebook} alt="" />
              </a>
              <a href="#">
                <img src={twitter} alt="" />
              </a>
              <a href="#">
                <img src={linkedin} alt="" />
              </a>
              <a href="#">
                <img src={instagram} alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-2">
            <p className='fw-bold pb-2'>About Travel.com</p>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Travel.com on Mobile</p>
            <p>Sitemap</p>
            <p>Offers</p>
            <p>Value</p>
          </div>
          <div className="col-lg-2">
            <p className='fw-bold pb-2'>Info </p>
            <p>privacy Policy</p>
            <p>FAQ</p>
            <p>Blog</p>
            <p>Bus Operator Ragistration</p>
            <p>Agent Registration</p>
            <p>User Agreement</p>
          </div>
          <div className="col-lg-2">
            <p className='fw-bold pb-2'>Global Sites </p>
            <p>Nepal</p>
            <p>Bangladesh</p>
            <p>India</p>
          </div>
          <div className="col-lg-2">
            <p className='fw-bold pb-2'>Our Partners </p>
            <p>Annapurna</p>
            <p>Star Transport Service pvt ltd</p>
            <p>Vehicle Consult pvt. Ltd</p>
          </div>
        </div>
        <div className="app-store">
          <figure>
            <img src={googlePlay} alt="" />
          </figure>
          <figure>
            <img src={appleStore} alt="" />
          </figure>
        </div>
        <p className="text-center">Ⓒ 2021 ibibogroup All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
