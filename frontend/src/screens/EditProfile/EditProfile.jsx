import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [showDeactivatePopup, setShowDeactivatePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleNavigateProfile = () => {
    navigate("/profile/edit");
  };

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName ?? "");
      setLastName(currentUser.lastName ?? "");
      setEmail(currentUser.email ?? "");
      setPhoneNumber(currentUser.phoneNumber ?? "");
    }
  }, [currentUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // setAdditionalImages((prevImages) => [...prevImages, reader.result]);
      };

      //   reader.onloadend = () => setProfileImage(reader.result);
      //   reader.readAsDataURL(file);
    }
  };

  const handleDeactivateToggle = (event) => {
    setIsDeactivated(event.target.checked);
    if (event.target.checked) {
      setShowDeactivatePopup(true);
    }
  };

  const closePopup = () => setShowDeactivatePopup(false);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {};

    if (firstName !== currentUser.firstName) updatedData.firstName = firstName;
    if (lastName !== currentUser.lastName) updatedData.lastName = lastName;
    if (phoneNumber !== currentUser.phoneNumber)
      updatedData.phoneNumber = phoneNumber;
    if (email !== currentUser.email) updatedData.email = email;
    if (profileImage) updatedData.profileImage = profileImage;
    if (isDeactivated !== currentUser.isDeactivated)
      updatedData.isDeactivated = isDeactivated;

    if (Object.keys(updatedData).length === 0) {
      alert("No changes to save.");
      return;
    }

    try {
      let resp = await axios.post(
        `${BACKEND_URL}/api/v1/user/profile/edit`,
        { updatedFields: updatedData },
        {
          withCredentials: true,
        }
      );
      if (resp && resp.status == 200) {
        setLoading(false);
        Swal.fire({
          title: "Success!",
          text: "Your profile updated!",
          icon: "success",
        });
        window.location.reload();
      } else {
        setLoading(false);
        Swal.fire({
          title: "Failed!",
          text: "Error while updating your profile!",
          icon: "error",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Failed!",
        text: "Error while updating your profile!",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <section className="mt-5 edit-page">
        {loading && (
          <div className="overlay show">
            <div className="message">Please Wait...</div>
          </div>
        )}
        <div className="container">
          <a href="/profile">Back to Profile</a>
          <h2>Edit your Profile</h2>
          <form onSubmit={handleEditProfile}>
            {/* <div className="profile-image-container">
              <div className="profile-image">
                <img
                  src={profileImage || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
                <label htmlFor="profile-upload" className="camera-icon">
                  <input
                    type="file"
                    id="profile-upload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  📷
                </label>
              </div>
            </div> */}

            <div>
              <p>First Name</p>
              <input
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <p>Last Name</p>
              <input
                type="text"
                placeholder="Your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <p>Phone number</p>
              <input
                type="text"
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p>Deactivate Account</p>
              <PinkSwitch
                {...label}
                checked={isDeactivated}
                onChange={handleDeactivateToggle}
              />
            </div>

            <button className="primary mt-4" type="submit">
              Save
            </button>

            <div className="links mt-4">
              <a href="/terms">Terms and Conditions</a>
              <a href="/delete-account" className="delete-account">
                Delete Account
              </a>
            </div>
          </form>
        </div>
      </section>

      <Modal open={showDeactivatePopup} onClose={closePopup}>
        <Box className="popup-box">
          <h2>Deactivate Account</h2>
          <p>Your account will no longer be visible to others.</p>
          <button onClick={closePopup} className="primary mt-2">
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default EditProfile;
