import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import Button from "@material-ui/core/Button";
import "../sass/SignUp.css";
import { Collections } from "../components/FirestoreConstant.json";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  guest: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#689f38",
    color: "#fafafa",
    "&:hover": {
      backgroundColor: "#689f38",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmedPasswordRef = useRef();
  const [pseudo, setPseudo] = useState();
  const { signup, currentUser } = useAuthentication();
  const history = useHistory();
  const { login } = useAuthentication();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
        return alert("passwords are different");
      }
      localStorage.setItem("pseudo", pseudo);
      localStorage.setItem("email", emailRef.current.value);

      await signup(emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          var uid = userCredential.user.uid;
          var mail = userCredential.user.email;

          firestore.collection(Collections.likedAnimes).doc(uid).set({
            likes: [],
          });
          firestore.collection(Collections.likedMangas).doc(uid).set({
            likes: [],
          });
          firestore.collection(Collections.reviews).doc(uid).set({
            id: [],
          });
          firestore.collection(Collections.scans).doc(uid).set({
            id: [],
          });
          firestore.collection(Collections.episodes).doc(uid).set({
            id: [],
          });

          firestore.collection(Collections.users).doc(pseudo).set({
            pseudo: pseudo,
            email: mail,
            userId: uid,
          });
        })
        .then(() => {
          history.push("/profile/" + pseudo);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      await login("guestaccount@guest.fr", "guestaccount");
      history.push("/");
    } catch (error) {
      alert("bug" + error);
    }
  };

  return (
    <div className="center-signup">
      <div className="signup-container">
        {currentUser && currentUser.email}

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="Username"
                    variant="outlined"
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    autoFocus
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    inputRef={emailRef}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    inputRef={passwordRef}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    inputRef={confirmedPasswordRef}
                    name="confirmedPassword"
                    label="Confirmed Password"
                    type="password"
                    id="confirmedPassword"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Button
                className={classes.guest}
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => handleGuestLogin(e)}
              >
                Sign up as a guest
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
