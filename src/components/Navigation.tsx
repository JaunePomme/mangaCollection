import { NavLink } from "react-router-dom";
import "../sass/Navigation.css";
import { useAuthentication } from "../contexts/AuthenticationContext";

export const Navigation = () => {
	const { currentUser } = useAuthentication();

	return (
		<div className="navigation-container">
			{currentUser ? (
				""
			) : (
				<div className="nav-body">
					<NavLink
						className="nav-login"
						exact
						activeClassName="current"
						to={"/login"}
					>
						<p className="nav-login-txt">Log in </p>
					</NavLink>

					<NavLink
						className="nav-signup"
						exact
						activeClassName="current"
						to={"/signup"}
					>
						<p className="nav-signup-txt"> Sign up</p>
					</NavLink>
				</div>
			)}
		</div>
	);
};
