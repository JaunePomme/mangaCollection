import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";
import Button from "@material-ui/core/Button";
import "../sass/UpdateProfile.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(3),
		fontSize: 20,
		color: "snow",
		width: 150,
	},
}));

export const UpdateProfile = () => {
	const passwordRef = useRef<HTMLInputElement>();
	const confirmedPasswordRef = useRef<HTMLInputElement>();
	const { updatePassword, logout } = useAuthentication();
	const history = useHistory();
	const classes = useStyles();

	function handleSubmit() {
		if (confirmedPasswordRef.current == null || passwordRef.current == null)
			throw new Error("bug au login d'email ou password");
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
			<form id="update-form" onSubmit={handleSubmit} placeholder="Type in..">
				<div className="form-group">
					<label className="update-password" htmlFor="password">
						Password:
					</label>
					<TextField
						type="password"
						placeholder="password here.."
						inputRef={passwordRef}
					/>
				</div>
				<div className="form-group">
					<label
						className="update-confirmedpassword"
						htmlFor="confirmed-password"
					>
						Confirmed password:
					</label>
					<TextField
						type="password"
						placeholder="password here.."
						inputRef={confirmedPasswordRef}
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
};
