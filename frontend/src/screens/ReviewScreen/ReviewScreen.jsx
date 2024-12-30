import React from "react";
import "./ReviewScreen.css";
import Rating from "../../components/Rating/Rating";
import Reviews from "../../sections/Reviews/Reviews";

const reviews = [
  {
    id: 1,
    name: "Ashwin",
    review:
      "Excellent service! The process was smooth and the staff was very friendly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Vishnu",
    review:
      "Great selection of cars, but the paperwork took longer than expected.",
    rating: 4,
  },
  {
    id: 3,
    name: "Akash",
    review:
      "Satisfied with the car quality, but the customer support could be improved.",
    rating: 3,
  },
];

function ReviewScreen() {
  return (
    <section>
      <div className="review-page mt-4">
        <div className="container p-5">
          <h2>Our Reviews</h2>
          <p className="description mt-3">
            At WheelzLoop, we take pride in offering an exceptional car buying
            experience. Don’t just take our word for it—hear what our customers
            have to say! From seamless transactions to trusted service, our
            reviews reflect the quality and reliability we stand for. Read on to
            discover why our customers choose WheelzLoop for their next car
            purchase.
          </p>
          <div className="rating-section mt-5">
            <div className="rating-header">
              <h3 className="rating-large">4.2 / 5</h3>
              <Rating rating={4.5} />
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="bar-graph">
                  {[
                    { label: "5 stars", value: 100, count: 6 },
                    { label: "4 stars", value: 80, count: 4 },
                    { label: "3 stars", value: 60, count: 3 },
                    { label: "2 stars", value: 30, count: 2 },
                  ].map((item, index) => (
                    <div className="graph" key={index}>
                      <p className="rating-label">{item.label}</p>
                      <div className="bar-container">
                        <div
                          className="bar"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: "#21cb98",
                          }}
                        ></div>
                      </div>
                      <h6 className="bar-count">{item.count} Votes</h6>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="review-summary">
                  <h4>Customer Satisfaction</h4>
                  <p>
                    Most of our customers love the smooth buying experience and
                    excellent service. Check out individual ratings to see how
                    we score across different categories.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="customer-reviews  mt-5">
            <Reviews />
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default ReviewScreen;
