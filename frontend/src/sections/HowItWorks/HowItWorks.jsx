import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="how-it-works-container">
      <h2 className="title">How It Works</h2>
      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Create an Account</h3>
          <p>Sign up to get started and list your cars for sale.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Add Your Cars</h3>
          <p>Upload your cars with detailed descriptions and photos.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Direct Contact with Customers</h3>
          <p>Connect directly with potential buyers through our platform.</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <h3>Get realtime updates</h3>
          <p>You can get realtime notification through our platform</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
