import React from "react";
import "./HowItWorks.css";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CallIcon from "@mui/icons-material/Call";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

function HowItWorks() {
  return (
    <div className="how-it-works-container">
      <h2 className="how-it-works-title">How WheelzLoop Works</h2>
      <div className="how-it-works-steps">
        <div className="step">
          <div className="step-icon">
            <GroupAddIcon />
          </div>
          <h3>Create an Account</h3>
          <p>Sign up, get verified, and list your car for sale with ease.</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <DirectionsCarIcon />
          </div>
          <h3>Add Your Cars</h3>
          <p>Upload your car’s details, photos, and set your price.</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <CallIcon />
          </div>
          <h3>Direct Contact with Buyers</h3>
          <p>Engage with potential buyers through our platform.</p>
        </div>
        <div className="step">
          <div className="step-icon">
            <NotificationsActiveIcon />
          </div>
          <h3>Real-time Notifications</h3>
          <p>Stay updated with instant alerts about your listing’s activity.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
