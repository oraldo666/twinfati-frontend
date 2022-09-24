import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchUserData } from "../services/reducers/actions/searchActions/searchSingleUser";
import "../styles/ProfilePage/userdetails.style.css";
import avatarimg from "../assets/avatar-g.png";
import UserProfilePosts from "../components/UserProfileComponents/UserProfilePosts";
import AddFriendComponent from "../components/UserProfileComponents/AddFriendComponent";

import { useParams } from "react-router-dom";

import AboutModal from "../components/UserProfileComponents/AboutModal";

function SearchedUserDetails() {
  const [aboutModal, setAboutModal] = useState(false);
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    dispatch(getSearchUserData(id));
  }, [dispatch, id]);

  const userData = useSelector((state) => state.searchSingleUser.userData);

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

        <div className="add-friend-component-container">
          <AddFriendComponent userId={userData?.id} />
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
      <div className="searched-user-posts">
        <UserProfilePosts id={id} />
      </div>
    </div>
  );
}

export default SearchedUserDetails;
