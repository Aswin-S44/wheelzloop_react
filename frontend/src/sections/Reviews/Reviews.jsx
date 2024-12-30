import React, { useState } from "react";
import "./Reviews.css";

const reviewsData = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "Great experience! Easy to use, and I was able to sell my car quickly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Smooth process, highly recommend WheelzLoop. Everything was so seamless.",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Lee",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review: "Fantastic platform, sold my car in no time. Will use again!",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review: "A great site with helpful customer service. My car sold fast!",
    rating: 4,
  },
];

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    if (currentIndex < reviewsData.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="reviews-container">
      <h2 className="title">What Our Users Say</h2>
      <div className="reviews-slider">
        <button className="arrow left" onClick={prevReview}>
          &#10094;
        </button>
        <div className="reviews-cards">
          {reviewsData.slice(currentIndex, currentIndex + 3).map((review) => (
            <div key={review.id} className="review-card">
              <img
                src={review.image}
                alt={review.name}
                className="review-image"
              />
              <h3>{review.name}</h3>
              <p className="rating">{"⭐".repeat(review.rating)}</p>
              <p className="review-text">{review.review}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={nextReview}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default Reviews;
