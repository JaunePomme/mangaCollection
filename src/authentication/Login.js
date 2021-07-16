import React, { useRef, useState } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../sass/Login.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
    fontSize: 20,
    color: "snow",
    width: 150,
  },
}));

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuthentication();
  const history = useHistory();
  const [error, setError] = useState("");
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      alert("bug" + error);
      setError("failed to log in");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      {currentUser && currentUser.userId}
      {error}
      <form id="login-form" onSubmit={handleSubmit} placerholder="Type in..">
        <div className="form-group">
          <label className="login-email" htmlFor="email">
            {" "}
            Email:
          </label>
          <input
            name="email"
            type="email"
            placeholder="email here.."
            required
            ref={emailRef}
          />
        </div>
        <div className="form-group">
          <label className="login-password" htmlFor="password">
            Password:
          </label>
          <input
            name="password"
            type="password"
            placeholder="password here.."
            required
            ref={passwordRef}
          />
        </div>

        <Button
          onClick={() => handleSubmit()}
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
          disabled={loading}
        >
          Log in
        </Button>

        <Link to="/forgot-password" style={{ textDecoration: "none" }}>
          <Button className={classes.button} variant="outlined" color="primary">
            Forgot password?
          </Button>
        </Link>
      </form>
    </div>
  );
}
