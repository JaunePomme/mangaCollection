import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Reviews from "./components/Reviews";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import MangaProfile from "./components/MangaProfile";
import UpdateProfile from "./authentication/UpdateProfile";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import FirebaseReviews from "./components/FirebaseReviews";
import Menu from "./components/Menu";
import Movie from "./components/Movie";
import Seasonal from "./components/Seasonal";
import About from "./components/About";
import Genre from "./components/Genre";
import "./App.css";
import MainSearch from "./components/MainSearch";

export default function App() {
  return (
    <div className="container">
      <Router forceRefresh={true}>
        <AuthenticationProvider>
          <Menu />

          <Navigation />

          <Switch>
            <Route exact path="/" component={MainSearch} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/firebasereviews" component={FirebaseReviews} />
            <Route exact path="/reviews/:title" component={Reviews} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/manga-profile/:title"
              component={MangaProfile}
            />
            <Route exact path="/movie" component={Movie} />
            <Route exact path="/seasonal" component={Seasonal} />
            <Route exact path="/about" component={About} />
            <Route exact path="/genre" component={Genre} />

            {/* Private Routes */}
            <PrivateRoute exact path="/profile/:username" component={Profile} />
            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />

            {/* ERROR */}
            <Route
              path="/"
              component={() => <div> 404 ERROR Page not found. </div>}
            />
          </Switch>
        </AuthenticationProvider>
      </Router>
    </div>
  );
}
