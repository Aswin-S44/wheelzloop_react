import React, { useEffect, useState } from "react";
import "./DealerProfileScreen.css";
import { use } from "react";
import { useParams } from "react-router-dom";
import { getDealerProfile } from "../../services/apis";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import NotFound from "../NotFound/NotFound";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteIcon from "@mui/icons-material/Favorite";

function DealerProfileScreen() {
  const { id: dealerId } = useParams();
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favCars, setFavCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getDealerProfile(dealerId);
        setLoading(false);
        if (res) {
          setDealer(res.user);
        } else {
          console.error(res.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching dealer profile:", error);
      }
    };
    fetchData();
  }, [dealerId]);

  if (!dealer) {
    return null;
  }

  const handleShareProfile = (id) => {
    if (id) {
      const profileUrl = `${window.location.origin}/seller/profile/${dealerId}`;
      navigator.clipboard
        .writeText(profileUrl)
        .then(() => {
          toast.success("Profile URL copied to clipboard!", {
            position: "top-center",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.error("Failed to copy the URL:", err);
          toast.error("Failed to copy the profile URL. Please try again.", {
            position: "top-center",
            autoClose: 3000,
          });
        });
    } else {
      toast.warn("User ID is missing. Unable to generate the profile URL.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const addToFav = (id) => {
    let updatedFavCars = [...favCars];

    if (!favCars.includes(id)) {
      updatedFavCars.push(id);
      localStorage.setItem("fav-cars", JSON.stringify(updatedFavCars));
      toast.success("Added to favourites");
    } else {
      updatedFavCars = updatedFavCars.filter((favId) => favId !== id);
      localStorage.setItem("fav-cars", JSON.stringify(updatedFavCars));
      toast.error("Removed from favourites");
    }

    setFavCars(updatedFavCars);
  };

  return (
    <section>
      <div className="mt-5">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row">
              <div className="col-md-3">
                <div className="profile-card text-center">
                  <img
                    src={"/images/avatar.png"}
                    alt="Profile"
                    className="profile-image"
                  />
                  <h3 className="profile-name">{dealer?.firstName || "_"}</h3>
                  <p className="profile-date">Joined: January 1, 2023</p>
                  <p>
                    {" "}
                    <PhoneIcon /> {dealer.phoneNumber ?? "_"}
                  </p>
                  <p>
                    <MailIcon />
                    {dealer?.email ?? "_"}
                  </p>
                  <div className="profile-buttons">
                    <button
                      className="btn secondary-btn"
                      onClick={handleShareProfile}
                    >
                      <ShareIcon />
                      Share Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="car-list mt-3">
                  {dealer?.cars.length == 0 ? (
                    <>
                      <NotFound />
                    </>
                  ) : (
                    dealer?.cars.map((car, index) => (
                      <div>
                        <div
                          key={index}
                          className="car-card-2 m-2"
                          // ref={dealer?.cars.length === index + 1 ? lastCarRef : null}
                        >
                          {favCars.includes(car.id) ? (
                            <FavoriteIcon
                              style={{ color: "red" }}
                              onClick={() => addToFav(car.id)}
                            />
                          ) : (
                            <FavoriteBorderIcon
                              onClick={() => addToFav(car.id)}
                            />
                          )}
                          {car && car.images && car.images.length > 0 && (
                            <img
                              src={car.images[0]}
                              alt={car.car_name}
                              className="car-image-2"
                              onClick={() => navigate(`/details/${car?.id}`)}
                            />
                          )}

                          <div
                            className="car-details"
                            onClick={() => navigate(`/details/${car?.id}`)}
                          >
                            <h5>
                              {car.name} - {car.varient}
                            </h5>
                            <p className="variant">{car.varient}</p>
                            <p>Year: {car.year ?? "_"}</p>
                            <p>Kilometers: {car.kilometer.toLocaleString()}</p>
                            <p className="price">
                              Price: ₹{car?.rate?.toLocaleString()}
                            </p>
                            <p className="location">
                              <PlaceIcon /> {car.location ?? "_"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default DealerProfileScreen;
