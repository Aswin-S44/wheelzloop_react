import React from "react";
import "./NotFound.css";
import { FaCarCrash } from "react-icons/fa"; // Adding an icon for visual interest

function NotFound() {
  return (
    <div
      className="not-found-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="not-found-content">
        <FaCarCrash className="not-found-icon" />
        <h1 className="not-found-title">Oops! No Cars Found</h1>
        <p className="not-found-message">
          We couldn't find any cars matching your criteria. Try adjusting your
          filters or{" "}
          <a href="/" className="not-found-link">
            return to the homepage
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default NotFound;
