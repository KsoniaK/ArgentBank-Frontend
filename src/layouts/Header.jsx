import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import argentBankLogo from "../assets/img/argentBankLogo.png";
import profilePicture from "../assets/img/profile-picture.png";
import logoutImg from "../assets/img/logout.png";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.auth.user.firstName);
  console.log("Redux user firstname:", firstName);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("Header render, firstName:", firstName);

  // Déclenche l’action Redux logout pour réinitialiser le store.
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Permet de savoir si on est sur la page de login pour ajuster le style ou certains éléments.
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/login");

  return (
    <nav className="main-nav" data-page={isProfilePage ? "login" : "default"}>
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div className="user-login_container">
        {!isLoggedIn ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            <span>Sign In</span>
          </Link>
        ) : (
          <>
          <Link to="/profile">
                <img
                  className="login-img"
                  src={profilePicture}
                  alt="Login"
                />
                <span>{firstName}</span>
          </Link>
            <button
              className="main-nav-item"
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                font: "inherit",
              }}
            >
                  <img
                  className="logout-img"
                  src={logoutImg}
                  alt="Logout"
                  />
              <span>Sign Out</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
