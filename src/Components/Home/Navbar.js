import React from "react";
import { Link } from "react-router-dom";
import account from "../../images/account.png";
import logo from "../../images/final-logo.png";
import "../../scss/home/nav.scss";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light nav-background fixed-top">
      <div class="container">
        <a class="navbar-brand text-white" href="/">
          <img src={logo} alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <a class="nav-link active text-white" href="/">
                Ticket
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="/ryde">
                Ryde
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manage Booking
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item " href="/cancel">
                    Cancle
                  </a>
                </li>
                <li>
                  <a class="dropdown-item " href="/changeDate">
                    Change Travel Date
                  </a>
                </li>
                <li>
                  <a class="dropdown-item " href="/showTicket">
                    Show My Ticket
                  </a>
                </li>
                <li>
                  <a class="dropdown-item " href="/smsEmail">
                    Email/SMS
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-white"
                href="/help"
                tabindex="-1"
                aria-disabled="true"
              >
                Help
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img style={{ height: "1.8rem" }} src={account} alt="" />
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="/signin">
                    Signin
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/signup">
                    Sign Up
                  </a>
                </li>
              </ul>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
