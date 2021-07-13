import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { Link } from "react-router-dom";
import LikedList from "../components/LikedList";
import { firestore } from "../firebase";
import "../sass/Profile.css";

export default function Profile() {
  const { currentUser } = useAuthentication();
  let { username } = useParams();
  const [idLookedFor, setIdLookedFor] = useState("");

  useEffect(() => {
    const idRetrieve = async () => {
      let docRef = firestore.collection("users").doc(username);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIdLookedFor(doc.data().userId);
          } else {
            // console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };

    idRetrieve();
  }, []);

  return (
    <div>
      <ul className="profile-container">
        <li>Username: {username}</li>
        <li>Email: {currentUser.email}</li>
        <li>
          <Link to="/update-profile"> Update your profile</Link>
        </li>
      </ul>

      {idLookedFor && <LikedList idLookedFor={idLookedFor} />}
    </div>
  );
}
