import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import Button from "@material-ui/core/Button";
import "../sass/SignUp.css";
import { Collections } from "../components/FirestoreConstant.json";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
    fontSize: 20,
    color: "snow",
    width: 150,
  },
  guest: {
    margin: theme.spacing(3),
    fontSize: 20,
    color: "green",
    width: 300,
  },
}));

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmedPasswordRef = useRef();
  const [pseudo, setPseudo] = useState();
  const { signup, currentUser } = useAuthentication();
  const history = useHistory();
  const [error, setError] = useState("");
  const { login } = useAuthentication();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
        return setError("passwords are different");
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
      setError("failed to create an account");
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      await login("guestaccount@guest.fr", "guestaccount");
      history.push("/");
    } catch (error) {
      alert("bug" + error);
      setError("failed to log in");
    }
  };

  return (
    <div>
      {currentUser && currentUser.email}
      {error}

      <form
        className="login-form"
        id="login-form"
        onSubmit={handleSubmit}
        placerholder="Type in.."
      >
        <div className="signup-txt-guest">
          Use a guest Account? Click here :
          <Button
            className={classes.guest}
            variant="outlined"
            color="primary"
            onClick={(e) => handleGuestLogin(e)}
          >
            Sign up as a guest
          </Button>
        </div>

        <div className="form-group">
          <label className="signup-alias" htmlFor="pseudo">
            Alias(username):
          </label>
          <input
            name="pseudo"
            type="text"
            placeholder="alias here.."
            required
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="signup-email" htmlFor="email">
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
          <label className="signup-password" htmlFor="password">
            Password:
          </label>
          <input
            name="password"
            type="password"
            placeholder="(6characters at least)"
            required
            ref={passwordRef}
          />
        </div>
        <div className="form-group">
          <label className="signup-confirmed" htmlFor="confirmed-password">
            Confirmed password:
          </label>
          <input
            name="confirmed-password"
            type="password"
            placeholder="password here.."
            required
            ref={confirmedPasswordRef}
          />
        </div>
        <Button
          className={classes.button}
          type="submit"
          variant="outlined"
          color="primary"
        >
          Sign up
        </Button>
        <div className="signup-txt-already">
          Already have an account ?
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
            >
              Log in
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
