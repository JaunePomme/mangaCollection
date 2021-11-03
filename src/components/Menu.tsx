import { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
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
import { Collections } from "./FirestoreConstant.json";

const useStyles = makeStyles({
	list: {
		width: 230,
		height: "100%",
		fontSize: 20,
		backgroundColor: "#1b252f",
	},
	button: {
		fontSize: 20,
		width: 150,
	},
	drawer: {},
	menu: {
		fontSize: 20,
		color: "snow",
		marginTop: 10,
		position: "fixed",
	},
});

export const Menu = () => {
	const classes = useStyles();
	const history = useHistory();
	const { currentUser, logout } = useAuthentication();
	const [myUsername, setMyUsername] = useState("");
	const [state, setState] = useState({
		left: false,
	});
	useEffect(() => {
		if (currentUser) {
			firestore
				.collection(Collections.users)
				.where("userId", "==", currentUser.uid)
				.get()
				.then((querySnapshot) => {
					let first: string[] = [];
					querySnapshot.forEach((doc) => {
						first.push(doc.data().pseudo);
					});
					setMyUsername(first[0]);
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
				});
		}
	}, [currentUser]);

	const handleLogout = async () => {
		try {
			await logout();
			history.push("/login");
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};
	//modif le any en changeant version de material ui
	const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		)
			return;
		setState({ ...state, [anchor]: open });
	};

	const list = (anchor: string) => (
		<div
			className={clsx(classes.list)}
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			{myUsername ? (
				<h4 className="welcome-menu">Welcome: {myUsername}</h4>
			) : (
				""
			)}

			<NavLink className="nav-home" exact activeClassName="current" to={"/"}>
				<article style={{ marginLeft: 25 }}>
					<FontAwesomeIcon icon={faHome} />
					Home
				</article>
			</NavLink>
			<NavLink
				className="nav-search"
				exact
				activeClassName="current"
				to={"/firebasereviews"}
			>
				<article style={{ marginLeft: 25 }}>
					<FontAwesomeIcon icon={faSearch} />
					Search user
				</article>
			</NavLink>

			{currentUser ? (
				<NavLink
					className="nav-mycollection"
					exact
					activeClassName="current"
					to={"/profile/" + myUsername}
				>
					<article style={{ marginLeft: 25 }}>
						<FontAwesomeIcon icon={faHeart} /> My collection
					</article>
				</NavLink>
			) : (
				""
			)}

			<NavLink
				className="nav-movie"
				exact
				activeClassName="current"
				to={"/movie"}
			>
				<article style={{ marginLeft: 25 }}>
					<FontAwesomeIcon icon={faFilm} /> Movie
				</article>
			</NavLink>
			<NavLink
				className="nav-seasonal"
				exact
				activeClassName="current"
				to={"/seasonal"}
			>
				<article style={{ marginLeft: 25 }}>
					<FontAwesomeIcon icon={faCalendar} /> Seasonal
				</article>
			</NavLink>
			<NavLink
				className="nav-genre"
				exact
				activeClassName="current"
				to={"/genre"}
			>
				<article style={{ marginLeft: 25 }}>
					<FontAwesomeIcon icon={faTag} /> Genre
				</article>
			</NavLink>

			<NavLink
				className="nav-about"
				exact
				activeClassName="current"
				to={"/about"}
			>
				<article style={{ marginLeft: 25 }}>
					<FontAwesomeIcon icon={faQuestion} /> About
				</article>
			</NavLink>

			<div className="menu-btn-container">
				{currentUser && (
					<Button
						className="menu-btn-logout"
						variant="outlined"
						color="secondary"
						onClick={() => handleLogout()}
					>
						Logout
					</Button>
				)}
			</div>
		</div>
	);
	return (
		<div>
			<Button className={classes.menu} onClick={toggleDrawer("left", true)}>
				<FontAwesomeIcon icon={faBars} />
			</Button>

			<SwipeableDrawer
				className={classes.drawer}
				anchor="left"
				open={state["left"]}
				onClose={toggleDrawer("left", false)}
				onOpen={toggleDrawer("left", true)}
				swipeAreaWidth={10}
			>
				{list("left")}
			</SwipeableDrawer>
		</div>
	);
};
function alert(error: unknown) {
	throw new Error("Function not implemented.");
}
