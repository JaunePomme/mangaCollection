import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { Link } from "react-router-dom";
import LikedList from "../components/LikedList";
import { firestore } from "../firebase";

export default function Profile() {
  const { currentUser } = useAuthentication();
  const [pseudo, setPseudo] = useState("");
  let { username } = useParams();
  const [idLookedFor, setIdLookedFor] = useState("");

  useEffect(() => {
    const usernameRetrieve = async () => {
      let docRef = firestore.collection("users").doc(currentUser.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setPseudo(doc.data().pseudo);
          } else {
            // console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
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

    usernameRetrieve();
    idRetrieve();
  }, []);

  return (
    <div>
      username:{username} idlookedfor:{idLookedFor}
      My profile :<strong>{pseudo}</strong> email: {currentUser.email}
      current user uid: {currentUser.uid}
      <Link to="/update-profile"> Update your profile</Link>
      {idLookedFor && <LikedList idLookedFor={idLookedFor} />}
    </div>
  );
}
