import React, { useState } from "react";
import Footer from "../Navbar/foot";
import Nav from "../Navbar/Nav";
import LoginForm from "../Login/LoginForm";
import './testmain.css';

function TestMain() {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipImage = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="main-container">
      <Nav />
      <div className="main-content">
        <div className="title">AuctionSphereX</div>
        <div className="subtitle">Live .</div>
        <div className="auction-container">
          <img
            src="https://github.com/YUVARAJMORLA/imagesforprofile/blob/main/auc.png?raw=true"
            alt="Auction Image"
            className={`auction-image ${isFlipped ? "flip" : ""}`}
            onClick={flipImage}
          />
        </div>
        <div className="right-content">
          <div className="login-form">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="footer"><Footer /></div>
    </div>
  );
}

export default TestMain;
