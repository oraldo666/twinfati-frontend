import React from "react";
import "../../styles/MenuComponent/menucomponent.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLoggedIn } from "../../services/reducers/actions/authActions/loginAction";
import { logOut } from "../../services/reducers/actions/authActions/logOutAction";
import { closeMenu } from "../../services/reducers/uiActions/openMenu";
import { FiLogOut, FiLogIn } from "react-icons/fi";

function MenuComponent() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(closeMenu());
    dispatch(setLoggedIn());
    navigate("/");
  };

  const handleLogIn = () => {
    dispatch(closeMenu());
    dispatch(setLoggedIn());
    navigate("/");
  };

  const openMenu = useSelector((state) => state.openMenu.openMenu);

  const loggedIn = localStorage.getItem("accessToken");
  return (
    <div
      className={
        openMenu
          ? "menu-component-container menu-component-container-transition"
          : "menu-component-container menu-component-container-transition-back"
      }
    >
      {loggedIn ? (
        <div
          className={
            openMenu
              ? "menu-item menu-item-display"
              : "menu-item menu-item-hide"
          }
          onClick={handleLogOut}
        >
          <div className="menu-login-logout">
            <FiLogOut className="menu-log-out-icon" /> <h2>Log Out</h2>
          </div>
        </div>
      ) : (
        <div
          className={
            openMenu
              ? "menu-item menu-item-display"
              : "menu-item menu-item-hide"
          }
          onClick={handleLogIn}
        >
          <div className="menu-login-logout">
            <FiLogIn className="menu-log-out-icon" /> <h2>Log In</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuComponent;
