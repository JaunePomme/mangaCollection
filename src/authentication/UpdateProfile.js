import React, { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function UpdateProfile() {
  const passwordRef = useRef();
  const confirmedPasswordRef = useRef();
  const pseudoRef = useRef();
  const { updatePassword, logout } = useAuthentication();
  const { history } = useHistory();

  function handleSubmit() {
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
          history.push("/profile/" + pseudoRef.current.value);
          alert("password modified");
        })
        .catch(() => {
          alert("failed to update account.");
        });
    }
  }

  const handleLogout = async () => {
    try {
      console.log("logout");
      await logout();
      history.push("/login");
    } catch {
      alert("you failed to logout");
    }
  };

  useEffect(() => {
    pseudoRef.current.value = localStorage.getItem("pseudo");
  }, []);

  return (
    <div>
      <form id="update-form" onSubmit={handleSubmit} placerholder="Type in..">
        <div className="form-group">
          <label htmlFor="pseudo">Alias(pseudo):</label>
          <input
            name="pseudo"
            type="text"
            placeholder="alias here.."
            ref={pseudoRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="password here.."
            ref={passwordRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmed-password">Confirmed password:</label>
          <input
            type="password"
            placeholder="password here.."
            ref={confirmedPasswordRef}
          />
        </div>
        <button type="submit">Update </button>
      </form>
      <button onClick={() => handleLogout()}>Log out</button>
      <Link to="/profile">Cancel</Link>
    </div>
  );
}
