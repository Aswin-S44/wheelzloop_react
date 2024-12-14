import React from "react";
import Loader from "../Loader/Loader";
import EmptyState from "../EmptyState/EmptyState";

function Card({ loading, myCars }) {
  return (
    <div>
      <div className="cars-container">
        {loading ? (
          <Loader />
        ) : myCars.length == 0 && !loading ? (
          <>
            <EmptyState />
          </>
        ) : (
          myCars.map((car) => (
            <div className="car-card" key={car._id}>
              <div className="card-header">
                <FaEllipsisV
                  className="dots-icon"
                  onClick={() => handleMenuClick(car._id)}
                />
                {activeDropdown === car._id && (
                  <div
                    className="dropdown-menu"
                    ref={(el) => (dropdownRefs.current[car._id] = el)}
                  >
                    <button
                      onClick={() => {
                        handleOpen(car);
                      }}
                    >
                      <VisibilityIcon
                        sx={{
                          fontSize: "19px",
                          top: "-1px",
                          position: "relative",
                        }}
                      />{" "}
                      View
                    </button>
                    <button onClick={() => handleEdit(car)}>
                      <EditIcon
                        sx={{
                          fontSize: "19px",
                          top: "-1px",
                          position: "relative",
                        }}
                      />{" "}
                      Edit
                    </button>
                    <button onClick={() => handleRemove(car._id)}>
                      <DeleteIcon
                        sx={{
                          fontSize: "19px",
                          top: "-1px",
                          position: "relative",
                          color: "red",
                        }}
                      />{" "}
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <img src={car?.images[0]} alt={car.name} className="car-image" />
              <div className="car-info">
                <h2 className="car-name">{car.name}</h2>
                <p>
                  Posted on :{" "}
                  {car.createdAt ? formattedDateTime(car.createdAt) : "_"}
                </p>
                <p className="car-details">
                  {car.year} | {car.varient} | {car.kilometer} km
                </p>
                <p className="price">₹{car.rate.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Card;
