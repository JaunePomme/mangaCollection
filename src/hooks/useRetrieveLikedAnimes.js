import React, { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";

export default function useRetrieveLikedAnimes() {
  const { currentUser } = useAuthentication();
  const [retrievedLikedAnimes, setretrievedLikedAnimes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const retrieveLikedAnimeList = async (id) => {
        await firestore
          .collection("likedAnimes")
          .doc(id)
          .collection("anime")
          .get()
          .then((querySnapshot) => {
            const newAnimeList = [];
            querySnapshot.forEach((doc) => {
              newAnimeList.push(doc.data().title);
            });
            setretrievedLikedAnimes(newAnimeList);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      };
      retrieveLikedAnimeList(currentUser.uid);
    }
  }, []);
  return retrievedLikedAnimes;
}
