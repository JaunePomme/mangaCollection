import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

export const PrivateRoute: React.FC<RouteProps> = ({
	component: Component,
	...rest
}) => {
	const { currentUser } = useAuthentication();
	if (!Component) return null;
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		></Route>
	);
};
