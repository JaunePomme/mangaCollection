import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";
import Button from "@material-ui/core/Button";
import "../sass/ForgotPassword.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
    fontSize: 20,
    color: "snow",
    width: 150,
  },
}));

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuthentication();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(emailRef.current.value);
      alert("check your inbox and follow the instructions");
      console.log(emailRef.current.value);
    } catch (error) {
      alert("failed to reset the password");
      alert(error);
    }
  };

  return (
    <form
      className="form-forgotpassword"
      id="login-form"
      placerholder="Type in.."
    >
      <div className="form-group">
        <label className="forgot-email" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          placeholder="email here.."
          required
          ref={emailRef}
        />
      </div>

      <Button
        className={classes.button}
        onClick={() => handleSubmit()}
        type="submit"
        variant="outlined"
        color="primary"
      >
        Submit
      </Button>

      <div className="forgot-already">
        Already have an account ?{" "}
        <Link style={{ textDecoration: "none" }} to="/login">
          <Button
            onClick={() => handleSubmit()}
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Log in
          </Button>
        </Link>
      </div>
      <div className="forgot-signup">
        Want to sign up ?{" "}
        <Link style={{ textDecoration: "none" }} to="/signup">
          <Button
            className={classes.button}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </form>
  );
}
