import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/reducers/actions/authActions/userAction";
import "../../styles/ProfilePage/userdetails.style.css";
import avatarimg from "../../assets/avatar-g.png";

import AboutModal from "./AboutModal";
import CreatePost from "./CreatePost";

const UserDetails = () => {
  const [aboutModal, setAboutModal] = useState(false);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const userData = useSelector((state) => state.userData.userData);

  const capitalizeFirst = (str) => {
    if (str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    }
  };

  return (
    <div>
      <div className="user-details-container">
        <div className="user-prifile-image-container">
          <img
            src={userData?.profile_photo ? userData?.profile_photo : avatarimg}
            alt=""
            className="user-prifile-image"
          />
        </div>
        <div className="user-prifile-credentials">
          <h2 className="user-prifile-credentials-text">
            {capitalizeFirst(userData?.first_name)}
          </h2>{" "}
          <h2 className="user-prifile-credentials-text">
            {capitalizeFirst(userData?.last_name)}
          </h2>
        </div>
        <div className="user-create-post">
          <CreatePost userImg={userData?.profile_photo} />
        </div>
        <div className="user-profile-about">
          <button
            className="user-profile-about-button"
            onClick={() => setAboutModal(!aboutModal)}
          >
            About
          </button>
        </div>
      </div>
      {aboutModal && (
        <AboutModal
          userData={userData ? userData : "null"}
          setAboutModal={setAboutModal}
        />
      )}
      <div className="user-create-post-mobile">
        <CreatePost userImg={userData?.profile_photo} />
      </div>
    </div>
  );
};

export default UserDetails;
