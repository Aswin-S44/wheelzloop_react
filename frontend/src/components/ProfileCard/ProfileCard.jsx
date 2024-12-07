import React from "react";
import "./ProfileCard.css";
import useAuth from "../../hooks/useAuth";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileCard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleShareProfile = () => {
    if (currentUser && currentUser._id) {
      const profileUrl = `${window.location.origin}/profile/${currentUser._id}`;
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

  return (
    <div>
      <div className="profile-card text-center">
        <img
          src={"/images/avatar.png"}
          alt="Profile"
          className="profile-image"
        />
        <h3 className="profile-name">{currentUser?.name || "John Doe"}</h3>
        <p className="profile-date">Joined: January 1, 2023</p>
        <div className="profile-buttons">
          <button className="btn primary" onClick={handleEditProfile}>
            <EditIcon />
            Edit Profile
          </button>
          <button className="btn secondary-btn" onClick={handleShareProfile}>
            <ShareIcon />
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
