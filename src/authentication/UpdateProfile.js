import React, { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";
import Button from "@material-ui/core/Button";
import "../sass/UpdateProfile.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
    fontSize: 20,
    color: "snow",
    width: 150,
  },
}));

export default function UpdateProfile() {
  const passwordRef = useRef();
  const confirmedPasswordRef = useRef();
  const { updatePassword, logout } = useAuthentication();
  const { history } = useHistory();
  const classes = useStyles();

  function handleSubmit() {
    if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
      return alert("password do not match.");
    }

    const promises = [];
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
          history.push("/profile/");
          alert("password modified");
        })
        .catch(() => {
          alert("failed to update account.");
        });
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      alert("you failed to logout");
    }
  };

  return (
    <div className="updateprofile-container">
      <form id="update-form" onSubmit={handleSubmit} placerholder="Type in..">
        <div className="form-group">
          <label className="update-password" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            placeholder="password here.."
            ref={passwordRef}
          />
        </div>
        <div className="form-group">
          <label
            className="update-confirmedpassword"
            htmlFor="confirmed-password"
          >
            Confirmed password:
          </label>
          <input
            type="password"
            placeholder="password here.."
            ref={confirmedPasswordRef}
          />
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Update
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button
            className={classes.button}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </Link>
      </form>
    </div>
  );
}
