import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import argentBankLogo from "../assets/img/argentBankLogo.png";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.auth.user);
  const firstName = useSelector((state) => state.auth.user.firstName);
  console.log("Redux user firstname:", firstName);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("Header render, firstName:", firstName);

  const handleLogout = () => {
    dispatch(logout());
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
          <Link to="/profile">
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </span>
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
