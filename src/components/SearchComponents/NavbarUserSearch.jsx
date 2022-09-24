import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/UsersSearch/userssearch.styles.css";
import { useNavigate } from "react-router-dom";
import { eraseUsersList } from "../../services/reducers/actions/searchActions/searchUserAction";

function NavbarUserSearch() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const searchedUsers = useSelector((state) => state.searchUsers.users);
  const userArray = Array.isArray(searchedUsers.results);
  let userList = searchedUsers.results;

  const goToUserProfile = (userId) => {
    console.log(userId);
    navigate(`/user/profile/${userId}`);
    dispatch(eraseUsersList());
  };

  const capitalizeFirst = (str) => {
    if (str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    }
  };

  if (userArray) {
    return (
      <div className="users-searched-container">
        {userList?.map((user) => (
          <div
            className="user-search"
            key={user.id}
            onClick={() => goToUserProfile(user.id)}
          >
            <div className="user-search-img-container">
              <img
                src={user.profile_photo}
                alt="user-img"
                className="user-search-img"
              />
            </div>

            <div className="user-search-credentials">
              <h2>{capitalizeFirst(user.first_name)} </h2>{" "}
              <h2>{capitalizeFirst(user.last_name)}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default NavbarUserSearch;
