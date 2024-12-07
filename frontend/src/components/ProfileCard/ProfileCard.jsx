import React from "react";
import "./ProfileCard.css";
import useAuth from "../../hooks/useAuth";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";

function ProfileCard() {
  const { currentUser } = useAuth();
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
          <button className="btn primary">
            <EditIcon />
            Edit Profile
          </button>
          <button className="btn secondary-btn">
            <ShareIcon />
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
