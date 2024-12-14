import React from "react";
import "./Banner.css";

function Banner() {
  const navigateToExploreCars = () => {
    window.location.href = "/used-cars";
  };
  return (
    <section>
      <div className="banner-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                Find the Car You Want,<span> Your Way</span>
              </h1>
              <p>
                Your one-stop destination for buying and selling quality used
                cars. Discover a seamless and trustworthy experience like never
                before.
              </p>
              <button className="banner-btn" onClick={navigateToExploreCars}>
                Explore Now
              </button>
            </div>
            <div className="col-md-6 banner-im">
              <img src="./images/banner.png" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
