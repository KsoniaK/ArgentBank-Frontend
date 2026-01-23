import React from "react";
import { Link, useNavigate } from "react-router-dom";
import argentBankLogo from "../assets/img/argentBankLogo.png";

function Header({ isLoggedIn = false, username = "", setIsLoggedIn, setUsername }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {!isLoggedIn ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {username}
            </span>
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
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
