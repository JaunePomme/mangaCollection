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
import "../sass/Menu.css";
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
          <article style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faHome} />
            Home
          </article>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/firebasereviews"}
        >
          <article style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faSearch} />
            Search for username
          </article>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/profile/" + myUsername}
        >
          <article style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faHeart} /> My collection
          </article>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/movie"}
        >
          <article style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faFilm} /> Movie
          </article>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/seasonal"}
        >
          <article style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faCalendar} /> Seasonal
          </article>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/genre"}
        >
          <article style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faTag} /> Genre
          </article>
        </NavLink>

        <NavLink
          style={{ textDecoration: "none" }}
          exact
          activeClassName="current"
          to={"/about"}
        >
          <article style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faQuestion} /> About
          </article>
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
        <div className="menu-btn">
          <Button onClick={toggleDrawer("left", true)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <SwipeableDrawer
            className="drawer-menu"
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
            swipeAreaWidth={10}
          >
            {list("left")}
          </SwipeableDrawer>
        </div>
      }
    </div>
  );
}
