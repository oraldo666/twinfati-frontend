import React from "react";
import UserDetails from "../components/UserProfileComponents/UserDetails";
import UserProfilePosts from "../components/UserProfileComponents/UserProfilePosts";
import "../styles/ProfilePage/profilepage.stles.css";

function ProfilePage() {
  return (
    <div className="profile-page-container">
      <UserDetails />
      <div className="profile-page-user-post-container">
        <UserProfilePosts id={localStorage.getItem("userId")} />
      </div>
    </div>
  );
}

export default ProfilePage;
