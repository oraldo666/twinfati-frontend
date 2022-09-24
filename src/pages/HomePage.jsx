import React, { useEffect } from "react";
import "../styles/homepage.styles.css";

import HomePagePosts from "../components/HomePagePosts/HomePagePosts";
import CreatePost from "../components/UserProfileComponents/CreatePost";
import { useDispatch, useSelector } from "react-redux";

import { getUserData } from "../services/reducers/actions/authActions/userAction";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const userData = useSelector((state) => state.userData.userData);

  const loggedIn = localStorage.getItem("loggedIn");

  return (
    <div className="home-page-container">
      {loggedIn && (
        <div className="homepage-create-post-container">
          <CreatePost userImg={userData?.profile_photo} />
        </div>
      )}

      <div className="home-page-posts-container">
        <HomePagePosts />
      </div>
    </div>
  );
}

export default HomePage;
