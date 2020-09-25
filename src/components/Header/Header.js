import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.style.css";
import logo from "../../Logo.png";

import { useLocation } from "react-router-dom";
import { auth } from "../../firebase/Config";
import { Avatar } from "@material-ui/core";

function Header({ setUser }) {
  const location = useLocation();
  let condition =
    location.pathname === "/" || location.pathname.includes("place");

  const logout = async () => {
    await auth
      .signOut()
      .then(() => setUser({}))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={`container position-fixed fixed-top `}>
      <nav
        className={`navbar navbar-expand-lg  ${
          condition ? "navbar-dark" : "navbar-light"
        } `}
      >
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt=""
            className={`logo ${condition && "logo-white"}`}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {condition && (
            <>
              <input
                type="text"
                className="form-control search"
                placeholder="Search your Destination..."
              />
            </>
          )}
          <ul className=" ml-auto navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" activeClassName="selected" to="/">
                News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="selected" to="/">
                Destination
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="selected" to="/">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="selected" to="/">
                Contact
              </NavLink>
            </li>

            {auth.currentUser ? (
              <li className="nav-item d-flex">
                <Avatar
                  alt={auth.currentUser.displayName}
                  src={auth.currentUser.photoURL}
                />

                <button className="ml-2 login-button" onClick={logout}>
                  LOGOUT
                </button>
              </li>
            ) : (
              <li className="nav-item login-button">
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="selected"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
