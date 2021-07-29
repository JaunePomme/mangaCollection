import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";
import Button from "@material-ui/core/Button";
import "../sass/ForgotPassword.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
    fontSize: 20,
    color: "snow",
    width: 150,
  },
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    <div className="forgot-password-container">
      {/* <form
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
      </form> */}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputRef={emailRef}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"/login"} variant="body2">
                  {"Login"}
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/signup"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
