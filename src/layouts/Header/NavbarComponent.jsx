import React, { useState, useEffect } from "react";
import "../../styles/navbar.styles.css";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdHome } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { ImMenu } from "react-icons/im";

import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../services/reducers/actions/searchActions/searchUserAction";
import { eraseUsersList } from "../../services/reducers/actions/searchActions/searchUserAction";

import { openCloseMenu } from "../../services/reducers/uiActions/openMenu";

function NavbarComponent() {
  const [searchParams, setSearchParams] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchParams(e.target.value);
    console.log(searchParams);
  };

  useEffect(() => {
    if (searchParams.length >= 1) {
      dispatch(searchUsers(searchParams));
    } else if (searchParams.length <= 2) {
      dispatch(eraseUsersList());
    }
    // dispatch(searchUsers(searchParams));
  }, [searchParams]);

  return (
    <div className="navbar-container">
      <div className="navbar-socialmedia-name-container">
        <Link to="/home" className="navbar-socialmedia-name">
          Twinfati
        </Link>
      </div>
      <div className="navbar-socialmedia-short-name-container">
        <Link to="/home" className="navbar-socialmedia-name">
          Tw
        </Link>
      </div>
      <div className="navbar-searchbar-container">
        <input
          type="search"
          className="navbar-searchbar"
          value={searchParams}
          onChange={handleSearch}
        />
      </div>
      <div className="navbar-icons-container">
        <Link
          to="/home"
          className="navbar-searchbar-home-container navbar-icons"
        >
          <MdHome className="navbar-searchbar-home" style={{ color: "red" }} />
        </Link>
        <Link to="/profile" className=" navbar-icons">
          <CgProfile className="" />
        </Link>
        <Link to="/my-messages" className=" navbar-icons">
          <AiFillMessage className="" />
        </Link>
        <Link to="/my-notifications" className=" navbar-icons">
          <MdOutlineNotificationsActive className="" />
        </Link>
      </div>
      <div>
        <button
          className="navbar-menu-icon-container"
          onClick={() => dispatch(openCloseMenu())}
        >
          <ImMenu className="navbar-menu-icon-profile" />
        </button>
      </div>
    </div>
  );
}

export default NavbarComponent;
