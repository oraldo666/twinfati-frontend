import React from "react";
import "../../styles/ProfilePage/aboutmodal.style.css";
import { AiOutlineFullscreenExit } from "react-icons/ai";

import avatar from "../../assets/avatar-g.png";

function AboutModal({ userData, setAboutModal }) {
  return (
    <div className="about-profile-modal-container">
      <AiOutlineFullscreenExit
        onClick={() => setAboutModal(false)}
        className="modal-exit"
      />
      <div className="about-profile-modal-info">
        <img
          src={userData.profile_photo ? userData.profile_photo : avatar}
          alt=""
          className="modal-profile-photo"
        />
        <div>
          <p>
            Name :{" "}
            {userData.first_name?.charAt(0).toUpperCase() +
              userData.first_name?.slice(1)}
          </p>
          <p>
            Last name :{" "}
            {userData.last_name?.charAt(0).toUpperCase() +
              userData.last_name?.slice(1)}
          </p>
          <p>Email : {userData?.email}</p>
          <p>
            {" "}
            User joined on :{" "}
            {userData.date_joined?.substr(
              0,
              userData?.date_joined?.indexOf("T")
            )}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
