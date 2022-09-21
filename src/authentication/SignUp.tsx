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
	button: {
		margin: theme.spacing(3),
		fontSize: 20,
		color: "snow",
		width: 150,
	},
	guest: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "green",
		color: "snow",
		"&:hover": {
			backgroundColor: "green",
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

export const SignUp = () => {
	const emailRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const confirmedPasswordRef = useRef<HTMLInputElement>();
	const [pseudo, setPseudo] = useState("");
	const { signup, currentUser } = useAuthentication();
	const history = useHistory();
	const { login } = useAuthentication();
	const classes = useStyles();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (pseudo == null) return alert("Pseudo required");
		try {
			if (
				passwordRef.current == null ||
				confirmedPasswordRef.current == null ||
				emailRef.current == null
			)
				// throw new Error("bug ref password or confirmed");
				return alert("Dont leave empty space");
			if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
				return alert("passwords are different");
			}

			localStorage.setItem("pseudo", pseudo);
			localStorage.setItem("email", emailRef.current.value);

			let userCredential = await signup(
				emailRef.current.value,
				passwordRef.current.value
			);
			let uid = userCredential.user.uid;
			let mail = userCredential.user.email;
			await firestore.collection(Collections.likedAnimes).doc(uid).set({
				likes: [],
			});
			await firestore.collection(Collections.likedMangas).doc(uid).set({
				likes: [],
			});
			await firestore.collection(Collections.reviews).doc(uid).set({
				id: [],
			});
			await firestore.collection(Collections.scans).doc(uid).set({
				id: [],
			});
			await firestore.collection(Collections.episodes).doc(uid).set({
				id: [],
			});

			await firestore.collection(Collections.users).doc(pseudo).set({
				pseudo: pseudo,
				email: mail,
				userId: uid,
			});

			history.push("/profile/" + pseudo);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	const handleGuestLogin = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			// await login("guestaccount@guest.fr", "guestaccount");
			await login("guestuser@guestuser.guestuser", "guestuser");
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
						<form className={classes.form} onSubmit={handleSubmit}>
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
							<Grid container>
								<Grid item>
									<Link to="/login">Already have an account? Log in</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</div>
		</div>
	);
};
