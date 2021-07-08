import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function Navigation() {
  const { currentUser } = useAuthentication();

  return (
    <div>
      {currentUser ? (
        ""
      ) : (
        <div>
          <NavLink
            style={{ textDecoration: "none" }}
            exact
            activeClassName="current"
            to={"/login"}
          >
            <p style={{ marginLeft: 25 }}> Login </p>
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            exact
            activeClassName="current"
            to={"/signup"}
          >
            <p style={{ marginLeft: 25 }}> Sign up</p>
          </NavLink>
        </div>
      )}
    </div>
  );
}
