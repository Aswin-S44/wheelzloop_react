import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5">
            <img
              src="https://cdn.pixabay.com/photo/2024/09/08/08/52/car-9031576_1280.png"
              className="w-100"
            />
          </div>
          <div className="col-md-6 mt-5">
            <h2>About Us</h2>
            <div className="mt-2 about-section">
              <p>
                Welcome to <span>WheelzLoop</span>, your trusted platform for
                buying and selling used cars in Kerala. We provide an easy and
                reliable way for car buyers and sellers to connect directly with
                dealers and individuals, ensuring a seamless car buying
                experience.
              </p>
              <p>
                At <span>WheelzLoop</span>, we believe in making the process of
                buying and selling used cars as transparent and efficient as
                possible. Whether you're looking for your next vehicle or
                looking to sell your car, we offer a range of services to help
                you make informed decisions.
              </p>
              <p>
                Our platform connects car buyers with trusted dealers in Kerala,
                giving you the opportunity to browse a wide selection of
                vehicles, from affordable cars to premium options, all in one
                place. Our easy-to-use interface makes the buying and selling
                process simple and stress-free.
              </p>
              <p>
                Join the <span>WheelzLoop</span> community today and take the
                first step towards finding the perfect car or selling your
                vehicle with confidence!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
