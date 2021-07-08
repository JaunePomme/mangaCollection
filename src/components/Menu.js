import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {
  faBars,
  faCalendar,
  faFilm,
  faHeart,
  faHome,
  faQuestion,
  faSearch,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useHistory } from "react-router";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Menu() {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser } = useAuthentication();
  const { logout } = useAuthentication();
  const [myUsername, setMyUsername] = useState("");
  const [state, setState] = useState({
    left: false,
  });

  useEffect(() => {
    if (currentUser) {
      firestore
        .collection("users")
        .where("userId", "==", currentUser.uid)
        .get()
        .then((querySnapshot) => {
          let first = [];
          querySnapshot.forEach((doc) => {
            first.push(doc.data().pseudo);
          });
          setMyUsername(first[0]);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/"}
        >
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faHome} />
            Home
          </li>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/firebasereviews"}
        >
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faSearch} />
            Search for username
          </li>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/profile/" + myUsername}
        >
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faHeart} /> My collection
          </li>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/movie"}
        >
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faFilm} /> Movie
          </li>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/seasonal"}
        >
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faCalendar} /> Seasonal
          </li>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/genre"}
        >
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faTag} /> Genre
          </li>
        </NavLink>

        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/about"}
        >
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faQuestion} /> About
          </li>
        </NavLink>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </List>
      <Divider />
    </div>
  );
  return (
    <div>
      {
        <div className="menu-container">
          <Button className="btn-menu" onClick={toggleDrawer("left", true)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <SwipeableDrawer
            className="drawer-menu"
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </div>
      }
    </div>
  );
}
