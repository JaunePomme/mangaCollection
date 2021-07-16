import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LikedList from "../components/LikedList";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import "../sass/Profile.css";

export default function Profile() {
  let { username } = useParams();
  const [idLookedFor, setIdLookedFor] = useState("");
  const [emailLookedFor, setEmailLookedFor] = useState("");
  const { currentUser } = useAuthentication();

  useEffect(() => {
    const idRetrieve = async () => {
      let docRef = firestore.collection("users").doc(username);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIdLookedFor(doc.data().userId);
            setEmailLookedFor(doc.data().email);
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
        <li>Profile of: {username}</li>
        <li>Email: {emailLookedFor}</li>
        {currentUser.uid === idLookedFor ? (
          <li>
            <Link to="/update-profile"> Update your profile</Link>
          </li>
        ) : (
          ""
        )}
      </ul>

      {idLookedFor && <LikedList idLookedFor={idLookedFor} />}
    </div>
  );
}
