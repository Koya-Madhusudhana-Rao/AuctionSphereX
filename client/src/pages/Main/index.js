import React, { useState } from "react";
import Footer from "../Navbar/foot";
import "./main.css";
import Nav from "../Navbar/Nav";
import LoginForm from "../Login/LoginForm";

function Main() {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipImage = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
    <div className="container">
      <Nav />
      <div className="main-content">
        <div className="AuctionSphereX">AuctionSphereX</div>
        <div className="AuctionSphereY">Live .</div>
        <div className="auction-container">
          <img
            src="https://github.com/YUVARAJMORLA/imagesforprofile/blob/main/auc.png?raw=true"
            alt="Auction Image"
            className={`auction-image ${isFlipped ? "flip" : ""}`}
            onClick={flipImage}
          />
        </div>
        <div className="right-content">
          <div className="Login-Form">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="foot-div"><Footer /></div>
    </div>
    </div>
  );
}

export default Main;
