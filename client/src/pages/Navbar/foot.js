import React from 'react';
import './foot.css';
import { FaFacebook, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import {SiGmail} from 'react-icons/si';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
      <a href="https://github.com/Koya-Madhusudhana-Rao" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="mailto:madhusudhanaraokoya@gmail.com" target="_blank" rel="noopener noreferrer">
          <SiGmail />
        </a>
        <a href="https://www.instagram.com/madhu63096/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
      <div className="footer-center">
        <p>&copy; 2023 AuctionSphereX. All rights reserved.</p>
      </div>
      <div className="footer-right">
        <Link to="/contact">
          <FaEnvelope />
        </Link>
        <p>Get in touch</p>
      </div>
    </footer>
  );
}

export default Footer;
