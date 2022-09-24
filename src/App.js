import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import NavbarComponent from "./layouts/Header/NavbarComponent";
import NavbarUserSearch from "./components/SearchComponents/NavbarUserSearch";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterUser from "./pages/RegisterUser";
import ProfilePage from "./pages/ProfilePage";
import SearchedUserDetails from "./pages/SearchedUserDetails";
import MessagesPage from "./pages/MessagesPage";
import MenuComponent from "./layouts/Header/MenuComponent";

import { useDispatch } from "react-redux";
import { closeMenu } from "./services/reducers/uiActions/openMenu";
import { eraseUsersList } from "./services/reducers/actions/searchActions/searchUserAction";

import jwt_decode from "jwt-decode";
import { getRefreshToken } from "./services/reducers/actions/authActions/refreshTokenAction";

function App() {
  const dispatch = useDispatch();
  // let navigate = useNavigate();
  const [getNewAccess, setGetNewAccess] = useState(true);

  // const openMenu = useSelector((state) => state.openMenu.openMenu);
  // const loggedIn = useSelector((state) => state.userLogin.loggedIn);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === "undefined") {
      localStorage.removeItem("accessToken");
    }
  }, []);

  useEffect(() => {
    const d = new Date();
    const refreshToken = localStorage.getItem("accessToken");
    if (refreshToken) {
      const decodeToken = jwt_decode(refreshToken);
      console.log(decodeToken);
      const expTime = parseInt(decodeToken.exp);
      const timeNow = parseInt(d.getTime() / 1000);
      console.log(timeNow);
      const a = parseInt(timeNow) >= parseInt(expTime);

      if (a) {
        setGetNewAccess(true);
        console.log("Token has expired.");

        dispatch(getRefreshToken());
        setTimeout(() => {
          window.location.reload(false);
        }, "1000");
      } else {
        console.log("Token is still valid.");
      }
    }
  }, [getNewAccess, dispatch]);

  const handleMainClick = () => {
    dispatch(closeMenu());
    dispatch(eraseUsersList());
  };

  return (
    <div>
      <nav>
        <NavbarComponent />
        <NavbarUserSearch />
      </nav>

      <main onClick={handleMainClick}>
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/profile/:id" element={<SearchedUserDetails />} />
          <Route path="/my-messages" element={<MessagesPage />} />
        </Routes>
      </main>
      <MenuComponent />
      <footer></footer>
    </div>
  );
}

export default App;
