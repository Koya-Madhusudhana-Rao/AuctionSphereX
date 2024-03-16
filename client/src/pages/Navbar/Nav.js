import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar">
      {/* Logo/Brand element */}
      <div className="logo">
        <Link to="/Main" className="logo-link">
          <img src="https://github.com/YUVARAJMORLA/imagesforprofile/blob/main/aux1-removebg-preview.png?raw=true" 
        style={{ height: '60px', cursor: 'pointer' }} 
        />
        </Link>
      </div>

      {/* Navigation links */}
      <ul className="nav-links">
        <li>
          <Link to="/Main">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/FAQ">FAQ</Link>
        </li>
        <li className="contact-btn">
          <Link to="/contact" className="contact-link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
